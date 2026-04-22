// Lightweight client-side tracking. POSTs visitor + event metadata to the
// BioLinkStore backend's existing /public/landing/track endpoint. Metadata.source
// discriminates this traffic from BioLinkStore's own landing in the shared table.

const API_BASE     = 'https://national-eartha-antoniov-a74e8133.koyeb.app/api';
const ENDPOINT     = `${API_BASE}/public/landing/track`;
const FP_STORAGE   = 'visitor_fp';

function getFingerprint(): string {
  try {
    let fp = localStorage.getItem(FP_STORAGE);
    if (!fp) {
      fp = crypto.randomUUID();
      localStorage.setItem(FP_STORAGE, fp);
    }
    return fp;
  } catch {
    // Incognito / private mode may block localStorage — fall back to a session-
    // scoped UUID so we still track something, even if we can't dedupe repeats.
    return crypto.randomUUID();
  }
}

export function track(event: string, extra?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  // Skip when Puppeteer renders the page for PDF export — we emulate print
  // media in scripts/generate-pdf.ts, and the user-agent is HeadlessChrome.
  // Either signal is enough; checking both is defensive.
  if (window.matchMedia?.('print').matches) return;
  if (/HeadlessChrome/i.test(navigator.userAgent)) return;

  const body = JSON.stringify({
    fingerprint: getFingerprint(),
    referrer:    document.referrer || undefined,
    metadata: {
      source: 'proposal-puntacana',
      event,
      path:   window.location.pathname,
      ...extra,
    },
  });

  // keepalive ensures the request completes even if the user navigates away
  // (important for outgoing clicks like "Abrir caso de estudio" or PDF download).
  fetch(ENDPOINT, {
    method:    'POST',
    headers:   { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Tracking is best-effort. Never break UX on failure.
  });
}
