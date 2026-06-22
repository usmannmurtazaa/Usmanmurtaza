import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useReducedMotion, fadeInUpVariants } from '../motionConfig';
import { SocialMediaIcons, SocialMediaIcon } from './AboutStyle';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

/* ---------- Styled Components (Glassmorphism + Design System) ---------- */

const AboutSection = styled.section`
  padding: 5rem 1.5rem;
  position: relative;
  z-index: 1;
  -webkit-backdrop-filter: blur(12px);
  background: rgba(12, 12, 29, 0.4);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeading = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;

  & span {
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.15);
  }
`;

const Paragraph = styled.p`
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-weight: 400;
`;

const Highlight = styled.strong`
  color: var(--text-primary);
  font-weight: 600;
`;

const ExpertiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const ExpertiseCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  color: var(--text-primary);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.2);
    transform: translateY(-4px);
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: var(--text-secondary);
    font-weight: 400;
    line-height: 1.7;
  }
`;

const SocialWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  span {
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 500;
  }
`;

/* ---------- Animation Variants ---------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/* ---------- Component ---------- */

const About = () => {
  const prefersReduced = useReducedMotion();

  return (
    <AboutSection id="about" aria-label="About Usman Murtaza">
      <Container>
        {/* Heading */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>
            About <span>Usman Murtaza</span>
          </SectionHeading>
        </motion.div>

        {/* Main Glass Card */}
        <GlassCard
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Paragraph>
            I am a detail-oriented <Highlight>Full Stack Developer</Highlight> with a strong
            foundation in both <Highlight>frontend and backend development</Highlight>. My expertise
            includes building modern, scalable web applications using core technologies like{' '}
            <Highlight>React.js</Highlight>, <Highlight>JavaScript</Highlight>,{' '}
            <Highlight>Node.js</Highlight>, and <Highlight>PostgreSQL</Highlight>.
          </Paragraph>

          <Paragraph>
            My portfolio highlights practical projects such as <Highlight>Vexa</Highlight>, a
            feature‑rich project management application, and an{' '}
            <Highlight>e‑commerce platform</Highlight> for Al Falah Leather. I am proficient in
            creating <Highlight>responsive designs</Highlight>, optimizing{' '}
            <Highlight>web performance</Highlight>, and implementing full‑stack solutions with tools
            like <Highlight>Express</Highlight>, <Highlight>MongoDB</Highlight>, and{' '}
            <Highlight>Redux</Highlight>.
          </Paragraph>

          <Paragraph>
            Driven by a passion for clean code and impactful solutions, I focus on delivering
            high‑quality, user‑centric applications. Explore my projects and experience to see how I
            solve complex problems with efficient, modern <Highlight>web development</Highlight>{' '}
            practices.
          </Paragraph>
        </GlassCard>

        {/* Expertise Cards Grid */}
        <ExpertiseGrid
          as={motion.div}
          variants={prefersReduced ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ExpertiseCard variants={prefersReduced ? {} : cardVariants}>
            <h3>Frontend Expertise</h3>
            <p>React.js, JavaScript, HTML5, CSS3, Redux, Next.js, Material UI, Bootstrap</p>
          </ExpertiseCard>

          <ExpertiseCard variants={prefersReduced ? {} : cardVariants}>
            <h3>Backend Skills</h3>
            <p>Node.js, Express.js, MongoDB, PostgreSQL, GraphQL, REST APIs</p>
          </ExpertiseCard>

          <ExpertiseCard variants={prefersReduced ? {} : cardVariants}>
            <h3>Development Focus</h3>
            <p>Responsive Design, Web Performance, Scalable Architecture, Clean Code, UI/UX</p>
          </ExpertiseCard>
        </ExpertiseGrid>

        {/* Social Media Links (using upgraded AboutStyle) */}
        <SocialWrapper>
          <span>Connect with me</span>
          <SocialMediaIcons>
            <SocialMediaIcon href="https://github.com/usmannmurtazaa" aria-label="GitHub">
              <FaGithub />
            </SocialMediaIcon>
            <SocialMediaIcon href="https://linkedin.com/in/usmannmurtazaa" aria-label="LinkedIn">
              <FaLinkedin />
            </SocialMediaIcon>
            <SocialMediaIcon href="https://twitter.com/usman_murtazaa" aria-label="Twitter">
              <FaTwitter />
            </SocialMediaIcon>
          </SocialMediaIcons>
        </SocialWrapper>
      </Container>
    </AboutSection>
  );
};

export default About;
