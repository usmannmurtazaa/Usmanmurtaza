import React from 'react';
import styled from 'styled-components';
import { skills } from '../../data/constants';

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

  strong {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
    padding: 0px 16px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 30px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const Skill = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary + '30'};
  box-shadow: 0 8px 32px rgba(23, 92, 230, 0.12);
  border-radius: 20px;
  padding: 40px 36px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary} 0%,
      ${({ theme }) => theme.primary + '80'} 100%
    );
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(133, 76, 230, 0.2);
    border-color: ${({ theme }) => theme.primary + '60'};
  }

  @media (max-width: 768px) {
    padding: 30px 24px;
  }
`;

const SkillTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &:after {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.primary}, transparent);
  }

  &:before {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.primary}, transparent);
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 25px;
  }
`;

const SkillList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 14px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
  }
`;

const SkillItem = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  border-radius: 12px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: ${({ theme }) => theme.primary + '10'};
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(133, 76, 230, 0.15);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 14px 10px;
    gap: 10px;
  }
`;

const SkillImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  transition: transform 0.3s ease;

  ${SkillItem}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

const SkillName = styled.div`
  font-weight: 500;
`;

const SkillLevel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

const SkillDots = styled.div`
  display: flex;
  gap: 3px;
`;

const SkillDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active, theme }) => (active ? theme.primary : theme.text_secondary + '40')};
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
  margin-bottom: 25px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const ExpertiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ExpertiseItem = styled.div`
  padding: 25px;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 16px;
  border-left: 4px solid ${({ theme }) => theme.primary};

  @media (max-width: 768px) {
    padding: 20px;
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

  strong {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }
`;

const Skills = () => {
  // Define skill levels for key technologies
  const skillLevels = {
    'React Js': 5,
    JavaScript: 5,
    'Node Js': 4,
    'Next Js': 4,
    HTML: 5,
    CSS: 5,
    MongoDB: 4,
    PostgreSQL: 3,
    'Express Js': 4,
    Redux: 4,
    Git: 4,
    GraphQL: 3,
  };

  const getSkillDots = skillName => {
    const level = skillLevels[skillName] || 3;
    return Array(5)
      .fill(null)
      .map((_, i) => i < level);
  };

  return (
    <Container id="skills">
      <Wrapper>
        <Title>Technical Skills & Expertise</Title>
        <Subtitle>Mastering Modern Web Technologies</Subtitle>
        <Desc>
          With expertise spanning the full web development stack, I specialize in building
          <strong> high-performance applications</strong> using cutting-edge technologies. My{' '}
          <strong>frontend development</strong> skills focus on <strong>React.js</strong> and modern
          JavaScript, while my <strong>backend expertise</strong> includes <strong>Node.js</strong>,
          <strong> database management</strong>, and <strong>API development</strong>. I prioritize{' '}
          <strong>web performance optimization</strong> and
          <strong> responsive design</strong> in every project.
        </Desc>

        <SkillsContainer>
          {skills.map((skill, index) => (
            <Skill key={index}>
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillList>
                {skill.skills.map((item, i) => (
                  <SkillItem key={i}>
                    <SkillImage
                      src={item.image}
                      alt={`${item.name} skill icon`}
                      title={item.name}
                      loading="lazy"
                    />
                    <SkillName>{item.name}</SkillName>
                    {skillLevels[item.name] && (
                      <SkillLevel>
                        <SkillDots>
                          {getSkillDots(item.name).map((active, dotIndex) => (
                            <SkillDot key={dotIndex} active={active} />
                          ))}
                        </SkillDots>
                      </SkillLevel>
                    )}
                  </SkillItem>
                ))}
              </SkillList>
            </Skill>
          ))}
        </SkillsContainer>

        <ExpertiseSection>
          <ExpertiseTitle>Development Focus Areas</ExpertiseTitle>
          <ExpertiseGrid>
            <ExpertiseItem>
              <ExpertiseHeader>
                <ExpertiseIcon>⚛️</ExpertiseIcon>
                <ExpertiseName>Frontend Engineering</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                Building responsive, interactive user interfaces with <strong>React.js</strong>,
                <strong> TypeScript</strong>, and modern CSS. Expertise in{' '}
                <strong>state management</strong>,<strong> component architecture</strong>, and{' '}
                <strong>performance optimization</strong>
                for seamless user experiences.
              </ExpertiseDesc>
            </ExpertiseItem>

            <ExpertiseItem>
              <ExpertiseHeader>
                <ExpertiseIcon>🔧</ExpertiseIcon>
                <ExpertiseName>Backend Development</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                Creating robust server-side solutions with <strong>Node.js</strong> and{' '}
                <strong>Express</strong>. Experience with <strong>REST APIs</strong>,{' '}
                <strong>database design</strong>,<strong> authentication systems</strong>, and
                scalable architecture patterns.
              </ExpertiseDesc>
            </ExpertiseItem>

            <ExpertiseItem>
              <ExpertiseHeader>
                <ExpertiseIcon>🎨</ExpertiseIcon>
                <ExpertiseName>UI/UX & Design</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                Crafting visually appealing, user-friendly interfaces with focus on
                <strong> responsive design</strong>, <strong>accessibility</strong>, and
                <strong> modern UI patterns</strong>. Proficient in <strong>CSS frameworks</strong>
                and design systems.
              </ExpertiseDesc>
            </ExpertiseItem>
          </ExpertiseGrid>
        </ExpertiseSection>
      </Wrapper>
    </Container>
  );
};

export default Skills;
