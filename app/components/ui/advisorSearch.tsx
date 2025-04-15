import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useEffect, useState } from 'react';

import { useSanityThemeContent } from '~/hooks/useSanityThemeContent';
import { cn } from '~/lib/utils';

import { handleCartAttributeUpdate } from '../cart/HandleCartAttributeUpdate';
import { Checkbox } from '../ui/Checkbox';

export interface AdvisorItem {
  advisorId: number;
  id: string;
  name: string;
}

interface AdvisorSearchProps {
  advisors?: { data: AdvisorItem[] } | AdvisorItem[] | null;
  dropdownOnTop?: boolean;
  onAdvisorSelect?: (advisor: AdvisorItem | null) => void;
  onAdvisorUpdated?: (success: boolean) => void;
  onNoAdvisorChecked?: (checked: boolean) => void;
  options?: boolean;
}

export default function AdvisorSearch({
  advisors,
  dropdownOnTop = false,
  onAdvisorSelect,
  onAdvisorUpdated,
  onNoAdvisorChecked,
  options = false,
}: AdvisorSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedAdvisor, setSelectedAdvisor] = useState<AdvisorItem | null>(null);
  const [errorMessageAdvisor, setErrorMessageAdvisor] = useState<null | string>(null);
  const [successMessageAdvisor, setSuccessMessageAdvisor] = useState<React.ReactNode>(null);
  const [removeAdvisor, setRemoveAdvisor] = useState(false);
  const [isRemovingAdvisor, setIsRemovingAdvisor] = useState(false);

  const advisorArray: AdvisorItem[] = Array.isArray(advisors)
    ? advisors
    : advisors?.data || [];

  const { themeContent } = useSanityThemeContent();

  if (!advisors) {
    return <div>Loading advisors...</div>;
  }

  const filteredAdvisors = advisorArray
    .filter((advisor) =>
      advisor.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 8); // Limit to 8 results

  function handleAdvisorSelect(advisor: AdvisorItem) {
    // When an advisor is selected, uncheck the "no advisor" box
    if (advisor) {
      setRemoveAdvisor(false);
    }
    
    // When options is true, execute additional logic.
    if (options) {
      handleCartAttributeUpdate(
        { preventDefault: () => {} } as React.FormEvent,
        advisor,
        setErrorMessageAdvisor,
        setSuccessMessageAdvisor,
        setSelectedAdvisor,
        removeAdvisor,
        themeContent,
        onAdvisorUpdated
      );
    }
    // In both cases, update the selected advisor.
    setSelectedAdvisor(advisor);
    
    // Call the onAdvisorSelect callback if provided
    if (onAdvisorSelect) {
      onAdvisorSelect(advisor);
    }
  }

  // Function to remove advisor using the dedicated endpoint
  async function removeAdvisorFromCart() {
    setIsRemovingAdvisor(true);
    try {
      const currentLocale = window.location.pathname.split('/')[1] || '';
      const response = await fetch(`/${currentLocale}/api/remove-advisor`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json() as { message: string; success: boolean };
        if (data.success) {
          setSuccessMessageAdvisor(
            <>
              {'Advisor removed successfully'}
            </>
          );
          if (onAdvisorUpdated) {
            onAdvisorUpdated(true);
          }
        } else {
          console.warn('Response was successful but data indicates failure:', data);
          if (onAdvisorUpdated) {
            onAdvisorUpdated(false);
          }
        }
      } else {
        console.error('Failed to remove advisor, status:', response.status);
        setErrorMessageAdvisor(
          themeContent?.cart?.AdvisorErrorMessage || 'Failed to remove advisor'
        );
        if (onAdvisorUpdated) {
          onAdvisorUpdated(false);
        }
      }
    } catch (error) {
      console.error('Error removing advisor:', error);
      setErrorMessageAdvisor(
        themeContent?.cart?.AdvisorErrorMessage || 'Error removing advisor'
      );
      if (onAdvisorUpdated) {
        onAdvisorUpdated(false);
      }
    } finally {
      setIsRemovingAdvisor(false);
    }
  }

  const handleRemoveAdvisorChange = (checked: boolean) => {
    // Always update the removeAdvisor state
    setRemoveAdvisor(checked);
    
    if (checked) {
      // If "no advisor" is checked, clear the selected advisor in UI but keep the field enabled
      setSelectedAdvisor(null);
      setQuery('');
      
      // Always use the dedicated endpoint to remove advisor when "I don't have an advisor" is checked
      if (options) {
        removeAdvisorFromCart();
      }
    }
    
    // Call the onNoAdvisorChecked callback if provided
    if (onNoAdvisorChecked) {
      onNoAdvisorChecked(checked);
    }
  };

  return (
    <div className="relative">
      <Combobox onChange={handleAdvisorSelect} value={selectedAdvisor}>
        <div className="relative">
          <ComboboxInput
            className={cn(
              'flex w-full border border-input bg-background p-3 ring-offset-background',
              'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'rounded-[--input-border-corner-radius]',
              'border-[rgb(var(--input)_/_var(--input-border-opacity))] [border-width:--input-border-thickness]',
              '[box-shadow:rgb(var(--shadow)_/_var(--input-shadow-opacity))_var(--input-shadow-horizontal-offset)_var(--input-shadow-vertical-offset)_var(--input-shadow-blur-radius)_0px]',
              // Add a visual indication when "no advisor" is selected
              removeAdvisor && !isRemovingAdvisor && 'bg-gray-100 text-gray-500'
            )}
            disabled={isRemovingAdvisor} // Only disable when actively removing an advisor
            displayValue={(advisorItem: AdvisorItem | null) =>
              advisorItem?.name || ''
            }
            onChange={(e) => {
              setQuery(e.target.value);
              // If user starts typing, uncheck the "no advisor" box
              if (e.target.value && removeAdvisor) {
                setRemoveAdvisor(false);
                if (onNoAdvisorChecked) {
                  onNoAdvisorChecked(false);
                }
              }
            }}
            placeholder={
              removeAdvisor 
                ? 'No advisor selected'
                : themeContent?.forms?.advisorPlaceholder || 'Search for an advisor'
            }
          />
          {query.length >= 3 && filteredAdvisors.length > 0 && !isRemovingAdvisor && (
            <ComboboxOptions
              className={cn(
                'absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-background py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                dropdownOnTop ? 'bottom-full mb-1' : 'mt-1'
              )}
            >
              {filteredAdvisors.map((advisor) => (
                <ComboboxOption
                  className={({ active }) =>
                    cn(
                      'cursor-default select-none py-2 px-3',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    )
                  }
                  key={advisor.id}
                  value={advisor}
                >
                  {advisor.name}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
      
      <input name="advisor_id" type="hidden" value={selectedAdvisor?.id || ''} />

      {options && (
        <>
          <div className="mt-2 flex items-center gap-2">
            <Checkbox
              aria-label="Remove advisor"
              checked={removeAdvisor}
              className="h-6 w-6"
              disabled={isRemovingAdvisor}
              onCheckedChange={(checked) => {
                handleRemoveAdvisorChange(checked === true);
              }}
            />
            <span 
              className="cursor-pointer" 
              onClick={() => {
                if (!isRemovingAdvisor) {
                  handleRemoveAdvisorChange(!removeAdvisor);
                }
              }}
            >
              {themeContent?.cart?.NoAdvisorText || 'I do not have an advisor'}
            </span>
            {isRemovingAdvisor && <span className="ml-2 text-sm text-gray-500">Removing...</span>}
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
      )}
    </div>
  );
}