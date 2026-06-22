import React, { useState } from 'react';
import Layout from '../components/common/Layout/Layout';
import { MetaTags, SchemaMarkup } from '../components/SEO';
import Hero from '../components/HeroSection'; // ✅ correct path
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import About from '../components/About';
import Contact from '../components/Contact';
import ProjectCaseStudy from '../components/ProjectCaseStudy'; // modal content
import { projects } from '../data/constants';

const Home = () => {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <>
      <MetaTags page="home" />
      <SchemaMarkup />

      <Layout>
        <Hero />
        <Projects openModal={openModal} setOpenModal={setOpenModal} />
        <Skills />
        <About />
        <Contact />
        {openModal.state && <ProjectCaseStudy openModal={openModal} setOpenModal={setOpenModal} />}
      </Layout>
    </>
  );
};

export default Home;
