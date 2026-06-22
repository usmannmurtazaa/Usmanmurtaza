import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard';
import { experiences } from '../../data/constants';
import { useReducedMotion, fadeInUpVariants } from '../../motionConfig';
import { Icon } from '../common/Icon';

/* ---------- Styled Components (Glassmorphism + Design System) ---------- */

const Section = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 100px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(12, 12, 29, 0.4);

  @media (max-width: 960px) {
    padding: 60px 0 120px;
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
  margin-bottom: 10px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Desc = styled(motion.p)`
  font-size: 1.125rem;
  text-align: center;
  max-width: 800px;
  margin-bottom: 50px;
  color: var(--text-secondary);
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 40px;
    padding: 0 16px;
  }
`;

const StatsSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 40px;
  }
`;

const StatCard = styled(motion.div)`
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  border-radius: 1.25rem;
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.4));
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow:
      var(--shadow-md, 0 8px 30px rgba(0, 0, 0, 0.6)),
      0 0 20px rgba(139, 92, 246, 0.25);
    transform: translateY(-4px);
  }
`;

const StatIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const TimelineContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ExpertiseSection = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  margin-top: 60px;
  padding: 2.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-top: 40px;
  }
`;

const ExpertiseTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ExpertiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const ExpertiseItem = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 4px solid var(--accent-glow, #8b5cf6);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.25);
    transform: translateY(-3px);
  }
`;

const ExpertiseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const ExpertiseIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ExpertiseName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const ExpertiseDesc = styled.div`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
`;

/* ---------- Animation Variants ---------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Experience = () => {
  const prefersReduced = useReducedMotion();
  const totalYears = new Date().getFullYear() - 2023;

  return (
    <Section id="experience" aria-labelledby="experience-heading">
      <Wrapper>
        <Title
          className="gradient-text"
          id="experience-heading"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Professional Experience
        </Title>

        <Subtitle
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Building Digital Solutions Across Industries
        </Subtitle>

        <Desc
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          As a <strong>Full Stack Developer</strong> and <strong>React.js Specialist</strong>,
          I&apos;ve delivered <strong>responsive web applications</strong>,{' '}
          <strong>e-commerce platforms</strong>, and <strong>educational software</strong> for
          diverse clients. My experience spans from <strong>freelancing projects</strong> to{' '}
          <strong>technical education</strong>, focusing on <strong>modern UI development</strong>,{' '}
          <strong>web performance optimization</strong>, and scalable <strong>JavaScript</strong>{' '}
          solutions.
        </Desc>

        {/* Stats Cards */}
        <StatsSection
          variants={prefersReduced ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <StatCard variants={prefersReduced ? {} : cardVariants}>
            <StatIcon aria-hidden="true">
              <Icon name="Calendar" size={32} color="#8b5cf6" />
            </StatIcon>
            <StatValue>{totalYears}+ Years</StatValue>
            <StatLabel>
              Professional experience in <strong>web development</strong> and{' '}
              <strong>full stack solutions</strong>
            </StatLabel>
          </StatCard>

          <StatCard variants={prefersReduced ? {} : cardVariants}>
            <StatIcon aria-hidden="true">
              <Icon name="Rocket" size={32} color="#8b5cf6" />
            </StatIcon>
            <StatValue>10+ Projects</StatValue>
            <StatLabel>
              Delivered including <strong>React.js applications</strong>,{' '}
              <strong>e-commerce</strong>, and <strong>management systems</strong>
            </StatLabel>
          </StatCard>

          <StatCard variants={prefersReduced ? {} : cardVariants}>
            <StatIcon aria-hidden="true">
              <Icon name="Zap" size={32} color="#8b5cf6" />
            </StatIcon>
            <StatValue>15+ Technologies</StatValue>
            <StatLabel>
              Mastered across <strong>frontend</strong>, <strong>backend</strong>, and{' '}
              <strong>dev tools</strong> ecosystem
            </StatLabel>
          </StatCard>
        </StatsSection>

        {/* Timeline */}
        <TimelineContainer>
          <Timeline position="alternate">
            {experiences.map((exp, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot
                    variant={exp.date.includes('Present') ? 'filled' : 'outlined'}
                    color="secondary"
                    sx={{
                      width: 20,
                      height: 20,
                      boxShadow: exp.date.includes('Present')
                        ? '0 0 0 4px rgba(139, 92, 246, 0.2)'
                        : 'none',
                    }}
                  />
                  {index !== experiences.length - 1 && (
                    <TimelineConnector
                      sx={{
                        background: 'linear-gradient(180deg, #8b5cf6 0%, #3b82f6 100%)',
                        height: '60px',
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '20px', px: 2 }}>
                  <ExperienceCard experience={exp} />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineContainer>

        {/* Expertise Section */}
        <ExpertiseSection
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <ExpertiseTitle className="gradient-text">Core Development Expertise</ExpertiseTitle>
          <ExpertiseGrid>
            <ExpertiseItem>
              <ExpertiseHeader>
                <ExpertiseIcon aria-hidden="true">
                  <Icon name="React" size={28} color="#8b5cf6" />
                </ExpertiseIcon>
                <ExpertiseName>Frontend Development</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                Building responsive, high-performance user interfaces with <strong>React.js</strong>
                , <strong>JavaScript</strong>, and modern frameworks. Expertise in{' '}
                <strong>state management</strong>, <strong>component architecture</strong>, and{' '}
                <strong>UI/UX best practices</strong>.
              </ExpertiseDesc>
            </ExpertiseItem>

            <ExpertiseItem>
              <ExpertiseHeader>
                <ExpertiseIcon aria-hidden="true">
                  <Icon name="Server" size={28} color="#8b5cf6" />
                </ExpertiseIcon>
                <ExpertiseName>Backend Development</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                Creating robust server-side solutions with <strong>Node.js</strong>,{' '}
                <strong>Express</strong>, and databases like <strong>MongoDB</strong> &{' '}
                <strong>PostgreSQL</strong>. Focus on <strong>API design</strong>,{' '}
                <strong>authentication</strong>, and <strong>database optimization</strong>.
              </ExpertiseDesc>
            </ExpertiseItem>

            <ExpertiseItem>
              <ExpertiseHeader>
                <ExpertiseIcon aria-hidden="true">
                  <Icon name="Target" size={28} color="#8b5cf6" />
                </ExpertiseIcon>
                <ExpertiseName>Project Delivery</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                End-to-end project execution from concept to deployment. Experience with{' '}
                <strong>e-commerce platforms</strong>, <strong>project management tools</strong>,
                and <strong>educational software</strong> with focus on <strong>scalability</strong>{' '}
                and <strong>user experience</strong>.
              </ExpertiseDesc>
            </ExpertiseItem>
          </ExpertiseGrid>
        </ExpertiseSection>
      </Wrapper>
    </Section>
  );
};

export default Experience;
