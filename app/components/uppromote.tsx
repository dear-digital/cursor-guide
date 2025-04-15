import { useEffect } from 'react';

import { useIsDev } from '~/hooks/useIsDev';

export function UppromoteAffiliates() {
  const isDev = useIsDev();

  useEffect(() => {
    if (!isDev) return;
    window.addEventListener('uppromote:tracked-affiliate', function (event) {
      console.log('uppromote:tracked-affiliate', event.target);
    });
  }, [isDev]);

  return null;
}
