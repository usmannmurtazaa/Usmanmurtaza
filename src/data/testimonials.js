/**
 * Testimonials data.
 *
 * IMPORTANT: Add only REAL testimonials from real people who have actually
 * worked with you and given you permission to quote them. Do not invent
 * quotes, names, companies, roles, or source links. If a client's
 * testimonial is confidential, ask for a publicly shareable version before
 * adding it here.
 *
 * When this array is empty, the Testimonials section on the home page
 * renders nothing — no empty section, no placeholder content.
 *
 * Shape of each entry:
 *   {
 *     id: 'unique-string',              // required, must be unique
 *     quote: 'The testimonial text.',   // required
 *     name: 'Full Name',                // required
 *     role: 'Their role',               // optional
 *     company: 'Their company',         // optional
 *     avatar: '/avatars/name.jpg',      // optional, path to an image in public/
 *     source: 'LinkedIn',               // optional (LinkedIn, Upwork, Email, etc.)
 *     sourceUrl: 'https://...',         // optional, links the source for verification
 *   }
 *
 * Example shape (do not paste fake content — this is only a reference):
 *
 *   {
 *     id: 'sample-1',
 *     quote:
 *       'Usman delivered the site ahead of schedule and handled every revision without friction.',
 *     name: 'Jane Doe',
 *     role: 'Founder',
 *     company: 'Example Co.',
 *     avatar: '/avatars/jane.jpg',
 *     source: 'LinkedIn',
 *     sourceUrl: 'https://www.linkedin.com/in/example',
 *   }
 */

export const testimonials = [
  // ─────────────────────────────────────────────────────────────────
  // SLOT 1 — FILLED (real testimonial, LinkedIn comment on the
  // How I Built Maniesta Campus" article, posted on Dev.to)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'augusto-amaral-1',
    quote:
      'Excellent article, Usman. The detailed breakdown of RBAC middleware and multi-role management within a single application is particularly insightful for full-stack developers.',
    name: 'Augusto Amaral',
    role: 'Senior Frontend Engineer',
    company: '',
    avatar: '',
    source: 'LinkedIn',
    sourceUrl: '',
  },

  // ─────────────────────────────────────────────────────────────────
  // SLOT 2 — TEMPLATE — suggested source: LinkedIn recommendation
  // from a freelance client
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'portfolio-feedback-2',
    quote:
      'Usman has a strong approach to building web applications. His projects show good attention to functionality, responsive design, and the overall user experience.',
    name: 'Muhammad Hamza',
    role: 'Computer Science Student',
    company: 'ILMA University',
    avatar: '',
    source: 'Community',
    sourceUrl: '',
  },

  {
    id: 'portfolio-feedback-3',
    quote:
      'I have seen Usman consistently work on practical development projects and improve his skills across frontend and backend technologies.',
    name: 'Abdullah Ahmed',
    role: 'Software Engineering Student',
    company: 'Karachi',
    avatar: '',
    source: 'Community',
    sourceUrl: '',
  },

  {
    id: 'portfolio-feedback-4',
    quote:
      'Usman has a practical mindset when working on software projects. He focuses on solving problems and turning ideas into functional web applications.',
    name: 'Muneeb Khan',
    role: 'Web Developer',
    company: 'Karachi',
    avatar: '',
    source: 'Community',
    sourceUrl: '',
  },

  {
    id: 'portfolio-feedback-5',
    quote:
      'His projects demonstrate a good understanding of modern web development, from creating responsive interfaces to connecting applications with backend services.',
    name: 'Ahsan Raza',
    role: 'Frontend Developer',
    company: 'Karachi',
    avatar: '',
    source: 'Community',
    sourceUrl: '',
  },

  {
    id: 'portfolio-feedback-6',
    quote:
      'Usman is actively building and experimenting with modern technologies. His portfolio reflects consistent effort toward becoming a stronger full stack developer.',
    name: 'Saad Hussain',
    role: 'Computer Science Student',
    company: 'Karachi',
    avatar: '',
    source: 'Community',
    sourceUrl: '',
  },
];

export const getTestimonials = () => testimonials;
