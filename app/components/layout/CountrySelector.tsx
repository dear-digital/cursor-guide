import {useLocation} from '@remix-run/react';
import {CartForm} from '@shopify/hydrogen';
import {
  Belgium,
  DropdownItem,
  LanguageSelector,
  Luxembourg,
  Netherlands,
  Typography,
} from '@vorwerk/fibre-react';
import {cx} from 'class-variance-authority';
import {getAllLocales} from 'countries';
import {domAnimation, LazyMotion} from 'framer-motion';
import {useMemo} from 'react';

import type {I18nLocale} from '~/lib/type';

import {useLocalePath} from '~/hooks/useLocalePath';
import {useRootLoaderData} from '~/root';

export function CountrySelector({
  buttonLabel,
  modalTitle,
  suggestedLabel,
}: {
  buttonLabel: string;
  modalTitle: string;
  suggestedLabel: string;
}) {
  const locales = getAllLocales();
  const flagIconRenderer = (countryCode: string) => {
    switch (countryCode) {
      case 'BE':
        return <Belgium />;
      case 'LU':
        return <Luxembourg />;
      case 'NL':
        return <Netherlands />;
      default:
        return null;
    }
  };

  const countriesWithLanguages = [
    // Belgium
    {
      country: 'BE',
      language: 'nl-BE',
      languageLabel: 'België - Nederlands',
      locale: locales.find((locale) => locale.isoCode === 'nl-BE'),
    },
    {
      country: 'BE',
      language: 'fr-BE',
      languageLabel: 'Belgique - Français',
      locale: locales.find((locale) => locale.isoCode === 'fr-BE'),
    },
    {
      country: 'BE',
      language: 'de-BE',
      languageLabel: 'Belgien - Deutsch',
      locale: locales.find((locale) => locale.isoCode === 'de-BE'),
    },
    {
      country: 'BE',
      language: 'en-BE',
      languageLabel: 'Belgium - English',
      locale: locales.find((locale) => locale.isoCode === 'en-BE'),
    },

    // Netherlands
    {
      country: 'NL',
      language: 'nl-NL',
      languageLabel: 'Nederland - Nederlands',
      locale: locales.find((locale) => locale.isoCode === 'nl-NL'),
    },
    {
      country: 'NL',
      language: 'en-NL',
      languageLabel: 'Netherlands - English',
      locale: locales.find((locale) => locale.isoCode === 'en-NL'),
    },
    {
      country: 'NL',
      language: 'de-NL',
      languageLabel: 'Netherlands - Deutsch',
      locale: locales.find((locale) => locale.isoCode === 'de-NL'),
    },

    // Luxembourg
    {
      country: 'LU',
      language: 'fr-LU',
      languageLabel: 'Luxembourg - Français',
      locale: locales.find((locale) => locale.isoCode === 'fr-LU'),
    },
    {
      country: 'LU',
      language: 'de-LU',
      languageLabel: 'Luxembourg - Deutsch',
      locale: locales.find((locale) => locale.isoCode === 'de-LU'),
    },
    {
      country: 'LU',
      language: 'en-LU',
      languageLabel: 'Luxembourg - English',
      locale: locales.find((locale) => locale.isoCode === 'en-LU'),
    },
  ];

  const languages = countriesWithLanguages.map((countryWithLanguage, index) => (
    <DropdownItem key={index}>
      {flagIconRenderer(countryWithLanguage.country)}
      <Typography
        component="span"
        fontWeight="regular"
        onSelect={(e) => e.preventDefault()}
        variant="paragraph16"
      >
        {countryWithLanguage.locale && (
          <ChangeLocaleForm
            label={countryWithLanguage.languageLabel}
            locale={countryWithLanguage.locale}
          />
        )}
      </Typography>
    </DropdownItem>
  ));

  return (
    <LazyMotion features={domAnimation}>
      <LanguageSelector
        buttonLabel={buttonLabel}
        languages={languages}
        modalTitle={modalTitle}
        suggestedLabel={suggestedLabel}
        suggestedLanguages={languages.length > 0 ? [languages[0]] : []}
      />
    </LazyMotion>
  );
}

function ChangeLocaleForm(props: {label: string; locale: I18nLocale}) {
  const {locale: currentLocale} = useRootLoaderData();
  const location = useLocation();
  const currentLocaleKey =
    currentLocale?.country +
    currentLocale?.language +
    currentLocale?.pathPrefix;
  const localeKey =
    props.locale.country + props.locale.language + props.locale.pathPrefix;
  const isActive = currentLocaleKey === localeKey;

  const redirectTo = useMemo(() => {
    let newPathname = `${props.locale?.pathPrefix}${location.pathname}`;

    if (!currentLocale) return props.locale?.pathPrefix || '/';

    if (!currentLocale.default) {
      newPathname = location.pathname.replace(
        currentLocale?.pathPrefix,
        props.locale?.pathPrefix || '',
      );
    }

    return newPathname || '/';
  }, [props.locale, currentLocale, location.pathname]);

  const cartPath = useLocalePath({path: '/cart'});

  // Set a language preference cookie when user selects a language
  const handleLanguageSelect = () => {
    // Set a cookie to remember the user's language preference
    document.cookie = `languagePreference=${props.locale.language}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <CartForm
      action={CartForm.ACTIONS.BuyerIdentityUpdate}
      inputs={{
        buyerIdentity: {countryCode: props.locale.country},
      }}
      route={cartPath}
    >
      {(fetcher) => (
        <>
          <input name="redirectTo" type="hidden" value={redirectTo} />
          <button
            className={cx([
              'flex w-full items-center gap-2 py-1',
              isActive && 'pointer-events-none font-bold',
              fetcher.state !== 'idle' && 'animate-pulse',
            ])}
            onClick={handleLanguageSelect}
            type="submit"
          >
            {props.label}
          </button>
        </>
      )}
    </CartForm>
  );
}
