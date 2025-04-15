import { useEffect } from 'react';

type Props = {
  locale: string;
  merchantId: string;
  price: number;
};

// Declare Alma in the global scope
declare global {
  interface Window {
    Alma: any;
  }
}

export default function AlmaPayment({locale, merchantId, price}: Props) {
  const priceInCents = Math.round(price * 100); // Convert price to cents

  useEffect(() => {
    // Load Alma widget script dynamically
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.umd.js';
    script.async = true;

    // Load Alma widget CSS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.min.css';

    document.body.appendChild(script);
    document.head.appendChild(link);

    script.onload = () => {
      if (window.Alma?.Widgets) {
        try {
          // Initialize Alma Widgets
          const alma = window.Alma.Widgets.initialize(merchantId, window.Alma.ApiMode.TEST);

          // Add payment plans widget
          alma.add(window.Alma.Widgets.PaymentPlans, {
            container: '#alma-widget-container', // Attach widget to this container
            locale,
            plans: [
              {
                deferredDays: 0,
                installmentsCount: 1,
                maxAmount: 250000,
                minAmount: 50,
              },
              {
                deferredDays: 0,
                installmentsCount: 2,
                maxAmount: 250000,
                minAmount: 5000,
              },
              {
                deferredDays: 0,
                installmentsCount: 3,
                maxAmount: 250000,
                minAmount: 5000,
              },
            ],
            purchaseAmount: priceInCents, // Amount in cents
          });
        } catch (error) {
          console.error('Error initializing Alma Widgets:', error);
        }
      } else {
        console.error('Alma Widgets not available or improperly loaded.');
      }
    };

    script.onerror = () => {
      console.error('Failed to load Alma Widgets script.');
    };

    return () => {
      // Cleanup dynamically added script and link
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, [locale, merchantId, priceInCents]);

  return <div id="alma-widget-container"></div>;
}
