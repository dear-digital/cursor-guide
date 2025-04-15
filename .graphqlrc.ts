import type {IGraphQLConfig} from 'graphql-config';
import {getSchema, pluckConfig, preset} from '@shopify/hydrogen-codegen';
import {ApiType, shopifyApiTypes} from '@shopify/api-codegen-preset';

/**
 * GraphQL Config
 * @see https://the-guild.dev/graphql/config/docs/user/usage
 * @type {IGraphQLConfig}
 */
export default {
  projects: {
    default: {
      schema: 'node_modules/@shopify/hydrogen/storefront.schema.json',
      documents: [
        '!*.d.ts',
        '*.{ts,tsx,js,jsx}',
        'app/**/*.{ts,tsx,js,jsx}',
        '!app/graphql/customer-account/*.{ts,tsx,js,jsx}',
        '!app/graphql/admin/*.{js,ts,jsx,tsx}',
      ],
    },

    customer: {
      schema: 'node_modules/@shopify/hydrogen/customer-account.schema.json',
      documents: ['app/graphql/customer-account/**/*.{ts,tsx,js,jsx}'],
    },

    admin: {
      schema: 'https://shopify.dev/admin-graphql-direct-proxy/2025-01',
      documents: ['./app/graphql/admin/*.{ts,tsx,js,jsx}'],
      extensions: {
        codegen: {
          pluckConfig,
          generates: {
            './types/admin.schema.json': {
              plugins: ['introspection'],
              config: {minify: true},
            },
            './types/admin.types.d.ts': {
              plugins: ['typescript'],
            },
            './types/admin.generated.d.ts': {
              preset,
              presetConfig: {
                apiType: ApiType.Admin,
              },
            },
          },
        },
      },
    },
  },
};
