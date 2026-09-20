import { useState, lazy, Suspense } from 'react';
import Layout from './components/common/Layout/Layout';
import Hero from './components/HeroSection';
import styled from 'styled-components';
import './App.css';
import './styles/global.css';

const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectCaseStudy = lazy(() => import('./components/ProjectCaseStudy'));

const Body = styled.div`
  background-color: transparent;
  width: 100%;
  overflow-x: hidden;
`;

const SectionWrapper = styled.div`
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
  background: transparent;
  position: relative;
  z-index: 1;
`;

/* Lightweight fallback that reserves vertical space to avoid layout shift
   while lazy-loaded section chunks are fetched. */
const SectionFallback = styled.div`
  width: 100%;
  min-height: 40vh;
`;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <Layout>
      <Body>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <SectionWrapper>
            <Skills />
            <Experience />
          </SectionWrapper>
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <SectionWrapper>
            <Education />
            <Contact />
          </SectionWrapper>
        </Suspense>
        {openModal.state && (
          <Suspense fallback={null}>
            <ProjectCaseStudy openModal={openModal} setOpenModal={setOpenModal} />
          </Suspense>
        )}
      </Body>
    </Layout>
  );
}

export default App;
