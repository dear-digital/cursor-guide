/*
 * Vercel doesn't inject all environment variables into the runtime
 * some are only available through the process.env object
 */

import type {AppLoadContext} from '@shopify/remix-oxygen';

interface Env {
  NODE_ENV: string;
  PRIVATE_SHOPIFY_ACCESS_TOKEN: string;
  PRIVATE_SHOPIFY_STORE: string;
  PRIVATE_UPPROMOTE_API_KEY: string;
  PUBLIC_GOOGLE_MAPS_API_KEY: string;
  SANITY_STUDIO_API_VERSION: string;
  SANITY_STUDIO_DATASET: string;
  SANITY_STUDIO_PROJECT_ID: string;
  SANITY_STUDIO_SHOPIFY_SHOP_HANDLE: string;
  SANITY_STUDIO_TOKEN: string;
  SANITY_STUDIO_URL: string;
  SANITY_STUDIO_USE_PREVIEW_MODE: string;
}

export function envVariables(contextEnv: Env) {
  let env: Env | NodeJS.ProcessEnv = contextEnv;

  if (typeof process !== 'undefined') {
    // Process is accessible in Vercel environment
    env = process.env;
  }

  return {
    NODE_ENV: env.NODE_ENV as AppLoadContext['env']['NODE_ENV'],
    PRIVATE_SHOPIFY_ACCESS_TOKEN: checkRequiredEnv(
      env.PRIVATE_SHOPIFY_ACCESS_TOKEN,
      'PRIVATE_SHOPIFY_ACCESS_TOKEN',
    ),
    PRIVATE_SHOPIFY_STORE: checkRequiredEnv(
      env.PRIVATE_SHOPIFY_STORE,
      'PRIVATE_SHOPIFY_STORE',
    ),
    PRIVATE_UPPROMOTE_API_KEY: checkRequiredEnv(
      env.PRIVATE_UPPROMOTE_API_KEY,
      'PRIVATE_UPPROMOTE_API_KEY',
    ),
    PUBLIC_GOOGLE_MAPS_API_KEY: checkRequiredEnv(
      env.PUBLIC_GOOGLE_MAPS_API_KEY,
      'PUBLIC_GOOGLE_MAPS_API_KEY',
    ),
    SANITY_STUDIO_API_VERSION: env.SANITY_STUDIO_API_VERSION || '2024-10-01',
    SANITY_STUDIO_DATASET: checkRequiredEnv(
      env.SANITY_STUDIO_DATASET,
      'SANITY_STUDIO_DATASET',
    ),
    SANITY_STUDIO_PROJECT_ID: checkRequiredEnv(
      env.SANITY_STUDIO_PROJECT_ID,
      'SANITY_STUDIO_PROJECT_ID',
    ),
    SANITY_STUDIO_SHOPIFY_SHOP_HANDLE: checkRequiredEnv(
      env.SANITY_STUDIO_SHOPIFY_SHOP_HANDLE,
      'SANITY_STUDIO_SHOPIFY_SHOP_HANDLE',
    ),
    SANITY_STUDIO_TOKEN: checkRequiredEnv(
      env.SANITY_STUDIO_TOKEN,
      'SANITY_STUDIO_TOKEN',
    ),
    SANITY_STUDIO_URL: checkRequiredEnv(
      env.SANITY_STUDIO_URL,
      'SANITY_STUDIO_URL',
    ),
    SANITY_STUDIO_USE_PREVIEW_MODE:
      env.SANITY_STUDIO_USE_PREVIEW_MODE || 'true',
  };
}

function checkRequiredEnv(env: string | undefined, name: string) {
  if (typeof env !== 'string') {
    throw new Error(`Missing environment variable => ${name} is not set`);
  }

  return env;
}
