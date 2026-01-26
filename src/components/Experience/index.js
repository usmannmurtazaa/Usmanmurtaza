import React from 'react';
import styled from 'styled-components';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard';
import { experiences } from '../../data/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 100px 0px 100px 0px;
  @media (max-width: 960px) {
    padding: 60px 0px 120px 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 20px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 0px 16px;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 36px;
  }
  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.div`
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 800px;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
    padding: 0px 16px;
  }
`;

const TimelineSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const StatsSection = styled.div`
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

const StatCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(133, 76, 230, 0.15);
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const StatIcon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
`;

const ExpertiseSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 60px;
  padding: 40px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.bgLight} 0%,
    ${({ theme }) => theme.card} 100%
  );
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.primary + '20'};

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin-top: 40px;
  }
`;

const ExpertiseTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const ExpertiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ExpertiseItem = styled.div`
  padding: 25px;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.primary};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + '10'};
    transform: translateY(-3px);
  }
`;

const ExpertiseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const ExpertiseIcon = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.primary};
`;

const ExpertiseName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ExpertiseDesc = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
`;

const Experience = () => {
  // Calculate experience stats
  const totalYears = new Date().getFullYear() - 2023; // Since first experience in 2023
  // const projectCount = 3; // From your projects
  // const techStackCount = 15; // Approximate from skills

  return (
    <Container id="experience">
      <Wrapper>
        <Title>Professional Experience</Title>
        <Subtitle>Building Digital Solutions Across Industries</Subtitle>
        <Desc>
          As a <strong>Full Stack Developer</strong> and <strong>React.js Specialist</strong>,
          I&apos;ve delivered
          <strong> responsive web applications</strong>, <strong>e-commerce platforms</strong>, and
          <strong> educational software</strong> for diverse clients. My experience spans from
          <strong> freelancing projects</strong> to <strong>technical education</strong>, focusing
          on
          <strong> modern UI development</strong>, <strong>web performance optimization</strong>,
          and scalable <strong>JavaScript</strong> solutions.
        </Desc>

        <StatsSection>
          <StatCard>
            <StatIcon>📅</StatIcon>
            <StatValue>{totalYears}+ Years</StatValue>
            <StatLabel>
              Professional experience in <strong>web development</strong> and
              <strong> full stack solutions</strong>
            </StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon>🚀</StatIcon>
            <StatValue>10+ Projects</StatValue>
            <StatLabel>
              Delivered including <strong>React.js applications</strong>,
              <strong> e-commerce</strong>, and <strong>management systems</strong>
            </StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon>⚡</StatIcon>
            <StatValue>15+ Technologies</StatValue>
            <StatLabel>
              Mastered across <strong>frontend</strong>, <strong>backend</strong>, and{' '}
              <strong>dev tools</strong> ecosystem
            </StatLabel>
          </StatCard>
        </StatsSection>

        <TimelineSection>
          <Timeline position="alternate">
            {experiences.map((experience, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot
                    variant={experience.date.includes('Present') ? 'filled' : 'outlined'}
                    color="secondary"
                    sx={{
                      width: 20,
                      height: 20,
                      boxShadow: experience.date.includes('Present')
                        ? '0 0 0 4px rgba(133, 76, 230, 0.2)'
                        : 'none',
                    }}
                  />
                  {index !== experiences.length - 1 && (
                    <TimelineConnector
                      sx={{
                        background: 'linear-gradient(180deg, #854CE6 0%, #4A21B3 100%)',
                        height: '60px',
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '20px', px: 2 }}>
                  <ExperienceCard experience={experience} />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineSection>

        <ExpertiseSection>
          <ExpertiseTitle>Core Development Expertise</ExpertiseTitle>
          <ExpertiseGrid>
            <ExpertiseItem>
              <ExpertiseHeader>
                <ExpertiseIcon>⚛️</ExpertiseIcon>
                <ExpertiseName>Frontend Development</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                Building responsive, high-performance user interfaces with <strong>React.js</strong>
                ,<strong> JavaScript</strong>, and modern frameworks. Expertise in{' '}
                <strong>state management</strong>,<strong> component architecture</strong>, and{' '}
                <strong>UI/UX best practices</strong>.
              </ExpertiseDesc>
            </ExpertiseItem>

            <ExpertiseItem>
              <ExpertiseHeader>
                <ExpertiseIcon>🔧</ExpertiseIcon>
                <ExpertiseName>Backend Development</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                Creating robust server-side solutions with <strong>Node.js</strong>,{' '}
                <strong>Express</strong>, and databases like <strong>MongoDB</strong> &{' '}
                <strong>PostgreSQL</strong>. Focus on
                <strong> API design</strong>, <strong>authentication</strong>, and
                <strong> database optimization</strong>.
              </ExpertiseDesc>
            </ExpertiseItem>

            <ExpertiseItem>
              <ExpertiseHeader>
                <ExpertiseIcon>🎯</ExpertiseIcon>
                <ExpertiseName>Project Delivery</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                End-to-end project execution from concept to deployment. Experience with
                <strong> e-commerce platforms</strong>, <strong>project management tools</strong>,
                and
                <strong> educational software</strong> with focus on <strong>scalability</strong>{' '}
                and
                <strong> user experience</strong>.
              </ExpertiseDesc>
            </ExpertiseItem>
          </ExpertiseGrid>
        </ExpertiseSection>
      </Wrapper>
    </Container>
  );
};

export default Experience;
