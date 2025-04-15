import {CheckmarkCircle} from '@vorwerk/fibre-react';

export type Advisor = {
  advisorId: number;
  id: string;
  name: string;
};


export async function handleCartAttributeUpdate(
  e: React.FormEvent,
  selectedAdvisor: Advisor | null,
  setErrorMessageAdvisor: React.Dispatch<React.SetStateAction<null | string>>,
  setSuccessMessageAdvisor: React.Dispatch<
    React.SetStateAction<React.ReactNode>
  >,
  setSelectedAdvisor: React.Dispatch<React.SetStateAction<Advisor | null>>,
  removeAdvisor: boolean,
  themeContent: any,
  onAdvisorUpdated?: (success: boolean) => void
): Promise<any> {
  e.preventDefault();

  try {
    const attributesToUpdate = removeAdvisor
      ? [
          {key: 'advisor_id', value: ''},
          {key: 'advisor', value: ''},
        ]
      : [
          {key: 'advisor_id', value: selectedAdvisor?.advisorId},
          {key: 'advisor', value: selectedAdvisor?.name},
        ];

    const currentLocale = window.location.pathname.split('/')[1] || '';
    const response = await fetch(`/${currentLocale}/api/update-cart-attributes`, {
      body: JSON.stringify({
        cartAttributesWhichNeedsToUpdate: attributesToUpdate,
        selectedAdvisor: selectedAdvisor ? [selectedAdvisor] : [],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const data = (await response.json()) as {message?: string};

    if (response.ok && selectedAdvisor) {
      if (!removeAdvisor) {
        setSuccessMessageAdvisor(
          <>
            {themeContent?.cart?.AdvisorSuccessMessage ||
              'Advisor updated successfully'}
            <CheckmarkCircle className="h-5 w-5" />
          </>,
        );
        if (onAdvisorUpdated) {
          onAdvisorUpdated(true);
        }
      }
    } else {
      setErrorMessageAdvisor(
        themeContent?.cart?.AdvisorErrorMessage ||
          'Advisor not found. Please try again.',
      );
      setSelectedAdvisor(null);
      if (onAdvisorUpdated) {
        onAdvisorUpdated(false);
      }
    }
  } catch (error) {
    console.error('Cart attribute update failed:', error);
  }
}
