import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { darkTheme, lightTheme } from './utils/Themes.js';
import Layout from './components/common/Layout/Layout';
import Hero from './components/HeroSection';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Education from './components/Education';
import ProjectCaseStudy from './components/ProjectCaseStudy';
import styled from 'styled-components';
import './App.css';
import './styles/global.css';
import { initGA4 } from './analytics';

if (process.env.NODE_ENV === 'production') {
  initGA4();
}

const Body = styled.div`
  background-color: transparent;
  width: 100%;
  overflow-x: hidden;
`;

const SectionWrapper = styled.div`
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
  background: transparent;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: relative;
  z-index: 1;
`;

function App() {
  const [darkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Layout>
          <Body>
            <Hero />
            <SectionWrapper>
              <Skills />
              <Experience />
            </SectionWrapper>
            <Projects openModal={openModal} setOpenModal={setOpenModal} />
            <SectionWrapper>
              <Education />
              <Contact />
            </SectionWrapper>
            {openModal.state && (
              <ProjectCaseStudy openModal={openModal} setOpenModal={setOpenModal} />
            )}
          </Body>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
