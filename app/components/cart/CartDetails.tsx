import type {Cart as CartType} from '@shopify/hydrogen/storefront-api-types';
import type {Variants} from 'framer-motion';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

import {CartForm} from '@shopify/hydrogen';
import {AnimatePresence} from 'framer-motion';
import {useEffect, useState} from 'react';

import {useCartFetchers} from '~/hooks/useCartFetchers';
import {useSanityThemeContent} from '~/hooks/useSanityThemeContent';
import {hasRequiresAdvisorMetafield} from '~/lib/utilities/checkRequiresAdvisorMetafield';
import {cn} from '~/lib/utils';
import {useRootLoaderData} from '~/root';

import type {CartLayouts} from './Cart';

import {IconLoader} from '../icons/IconLoader';
import {ProgressiveMotionDiv} from '../ProgressiveMotionDiv';
import AdvisorSearch from '../ui/advisorSearch';
import {Button} from '../ui/Button';
import {Label} from '../ui/Label';
import {CartDetailsLayout} from './CartDetailsLayout';
import {CartLines} from './CartLines';
import {CartSummary} from './CartSummary';
import {VATForm} from './VATForm';

export function CartDetails({
  attributes,
  checkoutUrl,
  cost,
  discountCodes,
  layout,
  lines,
  onClose,
  totalQuantity,
}: {
  attributes?: CartType['attributes'];
  checkoutUrl?: string;
  cost?: CartApiQueryFragment['cost'];
  discountCodes: CartType['discountCodes'];
  layout: CartLayouts;
  lines?: CartApiQueryFragment['lines'];
  onClose?: () => void;
  totalQuantity?: number;
}) {
  // @todo: get optimistic cart cost
  const cartHasItems = totalQuantity && totalQuantity > 0;

  const drawerMotionVariants: Variants = {
    hide: {
      height: 0,
    },
    show: {
      height: 'auto',
    },
  };

  const pageMotionVariants: Variants = {
    hide: {
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
    show: {
      opacity: 1,
    },
  };

  return (
    <CartDetailsLayout layout={layout}>
      <CartLines layout={layout} lines={lines} onClose={onClose} />
      <div>
        <AnimatePresence>
          {cartHasItems && (
            <ProgressiveMotionDiv
              animate="show"
              className={cn([
                layout === 'page' &&
                  'lg:sticky lg:top-[var(--desktopHeaderHeight)]',
              ])}
              exit="hide"
              forceMotion={layout === 'drawer'}
              initial="show"
              variants={
                layout === 'drawer' ? drawerMotionVariants : pageMotionVariants
              }
            >
              <CartSummary cost={cost} layout={layout}>
                <CartCheckoutActions
                  attributes={attributes}
                  checkoutUrl={checkoutUrl}
                  lines={lines}
                />
              </CartSummary>
            </ProgressiveMotionDiv>
          )}
        </AnimatePresence>
      </div>
    </CartDetailsLayout>
  );
}

function CartCheckoutActions({
  attributes,
  checkoutUrl,
  lines,
}: {
  attributes?: CartType['attributes'];
  checkoutUrl?: string;
  lines?: CartApiQueryFragment['lines'];
}) {
  const {themeContent} = useSanityThemeContent();
  const {locale} = useRootLoaderData();
  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);
  const cartIsLoading = Boolean(addToCartFetchers.length);

  const [advisorResults, setAdvisorResults] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isVATValid, setIsVATValid] = useState<boolean>(true);
  const [hasVAT, setHasVAT] = useState<boolean>(false);
  const [hasSelectedAdvisor, setHasSelectedAdvisor] = useState<boolean>(false);
  const [hasNoAdvisor, setHasNoAdvisor] = useState<boolean>(false);
  const [advisorDecisionMade, setAdvisorDecisionMade] = useState<boolean>(false);

  const currentLocale = window.location.pathname.split('/')[1] || '';

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await fetch(`/${currentLocale}/api/advisors`);
        const data: any = await response.json();
        setAdvisorResults(data);
      } catch (error) {
        setErrorMessage('Error fetching advisors');
      }
    };

    fetchAdvisors();
  }, []);

  const advisorAlreadyExists = attributes?.find(
    (attr) => attr.key === 'advisor' && attr.value && attr.value !== '',
  );

  // Initialize states if we already have an advisor in cart attributes
  useEffect(() => {
    if (advisorAlreadyExists) {
      setHasSelectedAdvisor(true);
      setAdvisorDecisionMade(true);
    }
  }, [advisorAlreadyExists]);

  const [advisorSuccessfullyUpdated, setAdvisorSuccessfullyUpdated] = useState<boolean>(
    advisorAlreadyExists ? true : false
  );

  const hasRequiresAdvisor = hasRequiresAdvisorMetafield(lines);

  const handleVATValidation = (isValid: boolean, hasVATNumber: boolean) => {
    setIsVATValid(isValid);
    setHasVAT(hasVATNumber);
  };
  
  const isAdvisorValid = () => {
    if (!hasRequiresAdvisor) return true;
    if (advisorAlreadyExists) return true;
    
    // Only valid if the user has made a decision (selected advisor OR checked "no advisor")
    return advisorDecisionMade && (hasSelectedAdvisor || hasNoAdvisor);
  };

  const handleAdvisorSelection = (advisor: any) => {
    const hasAdvisor = advisor !== null;
    setHasSelectedAdvisor(hasAdvisor);
    setAdvisorDecisionMade(hasAdvisor); // If we have an advisor, decision is made
    
    if (hasAdvisor) {
      setHasNoAdvisor(false);
    }
  };

  const handleNoAdvisorChecked = (checked: boolean) => {
    setHasNoAdvisor(checked);
    
    if (checked) {
      // When "no advisor" is checked:
      // 1. No advisor is selected
      setHasSelectedAdvisor(false);
      // 2. A decision has been made
      setAdvisorDecisionMade(true);
    } else {
      // When "no advisor" is unchecked:
      // 1. Decision is only made if we have a selected advisor
      setAdvisorDecisionMade(hasSelectedAdvisor);
      // 2. No need to update hasSelectedAdvisor as it should already be correct
    }
  };

  // Track when advisor is successfully updated
  const handleAdvisorSuccessfullyUpdated = (success: boolean) => {
    setAdvisorSuccessfullyUpdated(success);
  };

  // Log the current state for debugging
  useEffect(() => {
    console.debug({
      advisorAlreadyExists: !!advisorAlreadyExists,
      advisorDecisionMade,
      hasNoAdvisor,
      hasRequiresAdvisor,
      hasSelectedAdvisor,
      isAdvisorValid: isAdvisorValid()
    });
  }, [hasRequiresAdvisor, advisorAlreadyExists, hasSelectedAdvisor, hasNoAdvisor, advisorDecisionMade]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        asChild
        className="mt-2"
        disabled={
          cartIsLoading ||
          !checkoutUrl ||
          !isVATValid || 
          (hasRequiresAdvisor && (!isAdvisorValid() || !advisorSuccessfullyUpdated))
        }
      >
        <a
          className={cn(
            (cartIsLoading || !checkoutUrl || !isVATValid || (hasRequiresAdvisor && (!isAdvisorValid() || !advisorSuccessfullyUpdated))) &&
              'pointer-events-none cursor-pointer opacity-50',
          )}
          href={checkoutUrl}
          target="_self"
        >
          {cartIsLoading ? (
            <IconLoader className="m-3 size-10 animate-spin" />
          ) : (
            <span className="p-3 text-lg">
              {themeContent?.cart?.proceedToCheckout}
            </span>
          )}
        </a>
      </Button>
      <div className="w-full">
        <div className="mb-4">
          <VATForm
            locale={locale}
            onVATValidation={handleVATValidation}
            themeContent={themeContent}
          />
          {hasVAT && !isVATValid && (
            <p className="mt-2 text-sm text-red-500">
              {themeContent?.forms?.vatValidateSubmit || 'Please validate the VAT number before proceeding to checkout.'}
            </p>
          )}
        </div>
        {hasRequiresAdvisor && (
          <fieldset className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="advisor_id">
              {themeContent?.forms?.advisor || 'Advisor'}
            </Label>
            <AdvisorSearch
              advisors={advisorResults}
              dropdownOnTop={true}
              onAdvisorSelect={handleAdvisorSelection}
              onAdvisorUpdated={handleAdvisorSuccessfullyUpdated}
              onNoAdvisorChecked={handleNoAdvisorChecked}
              options={true}
            />
            {!isAdvisorValid() && (
              <p className="mt-2 text-sm text-red-500">
                {themeContent?.forms?.advisorRequired || 'Please select an advisor or indicate that you don\'t have one.'}
              </p>
            )}
          </fieldset>
        )}
      </div>
    </div>
  );
}