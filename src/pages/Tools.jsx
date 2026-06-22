import React, { useEffect } from 'react';
import Layout from '../components/common/Layout/Layout';
import { MetaTags } from '../components/SEO';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { projects } from '../data/constants';
import ProjectCard from '../components/Cards/ProjectCards';
import { useReducedMotion, fadeInUpVariants } from '../motionConfig';
import { trackEvent } from '../analytics';

/* ---------- Glassmorphism + Design Tokens ---------- */

const Container = styled(motion.section)`
  padding: 120px 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary, #f2f2f7);
  margin-bottom: 0.5rem;
  background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary, #a0a0b8);
  margin-bottom: 3rem;
  max-width: 600px;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 40px;
`;

const Tools = () => {
  const prefersReduced = useReducedMotion();
  const utilityProjects = projects.filter(p => p.level === 'utility');

  // Track page view on mount
  useEffect(() => {
    trackEvent('page_view', 'page', 'Tools & Utilities');
  }, []);

  return (
    <>
      <MetaTags page="tools" />
      <Layout>
        <Container
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          <Title variants={fadeInUpVariants} transition={{ delay: 0.1, duration: 0.5 }}>
            Tools & Utilities
          </Title>
          <Subtitle variants={fadeInUpVariants} transition={{ delay: 0.2, duration: 0.5 }}>
            A collection of lightweight, hand‑crafted utilities I’ve built.
          </Subtitle>
          <Grid
            variants={fadeInUpVariants}
            transition={{ delay: 0.3, duration: 0.5, staggerChildren: 0.1 }}
          >
            {utilityProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                setOpenModal={() => {}} // no modal on this page
                isFeatured={false}
              />
            ))}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Tools;
