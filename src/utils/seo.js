const SITE_URL = 'https://usmanmurtaza.netlify.app';
const SITE_NAME = 'Usman Murtaza';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_DESCRIPTION =
  'Senior Frontend Engineer and Full‑stack React developer crafting high‑performance SaaS interfaces, motion design, and glassmorphism UI. Available for hire.';

export const siteMetadata = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  defaultImage: DEFAULT_IMAGE,
  twitterHandle: '@usman_murtazaa',
  defaultDescription: DEFAULT_DESCRIPTION,
  author: 'Usman Murtaza',
};

export const getMetaTags = (page, customData = {}) => {
  // Base defaults for all pages
  const defaults = {
    title: `${SITE_NAME} – Full‑Stack Developer`,
    description: DEFAULT_DESCRIPTION,
    image: DEFAULT_IMAGE,
    url: SITE_URL,
    type: 'website',
    siteName: SITE_NAME,
    twitterCard: 'summary_large_image',
    twitterSite: siteMetadata.twitterHandle,
    twitterCreator: siteMetadata.twitterHandle,
    author: siteMetadata.author,
    keywords:
      'frontend developer, react developer, full stack, SaaS, portfolio, usman murtaza, motion design, glassmorphism',
  };

  // Per‑page overrides
  const pageMeta = {
    home: {
      title: `Usman Murtaza | Full Stack Developer`,
      description: DEFAULT_DESCRIPTION,
      keywords:
        'React Developer, Full Stack Developer, JavaScript, Node.js, SaaS, Portfolio, motion design, glassmorphism, frontend engineer',
    },
    projects: {
      title: `Featured Projects – ${SITE_NAME}`,
      description:
        'Explore production‑grade projects including ResumeAI Pro, Maniesta Campus, and Zain Real Estate. Each one demonstrates deep technical skill and product thinking.',
      keywords:
        'React Projects, SaaS, Web Applications, Full Stack Projects, portfolio, usman murtaza',
    },
    about: {
      title: `About – ${SITE_NAME}`,
      description:
        'Learn about my journey as a Senior Frontend Engineer, my technical expertise in React, Node.js, and modern UI, and what drives me to build exceptional web applications.',
      keywords:
        'About Me, Full Stack Developer, React Developer, Karachi, Pakistan, senior frontend engineer',
    },
    contact: {
      title: `Contact – ${SITE_NAME}`,
      description:
        'Get in touch for project inquiries, collaboration opportunities, or freelance work. I respond within 24 hours.',
      keywords:
        'Contact Usman Murtaza, Hire React Developer, Freelance Developer, Karachi, senior frontend engineer',
    },
    tools: {
      title: `Tools & Utilities – ${SITE_NAME}`,
      description:
        'A collection of utility tools including calculators and productivity apps built with modern web technologies.',
      keywords: 'Developer Tools, Utilities, Web Apps, Calculator, usman murtaza',
    },
  };

  // Merge: defaults → page‑specific → customData
  return {
    ...defaults,
    ...pageMeta[page],
    ...customData,
  };
};

// Convenience alias
export const getPageMeta = page => getMetaTags(page);
