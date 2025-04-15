/* eslint perfectionist/sort-objects: 0 */
import type {I18nLocale, Localizations} from '../app/lib/type';

export const countries: Localizations = {
  default: {
    country: 'BE',
    currency: 'EUR',
    isoCode: 'nl-BE',
    label: 'Belgium (EUR €)',
    language: 'NL',
    languageLabel: 'Dutch',
    salesChannel: 'hydrogen',
    preferredLocale: 'nl',
    cookBookLocale: 'nl',
  },
  // Belgium Market
  '/fr': {
    country: 'BE',
    currency: 'EUR',
    isoCode: 'fr-BE',
    label: 'Belgium (FR) (EUR €)',
    language: 'FR',
    languageLabel: 'French',
    salesChannel: 'hydrogen',
    preferredLocale: 'fr',
    cookBookLocale: 'fr',
  },
  '/de': {
    country: 'BE',
    currency: 'EUR',
    isoCode: 'de-BE',
    label: 'Belgium (DE) (EUR €)',
    language: 'DE',
    languageLabel: 'German',
    salesChannel: 'hydrogen',
    preferredLocale: 'de',
    cookBookLocale: 'de',
  },
  '/en': {
    country: 'BE',
    currency: 'EUR',
    isoCode: 'en-BE',
    label: 'Belgium (EN) (EUR €)',
    language: 'EN',
    languageLabel: 'English',
    salesChannel: 'hydrogen',
    preferredLocale: 'en',
    cookBookLocale: 'eng',
  },
  // Netherlands Market
  '/nl-nl': {
    country: 'NL',
    currency: 'EUR',
    isoCode: 'nl-NL',
    label: 'Netherlands (NL) (EUR €)',
    language: 'NL',
    languageLabel: 'Dutch',
    salesChannel: 'hydrogen',
    preferredLocale: 'nl',
    cookBookLocale: 'nl',
  },
  '/en-nl': {
    country: 'NL',
    currency: 'EUR',
    isoCode: 'en-NL',
    label: 'Netherlands (EN) (EUR €)',
    language: 'EN',
    languageLabel: 'English',
    salesChannel: 'hydrogen',
    preferredLocale: 'en',
    cookBookLocale: 'eng',
  },
  '/de-nl': {
    country: 'NL',
    currency: 'EUR',
    isoCode: 'de-NL',
    label: 'Netherlands (DE) (EUR €)',
    language: 'DE',
    languageLabel: 'German',
    salesChannel: 'hydrogen',
    preferredLocale: 'de',
    cookBookLocale: 'de',
  },
  // Luxembourg Market
  '/fr-lu': {
    country: 'LU',
    currency: 'EUR',
    isoCode: 'fr-LU',
    label: 'Luxembourg (FR) (EUR €)',
    language: 'FR',
    languageLabel: 'French',
    salesChannel: 'hydrogen',
    preferredLocale: 'fr',
    cookBookLocale: 'fr',
  },
  '/de-lu': {
    country: 'LU',
    currency: 'EUR',
    isoCode: 'de-LU',
    label: 'Luxembourg (DE) (EUR €)',
    language: 'DE',
    languageLabel: 'German',
    salesChannel: 'hydrogen',
    preferredLocale: 'de',
    cookBookLocale: 'de',
  },
  '/en-lu': {
    country: 'LU',
    currency: 'EUR',
    isoCode: 'en-LU',
    label: 'Luxembourg (EN) (EUR €)',
    language: 'EN',
    languageLabel: 'English',
    salesChannel: 'hydrogen',
    preferredLocale: 'en',
    cookBookLocale: 'eng',
  },
};


export const DEFAULT_LOCALE: I18nLocale = Object.freeze({
  ...countries.default,
  pathPrefix: '',
  default: true,
});

export function getAllLanguages() {
  const uniqueLanguages = [];
  const seenLanguages = new Set<string>();

  for (const key in countries) {
    const language = countries[key].language;
    // Remove duplicates to avoid having same language multiple times
    if (!seenLanguages.has(language)) {
      uniqueLanguages.push({
        id: language.toLocaleLowerCase(),
        title: countries[key].languageLabel,
      });
      seenLanguages.add(language);
    }
  }

  return uniqueLanguages;
}

export function getLocaleFromRequest(request: Request): I18nLocale {
  const url = new URL(request.url);
  const firstPathPart =
    '/' + url.pathname.substring(1).split('/')[0].toLowerCase();

  return countries[firstPathPart]
    ? {
        ...countries[firstPathPart],
        pathPrefix: firstPathPart,
        default: false,
      }
    : {
        ...countries['default'],
        pathPrefix: '',
        default: true,
      };
}

export function getAllLocales() {
  return Object.keys(countries).map((key) => {
    if (key === 'default') {
      return {
        ...countries[key],
        pathPrefix: '',
        default: true,
      };
    }

    return {
      ...countries[key],
      pathPrefix: key,
      default: false,
    };
  });
}

export function getAllCountries() {
  return Object.keys(countries).map((key) => {
    return countries[key].country;
  });
}
