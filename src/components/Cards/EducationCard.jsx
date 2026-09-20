import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useReducedMotion, springTransition } from '../../motionConfig';

/* Derive a .webp path from a raster image path.
   Used to prefer WebP when a matching file exists in public/. */
const toWebp = src => (src ? src.replace(/\.(png|jpe?g|jfif)$/i, '.webp') : '');

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

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary, #f2f2f7);
  line-height: 1.3;

  @media only screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const Degree = styled.div`
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

const Grade = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary, #a0a0b8);
  padding: 4px 12px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 8px;
  display: inline-block;
  width: fit-content;

  strong {
    color: var(--accent-glow, #8b5cf6);
    font-weight: 600;
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
    padding: 3px 10px;
  }
`;

const EducationCard = ({ education }) => {
  const prefersReduced = useReducedMotion();

  const motionProps = prefersReduced
    ? {}
    : {
        whileHover: { y: -4, transition: springTransition },
        whileTap: { scale: 0.99 },
      };

  return (
    <Card {...motionProps}>
      <Top>
        {/* Education logo. The <source> prefers a .webp variant when it
            exists in public/ (ilma_logo.webp, APS_Logo.webp,
            fazaia_logo.webp). The <Image> file is used as a fallback. */}
        <picture>
          <source srcSet={toWebp(education.img)} type="image/webp" />
          <Image
            src={education.img}
            alt={`${education.school} logo`}
            loading="lazy"
            decoding="async"
          />
        </picture>
        <Body>
          <Name>{education.school}</Name>
          <Degree>{education.degree}</Degree>
          <Date>{education.date}</Date>
        </Body>
      </Top>
      <Grade>
        <strong>Grade:</strong> {education.grade}
      </Grade>
      <Description>
        <Span>{education.desc}</Span>
      </Description>
    </Card>
  );
};

EducationCard.propTypes = {
  education: PropTypes.shape({
    img: PropTypes.string,
    school: PropTypes.string.isRequired,
    degree: PropTypes.string,
    date: PropTypes.string,
    grade: PropTypes.string,
    desc: PropTypes.string,
  }).isRequired,
};

export default EducationCard;
