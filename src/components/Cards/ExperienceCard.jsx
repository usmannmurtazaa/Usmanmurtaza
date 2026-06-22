import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useReducedMotion, springTransition } from '../../motionConfig';

/* ---------- Glassmorphism + Design Tokens ---------- */

const Card = styled(motion.div)`
  width: 100%;
  max-width: 650px;
  border-radius: 1.25rem;
  padding: 20px 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  box-shadow: var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.4));
  transition:
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow:
      var(--shadow-md, 0 8px 30px rgba(0, 0, 0, 0.6)),
      0 0 20px rgba(139, 92, 246, 0.15);
  }

  &:hover ${() => Document} {
    display: flex;
  }

  &:hover ${() => Span} {
    overflow: visible;
    -webkit-line-clamp: unset;
  }

  @media only screen and (max-width: 768px) {
    padding: 16px 18px;
    gap: 10px;
    max-width: 100%;
  }
`;

const Document = styled.img`
  display: none;
  height: 70px;
  width: fit-content;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: opacity 0.2s ease;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Span = styled.span`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: var(--text-secondary, #a0a0b8);
  margin-bottom: 10px;
  line-height: 1.6;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const Image = styled.img`
  height: 56px;
  width: 56px;
  object-fit: cover;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media only screen and (max-width: 768px) {
    height: 44px;
    width: 44px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Role = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary, #f2f2f7);
  line-height: 1.3;

  @media only screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary, #a0a0b8);
  line-height: 1.4;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Date = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: var(--text-secondary, #a0a0b8);
  opacity: 0.8;
  margin-top: 2px;

  @media only screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const Skills = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;
  align-items: center;
`;

const SkillLabel = styled.strong`
  color: var(--accent-glow, #8b5cf6);
  font-weight: 600;
  font-size: 14px;
  margin-right: 4px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
`;

const Skill = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary, #a0a0b8);
  list-style: none;

  &::before {
    content: '•';
    color: var(--accent-glow, #8b5cf6);
    margin-right: 4px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ExperienceCard = ({ experience }) => {
  const prefersReduced = useReducedMotion();

  // Motion props for subtle hover lift (respects reduced motion)
  const motionProps = prefersReduced
    ? {}
    : {
        whileHover: { y: -4, transition: springTransition },
        whileTap: { scale: 0.99 },
      };

  return (
    <Card {...motionProps}>
      <Top>
        <Image src={experience.img} alt={`${experience.company} logo`} loading="lazy" />
        <Body>
          <Role>{experience.role}</Role>
          <Company>{experience.company}</Company>
          <Date>{experience.date}</Date>
        </Body>
      </Top>

      <Description>
        {experience?.desc && <Span>{experience.desc}</Span>}

        {experience?.skills?.length > 0 && (
          <Skills>
            <SkillLabel>Skills:</SkillLabel>
            <ItemWrapper>
              {experience.skills.map((skill, index) => (
                <Skill key={index}>{skill}</Skill>
              ))}
            </ItemWrapper>
          </Skills>
        )}
      </Description>

      {experience?.doc && (
        <a
          href={experience.doc}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Document for ${experience.company}`}
        >
          <Document
            src={experience.doc}
            alt={`Certificate or document for ${experience.company}`}
            loading="lazy"
          />
        </a>
      )}
    </Card>
  );
};

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    img: PropTypes.string,
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    date: PropTypes.string,
    desc: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    doc: PropTypes.string,
  }).isRequired,
};

export default ExperienceCard;
