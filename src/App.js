import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import LiveBackground from './components/common/LiveBackground';
import Hero from './components/HeroSection';
import { SchemaMarkup } from './components/SEO';
import NotFound from './components/NotFound';
import { useReducedMotion } from './motionConfig';
import styled from 'styled-components';
import './App.css';
import './styles/global.css';

const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Certificates = lazy(() => import('./components/Certificates'));
const LatestPosts = lazy(() => import('./components/LatestPosts'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const BlogList = lazy(() => import('./pages/Blog/BlogList'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'));
const ProjectCase = lazy(() => import('./pages/Project/ProjectCase'));

const Body = styled.div`
  background-color: transparent;
  width: 100%;
  overflow-x: hidden;
`;

const SectionWrapper = styled.div`
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 60% 99%, 0 100%);
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

/* ---------- Home page ---------- */
function HomePage() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Defer one frame so any lazily mounted sections are in the DOM
    // before we try to scroll to them.
    const raf = requestAnimationFrame(() => {
      const behavior = prefersReduced ? 'auto' : 'smooth';

      if (location.hash) {
        const id = location.hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior, block: 'start' });
          return;
        }
      }
      // No hash, or the target does not exist: reset to top.
      window.scrollTo({ top: 0, behavior });
    });

    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash, prefersReduced]);

  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <SectionWrapper>
          <Skills />
          <Experience />
        </SectionWrapper>
        <Projects />
        <SectionWrapper>
          <Education />
          <Certificates />
          <LatestPosts />
          <Testimonials />
          <Contact />
        </SectionWrapper>
      </Suspense>
    </>
  );
}

/* ---------- App shell ---------- */

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Body>
          <SchemaMarkup />
          <LiveBackground />
          <Suspense fallback={<SectionFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/projects/:slug" element={<ProjectCase />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Body>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
