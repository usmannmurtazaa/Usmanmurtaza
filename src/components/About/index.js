import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-12 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About <span className="text-blue-600 dark:text-blue-400">Usman Murtaza</span>
        </h1>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I am a detail-oriented{' '}
            <strong className="font-semibold text-blue-600 dark:text-blue-400">
              Full Stack Developer
            </strong>{' '}
            with a strong foundation in both{' '}
            <strong className="font-semibold">frontend and backend development</strong>. My
            expertise includes building modern, scalable web applications using core technologies
            like <strong className="font-semibold">React.js</strong>,{' '}
            <strong className="font-semibold">JavaScript</strong>,{' '}
            <strong className="font-semibold">Node.js</strong>, and{' '}
            <strong className="font-semibold">PostgreSQL</strong>.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            My portfolio highlights practical projects such as{' '}
            <strong className="font-semibold">Vexa</strong>, a feature-rich project management
            application, and an <strong className="font-semibold">e-commerce platform</strong> for
            Al Falah Leather. I am proficient in creating{' '}
            <strong className="font-semibold">responsive designs</strong>, optimizing{' '}
            <strong className="font-semibold">web performance</strong>, and implementing full-stack
            solutions with tools like <strong className="font-semibold">Express</strong>,{' '}
            <strong className="font-semibold">MongoDB</strong>, and{' '}
            <strong className="font-semibold">Redux</strong>.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Driven by a passion for clean code and impactful solutions, I focus on delivering
            high-quality, user-centric applications. Explore my projects and experience to see how I
            solve complex problems with efficient, modern{' '}
            <strong className="font-semibold">web development</strong> practices.
          </p>
        </div>

        {/* You can also use the imported constant directly */}
        {/* 
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Professional Summary</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {ProfessionalSummary}
          </p>
        </div>
        */}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Frontend Expertise</h3>
            <p className="text-blue-100">
              React.js, JavaScript, HTML5, CSS3, Redux, Next.js, Material UI, Bootstrap
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Backend Skills</h3>
            <p className="text-purple-100">
              Node.js, Express.js, MongoDB, PostgreSQL, GraphQL, REST APIs
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Development Focus</h3>
            <p className="text-green-100">
              Responsive Design, Web Performance, Scalable Architecture, Clean Code, UI/UX
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
