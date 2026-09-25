import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BlogCard from '../../components/BlogCard';
import { getSortedBlogPosts } from '../../data/blogPosts';
import { useReducedMotion, fadeInUpVariants } from '../../motionConfig';

/* ---------- Styled ---------- */

const Section = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 140px 0 100px;
  background: rgba(12, 12, 29, 0.4);

  @media (max-width: 960px) {
    padding: 120px 0 80px;
  }

  @media (max-width: 640px) {
    padding: 110px 0 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1350px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  @media (max-width: 960px) {
    padding: 0 16px;
  }
`;

const BackLink = styled(Link)`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary, #a0a0b8);
  text-decoration: none;
  padding: 6px 10px;
  margin-left: -10px;
  border-radius: 8px;
  transition:
    color 200ms ease,
    background 200ms ease;

  &:hover {
    color: var(--accent-glow, #8b5cf6);
    background: rgba(139, 92, 246, 0.08);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-glow, #8b5cf6);
    outline-offset: 2px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  text-align: center;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary, #f2f2f7);
  letter-spacing: -0.02em;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.125rem;
  text-align: center;
  font-weight: 500;
  margin: 0 0 40px 0;
  color: var(--text-secondary, #a0a0b8);
  max-width: 720px;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 20px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }
`;

const CardSlot = styled(motion.div)`
  display: flex;
  width: 100%;
`;

const EmptyState = styled.div`
  width: 100%;
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary, #a0a0b8);
  font-size: 1rem;
`;

/* ---------- Component ---------- */

const BlogList = () => {
  const prefersReduced = useReducedMotion();
  const posts = getSortedBlogPosts();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <Section aria-labelledby="blog-heading">
      <Wrapper>
        <BackLink to="/" aria-label="Back to portfolio">
          ← Back to portfolio
        </BackLink>

        <Title
          id="blog-heading"
          variants={prefersReduced ? {} : fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          Blog
        </Title>

        <Subtitle
          variants={prefersReduced ? {} : fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Technical write-ups on full-stack development, React patterns, and building
          production-grade web applications. Everything here reflects real projects — no tutorials
          written for the sake of tutorials.
        </Subtitle>

        {posts.length === 0 ? (
          <EmptyState>New articles coming soon.</EmptyState>
        ) : (
          <Grid
            as={motion.div}
            variants={prefersReduced ? {} : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map(post => (
              <CardSlot key={post.slug} variants={prefersReduced ? {} : fadeInUpVariants}>
                <BlogCard post={post} />
              </CardSlot>
            ))}
          </Grid>
        )}
      </Wrapper>
    </Section>
  );
};

export default BlogList;
