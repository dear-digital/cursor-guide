/// <reference types="@remix-run/dev" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

// Enhance TypeScript's built-in typings.

import type {
  CustomerAccount,
  HydrogenCart,
  HydrogenSessionData,
  Storefront,
} from '@shopify/hydrogen';
import type {AriaAttributes, DOMAttributes} from 'react';

import '@total-typescript/ts-reset';

import type {HydrogenSession} from '~/lib/hydrogen.session.server';
import type {SanitySession} from '~/lib/sanity/sanity.session.server';
import type {I18nLocale} from '~/lib/type';
import type {AdminClient} from '~/lib/utilities/createAdminClient';

import type {Sanity} from './app/lib/sanity/sanity.server';

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: {env: {NODE_ENV: 'development' | 'production'}};

  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env {
    GOOGLE_TAG_MANAGER: string;
    NODE_ENV: 'development' | 'production';
    PRIVATE_ADMIN_API_TOKEN: string;
    PRIVATE_ADMIN_API_VERSION: string;
    PRIVATE_API_LAYER_KEY: string;
    PRIVATE_MAILCHIMP_API_KEY: string;
    PRIVATE_SHOPIFY_ACCESS_TOKEN: string;
    PRIVATE_SHOPIFY_STORE: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PRIVATE_UPPROMOTE_API_KEY: string;
    PUBLIC_CHECKOUT_DOMAIN: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
    PUBLIC_GOOGLE_MAPS_API_KEY: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PUBLIC_STOREFRONT_API_VERSION: string;
    PUBLIC_STOREFRONT_ID: string;
    SANITY_STUDIO_API_VERSION: string;
    SANITY_STUDIO_DATASET: string;
    SANITY_STUDIO_PROJECT_ID: string;
    SANITY_STUDIO_TOKEN: string;
    SANITY_STUDIO_URL: string;
    SANITY_STUDIO_USE_PREVIEW_MODE: string;
    SESSION_SECRET: string;
    STOREFRONT_SANITY_DOCUMENT_TYPE: string;
  }
}

declare module '@shopify/remix-oxygen' {
  /**
   * Declare local additions to the Remix loader context.
   */
  export interface AppLoadContext {
    admin: AdminClient;
    cart: HydrogenCart;
    customerAccount: CustomerAccount;
    env: Env;
    isDev: boolean;
    locale: I18nLocale;
    sanity: Sanity;
    sanityPreviewMode: boolean;
    sanitySession: SanitySession;
    session: HydrogenSession;
    storefront: Storefront;
    waitUntil: ExecutionContext['waitUntil'];
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    fetchpriority?: 'auto' | 'high' | 'low';
  }
}
