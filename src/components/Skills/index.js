import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { skills } from '../../data/constants';
import { Icon } from '../common/Icon'; // ✅ named import
import {
  useReducedMotion,
  fadeInUpVariants,
  staggerContainer,
  springTransition,
} from '../../motionConfig';

/* ---------- Glassmorphism + Design Tokens ---------- */

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0 20px;
  gap: 12px;

  @media (max-width: 960px) {
    padding: 0 16px;
  }
`;

const Title = styled(motion.h2)`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const Desc = styled(motion.p)`
  font-size: 18px;
  text-align: center;
  max-width: 800px;
  margin-bottom: 50px;
  color: var(--text-secondary);
  line-height: 1.6;

  strong {
    color: var(--accent-glow, #8b5cf6);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
    padding: 0 16px;
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

const Skill = styled(motion.div)`
  width: 100%;
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  box-shadow: var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.4));
  border-radius: 1.5rem;
  padding: 40px 36px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--accent-gradient);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      var(--shadow-md, 0 8px 30px rgba(0, 0, 0, 0.6)),
      0 0 20px rgba(139, 92, 246, 0.25);
    border-color: rgba(139, 92, 246, 0.3);
  }

  @media (max-width: 768px) {
    padding: 30px 24px;
  }
`;

const SkillTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &::after,
  &::before {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-glow, #8b5cf6), transparent);
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

const SkillItem = styled(motion.div)`
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
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
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.25);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(139, 92, 246, 0.15);
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
  color: var(--text-secondary);
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
  background: ${({ $active }) =>
    $active ? 'var(--accent-glow, #8b5cf6)' : 'rgba(255,255,255,0.2)'};
`;

const ExpertiseSection = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  margin-top: 60px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin-top: 40px;
  }
`;

const ExpertiseTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
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

const ExpertiseItem = styled(motion.div)`
  padding: 25px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 16px;
  border-left: 4px solid var(--accent-glow, #8b5cf6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 4px solid var(--accent-glow, #8b5cf6); /* override left border */

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
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-glow, #8b5cf6);
`;

const ExpertiseName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
`;

const ExpertiseDesc = styled.div`
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;

  strong {
    color: var(--accent-glow, #8b5cf6);
    font-weight: 600;
  }
`;

/* ---------- Main Component ---------- */

const Skills = () => {
  const prefersReduced = useReducedMotion();

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
        <Title
          className="gradient-text"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Technical Skills & Expertise
        </Title>

        <Subtitle
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Mastering Modern Web Technologies
        </Subtitle>

        <Desc
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          With expertise spanning the full web development stack, I specialize in building
          <strong> high‑performance applications</strong> using cutting‑edge technologies. My{' '}
          <strong>frontend development</strong> skills focus on <strong>React.js</strong> and modern
          JavaScript, while my <strong>backend expertise</strong> includes <strong>Node.js</strong>,
          <strong> database management</strong>, and <strong>API development</strong>. I prioritize{' '}
          <strong>web performance optimization</strong> and
          <strong> responsive design</strong> in every project.
        </Desc>

        {/* ── Skills Grid with staggered children ── */}
        <SkillsContainer
          as={motion.div}
          variants={prefersReduced ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skills.map((skill, index) => (
            <Skill
              key={index}
              variants={prefersReduced ? {} : fadeInUpVariants}
              whileHover={prefersReduced ? {} : { y: -6, transition: springTransition }}
            >
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillList>
                {skill.skills.map((item, i) => (
                  <SkillItem
                    key={i}
                    whileHover={prefersReduced ? {} : { scale: 1.05, transition: springTransition }}
                  >
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
                            <SkillDot key={dotIndex} $active={active} />
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

        {/* ── Expertise Section ── */}
        <ExpertiseSection
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ExpertiseTitle className="gradient-text">Development Focus Areas</ExpertiseTitle>
          <ExpertiseGrid>
            <ExpertiseItem
              whileHover={prefersReduced ? {} : { y: -4, transition: springTransition }}
            >
              <ExpertiseHeader>
                <ExpertiseIcon>
                  <Icon name="atom" size={28} />
                </ExpertiseIcon>
                <ExpertiseName>Frontend Engineering</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                Building responsive, interactive user interfaces with <strong>React.js</strong>,{' '}
                <strong>TypeScript</strong>, and modern CSS. Expertise in{' '}
                <strong>state management</strong>, <strong>component architecture</strong>, and{' '}
                <strong>performance optimization</strong> for seamless user experiences.
              </ExpertiseDesc>
            </ExpertiseItem>

            <ExpertiseItem
              whileHover={prefersReduced ? {} : { y: -4, transition: springTransition }}
            >
              <ExpertiseHeader>
                <ExpertiseIcon>
                  <Icon name="wrench" size={28} />
                </ExpertiseIcon>
                <ExpertiseName>Backend Development</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                Creating robust server‑side solutions with <strong>Node.js</strong> and{' '}
                <strong>Express</strong>. Experience with <strong>REST APIs</strong>,{' '}
                <strong>database design</strong>, <strong>authentication systems</strong>, and
                scalable architecture patterns.
              </ExpertiseDesc>
            </ExpertiseItem>

            <ExpertiseItem
              whileHover={prefersReduced ? {} : { y: -4, transition: springTransition }}
            >
              <ExpertiseHeader>
                <ExpertiseIcon>
                  <Icon name="palette" size={28} />
                </ExpertiseIcon>
                <ExpertiseName>UI/UX & Design</ExpertiseName>
              </ExpertiseHeader>
              <ExpertiseDesc>
                Crafting visually appealing, user‑friendly interfaces with focus on{' '}
                <strong>responsive design</strong>, <strong>accessibility</strong>, and{' '}
                <strong>modern UI patterns</strong>. Proficient in <strong>CSS frameworks</strong>{' '}
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
