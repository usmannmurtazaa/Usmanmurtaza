import { Bio, projects } from '../data/constants';

const SITE_URL = 'https://usmanmurtaza.netlify.app';
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Person schema – the canonical, machine-readable definition of Usman Murtaza.
 *
 * The @id is stable so other entities (WebSite, projects, etc.) can reference
 * this exact person node. knowsAbout lists only technologies and disciplines
 * that are actually present in the portfolio data and project stacks.
 */
export const getPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: Bio.name,
  givenName: 'Usman',
  familyName: 'Murtaza',
  jobTitle: 'Full Stack Developer',
  description:
    Bio.description ||
    'Full Stack Developer building modern, responsive web applications with React, JavaScript, and Node.js — creator of the Maniesta ecosystem.',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  sameAs: [Bio.github, Bio.linkedin, Bio.twitter, Bio.insta, Bio.facebook].filter(Boolean),
  knowsAbout: [
    'React.js',
    'Next.js',
    'Redux',
    'JavaScript',
    'Node.js',
    'Express.js',
    'Firebase',
    'MongoDB',
    'PostgreSQL',
    'GraphQL',
    'HTML5',
    'CSS3',
    'Bootstrap',
    'Tailwind CSS',
    'Material UI',
    'Python',
    'Git',
    'GitHub',
    'Figma',
    'Full Stack Development',
    'Web Development',
    'UI/UX Design',
    'Responsive Web Design',
    'REST APIs',
    'AI Integration',
  ],
  mainEntityOfPage: { '@id': WEBSITE_ID },
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
});

/**
 * WebSite schema – the portfolio site itself, published by and about
 * Usman Murtaza. The `about` property connects the site to the Person
 * entity so search engines understand the site belongs to this person.
 */
export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'Usman Murtaza Portfolio',
  description:
    'Portfolio of Usman Murtaza — Full Stack Developer building modern, responsive web applications with React, JavaScript, and Node.js. Creator of the Maniesta ecosystem.',
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
  about: { '@id': PERSON_ID },
});

/**
 * SoftwareApplication list – every project in the portfolio, each linked
 * back to Usman Murtaza as both author and creator. This is the primary
 * machine-readable signal that Usman Murtaza is the developer behind the
 * Maniesta-family projects and the other portfolio work.
 *
 * Accepts an optional projects array; defaults to all projects.
 */
export const getWebApplicationSchema = customProjects => {
  const allProjects = customProjects || projects;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#projects`,
    name: `${Bio.name} — Projects and Maniesta Ecosystem`,
    description: 'Web applications and Maniesta-family products created by Usman Murtaza.',
    itemListElement: allProjects.map((p, index) => ({
      '@type': 'SoftwareApplication',
      position: index + 1,
      name: p.title,
      description: p.problem || p.description || '',
      applicationCategory: p.categoryNormalized || 'WebApplication',
      operatingSystem: 'Web',
      browserRequirements: 'Modern browsers',
      url: p.links?.live || p.links?.github || SITE_URL,
      image: p.image || p.img,
      author: { '@id': PERSON_ID },
      creator: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    })),
  };
};
