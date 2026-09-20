const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

let initialized = false;

/**
 * Initialize GA4 exactly once.
 * - No-op if already initialized.
 * - No-op if GA_ID is missing (prevents loading a broken script tag).
 * - Exposes window.gtag so that trackEvent() works consistently.
 */
export const initGA4 = () => {
  if (initialized) return;
  if (!GA_ID || typeof window === 'undefined') return;

  // If gtag already exists (e.g. loaded by another script), just configure it.
  if (typeof window.gtag === 'function') {
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });
    initialized = true;
    return;
  }

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });

  initialized = true;
};

export const trackEvent = (action, category, label) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
  });
};

export const trackPageView = path => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function' || !GA_ID) return;
  window.gtag('event', 'page_view', {
    page_path: path,
  });
};

export const trackHireMeClick = () => trackEvent('click_hire_me', 'cta', 'Hero Hire Me Button');
export const trackViewProjectsClick = () =>
  trackEvent('click_view_projects', 'cta', 'Hero View Projects Button');
export const trackProjectClick = title => trackEvent('view_project', 'portfolio', title);
export const trackContactForm = () => trackEvent('submit_contact', 'form', 'Contact Form');
