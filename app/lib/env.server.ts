/*
 * Vercel doesn't inject all environment variables into the runtime
 * some are only available through the process.env object
 */

import type {AppLoadContext} from '@shopify/remix-oxygen';

export function envVariables(contextEnv: Env) {
  let env: Env | NodeJS.ProcessEnv = contextEnv;

  if (typeof process !== 'undefined') {
    // Process is accessible in Vercel environment
    env = process.env;
  }

  return {
    GOOGLE_TAG_MANAGER: env.GOOGLE_TAG_MANAGER || '',
    NODE_ENV: env.NODE_ENV as AppLoadContext['env']['NODE_ENV'],
    SANITY_STUDIO_API_VERSION: env.SANITY_STUDIO_API_VERSION || '2024-05-01',
    SANITY_STUDIO_DATASET: checkRequiredEnv(
      env.SANITY_STUDIO_DATASET,
      'SANITY_STUDIO_DATASET',
    ),
    SANITY_STUDIO_PROJECT_ID: checkRequiredEnv(
      env.SANITY_STUDIO_PROJECT_ID,
      'SANITY_STUDIO_PROJECT_ID',
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
      env.SANITY_STUDIO_USE_PREVIEW_MODE || 'false',
    SESSION_SECRET: env.SESSION_SECRET || '',
  };
}

function checkRequiredEnv(env: string | undefined, name: string) {
  if (typeof env !== 'string') {
    throw new Error(`Missing environment variable => ${name} is not set`);
  }

  return env;
}
