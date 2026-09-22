import { Bio, projects } from '../data/constants';

/**
 * Person schema – comprehensive JSON-LD for a full-stack developer.
 */
export const getPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://usmanmurtaza.netlify.app/#person',
  name: Bio.name,
  givenName: 'Usman',
  familyName: 'Murtaza',
  jobTitle: 'Full Stack Developer',
  description:
    Bio.description ||
    'Full Stack Developer building modern, responsive web applications with React, JavaScript, and Node.js — with a growing focus on UI/UX and AI-assisted workflows.',
  url: 'https://usmanmurtaza.netlify.app',
  image: 'https://usmanmurtaza.netlify.app/og-image.jpg',
  sameAs: [Bio.github, Bio.linkedin, Bio.twitter, Bio.insta, Bio.facebook].filter(Boolean),
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'Ilma University, Karachi',
    },
  ],
  knowsAbout: [
    'React.js',
    'JavaScript',
    'Node.js',
    'Express.js',
    'MongoDB',
    'PostgreSQL',
    'Next.js',
    'Redux',
    'GraphQL',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Material UI',
    'REST APIs',
    'UI/UX Design',
    'Responsive Design',
    'AI Integration',
  ],
});

/**
 * WebSite schema – helps search engines understand the entire portfolio.
 */
export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://usmanmurtaza.netlify.app/#website',
  url: 'https://usmanmurtaza.netlify.app',
  name: 'Usman Murtaza Portfolio',
  description:
    'Portfolio of Usman Murtaza — Full Stack Developer building modern, responsive web applications with React, JavaScript, and Node.js. Explore the Maniesta ecosystem and other portfolio projects.',
  publisher: {
    '@id': 'https://usmanmurtaza.netlify.app/#person',
  },
});

/**
 * SoftwareApplication list – projects as structured data.
 * Accepts an optional projects array; defaults to all non‑utility projects.
 */
export const getWebApplicationSchema = customProjects => {
  const allProjects = customProjects || projects;
  const featured = allProjects.filter(p => p.level !== 'utility');

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${Bio.name}'s Featured Projects`,
    description: 'Production‑grade web applications and SaaS products.',
    itemListElement: featured.map((p, index) => ({
      '@type': 'SoftwareApplication',
      position: index + 1,
      name: p.title,
      description: p.problem || p.description || '',
      applicationCategory: p.categoryNormalized || 'WebApplication',
      operatingSystem: 'Web',
      browserRequirements: 'Modern browsers',
      url: p.links?.live || p.links?.github || 'https://usmanmurtaza.netlify.app',
      image: p.image || p.img,
      author: {
        '@id': 'https://usmanmurtaza.netlify.app/#person',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    })),
  };
};
