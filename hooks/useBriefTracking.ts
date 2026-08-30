import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Open tracking for referral briefs.
 *
 * Three events per visit:
 *   open  — 2s after the tab is actually visible
 *   read  — 25s in, still visible
 *   exit  — on pagehide, carrying dwell seconds and max scroll depth
 *
 * The 2s delay plus the visibility check is the whole anti-false-positive design.
 * WhatsApp, Instagram and iMessage link-preview fetchers pull the HTML for og: tags
 * but never run JS, so they cannot manufacture an open. Corporate mail scanners that
 * do run JS render hidden and get filtered by the visibility check.
 *
 * Writes to the `brief_views` table. Fails silently by design: a broken beacon must
 * never take the page down in front of a partner.
 */
export function useBriefTracking(slug: string, recipient: string) {
  const startedAt = useRef(Date.now());
  const maxScroll = useRef(0);
  const sent = useRef<Record<string, boolean>>({});

  useEffect(() => {
    startedAt.current = Date.now();
    maxScroll.current = 0;
    sent.current = {};

    const scrollPct = () => {
      const el = document.documentElement;
      const denom = el.scrollHeight - el.clientHeight;
      if (denom <= 0) return 100;
      return Math.min(100, Math.round((el.scrollTop / denom) * 100));
    };

    const onScroll = () => {
      maxScroll.current = Math.max(maxScroll.current, scrollPct());
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const send = (event: 'open' | 'read' | 'exit') => {
      if (sent.current[event]) return;
      sent.current[event] = true;
      void supabase
        .from('brief_views')
        .insert({
          slug,
          recipient,
          event,
          seconds: Math.round((Date.now() - startedAt.current) / 1000),
          scroll_pct: Math.max(maxScroll.current, scrollPct()),
          referrer: document.referrer ? document.referrer.slice(0, 500) : null,
          user_agent: navigator.userAgent.slice(0, 500),
        })
        .then(undefined, () => {});
    };

    let openTimer: number | undefined;
    let readTimer: number | undefined;

    const arm = () => {
      openTimer = window.setTimeout(() => send('open'), 2000);
      readTimer = window.setTimeout(() => {
        if (!document.hidden) send('read');
      }, 25000);
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        document.removeEventListener('visibilitychange', onVisible);
        arm();
      }
    };

    if (document.visibilityState === 'visible') arm();
    else document.addEventListener('visibilitychange', onVisible);

    const onHide = () => send('exit');
    window.addEventListener('pagehide', onHide);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', onHide);
      document.removeEventListener('visibilitychange', onVisible);
      if (openTimer) window.clearTimeout(openTimer);
      if (readTimer) window.clearTimeout(readTimer);
    };
  }, [slug, recipient]);
}
