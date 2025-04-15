import {useAnalytics} from '@shopify/hydrogen';
import {useEffect} from 'react';

import {useIsDev} from '~/hooks/useIsDev';

export function GoogleTagManager({ gtmId }: { gtmId: string }) {
  const isDev = useIsDev();
  const GTM_ID = gtmId;

  useEffect(() => {
    if (isDev) return;

    addGtmScript(GTM_ID);
  }, [GTM_ID, isDev]);

  return null;
}

let gtmScriptAdded = false;

declare global {
  interface Window {
    [key: string]: object[];
  }
}

function addGtmScript(GTM_ID: string) {
  if (!GTM_ID || gtmScriptAdded) {
    return;
  }

  (function (w: Window, d: Document, s: 'script', l: string, i: string) {
    w[l] = w[l] || [];
    w[l].push({
      event: 'gtm.js',
      'gtm.start': new Date().getTime(),
    });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement<'script'>(s);
    const dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode?.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', GTM_ID);

  gtmScriptAdded = true;
}
