import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BlogCard from '../BlogCard';
import { getSortedBlogPosts } from '../../data/blogPosts';
import { useReducedMotion, fadeInUpVariants } from '../../motionConfig';

/* ---------- Styled ---------- */

const Section = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0 20px;
  background: rgba(12, 12, 29, 0.4);

  @media (max-width: 960px) {
    padding: 60px 0 20px;
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

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 2.8rem);
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
  color: var(--text-secondary, #a0a0b8);
  margin: 0;
  max-width: 640px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 32px;

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

const ViewAllRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--accent-glow, #8b5cf6);
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid rgba(139, 92, 246, 0.3);
  background: rgba(139, 92, 246, 0.06);
  transition:
    background 200ms ease,
    border-color 200ms ease,
    transform 200ms ease;

  span.arrow {
    display: inline-block;
    transition: transform 200ms ease;
  }

  &:hover {
    background: rgba(139, 92, 246, 0.14);
    border-color: rgba(139, 92, 246, 0.55);
    transform: translateY(-2px);
  }

  &:hover span.arrow {
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-glow, #8b5cf6);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
    &:hover span.arrow {
      transform: none;
    }
  }
`;

/* ---------- Component ---------- */

const LatestPosts = ({ limit = 3 }) => {
  const prefersReduced = useReducedMotion();
  const allPosts = getSortedBlogPosts();
  const posts = allPosts.slice(0, limit);

  // Nothing to show — render nothing so the home page does not have an
  // empty section.
  if (posts.length === 0) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <Section aria-labelledby="latest-writing-heading">
      <Wrapper>
        <Title
          id="latest-writing-heading"
          variants={prefersReduced ? {} : fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Latest Writing
        </Title>

        <Subtitle
          variants={prefersReduced ? {} : fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Technical write-ups on full-stack development, React patterns, and building
          production-grade web applications.
        </Subtitle>

        <Grid
          as={motion.div}
          variants={prefersReduced ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {posts.map(post => (
            <CardSlot key={post.slug} variants={prefersReduced ? {} : fadeInUpVariants}>
              <BlogCard post={post} />
            </CardSlot>
          ))}
        </Grid>

        <ViewAllRow>
          <ViewAllLink to="/blog">
            View all articles <span className="arrow">→</span>
          </ViewAllLink>
        </ViewAllRow>
      </Wrapper>
    </Section>
  );
};

LatestPosts.propTypes = {
  limit: PropTypes.number,
};

export default LatestPosts;
