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
  github: 'https://github.com/Usmanmurtaza2004',
  resume: 'https://drive.google.com/file/d/1zs_xeqmfLPlCOjVUCgstedOD2_oPpzoZ/view?usp=sharing',
  linkedin: 'https://www.linkedin.com/in/usmanmurtaza01/',
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
    /* ✅  import images with `process.env.PUBLIC_URL` so CRA finds them */
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
    /* ✅  import images with `process.env.PUBLIC_URL` so CRA finds them */
    img: `${process.env.PUBLIC_URL}/ilma_logo.jfif`,
    school: 'Ilma University, Karachi',
    date: 'Aug 2024 – Present',
    grade: 'N/A',
    desc: 'Currently pursuing a BSCS with focus on full‑stack web development, machine learning, and modern web technologies.',
    degree: 'Bachelor of Science — Computer Science',
  },
  {
    id: 1,
    img: `${process.env.PUBLIC_URL}/APS_Logo.png`,
    school: 'Army Public College, Saddar',
    date: '2022 – 2024',
    grade: 'Pre‑Engineering',
    desc: 'Completed Intermediate (FSc) in Pre‑Engineering, gaining foundational knowledge in mathematics, physics, and computing.',
    degree: 'FSc Pre‑Engineering',
  },
  {
    id: 2,
    img: `${process.env.PUBLIC_URL}/fazaia_logo.png`,
    school: 'Fazaia Intermediate College, PAF Base Korangi Creek',
    date: '2018 – 2022',
    grade: 'Bio Science',
    desc: 'Completed Matriculation in Bio Science, focusing on biology, chemistry, and physics.',
    degree: 'Matriculation — Bio Science',
  },
];

export const projects = [
  {
    id: 0,
    title: 'CodementorX - Software Development Education Platform',
    date: 'Jan 2025 - Present',
    description:
      'Creating a platform to educate budding developers on modern software development practices, full-stack development, and web technologies. The website features video tutorials, blogs, and interactive coding challenges.',
    image:
      'https://user-images.githubusercontent.com/64485885/234602896-a1bd8bcc-b72b-4821-83d6-8ad885bf435e.png',
    tags: ['React', 'JavaScript', 'Node.js', 'HTML', 'CSS'],
    category: 'Web App',
    github: 'https://github.com/UsmanMurtaza/codementorx',
    webapp: 'https://codementorx.com',
  },
  {
    id: 1,
    title: 'Vexa - Project Management App',
    date: 'Oct 2022 - Present',
    description:
      'Designed and developed a project management app with task tracking, team collaboration, and time tracking. Features include user invitations, chat system plans, and future community integration.',
    image:
      'https://user-images.githubusercontent.com/64485885/234916413-96296f13-fe4b-4cc4-b215-e72bd7c27928.png',
    tags: ['React Js', 'MongoDb', 'Node Js', 'Express Js', 'Redux', 'NodeMailer'],
    category: 'Web App',
    github: 'https://github.com/usmanmurtaza/Project-Management-App',
    webapp: 'https://vexa-app.netlify.app/',
  },
  {
    id: 2,
    title: 'Al Falah Leather E-Commerce Website',
    date: 'Feb 2025 - Present',
    description:
      'Developing an e-commerce website for Al Falah Leather with features like product catalog, user login, payment integration, and responsive design. Using HTML, CSS, JavaScript, React, and PostgreSQL to create a premium online shopping experience.',
    image:
      'https://user-images.githubusercontent.com/64485885/255202416-e1f89b04-2788-45b0-abc2-9dec616669e2.png',
    tags: ['React', 'PostgreSQL', 'Node.js', 'Express', 'HTML', 'CSS', 'JavaScript'],
    category: 'E-commerce Web App',
    github: 'https://github.com/UsmanMurtaza/al-falah-leather',
    webapp: 'https://alfalahleather.com',
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
