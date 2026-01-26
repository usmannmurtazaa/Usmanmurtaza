import React from 'react';
import styled from 'styled-components';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { education } from '../../data/constants';
import TimelineDot from '@mui/lab/TimelineDot';
import EducationCard from '../Cards/EducationCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 100px 0px 80px 0px;
  @media (max-width: 960px) {
    padding: 60px 0px;
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
    margin-bottom: 8px;
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
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  @media (max-width: 660px) {
    align-items: center;
  }
`;

const EducationStats = styled.div`
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

const StatCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(133, 76, 230, 0.15);
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const StatTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const StatDesc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
`;

const IconWrapper = styled.div`
  font-size: 24px;
`;

const SkillsHighlight = styled.div`
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

const SkillsTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + '10'};
    transform: translateX(5px);
  }
`;

const SkillIcon = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
`;

const SkillText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Education = () => {
  // Calculate current education level
  // const currentEducation = education.find(edu => edu.date.includes('Present')) || education[0];
  // const totalYears = 4;

  return (
    <Container id="education">
      <Wrapper>
        <Title>Education & Academic Journey</Title>
        <Subtitle>Building a Foundation for Modern Web Development</Subtitle>
        <Desc>
          My academic path has been carefully crafted to support my career as a{' '}
          <strong>Full Stack Developer</strong>, combining formal education with hands-on learning
          in <strong>web technologies</strong>,<strong> computer science fundamentals</strong>, and{' '}
          <strong>software engineering principles</strong>. Currently pursuing a{' '}
          <strong>BSCS degree</strong> while actively building real-world <strong>React.js</strong>
          and <strong>JavaScript projects</strong>.
        </Desc>

        <EducationStats>
          <StatCard>
            <StatTitle>
              <IconWrapper>🎓</IconWrapper>
              Current Degree
            </StatTitle>
            <StatValue>BSCS</StatValue>
            <StatDesc>
              Bachelor of Science in Computer Science - Focus on Full Stack Development & Machine
              Learning
            </StatDesc>
          </StatCard>

          <StatCard>
            <StatTitle>
              <IconWrapper>📚</IconWrapper>
              Academic Focus
            </StatTitle>
            <StatValue>Web Tech</StatValue>
            <StatDesc>
              Specializing in Modern Web Development, Responsive Design, and Scalable Architecture
            </StatDesc>
          </StatCard>

          <StatCard>
            <StatTitle>
              <IconWrapper>⚡</IconWrapper>
              Learning Approach
            </StatTitle>
            <StatValue>Hands-On</StatValue>
            <StatDesc>
              Combining academic theory with practical project development in real-world scenarios
            </StatDesc>
          </StatCard>
        </EducationStats>

        <TimelineSection>
          <Timeline position="alternate">
            {education.map((educationItem, index) => (
              <TimelineItem key={index}>
                <TimelineContent sx={{ py: '20px', px: 2 }}>
                  <EducationCard education={educationItem} />
                </TimelineContent>
                <TimelineSeparator>
                  <TimelineDot
                    variant={educationItem.date.includes('Present') ? 'filled' : 'outlined'}
                    color="secondary"
                    sx={{
                      width: 20,
                      height: 20,
                      boxShadow: educationItem.date.includes('Present')
                        ? '0 0 0 4px rgba(133, 76, 230, 0.2)'
                        : 'none',
                    }}
                  />
                  {index !== education.length - 1 && (
                    <TimelineConnector
                      sx={{ background: 'linear-gradient(180deg, #854CE6 0%, #4A21B3 100%)' }}
                    />
                  )}
                </TimelineSeparator>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineSection>

        <SkillsHighlight>
          <SkillsTitle>Academic Skills & Technologies Mastered</SkillsTitle>
          <SkillsGrid>
            <SkillItem>
              <SkillIcon>⚛️</SkillIcon>
              <SkillText>React.js & Frontend Development</SkillText>
            </SkillItem>
            <SkillItem>
              <SkillIcon>💻</SkillIcon>
              <SkillText>Full Stack Architecture</SkillText>
            </SkillItem>
            <SkillItem>
              <SkillIcon>🎨</SkillIcon>
              <SkillText>UI/UX & Responsive Design</SkillText>
            </SkillItem>
            <SkillItem>
              <SkillIcon>🚀</SkillIcon>
              <SkillText>Web Performance Optimization</SkillText>
            </SkillItem>
            <SkillItem>
              <SkillIcon>📱</SkillIcon>
              <SkillText>Modern Web Technologies</SkillText>
            </SkillItem>
            <SkillItem>
              <SkillIcon>🔧</SkillIcon>
              <SkillText>Problem Solving & Algorithms</SkillText>
            </SkillItem>
          </SkillsGrid>
        </SkillsHighlight>
      </Wrapper>
    </Container>
  );
};

export default Education;
