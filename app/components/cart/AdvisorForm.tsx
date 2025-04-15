import type {Cart as CartType} from '@shopify/hydrogen/storefront-api-types';

import {useEffect, useMemo, useState} from 'react';
import DatalistInput from 'react-datalist-input';

import type {Advisor} from '~/lib/utilities/extractAdvisorSearchInfo';

import {useSanityThemeContent} from '~/hooks/useSanityThemeContent';

import {Checkbox} from '../ui/Checkbox';
import {handleAdvisorUppromoteAffiliates} from './HandleAdvisorUppromoteAffiliates';
import {handleCartAttributeUpdate} from './HandleCartAttributeUpdate';

interface AdvisorSelectionProps {
  attributes?: CartType['attributes'];
}

export function AdvisorSelection({attributes}: AdvisorSelectionProps) {
  const {themeContent} = useSanityThemeContent();
  const advisorAlreadyExists = attributes?.find(
    (attr) => attr.key === 'advisor',
  );

  const isJsonString = (value: string): boolean => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  };

  const getCookie = (name: string): null | string => {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)'),
    );
    return match ? decodeURIComponent(match[2]) : null;
  };

  const scaaf_afc = getCookie('scaaf_afc');
  const scaaf_afn = getCookie('scaaf_afn');

  const advisorData = useMemo(() => {
    return advisorAlreadyExists?.value &&
      isJsonString(advisorAlreadyExists.value)
      ? (JSON.parse(advisorAlreadyExists.value) as Advisor)
      : scaaf_afn
        ? {
            affiliate_link: '',
            company: scaaf_afc || '',
            email: '',
            first_name: scaaf_afn,
            id: scaaf_afc ? parseInt(scaaf_afc) : 0,
            last_name: '',
          }
        : null;
  }, [advisorAlreadyExists, scaaf_afc, scaaf_afn]);

  const [removeAdvisor, setRemoveAdvisor] = useState(false);
  const [advisorAttributesUpdated, setAdvisorAttributesUpdated] =
    useState<boolean>(!!advisorAlreadyExists);
  const [advisorName, setAdvisorName] = useState(
    advisorData ? advisorData.first_name : '',
  );
  const [extractAdvisorSearchInfo, setExtractAdvisorSearchInfo] = useState<
    Advisor[]
  >([]);
  const [successMessageAdvisor, setSuccessMessageAdvisor] =
    useState<React.ReactNode>(null);
  const [errorMessageAdvisor, setErrorMessageAdvisor] = useState<null | string>(
    null,
  );
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(
    advisorData,
  );

  useEffect(() => {
    if (advisorData && !advisorAlreadyExists) {
      handleCartAttributeUpdate(
        {preventDefault: () => {}} as React.FormEvent,
        advisorData,
        extractAdvisorSearchInfo,
        setAdvisorAttributesUpdated,
        setErrorMessageAdvisor,
        setSuccessMessageAdvisor,
        setSelectedAdvisor,
        setAdvisorName,
        setExtractAdvisorSearchInfo,
        removeAdvisor,
        themeContent,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advisorAlreadyExists, advisorData]);

  useEffect(() => {
    if (removeAdvisor && (selectedAdvisor || advisorName) && !scaaf_afc) {
      handleCartAttributeUpdate(
        {preventDefault: () => {}} as React.FormEvent,
        {
          affiliate_link: '',
          company: '',
          email: '',
          first_name: '',
          id: 0,
          last_name: '',
        },
        extractAdvisorSearchInfo,
        setAdvisorAttributesUpdated,
        setErrorMessageAdvisor,
        setSuccessMessageAdvisor,
        setSelectedAdvisor,
        setAdvisorName,
        setExtractAdvisorSearchInfo,
        removeAdvisor,
        themeContent,
      );
      setAdvisorName('');
      setSelectedAdvisor(null);
      setExtractAdvisorSearchInfo([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeAdvisor]);

  return (
    <>
      <div
        className={`relative flex w-full items-center pt-4 ${
          scaaf_afn ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        <DatalistInput
          aria-disabled={!!scaaf_afc}
          className="relative flex w-full flex-col gap-1 rounded-[8px] placeholder-gray-400 focus:border-gray-500 focus:outline-none"
          items={
            extractAdvisorSearchInfo?.map((advisor) => ({
              affiliate_link: advisor.affiliate_link,
              company: advisor.company,
              email: advisor.email,
              first_name: advisor.first_name,
              id: advisor.company,
              last_name: advisor.last_name,
              value: `${advisor.first_name} ${advisor.last_name}`,
            })) || []
          }
          label={themeContent?.cart?.AdvisorInputLabel ?? 'Advisor Name'}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            setAdvisorName(value);
            setErrorMessageAdvisor(null);
            setSuccessMessageAdvisor(null);
            setRemoveAdvisor(false);
            handleAdvisorUppromoteAffiliates(
              e,
              setExtractAdvisorSearchInfo,
              setErrorMessageAdvisor,
            );
            setSelectedAdvisor(null);
            setExtractAdvisorSearchInfo([]);
          }}
          onSelect={(item) => {
            setAdvisorName(item.value);
            setErrorMessageAdvisor(null);
            setSuccessMessageAdvisor(null);
            setSelectedAdvisor(item);
            setRemoveAdvisor(false);

            handleCartAttributeUpdate(
              {preventDefault: () => {}} as React.FormEvent,
              {...item},
              extractAdvisorSearchInfo,
              setAdvisorAttributesUpdated,
              setErrorMessageAdvisor,
              setSuccessMessageAdvisor,
              setSelectedAdvisor,
              setAdvisorName,
              setExtractAdvisorSearchInfo,
              removeAdvisor,
              themeContent,
            );
          }}
          placeholder={
            themeContent?.cart?.AdvisorInputPlaceholder ?? 'Advisor Name'
          }
          value={advisorName}
        />
      </div>

      <div className="mt-2 flex items-center gap-2">
        <Checkbox
          aria-label="Remove advisor"
          checked={removeAdvisor}
          className={`h-6 w-6 ${
            scaaf_afn ? 'pointer-events-none opacity-50' : ''
          }`}
          disabled={!!scaaf_afc}
          onCheckedChange={(checked) => {
            setRemoveAdvisor(checked === true);
          }}
        />
        <span 
          className={`cursor-pointer ${scaaf_afn ? 'pointer-events-none opacity-50' : ''}`}
          onClick={() => {
            if (!scaaf_afc) {
              setRemoveAdvisor(!removeAdvisor);
            }
          }}
        >
          {themeContent?.cart?.NoAdvisorText || 'I do not have an advisor'}
        </span>
      </div>

      <div>
        {errorMessageAdvisor && (
          <p className="mt-2 text-sm text-red-500">{errorMessageAdvisor}</p>
        )}
        {successMessageAdvisor && (
          <p className="text-green-500 mt-2 flex items-center gap-2 text-sm">
            {successMessageAdvisor}
          </p>
        )}
      </div>
    </>
  );
}
