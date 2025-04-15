import {Button as ButtonComponent} from '@vorwerk/fibre-react';
import {useEffect, useState} from 'react';

import {Input} from '../ui/Input';
import {handleVATSubmit} from './HandleVATSubmit';

export function VATForm({
  locale,
  onVATValidation,
  themeContent,
}: {
  locale: {country: string};
  onVATValidation?: (isValid: boolean, hasVAT: boolean) => void;
  themeContent: any;
}) {
  const [vatNumber, setVatNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);

  // Notify parent component about VAT validation state whenever it changes
  useEffect(() => {
    if (onVATValidation) {
      // If VAT is empty, it's considered valid (not required)
      // If VAT has a value, it's only valid when successMessage exists
      const isValid = vatNumber.trim() === '' || successMessage !== null;
      const hasVAT = vatNumber.trim() !== '';
      onVATValidation(isValid, hasVAT);
    }
  }, [vatNumber, successMessage, errorMessage, onVATValidation]);

  return (
    <form
      className="w-full pt-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleVATSubmit(
          e,
          vatNumber,
          locale,
          themeContent,
          setErrorMessage,
          setSuccessMessage,
        );
      }}
    >
      <div className="flex items-center gap-3">
        <Input
          onChange={(e) => {
            setVatNumber(e.target.value);
            setErrorMessage(null); // Clear errors on new input
            setSuccessMessage(null); // Clear success on new input
          }}
          placeholder={themeContent?.cart?.VATInputLabel ?? 'VAT Number'}
          type="text"
          value={vatNumber}
        />
        <ButtonComponent buttonStyle="primary" className="w-full" size="large">
          {themeContent?.cart?.VATNumberValidation}
        </ButtonComponent>
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-500 mt-2 text-sm">{successMessage}</p>
      )}
    </form>
  );
}
