const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

export const initGA4 = () => {
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', GA_ID);
};

export const trackEvent = (action, category, label) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

export const trackHireMeClick = () => trackEvent('click_hire_me', 'cta', 'Hero Hire Me Button');
export const trackViewProjectsClick = () =>
  trackEvent('click_view_projects', 'cta', 'Hero View Projects Button');
export const trackProjectClick = title => trackEvent('view_project', 'portfolio', title);
export const trackContactForm = () => trackEvent('submit_contact', 'form', 'Contact Form');
