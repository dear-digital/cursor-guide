import type {Form as FormType} from '@remix-run/react';
import type {TypeFromSelection} from 'groqd';

import {Label} from '@radix-ui/react-label';
import React, {useEffect, useRef, useState} from 'react';
import Autocomplete from 'react-google-autocomplete';

import type {ORDER_FORM_SECTION_FRAGMENT} from '~/qroq/content-blocks/orderFormSectionFragment';

import {useSanityThemeContent} from '~/hooks/useSanityThemeContent';
import {useRootLoaderData} from '~/root';

import {Button} from '../ui/Button';
import {Checkbox} from '../ui/Checkbox';
import {Input} from '../ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import OrderFormAdvisorSearch from './OrderFormAdvisorSearch';

// Import the VAT validation handler
import {handleVATSubmit} from '../cart/HandleVATSubmit';

export type OrderFormProps = {Form: typeof FormType} & TypeFromSelection<
  typeof ORDER_FORM_SECTION_FRAGMENT
>;

export function OrderForm(props: OrderFormProps) {
  const {env, locale} = useRootLoaderData();
  const {Form} = props;
  const {themeContent} = useSanityThemeContent();
  const currentPreferredLocale = locale?.preferredLocale || 'en';
  const yyyyMmDd = new Date().toISOString().split('T')[0];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState(locale?.country || '');
  const [advisorResults, setAdvisorResults] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState<any>(null);
  const [hasNoAdvisor, setHasNoAdvisor] = useState(false);
  const [advisorDecisionMade, setAdvisorDecisionMade] = useState(false);

  // VAT functionality integrated in OrderForm
  const [vatNumber, setVatNumber] = useState('');
  const [vatErrorMessage, setVatErrorMessage] = useState<null | string>(null);
  const [vatSuccessMessage, setVatSuccessMessage] = useState<null | string>(null);

  // Reference to the OrderFormAdvisorSearch component
  const advisorSearchRef = useRef<{ clearAdvisor: () => void }>(null);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await fetch('/api/advisors');
        const data: any = await response.json();
        setAdvisorResults(data);
      } catch (error) {
        setErrorMessage('Error fetching advisors');
      }
    };

    fetchAdvisors();
  }, []);

  const alreadyAThermomixOwner = [
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'},
  ];

  // Handle advisor selection
  const handleAdvisorSelect = (advisor: any) => {
    setSelectedAdvisor(advisor);
    
    // If an advisor is selected, set decision made to true and reset no advisor
    if (advisor) {
      setAdvisorDecisionMade(true);
      setHasNoAdvisor(false);
      setErrorMessage(null);
    } else {
      // If advisor is cleared, only consider decision made if "no advisor" is checked
      setAdvisorDecisionMade(hasNoAdvisor);
    }
    
    console.log('Selected advisor:', advisor);
  };

  // Handle checkbox for "no advisor"
  const handleNoAdvisorChange = (checked: boolean) => {
    setHasNoAdvisor(checked);
    
    if (checked) {
      // If "no advisor" is checked, clear selected advisor and set decision made
      setSelectedAdvisor(null);
      setAdvisorDecisionMade(true);
      setErrorMessage(null);
      
      // Reset the advisor search field if it exists
      if (advisorSearchRef.current) {
        advisorSearchRef.current.clearAdvisor();
      }
    } else {
      // If "no advisor" is unchecked, decision is only made if an advisor is selected
      setAdvisorDecisionMade(selectedAdvisor !== null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent submission if VAT is filled but not validated.
    if (vatNumber.trim() !== '' && !vatSuccessMessage) {
      setVatErrorMessage('Please validate the VAT number before submitting.');
      event.preventDefault();
      return;
    }
    
    // Prevent submission if no advisor decision made
    if (!advisorDecisionMade) {
      setErrorMessage('Please select an advisor or indicate that you don\'t have one.');
      event.preventDefault();
      return;
    }
    
    setIsSubmitting(true);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      form_name: 'Pre-Order Launch 14th of February',
      form_type: 'Thermomix Pre-Order',
    });
  };

  // Disable submit if the form is submitting, VAT exists but is not validated, or no advisor decision made
  const disableSubmit = isSubmitting || 
    (vatNumber.trim() !== '' && !vatSuccessMessage) || 
    !advisorDecisionMade;

  // Always use the normal submit button label (or loading label when submitting).
  const submitLabel = isSubmitting
    ? themeContent?.forms?.loadingLabel
    : themeContent?.forms?.submitButtonLabel;

  return (
    <Form
      action={`/${currentPreferredLocale}/api/order-form`}
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4 lg:space-y-6">
        {/* Other form fields */}
        <div className="grid grid-cols-12 gap-4">
          <fieldset className="col-span-12 space-y-2 lg:col-span-6">
            <Label className="text-sm font-medium" htmlFor="first_name">
              {themeContent?.forms?.firstName || 'First Name'}
            </Label>
            <Input
              className="text-contentPrimary"
              id="first_name"
              name="first_name"
              placeholder={themeContent?.forms?.firstNamePlaceholder || 'First Name'}
              required
              type="text"
            />
          </fieldset>
          <fieldset className="col-span-12 space-y-2 lg:col-span-6">
            <Label className="text-sm font-medium" htmlFor="last_name">
              {themeContent?.forms?.lastName || 'Last Name'}
            </Label>
            <Input
              className="text-contentPrimary"
              id="last_name"
              name="last_name"
              placeholder={themeContent?.forms?.lastNamePlaceholder || 'Last Name'}
              required
              type="text"
            />
          </fieldset>
        </div>

        <fieldset className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="email">
            {themeContent?.forms?.emailAddress || 'Email'}
          </Label>
          <Input
            className="text-contentPrimary"
            id="email"
            name="email"
            placeholder={themeContent?.forms?.emailAddressPlaceholder || 'Email'}
            required
            type="email"
          />
        </fieldset>

        <fieldset className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="phone_number">
            {themeContent?.forms?.phoneNumber || 'Phone Number'}
          </Label>
          <Input
            className="text-contentPrimary"
            id="phone_number"
            name="phone_number"
            placeholder={themeContent?.forms?.phoneNumberPlaceholder || 'Phone Number'}
            required
            type="tel"
          />
        </fieldset>

        {/* Address Autocomplete */}
        <fieldset className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="autocomplete">
            {themeContent?.forms?.address || 'Address'}
          </Label>
          <Autocomplete
            apiKey={env.PUBLIC_GOOGLE_MAPS_API_KEY}
            className="flex w-full rounded-[--input-border-corner-radius] border-[rgb(var(--input)_/_var(--input-border-opacity))] border-input bg-background p-3 ring-offset-background [border-width:--input-border-thickness] [box-shadow:rgb(var(--shadow)_/_var(--input-shadow-opacity))_var(--input-shadow-horizontal-offset)_var(--input-shadow-vertical-offset)_var(--input-shadow-blur-radius)_0px] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="autocomplete"
            language={currentPreferredLocale}
            onChange={(e) => {
              const inputValue = (e.target as HTMLInputElement).value;
              setAddress(inputValue);
              setStreet('');
              setCity('');
              setZip('');
              setCountry(locale?.country || '');
            }}
            onPlaceSelected={(place) => {
              if (place && place.address_components) {
                let streetNumber = '';
                let route = '';
                let countryFromPlace = '';
                let cityName = '';
                let postalCode = '';
                place.address_components.forEach((component: any) => {
                  if (component.types.includes('street_number')) {
                    streetNumber = component.long_name;
                  }
                  if (component.types.includes('route')) {
                    route = component.long_name;
                  }
                  if (component.types.includes('locality')) {
                    cityName = component.long_name;
                  }
                  if (component.types.includes('postal_code')) {
                    postalCode = component.long_name;
                  }
                  if (component.types.includes('country')) {
                    countryFromPlace = component.long_name;
                  }
                });
                const fullAddress =
                  place.formatted_address ||
                  `${streetNumber} ${route}, ${cityName}, ${postalCode}`;
                setAddress(fullAddress);
                setStreet(`${streetNumber} ${route}`.trim());
                setCity(cityName);
                setZip(postalCode);
                setCountry(countryFromPlace as typeof country);
              }
            }}
            options={{
              componentRestrictions: {country: ['be', 'nl', 'lu']},
              types: ['address'],
            }}
            required
            style={{width: '100%'}}
          />
          {/* New translation label for address info */}
          <p className="text-xs text-muted-foreground">
            {themeContent?.forms?.formAddressInfo || 'The address is used for shipping and finding an advisor near you.'}
          </p>
        </fieldset>

        {/* Hidden fields for address parts */}
        <input name="address" type="hidden" value={address} />
        <input name="street" type="hidden" value={street} />
        <input name="country" type="hidden" value={country} />
        <input name="city" type="hidden" value={city} />
        <input name="zip" type="hidden" value={zip} />

        <fieldset className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="thermomix">
            {themeContent?.forms?.thermomix || 'Are you already a Thermomix owner?'}
          </Label>
          <Select name="thermomix" required>
            <SelectTrigger>
              <SelectValue
                placeholder={themeContent?.forms?.thermomixPlaceholder || 'Select value'}
              />
            </SelectTrigger>
            <SelectContent>
              {alreadyAThermomixOwner.map((thermomixAnswer) => (
                <SelectItem
                  className="text-contentPrimary"
                  key={thermomixAnswer.value}
                  value={thermomixAnswer.value}
                >
                  <div className="text-contentPrimary">
                    {thermomixAnswer.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </fieldset>

        {/* Advisor Search */}
        <fieldset className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="advisor_search">
            Find Your Advisor
          </Label>
          <OrderFormAdvisorSearch
            advisors={advisorResults}
            disabled={hasNoAdvisor}
            onAdvisorSelect={handleAdvisorSelect}
            ref={advisorSearchRef}
          />
          <div className="mt-2 flex items-center gap-2">
            <Checkbox
              checked={hasNoAdvisor}
              className="h-6 w-6"
              id="no_advisor"
              name="no_advisor"
              onCheckedChange={(checked) => handleNoAdvisorChange(checked === true)}
            />
            <span 
              className="cursor-pointer text-sm" 
              onClick={() => {
                const newValue = !hasNoAdvisor;
                handleNoAdvisorChange(newValue);
              }}
            >
              {themeContent?.cart?.NoAdvisorText || "I don't have an advisor"}
            </span>
          </div>
          {errorMessage && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}
          {!advisorDecisionMade && (
            <p className="mt-2 text-sm text-red-500">
              {themeContent?.forms?.advisorRequired || 'Please select an advisor or indicate that you don\'t have one.'}
            </p>
          )}
        </fieldset>

        <fieldset className="space-y-2">
          {/* Integrated VAT functionality */}
          <Label className="text-sm font-medium" htmlFor="vat_number">
            {themeContent?.cart?.VATInputLabel || 'VAT Number'}
          </Label>
          <div className="flex items-center gap-3">
            <Input
              id="vat_number"
              name="vat_number"
              onChange={(e) => {
                setVatNumber(e.target.value);
                setVatErrorMessage(null);
                setVatSuccessMessage(null);
              }}
              placeholder={themeContent?.cart?.VATInputLabel || 'VAT Number'}
              type="text"
              value={vatNumber}
            />
            <Button
              className="h-full w-auto py-3"
              onClick={(e) =>
                handleVATSubmit(
                  e,
                  vatNumber,
                  locale,
                  themeContent,
                  setVatErrorMessage,
                  setVatSuccessMessage,
                )
              }
              size="large"
              type="button"
            >
              {themeContent?.cart?.VATNumberValidation}
            </Button>
          </div>
          {vatErrorMessage && (
            <p className="mt-2 text-sm text-red-500">{vatErrorMessage}</p>
          )}
          {vatSuccessMessage && (
            <p className="text-green-500 mt-2 text-sm">{vatSuccessMessage}</p>
          )}
          {vatNumber.trim() !== '' && !vatSuccessMessage && !vatErrorMessage && (
            <p className="mt-2 text-sm text-red-500">
              {themeContent?.forms?.vatValidateSubmit}
            </p>
          )}
        </fieldset>

        {/* Hidden Date Field */}
        <input defaultValue={yyyyMmDd} hidden name="date" type="text" />

        <div className="flex justify-center">
          <Button
            aria-disabled={disableSubmit}
            className="px-8 py-3"
            disabled={disableSubmit}
            type="submit"
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </Form>
  );
}
