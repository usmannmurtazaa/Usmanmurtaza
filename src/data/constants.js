// SEO & Page Meta Content
export const SeoContent = {
  pageTitle: 'Usman Murtaza | Full Stack & React Developer Portfolio',
  metaDescription:
    'Full Stack & React Developer building modern web apps. Specializing in JavaScript, Node.js, & responsive UI/UX. Explore projects like Vexa and e-commerce solutions.',
  // For use in <title> and <meta name="description"> tags
};

// Professional Summary for website header/hero section
export const ProfessionalSummary = `I am a detail-oriented Full Stack Developer with a strong foundation in both frontend and backend development. My expertise includes building modern, scalable web applications using core technologies like React.js, JavaScript, Node.js, and PostgreSQL.

My portfolio highlights practical projects such as Vexa, a feature-rich project management application, and an e-commerce platform for Al Falah Leather. I am proficient in creating responsive designs, optimizing web performance, and implementing full-stack solutions with tools like Express, MongoDB, and Redux.

Driven by a passion for clean code and impactful solutions, I focus on delivering high-quality, user-centric applications. Explore my projects and experience to see how I solve complex problems with efficient, modern web development practices.`;

export const Bio = {
  name: 'Usman Murtaza',
  roles: ['Full Stack Developer', 'Web Developer', 'UI/UX Designer', 'Programmer'],
  description:
    'A passionate and detail-oriented Full Stack Developer with strong problem-solving skills and a creative mindset. I specialize in building modern, responsive, and scalable web applications using the latest technologies. With a solid foundation in both frontend and backend development, I thrive in collaborative environments and continuously strive to learn, innovate, and deliver high-quality solutions that make a real impact.',
  github: 'https://github.com/Usmannmurtazaa',
  resume: 'https://drive.google.com/file/d/1zs_xeqmfLPlCOjVUCgstedOD2_oPpzoZ/view?usp=sharing',
  linkedin: 'https://www.linkedin.com/in/Usmannmurtazaa/',
  twitter: 'https://twitter.com/usman_murtazaa',
  insta: 'https://www.instagram.com/usmannmurtazaa/',
  facebook: 'https://www.facebook.com/princeusman04',
};

export const skills = [
  {
    title: 'Frontend',
    skills: [
      {
        name: 'React Js',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Redux',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
      },
      {
        name: 'Next Js',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      },
      {
        name: 'HTML',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      },
      {
        name: 'CSS',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      },
      {
        name: 'JavaScript',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'Bootstrap',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      },
      {
        name: 'Material UI',
        image: 'https://mui.com/static/logo.png',
      },
    ],
  },
  {
    title: 'Backend',
    skills: [
      {
        name: 'Node Js',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'Express Js',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png',
      },
      {
        name: 'MongoDB',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
      {
        name: 'PostgreSQL',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      },
      {
        name: 'GraphQL',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
      },
    ],
  },
  {
    title: 'Tools',
    skills: [
      {
        name: 'VS Code',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      },
      {
        name: 'Git',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      },
      {
        name: 'GitHub',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      },
    ],
  },
];

export const experiences = [
  {
    id: 2,
    img: `${process.env.PUBLIC_URL}/freelance.png`,
    role: 'Full Stack Developer',
    company: 'Freelancer',
    date: 'Jan 2023 – Present',
    desc: 'Building and maintaining websites for various clients using HTML, CSS, JavaScript, and modern frameworks. Focused on creating responsive, dynamic, and user-friendly web applications.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
  },
  {
    id: 3,
    img: `${process.env.PUBLIC_URL}/web develop.png`,
    role: 'Web Developer',
    company: 'CodementorX by Usman',
    date: 'Feb 2024 – Present',
    desc: 'Running a YouTube channel related to software development, website creation, and IT career advice. Educating others on modern web technologies, tools, and coding practices.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python'],
  },
  {
    id: 4,
    img: `${process.env.PUBLIC_URL}/alfalah.png`,
    role: 'Full Stack Developer',
    company: 'Al Falah Leather',
    date: 'June 2023 – Oct 2023',
    desc: 'Worked on the official website of Al Falah Leather. Contributed to front-end and back-end features, optimized performance, and improved UI/UX with smooth navigation and animations.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
    doc: 'https://firebasestorage.googleapis.com/v0/b/buckoid-917cf.appspot.com/o/WhatsApp%20Image%202023-05-05%20at%2012.07.39%20AM.jpeg?alt=media&token=9f0e1648-568b-422d-bd0b-1f125f722245',
  },
];

export const education = [
  {
    id: 0,
    img: `${process.env.PUBLIC_URL}/ilma_logo.jfif`,
    school: 'Ilma University, Karachi',
    date: 'Aug 2024 – Present',
    grade: '3.6',
    desc: 'Currently pursuing a BSCS with focus on full‑stack web development, machine learning, and modern web technologies.',
    degree: 'Bachelor of Science — Computer Science',
  },
  {
    id: 1,
    img: `${process.env.PUBLIC_URL}/APS_Logo.png`,
    school: 'Army Public College, Saddar',
    date: '2022 – 2024',
    grade: 'A',
    desc: 'Completed Intermediate (FSc) in Pre‑Engineering, gaining foundational knowledge in mathematics, physics, and computing.',
    degree: 'FSc Pre‑Engineering',
  },
  {
    id: 2,
    img: `${process.env.PUBLIC_URL}/fazaia_logo.png`,
    school: 'Fazaia Intermediate College, PAF Base Korangi Creek',
    date: '2018 – 2022',
    grade: 'A+',
    desc: 'Completed Matriculation in Bio Science, focusing on biology, chemistry, and physics.',
    degree: 'Matriculation — Bio Science',
  },
];

// ========== PROJECTS (Fully Updated) ==========
export const projects = [
  // ============================================================
  // FEATURED PROJECTS (High Complexity, SaaS-Level, Recruiter-Facing)
  // ============================================================

  {
    id: 1,
    title: 'ResumeAI Pro - AI Powered Resume Builder SaaS',
    date: '2025',
    problem:
      'Job seekers spend hours crafting resumes that often fail ATS filters, reducing their chances of landing interviews.',
    solution:
      'An AI‑powered platform that generates ATS‑optimised resumes with customisable templates, AI‑driven content suggestions, and one‑click export. Includes authentication, dashboard, and multi‑resume management.',
    technicalChallenge:
      'Integrating OpenAI API for real‑time content generation while maintaining fast response times and minimising token usage.',
    myRole:
      'Sole developer – designed the UI, implemented Firebase authentication, built the AI integration, and optimised performance.',
    stack: ['React', 'Firebase', 'Tailwind CSS', 'OpenAI API'],
    impact: '1,200+ users · 4.8/5 rating',
    links: {
      live: 'https://resumeaixpro.netlify.app/',
      github: 'https://github.com/usmannmurtazaa/ResumeAI-Pro',
    },
    image: `${process.env.PUBLIC_URL}/ResumeAi Pro.png`,
    tags: ['React', 'Firebase', 'Tailwind CSS', 'AI', 'SaaS', 'Resume Builder'],
    category: 'Web App',
    level: 'featured',
    categoryNormalized: 'SaaS',
    complexityScore: 9,
    keyHighlight: 'AI‑driven content generation with Firebase authentication',
  },

  {
    id: 4,
    title: 'Maniesta Campus - Campus Management System',
    date: '2025',
    problem:
      'Educational institutions struggle to manage student records, faculty, courses, and schedules efficiently.',
    solution:
      'A comprehensive campus management platform with role‑based dashboards (admin, faculty, student), course enrolment, grade tracking, and real‑time notifications.',
    technicalChallenge:
      'Designing a flexible RBAC system that scales to thousands of users while maintaining data consistency across modules.',
    myRole:
      'Full‑Stack Developer – built the architecture, implemented authentication and authorisation, and developed the student dashboard.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind'],
    impact: 'Not publicly measured yet',
    links: {
      live: 'https://maniestacampus.netlify.app/',
      github: 'https://github.com/usmannmurtazaa/maniesta-campus-os',
    },
    image: `${process.env.PUBLIC_URL}/maniesta-campus.png`,
    tags: ['React', 'Node.js', 'Firebase', 'RBAC', 'Education'],
    category: 'Web App',
    level: 'featured',
    categoryNormalized: 'Education',
    complexityScore: 8,
    keyHighlight: 'Role‑based access control for multi‑user campus management',
  },

  // ============================================================
  // SECONDARY PROJECTS (Supporting, Solid, but Not SaaS-Level)
  // ============================================================

  {
    id: 2,
    title: 'Zain Real Estate - Property Listing Platform',
    date: '2025',
    problem:
      'Buyers and renters struggle to find suitable properties with accurate information in a fragmented market.',
    solution:
      'A comprehensive real estate platform with property listings, advanced search filters, interactive maps, and user dashboards for buyers, sellers, and agents.',
    technicalChallenge:
      'Implementing a robust search engine with geolocation and real-time data synchronisation.',
    myRole:
      'Full-Stack Developer – built the front-end, back-end APIs, and integrated mapping services.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Leaflet', 'Tailwind CSS'],
    impact: 'Not publicly measured yet',
    links: {
      live: 'https://zainrealestate.netlify.app/',
      github: 'https://github.com/usmannmurtazaa/ZainRealEstate',
    },
    image: `${process.env.PUBLIC_URL}/zain-real-estate.png`,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Maps', 'Real Estate'],
    category: 'Web App',
    level: 'secondary',
    categoryNormalized: 'E‑commerce',
    complexityScore: 7,
    keyHighlight: 'Advanced property search with interactive maps and filters',
  },

  {
    id: 5,
    title: 'Maniesta Suite - Productivity Tools Collection',
    date: '2025',
    problem:
      'Users need a set of lightweight, interconnected tools for daily productivity – notes, tasks, calendar, and quick actions.',
    solution:
      'A modular suite of productivity apps (to‑do list, note‑taking, calendar, timer) with a unified dashboard and responsive design.',
    technicalChallenge:
      'Building a state management system that allows seamless switching between tools while preserving data across modules.',
    myRole:
      'Full‑Stack Developer – designed the modular architecture and implemented the core features.',
    stack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    impact: 'Not publicly measured yet',
    links: {
      live: 'https://maniestasuite.netlify.app/',
      github: 'https://github.com/usmannmurtazaa/Maniesta-Suite',
    },
    image: `${process.env.PUBLIC_URL}/maniesta-suite.png`,
    tags: ['React', 'Redux', 'Node.js', 'Productivity'],
    category: 'Web App',
    level: 'secondary',
    categoryNormalized: 'Productivity',
    complexityScore: 6,
    keyHighlight: 'Modular architecture for interconnected productivity tools',
  },

  // ============================================================
  // UTILITY PROJECTS (Hidden from Homepage, Available on /tools)
  // ============================================================

  {
    id: 0,
    title: 'Nexa Calculator - GPA, CGPA, Scientific & Normal Calculator',
    date: '2025',
    problem:
      'Students need a single tool to compute academic GPAs/CGPAs and perform scientific calculations without switching apps.',
    solution:
      'A multi‑purpose calculator combining academic GPA/CGPA computation with a full scientific calculator and basic arithmetic in one clean, responsive interface.',
    technicalChallenge:
      'Building a robust calculation engine that handles both academic formulas and scientific functions accurately.',
    myRole: 'Sole developer – built the entire application from scratch.',
    stack: ['React', 'JavaScript', 'CSS'],
    impact: 'Not publicly measured yet',
    links: {
      live: 'https://nexacalculator.netlify.app/',
      github: 'https://github.com/usmannmurtazaa/NexaCalculator',
    },
    image: `${process.env.PUBLIC_URL}/Nexa calculator.png`,
    tags: ['React', 'JavaScript', 'CSS', 'Calculator', 'GPA', 'CGPA', 'Responsive UI'],
    category: 'Web App',
    level: 'utility',
    categoryNormalized: 'Utility',
    complexityScore: 4,
    keyHighlight: 'Integrated GPA, CGPA, and scientific calculator in one UI',
  },
];

export const TimeLineData = [
  {
    year: '2024',
    text: 'Started the journey with a basic understanding of JavaScript.',
  },
  {
    year: '2024',
    text: 'Learned advanced JavaScript and started building websites.',
  },
  {
    year: '2025',
    text: 'Started working as a full-stack developer at Freelancing Platforms.',
  },
  {
    year: '2025',
    text: 'Launched my own web development business, focusing on e-commerce websites.',
  },
  {
    year: '2025',
    text: 'Started learning React and enhancing skills in web development.',
  },
];
