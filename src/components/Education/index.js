import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { education } from '../../data/constants';
import TimelineDot from '@mui/lab/TimelineDot';
import EducationCard from '../Cards/EducationCard';
import { useReducedMotion, fadeInUpVariants } from '../../motionConfig';
import { Icon } from '../common/Icon';

/* ---------- Styled Components (Glassmorphism) ---------- */

const Section = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 80px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(12, 12, 29, 0.4);

  @media (max-width: 960px) {
    padding: 60px 0;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1000px;
  margin-top: 60px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 40px;
    margin-bottom: 30px;
  }
`;

const StatCard = styled(motion.div)`
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  border-radius: 1.25rem;
  padding: 2rem;
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

const StatTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const StatDesc = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const TimelineContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const SkillsHighlight = styled(motion.div)`
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

const SkillsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.25);
    transform: translateY(-2px);
  }
`;

const SkillIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
`;

const SkillText = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
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

const Education = () => {
  const prefersReduced = useReducedMotion();

  return (
    <Section id="education" aria-labelledby="education-heading">
      <Wrapper>
        <Title
          className="gradient-text"
          id="education-heading"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Education & Academic Journey
        </Title>

        <Subtitle
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Building a Foundation for Modern Web Development
        </Subtitle>

        <Desc
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          My academic path has been carefully crafted to support my career as a{' '}
          <strong>Full Stack Developer</strong>, combining formal education with hands‑on learning
          in <strong>web technologies</strong>, <strong>computer science fundamentals</strong>, and{' '}
          <strong>software engineering principles</strong>. Currently pursuing a{' '}
          <strong>BSCS degree</strong> while actively building real‑world <strong>React.js</strong>{' '}
          and <strong>JavaScript projects</strong>.
        </Desc>

        {/* Stats Cards */}
        <StatsGrid
          as={motion.div}
          variants={prefersReduced ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <StatCard variants={prefersReduced ? {} : cardVariants}>
            <StatTitle>
              <IconWrapper aria-hidden="true">
                <Icon name="GraduationCap" size={24} color="#8b5cf6" />
              </IconWrapper>
              Current Degree
            </StatTitle>
            <StatValue>BSCS</StatValue>
            <StatDesc>
              Bachelor of Science in Computer Science – Focus on Full Stack Development & Machine
              Learning
            </StatDesc>
          </StatCard>

          <StatCard variants={prefersReduced ? {} : cardVariants}>
            <StatTitle>
              <IconWrapper aria-hidden="true">
                <Icon name="BookOpen" size={24} color="#8b5cf6" />
              </IconWrapper>
              Academic Focus
            </StatTitle>
            <StatValue>Web Tech</StatValue>
            <StatDesc>
              Specializing in Modern Web Development, Responsive Design, and Scalable Architecture
            </StatDesc>
          </StatCard>

          <StatCard variants={prefersReduced ? {} : cardVariants}>
            <StatTitle>
              <IconWrapper aria-hidden="true">
                <Icon name="Zap" size={24} color="#8b5cf6" />
              </IconWrapper>
              Learning Approach
            </StatTitle>
            <StatValue>Hands‑On</StatValue>
            <StatDesc>
              Combining academic theory with practical project development in real‑world scenarios
            </StatDesc>
          </StatCard>
        </StatsGrid>

        {/* Timeline */}
        <TimelineContainer>
          <Timeline position="alternate">
            {education.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineContent sx={{ py: '20px', px: 2 }}>
                  <EducationCard education={item} />
                </TimelineContent>
                <TimelineSeparator>
                  <TimelineDot
                    variant={item.date.includes('Present') ? 'filled' : 'outlined'}
                    color="secondary"
                    sx={{
                      width: 20,
                      height: 20,
                      boxShadow: item.date.includes('Present')
                        ? '0 0 0 4px rgba(139, 92, 246, 0.2)'
                        : 'none',
                    }}
                  />
                  {index !== education.length - 1 && (
                    <TimelineConnector
                      sx={{
                        background: 'linear-gradient(180deg, #8b5cf6 0%, #3b82f6 100%)',
                      }}
                    />
                  )}
                </TimelineSeparator>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineContainer>

        {/* Skills Highlight */}
        <SkillsHighlight
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <SkillsTitle className="gradient-text">
            {' '}
            Academic Skills & Technologies Mastered{' '}
          </SkillsTitle>
          <SkillsGrid>
            <SkillItem>
              <SkillIcon aria-hidden="true">
                <Icon name="React" size={22} color="#8b5cf6" />
              </SkillIcon>
              <SkillText>React.js & Frontend Development</SkillText>
            </SkillItem>
            <SkillItem>
              <SkillIcon aria-hidden="true">
                <Icon name="Code" size={22} color="#8b5cf6" />
              </SkillIcon>
              <SkillText>Full Stack Architecture</SkillText>
            </SkillItem>
            <SkillItem>
              <SkillIcon aria-hidden="true">
                <Icon name="Palette" size={22} color="#8b5cf6" />
              </SkillIcon>
              <SkillText>UI/UX & Responsive Design</SkillText>
            </SkillItem>
            <SkillItem>
              <SkillIcon aria-hidden="true">
                <Icon name="Zap" size={22} color="#8b5cf6" />
              </SkillIcon>
              <SkillText>Web Performance Optimization</SkillText>
            </SkillItem>
            <SkillItem>
              <SkillIcon aria-hidden="true">
                <Icon name="Globe" size={22} color="#8b5cf6" />
              </SkillIcon>
              <SkillText>Modern Web Technologies</SkillText>
            </SkillItem>
            <SkillItem>
              <SkillIcon aria-hidden="true">
                <Icon name="Lightbulb" size={22} color="#8b5cf6" />
              </SkillIcon>
              <SkillText>Problem Solving & Algorithms</SkillText>
            </SkillItem>
          </SkillsGrid>
        </SkillsHighlight>
      </Wrapper>
    </Section>
  );
};

export default Education;
