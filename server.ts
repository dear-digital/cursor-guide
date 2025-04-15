// Virtual entry point for the app
import type {AppLoadContext} from '@shopify/remix-oxygen';

import * as remixBuild from '@remix-run/dev/server-build';
import {
  cartGetIdDefault,
  cartSetIdDefault,
  createCartHandler,
  createCustomerAccountClient,
  createStorefrontClient,
  storefrontRedirect,
} from '@shopify/hydrogen';
import {
  createRequestHandler,
  getStorefrontHeaders,
} from '@shopify/remix-oxygen';
import {countries, getAllLocales, getLocaleFromRequest} from 'countries';

import {CART_QUERY_FRAGMENT} from '~/graphql/fragments';
import {envVariables} from '~/lib/env.server';
import {HydrogenSession} from '~/lib/hydrogen.session.server';
import {SanitySession} from '~/lib/sanity/sanity.session.server';
import { createAdminClient } from '~/lib/utilities/createAdminClient';

import {createSanityClient} from './app/lib/sanity/sanity.server';

/*
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const envVars = envVariables(env);
      const isDev = envVars.NODE_ENV === 'development';
      const url = new URL(request.url);
      const path = url.pathname;

      // Check if there's already a language slug in the path
      const firstPathPart = path.split('/')[1] ? '/' + path.split('/')[1].toLowerCase() : '';
      const hasLanguagePrefix = Object.keys(countries).includes(firstPathPart);
      
      // Debug logging
      if (isDev) {
        console.log('[Language Redirect] Path:', path);
        console.log('[Language Redirect] First path part:', firstPathPart);
        console.log('[Language Redirect] Has language prefix:', hasLanguagePrefix);
      }
      
      // Check if we need to redirect based on preferred language
      if (!hasLanguagePrefix) {
        // Check for language preference cookie (set when user selects language)
        const cookies = request.headers.get('Cookie') || '';
        const hasLanguagePreference = cookies.includes('languagePreference=');
        
        // Only redirect based on browser language if no language preference cookie exists
        if (!hasLanguagePreference) {
          // No language slug specified, check browser's preferred language
          const acceptLanguageHeader = request.headers.get('Accept-Language');
          
          if (isDev) {
            console.log('[Language Redirect] Accept-Language header:', acceptLanguageHeader);
          }
          
          if (acceptLanguageHeader) {
            // Parse Accept-Language header
            const preferredLanguages = acceptLanguageHeader
              .split(',')
              .map(lang => {
                const [language, q = 'q=1.0'] = lang.trim().split(';');
                const quality = parseFloat(q.replace('q=', ''));
                return { language: language.substring(0, 2).toLowerCase(), quality };
              })
              .sort((a, b) => b.quality - a.quality);
            
            if (isDev) {
              console.log('[Language Redirect] Preferred languages:', preferredLanguages);
            }
            
            // Get all available locales
            const allLocales = getAllLocales();
            
            // Find the best match (excluding the default locale path which is empty)
            for (const { language } of preferredLanguages) {
              // Skip redirect for Dutch as it's the default language (no slug)
              if (language === 'nl') {
                if (isDev) {
                  console.log('[Language Redirect] Skipping Dutch (default language)');
                }
                continue;
              }
              
              // Find locale with matching language and non-empty path prefix
              const matchingLocale = allLocales.find(
                locale => 
                  locale.language.toLowerCase() === language && 
                  locale.pathPrefix !== ''
              );
              
              if (isDev) {
                console.log(`[Language Redirect] Checking language: ${language}, matched:`, matchingLocale);
              }
              
              if (matchingLocale) {
                // Redirect to the matched language URL
                const redirectUrl = new URL(request.url);
                
                // Preserve the entire path after adding the language prefix
                redirectUrl.pathname = matchingLocale.pathPrefix + path;
                
                if (isDev) {
                  console.log('[Language Redirect] Redirecting to:', redirectUrl.toString());
                }
                
                return Response.redirect(redirectUrl.toString());
              }
            }
          }
        } else if (isDev) {
          console.log('[Language Redirect] Language preference cookie found, skipping redirect');
        }
      }
      
      const locale = getLocaleFromRequest(request);
      const waitUntil = executionContext.waitUntil.bind(executionContext);

      /*
       * Open a cache instance in the worker and a custom session instance.
       */
      const [cache, session, sanitySession] = await Promise.all([
        caches.open('hydrogen'),
        HydrogenSession.init(request, [envVars.SESSION_SECRET]),
        SanitySession.init(request, [envVars.SESSION_SECRET]),
      ]);
      const sanityPreviewMode = await sanitySession.has('previewMode');

      /*
       * Create Hydrogen's Storefront client.
       */
      const {storefront} = createStorefrontClient({
        cache,
        i18n: {country: locale.country, language: locale.language},
        privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
        publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        storeDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION || '2024-10',
        storefrontHeaders: getStorefrontHeaders(request),
        storefrontId: env.PUBLIC_STOREFRONT_ID,
        waitUntil,
      });

      /**
       * Create Hydrogen's Admin API client.
       */
      const {admin} = createAdminClient({
        adminApiVersion: env.PRIVATE_ADMIN_API_VERSION || '2025-01',
        privateAdminToken: env.PRIVATE_ADMIN_API_TOKEN,
        storeDomain: `https://${env.PUBLIC_STORE_DOMAIN}`,
      });

      /**
       * Create a client for Customer Account API.
       */
      const customerAccount = createCustomerAccountClient({
        customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
        customerAccountUrl: env.PUBLIC_CUSTOMER_ACCOUNT_API_URL,
        request,
        session,
        waitUntil,
      });

      /*
       * Create a cart handler that will be used to
       * create and update the cart in the session.
       */
      const cart = createCartHandler({
        cartQueryFragment: CART_QUERY_FRAGMENT,
        getCartId: cartGetIdDefault(request.headers),
        setCartId: cartSetIdDefault(),
        storefront,
      });

      /*
       * Sanity CMS client
       */
      const sanity = createSanityClient({
        cache,
        config: {
          apiVersion: envVars.SANITY_STUDIO_API_VERSION,
          dataset: envVars.SANITY_STUDIO_DATASET,
          projectId: envVars.SANITY_STUDIO_PROJECT_ID,
          studioUrl: envVars.SANITY_STUDIO_URL,
          token: envVars.SANITY_STUDIO_TOKEN,
          useCdn: !envVars.NODE_ENV || envVars.NODE_ENV === 'production',
          useStega: envVars.SANITY_STUDIO_USE_PREVIEW_MODE,
        },
        isPreviewMode: sanityPreviewMode,
        request,
        waitUntil,
      });

      /*
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        build: remixBuild,
        getLoadContext: (): AppLoadContext => ({
          admin,
          cart,
          customerAccount,
          env: envVars,
          isDev,
          locale,
          sanity,
          sanityPreviewMode,
          sanitySession,
          session,
          storefront,
          waitUntil,
        }),
        mode: process.env.NODE_ENV,
      });

      const response = await handleRequest(request);

      if ((response.status === 404 || process.env.NODE_ENV === 'production') && !envVars.SANITY_STUDIO_USE_PREVIEW_MODE) {
        /*
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({request, response, storefront});
      }

      return response;
    } catch (error) {
      const errorString = error instanceof Error ? error.toString() : '';
      let message = 'An unexpected error occurred';

      if (errorString.includes('Missing environment variable')) {
        message = 'Missing environment variable';
      }

      // eslint-disable-next-line no-console
      console.error(error);
      return new Response(message, {status: 500});
    }
  },
};
