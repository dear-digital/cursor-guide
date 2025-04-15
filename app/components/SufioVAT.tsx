import {useEffect} from 'react';

declare global {
  interface Window {
    __CART_ATTRIBUTES__?: any;
    __CUSTOMER_EMAIL__?: string;
    __CUSTOMER_METAFIELDS__?: any;
    SufioVAT?: {
      init: (config: {
        cartAttributes: any;
        customerEmail: string;
        customerMetafields: any;
      }) => void;
      onCart: (config?: {selectors: string}) => void;
    };
  }
}

export function SufioVAT() {
  useEffect(() => {
    if (document.getElementById('sufio-vat-script')) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.sufio.com/infoweb/scripts/vat.js';
    script.id = 'sufio-vat-script';
    script.async = true;

    script.onload = () => {
      if (window.SufioVAT) {
        window.SufioVAT.init({
          cartAttributes: window.__CART_ATTRIBUTES__ || {},
          customerEmail: window.__CUSTOMER_EMAIL__ || '',
          customerMetafields: window.__CUSTOMER_METAFIELDS__ || {},
        });

        // Call onCart to initialize the VAT form
        window.SufioVAT.onCart({selectors: '#cart-page-vat-form'});
      }
    };

    document.body.appendChild(script);
  }, []);
}

export const submitVATValidation = async () => {
  const currentLocale = window.location.pathname.split('/')[1] || '';

  try {
    const response = await fetch(`/${currentLocale}/api/vat-sufio`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('VAT Validation Success:', data);
    } else {
      console.error('VAT Validation Failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error in VAT validation:', error);
  }
};
