import { useEffect, useState } from 'react';

export interface AttributionData {
  promo_code_source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
}

export function useAttribution() {
  const [attribution, setAttribution] = useState<AttributionData>({
    promo_code_source: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    referrer: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // 1. Get from URL or Fallback to SessionStorage
    const data: AttributionData = {
      promo_code_source: params.get('ref')?.toUpperCase() || sessionStorage.getItem('ref_code'),
      utm_source:        params.get('utm_source')         || sessionStorage.getItem('utm_source'),
      utm_medium:        params.get('utm_medium')         || sessionStorage.getItem('utm_medium'),
      utm_campaign:      params.get('utm_campaign')       || sessionStorage.getItem('utm_campaign'),
      referrer:          document.referrer                || sessionStorage.getItem('initial_referrer'),
    };

    // 2. Persist for the session
    if (data.promo_code_source) sessionStorage.setItem('ref_code', data.promo_code_source);
    if (data.utm_source)        sessionStorage.setItem('utm_source', data.utm_source);
    if (data.utm_medium)        sessionStorage.setItem('utm_medium', data.utm_medium);
    if (data.utm_campaign)      sessionStorage.setItem('utm_campaign', data.utm_campaign);
    if (data.referrer)          sessionStorage.setItem('initial_referrer', data.referrer);

    setAttribution(data);
  }, []);

  return attribution;
}
