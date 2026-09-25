/**
 * Blog posts data.
 *
 * Each post has metadata + a content array of typed blocks. The renderer
 * in `src/pages/Blog/BlogPost.jsx` switches on `block.type` to render
 * each one — no markdown parser needed.
 *
 * Block types:
 *   { type: 'paragraph', text: '...' }
 *   { type: 'heading', level: 2|3, text: '...' }
 *   { type: 'code', language: 'js', code: '...' }
 *   { type: 'list', items: ['...', '...'] }
 *   { type: 'quote', text: '...' }
 *
 * To add a new article, append an object to the array. Keep the `slug`
 * URL-safe (lowercase, hyphens), and make sure `date` is ISO format
 * (YYYY-MM-DD).
 */

const SITE_URL = 'https://usmanmurtaza.netlify.app';

export const blogPosts = [
  {
    slug: 'how-i-built-maniesta-campus',
    title: 'How I Built Maniesta Campus: A Campus Management System with React and Node.js',
    description:
      'A technical walkthrough of Maniesta Campus — a role-based campus management system with separate dashboards for admins, faculty, and students, built with React, Node.js, Express, and MongoDB.',
    date: '2026-09-24',
    readingTime: '6 min',
    tags: ['React', 'Node.js', 'MongoDB', 'Web Development'],
    coverImage: `${process.env.PUBLIC_URL}/maniesta-campus.png`,
    canonical: `${SITE_URL}/blog/how-i-built-maniesta-campus`,
    liveUrl: 'https://maniestacampus.netlify.app/',
    githubUrl: 'https://github.com/usmannmurtazaa/maniesta-campus-os',
    content: [
      {
        type: 'paragraph',
        text: 'Educational institutions run on paperwork and spreadsheets. Student records live in one file, attendance in another, grades somewhere else, and schedules — usually — in someone\'s head. I kept hearing the same complaint from small colleges and coaching centers: "We need something simple that just works." So I built Maniesta Campus — a role-based campus management system with separate dashboards for admins, faculty, and students.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Problem',
      },
      {
        type: 'paragraph',
        text: 'Before writing a single line of code, I mapped out what an actual campus needs:',
      },
      {
        type: 'list',
        items: [
          'Admins need to manage students, faculty, courses, and enrollments from one place',
          'Faculty need to mark attendance, upload grades, and view their class rosters',
          'Students need to see their schedule, grades, and enrolled courses without asking anyone',
        ],
      },
      {
        type: 'paragraph',
        text: "The core challenge was role-based access — one login system that serves three completely different user journeys. A student should never see admin controls, and a faculty member shouldn't be able to edit another faculty member's course. Traditional CRUD apps do not handle this well. You end up with if (user.role === 'admin') scattered everywhere. I wanted something cleaner.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Tech Stack Decisions',
      },
      {
        type: 'list',
        items: [
          'React — the UI needed to render completely different dashboards based on role. Component composition made this natural.',
          'Node.js + Express — a straightforward REST API that I could iterate on quickly.',
          'MongoDB — campus data is hierarchical and evolves fast. Flexible schemas saved me from constant migrations.',
          'JWT — stateless authentication means the API does not need session storage and can scale horizontally.',
          'Tailwind CSS — fast UI iteration across three distinct dashboards.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Core: Role-Based Access Control',
      },
      {
        type: 'paragraph',
        text: 'The RBAC system is where most of the design effort went. Every request flows through an authentication middleware first, then a role-check middleware, then the actual route handler. Nothing reaches the database without passing the role gate.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// middleware/auth.js
const jwt = require('jsonwebtoken');

// Verify the JWT and attach the user to the request
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Only allow specific roles to proceed
const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

module.exports = { authenticate, requireRole };`,
      },
      {
        type: 'paragraph',
        text: 'Now any route can declare its own access rules cleanly:',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// routes/courses.js
const { authenticate, requireRole } = require('../middleware/auth');

// Anyone logged in can view courses
router.get('/courses', authenticate, listCourses);

// Only admins can create courses
router.post('/courses',
  authenticate,
  requireRole('admin'),
  createCourse
);

// Faculty can update grades for their own courses
router.patch('/courses/:id/grades',
  authenticate,
  requireRole('faculty'),
  updateGrades
);`,
      },
      {
        type: 'paragraph',
        text: 'This pattern scales. If I ever add a "teaching assistant" role, I just pass it into requireRole — no other code changes.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Frontend: One App, Three Dashboards',
      },
      {
        type: 'paragraph',
        text: 'On the frontend, I used a simple pattern — the auth context holds the user, and the dashboard component switches on the role:',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `const Dashboard = () => {
  const { user } = useAuth();

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};`,
      },
      {
        type: 'paragraph',
        text: 'Each dashboard imports its own set of components. The shared pieces — navbar, notifications, profile, logout — live outside and are reused across all three. A protected route wrapper handles the auth check on the way in.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What I Learned',
      },
      {
        type: 'list',
        items: [
          'Design RBAC before writing features. Retrofitting access control into an existing app is brutal.',
          'Keep JWTs thin. Only store what the token actually needs to prove identity. Fetch the rest.',
          'Data-driven grading beats code-driven grading. Every institution has its own scale — make it configurable.',
          'Component composition in React scales beautifully for dashboards. Three completely different UIs coexisting in one app turned out to be much cleaner than I expected.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: "What's Next for Maniesta Campus",
      },
      {
        type: 'list',
        items: [
          'Real-time notifications with Socket.io for grade updates and enrollment changes',
          'An analytics dashboard for admins (enrollment trends, popular courses)',
          'A mobile app built with React Native that shares the same API',
          'Bulk import from Excel so institutions can migrate their existing records',
        ],
      },
    ],
  },

  {
    slug: 'building-resumeai-pro',
    title: 'Building ResumeAI Pro: An AI-Powered Resume Builder with React and Firebase',
    description:
      'How I designed and shipped ResumeAI Pro — an AI-powered resume builder that generates ATS-friendly resumes using the OpenAI API, Firebase authentication, and a React front end.',
    date: '2026-09-20',
    readingTime: '5 min',
    tags: ['React', 'Firebase', 'AI', 'SaaS'],
    coverImage: `${process.env.PUBLIC_URL}/ResumeAi Pro.png`,
    canonical: `${SITE_URL}/blog/building-resumeai-pro`,
    liveUrl: 'https://resumeaixpro.netlify.app/',
    githubUrl: 'https://github.com/usmannmurtazaa/ResumeAI-Pro',
    content: [
      {
        type: 'paragraph',
        text: 'ResumeAI Pro started from a frustration I heard repeatedly from friends job hunting: resumes take hours to craft, and even then most of them fail the automated ATS filters that companies use to screen applicants before a human ever sees them. I wanted to see if AI could meaningfully shorten that loop.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Core Idea',
      },
      {
        type: 'paragraph',
        text: 'The concept is straightforward: a user enters their experience and target role, and the platform uses the OpenAI API to generate resume bullet points tuned to pass ATS filters while reading naturally. The user can edit everything, choose from templates, and export to PDF.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Stack',
      },
      {
        type: 'list',
        items: [
          'React for the UI — the editor needed to be fast and predictable',
          'Firebase for authentication and Firestore storage of multi-resume data',
          'Tailwind CSS for the layout system',
          'OpenAI API for content generation',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Hardest Part: AI Integration',
      },
      {
        type: 'paragraph',
        text: 'The single most important design decision was to keep the API call structured and bounded. Instead of sending the whole resume to the model, the front end sends a single bullet at a time with a strict prompt asking for ATS-optimised alternatives. This minimises token usage, keeps responses fast, and prevents the model from drifting into long-form content.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    context: role,
    current: bulletText,
    tone: 'professional',
  }),
});
const { suggestions } = await response.json();`,
      },
      {
        type: 'heading',
        level: 2,
        text: 'Authentication with Firebase',
      },
      {
        type: 'paragraph',
        text: 'Firebase Auth gave me email/password and Google sign-in out of the box. The multi-resume model is simple: each user document contains an array of resumes, each resume has sections, and every section has an ID. When a user edits, only the affected section is written back to Firestore — not the whole document.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What I Would Do Differently',
      },
      {
        type: 'list',
        items: [
          'Rate-limit AI generation from day one — it is the most expensive resource per user.',
          'Cache generated variants so a user can revisit past suggestions without a new API call.',
          'Add a preview mode that mimics how the resume renders in common ATS parsers.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Try It',
      },
      {
        type: 'paragraph',
        text: 'ResumeAI Pro is live and free to use. If you are job hunting and want to shave a few hours off resume editing, give it a try.',
      },
    ],
  },

  {
    slug: 'why-i-built-the-maniesta-ecosystem',
    title: 'Why I Built the Maniesta Ecosystem',
    description:
      'A short note on the Maniesta ecosystem — the family of web products I have been building under one brand, and the thinking behind why I chose to consolidate rather than scatter.',
    date: '2026-09-15',
    readingTime: '3 min',
    tags: ['Maniesta', 'Web Development', 'Product'],
    coverImage: `${process.env.PUBLIC_URL}/maniesta.png`,
    canonical: `${SITE_URL}/blog/why-i-built-the-maniesta-ecosystem`,
    liveUrl: 'https://maniesta.netlify.app/',
    githubUrl: '',
    content: [
      {
        type: 'paragraph',
        text: 'Maniesta is a name I gave to the collection of web products I have been building over the past year — a campus management system, a resume builder, a productivity suite, a set of everyday utilities, and a handful of smaller projects. What started as separate side projects gradually became one brand.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Why One Brand',
      },
      {
        type: 'paragraph',
        text: 'Launching each project under its own name meant fragmenting what little identity I had built. Consolidating under Maniesta gives users a single mental model: Maniesta is a place where tools live. Some are academic, some are productivity-focused, some are just utilities. But they all share the same design language, the same quality bar, and the same person behind them.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What Makes It Unified',
      },
      {
        type: 'list',
        items: [
          'A consistent dark glassmorphism UI across all products',
          'React and Node.js underneath every project',
          'A single URL family (maniesta.netlify.app and its siblings)',
          'Shared design tokens, typography, and component patterns',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: "What's Next",
      },
      {
        type: 'paragraph',
        text: 'There is no grand roadmap. Each new Maniesta product exists because I needed something that did not exist yet, or because a specific problem was interesting enough to solve. Maniesta Campus came out of educational pain points I had seen. Maniesta Resume AI came out of a job hunt. Maniesta Suite came out of a desire to stop juggling five different productivity tabs.',
      },
      {
        type: 'paragraph',
        text: 'More products will follow. All of them will live under the same roof — because a name means more than a folder of repositories.',
      },
    ],
  },
];

/* ---------- Helpers ---------- */

export const getBlogPostBySlug = slug => blogPosts.find(post => post.slug === slug) || null;

export const getAllBlogSlugs = () => blogPosts.map(post => post.slug);

// Posts sorted newest first — used by the list page.
export const getSortedBlogPosts = () => [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
