import {stegaClean} from '@sanity/client/stega';

import type {
  Advisor,
  AdvisorData,
} from '~/lib/utilities/extractAdvisorSearchInfo';

import {extractAdvisorInfo} from '~/lib/utilities/extractAdvisorSearchInfo';

export async function handleAdvisorUppromoteAffiliates(
  e: React.FormEvent,
  setExtractAdvisorSearchInfo: React.Dispatch<React.SetStateAction<Advisor[]>>,
  setErrorMessageAdvisor: React.Dispatch<React.SetStateAction<null | string>>,
): Promise<void> {
  e.preventDefault();
  try {
    const currentLocale = window.location.pathname.split('/')[1] || '';

    const response = await fetch(`/${currentLocale}/api/uppromote-affiliates`, {
      body: JSON.stringify({
        query: (e.target as HTMLInputElement).value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    let rawData = await response.json();
    if (typeof rawData === 'string') {
      rawData = JSON.parse(rawData);
    }

    const cleanedData = stegaClean(rawData);
    const extractedInfo: Advisor[] = extractAdvisorInfo(
      cleanedData as AdvisorData,
    );
    setExtractAdvisorSearchInfo(extractedInfo);
  } catch (e) {
    console.error('Error fetching advisor data:', e);
    setErrorMessageAdvisor('Error');
  }
}
