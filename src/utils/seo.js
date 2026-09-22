const SITE_URL = 'https://usmanmurtaza.netlify.app';
const SITE_NAME = 'Usman Murtaza';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_DESCRIPTION =
  'Usman Murtaza is a Full Stack Developer and UI/UX-focused web developer building modern, responsive applications with React, JavaScript, Node.js, and AI-assisted workflows. Explore the Maniesta ecosystem and other portfolio projects.';

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
    title: `${SITE_NAME} | Full Stack Developer`,
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
      'usman murtaza, full stack developer, react developer, javascript developer, node.js developer, ui/ux designer, web developer, frontend developer, portfolio, maniesta',
  };

  // Per‑page overrides
  const pageMeta = {
    home: {
      title: `${SITE_NAME} | Full Stack Developer`,
      description: DEFAULT_DESCRIPTION,
      keywords:
        'usman murtaza, full stack developer, react developer, javascript developer, node.js developer, ui/ux designer, web developer, frontend developer, portfolio, maniesta, resume builder, campus management system',
    },
    projects: {
      title: `Projects — ${SITE_NAME}`,
      description:
        'Selected projects by Usman Murtaza, including ResumeAI Pro, Maniesta Campus, Maniesta Resume AI, Zain Real Estate, Maniesta Suite, and the wider Maniesta ecosystem. Built with React, Node.js, Express, MongoDB, PostgreSQL, and modern front-end tooling.',
      keywords:
        'react projects, full stack projects, portfolio projects, maniesta, resumeai pro, maniesta campus, zain real estate, saas, web applications',
    },
    about: {
      title: `About — ${SITE_NAME}`,
      description:
        'Learn about Usman Murtaza — a Full Stack Developer building modern, responsive web applications with React, JavaScript, and Node.js. Explore the Maniesta ecosystem and other portfolio work.',
      keywords:
        'about usman murtaza, full stack developer, react developer, ui/ux designer, karachi, pakistan, maniesta',
    },
    contact: {
      title: `Contact — ${SITE_NAME}`,
      description:
        'Get in touch with Usman Murtaza for project inquiries, collaboration, or freelance work. Send a message and I will get back to you.',
      keywords:
        'contact usman murtaza, hire react developer, freelance developer, karachi, full stack developer',
    },
    tools: {
      title: `Tools & Utilities — ${SITE_NAME}`,
      description:
        'A collection of lightweight utility tools and web applications built by Usman Murtaza — including calculators, notes, weather, and other quick-use utilities.',
      keywords: 'developer tools, utilities, web apps, calculator, notes, weather, usman murtaza',
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
