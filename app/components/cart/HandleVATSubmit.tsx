export async function handleVATSubmit(
  e: React.FormEvent,
  vatNumber: string,
  locale: {country: string},
  themeContent: any,
  setErrorMessage: React.Dispatch<React.SetStateAction<null | string>>,
  setSuccessMessage: React.Dispatch<React.SetStateAction<null | string>>,
): Promise<void> {
  e.preventDefault();
  setErrorMessage(null);
  setSuccessMessage(null);
  
  try {
    // Get the current locale from the URL for proper routing
    const currentLocale = window.location.pathname.split('/')[1] || '';
    const endpoint = currentLocale ? `/${currentLocale}/api/vat-sufio` : '/api/vat-sufio';
    
    const response = await fetch(endpoint, {
      body: JSON.stringify({
        country: locale.country,
        vatErrorMessage: themeContent?.cart?.VATNumberValidationError,
        vatFormatErrorMessage:
          themeContent?.cart?.VATNumberValidationFormatError,
        vatNumber,
        vatRegionErrorMessage: themeContent?.cart?.VATNumberRegionError,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const data = (await response.json()) as {message?: string};
    if (response.ok) {
      setSuccessMessage(themeContent?.cart?.VATNumberValidationSuccess ?? null);
    } else {
      setErrorMessage(
        data.message || 'VAT validation failed. Please try again.',
      );
    }
  } catch (error) {
    console.error('VAT Validation Failed:', error);
    setErrorMessage(
      'Something went wrong. Please check your VAT number and try again.',
    );
  }
}
