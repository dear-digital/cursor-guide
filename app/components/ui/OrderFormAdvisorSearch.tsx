import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { useSanityThemeContent } from '~/hooks/useSanityThemeContent';
import { cn } from '~/lib/utils';

export interface AdvisorItem {
  advisorId: number;
  id: string;
  name: string;
}

interface OrderFormAdvisorSearchProps {
  advisors?: { data: AdvisorItem[] } | AdvisorItem[] | null;
  disabled?: boolean;
  onAdvisorSelect?: (advisor: AdvisorItem | null) => void;
}

const OrderFormAdvisorSearch = forwardRef<
  { clearAdvisor: () => void },
  OrderFormAdvisorSearchProps
>(function OrderFormAdvisorSearch(
  { advisors, disabled = false, onAdvisorSelect },
  ref
) {
  const [query, setQuery] = useState('');
  const [selectedAdvisor, setSelectedAdvisor] = useState<AdvisorItem | null>(null);
  
  const { themeContent } = useSanityThemeContent();

  // Expose clearAdvisor method to parent components
  useImperativeHandle(ref, () => ({
    clearAdvisor: () => {
      setSelectedAdvisor(null);
      setQuery('');
    }
  }));

  const advisorArray: AdvisorItem[] = Array.isArray(advisors)
    ? advisors
    : advisors?.data || [];

  if (!advisors) {
    return <div>Loading advisors...</div>;
  }

  const filteredAdvisors = advisorArray
    .filter((advisor) =>
      advisor.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 8); // Limit to 8 results

  function handleAdvisorSelect(advisor: AdvisorItem) {
    // Update the selected advisor state
    setSelectedAdvisor(advisor);
    
    // Call the onAdvisorSelect callback if provided
    if (onAdvisorSelect) {
      onAdvisorSelect(advisor);
    }
  }

  // Handle clearing the input - treat as "no advisor"
  function handleClearAdvisor() {
    setSelectedAdvisor(null);
    setQuery('');
    
    if (onAdvisorSelect) {
      onAdvisorSelect(null);
    }
  }

  return (
    <div className="relative">
      <Combobox disabled={disabled} onChange={handleAdvisorSelect} value={selectedAdvisor}>
        <div className="relative">
          <ComboboxInput
            className={cn(
              'flex w-full border border-input bg-background p-3 ring-offset-background',
              'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'rounded-[--input-border-corner-radius]',
              'border-[rgb(var(--input)_/_var(--input-border-opacity))] [border-width:--input-border-thickness]',
              '[box-shadow:rgb(var(--shadow)_/_var(--input-shadow-opacity))_var(--input-shadow-horizontal-offset)_var(--input-shadow-vertical-offset)_var(--input-shadow-blur-radius)_0px]',
              disabled && 'bg-gray-100 text-gray-500 cursor-not-allowed'
            )}
            disabled={disabled}
            displayValue={(advisorItem: AdvisorItem | null) =>
              advisorItem?.name || ''
            }
            onChange={(e) => {
              setQuery(e.target.value);
              // If the user clears the input completely, treat as "no advisor"
              if (!e.target.value) {
                handleClearAdvisor();
              }
            }}
            placeholder={themeContent?.forms?.advisorPlaceholder || 'Search for an advisor (optional)'}
          />
          {!disabled && query.length >= 3 && filteredAdvisors.length > 0 && (
            <ComboboxOptions
              className={cn(
                'absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-background py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                'mt-1'
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
      
      {/* Note about advisor selection being optional */}
      <p className="mt-1 text-xs text-muted-foreground">
        {themeContent?.forms?.advisorRequired || 'Leave empty if you don\'t have an advisor'}
      </p>
    </div>
  );
});

export default OrderFormAdvisorSearch;
