import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Icon } from '../common/Icon';
import { useReducedMotion, springTransition } from '../../motionConfig';
import { trackEvent } from '../../analytics';

/* ---------- Glassmorphism + Design Tokens ---------- */

const Card = styled(motion.div)`
  width: 100%;
  max-width: ${({ featured }) => (featured ? '400px' : '350px')};
  min-height: ${({ featured }) => (featured ? '520px' : '490px')};
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  border-radius: 1.25rem;
  box-shadow: var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.4));
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  position: relative;
  cursor: pointer;
  margin: 0 auto; /* center inside grid cell */

  ${({ featured }) =>
    featured &&
    `
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: var(--shadow-md, 0 8px 30px rgba(0,0,0,0.6)), 0 0 20px rgba(139,92,246,0.2);
  `}

  &:hover {
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow:
      var(--shadow-md, 0 8px 30px rgba(0, 0, 0, 0.6)),
      0 0 30px rgba(139, 92, 246, 0.3);
  }

  @media (max-width: 480px) {
    max-width: 100%;
    min-height: auto;
    padding: 20px 16px;
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
  color: white;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    height: 150px;
  }
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: var(--accent-glow, #8b5cf6);
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  padding: 2px 10px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 2px;
  flex: 1;
`;

const Title = styled.div`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 600;
  color: var(--text-primary, #f2f2f7);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const KeyHighlight = styled.div`
  font-size: clamp(12px, 2vw, 14px);
  font-weight: 500;
  color: var(--accent-glow, #8b5cf6);
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: var(--text-secondary, #a0a0b8);
  opacity: 0.8;

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  font-weight: 400;
  font-size: clamp(13px, 2vw, 15px);
  color: var(--text-secondary, #a0a0b8);
  opacity: 0.9;
  overflow: hidden;
  margin-top: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  flex: 1;
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-top: auto;
  flex-wrap: wrap;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border: 2px solid var(--bg-glass, rgba(18, 18, 35, 0.6));
  object-fit: cover;

  &:first-child {
    margin-left: 0;
  }
`;

const ViewButton = styled.button`
  width: 100%;
  padding: 10px;
  background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
  color: white;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  box-shadow: 0 0 0 rgba(139, 92, 246, 0);

  ${Card}:hover & {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 25px rgba(139, 92, 246, 0.6);
  }
`;

const ProjectCard = ({ project, setOpenModal, isFeatured }) => {
  const prefersReduced = useReducedMotion();

  const handleClick = () => {
    trackEvent('click_project_card', 'portfolio', project.title);
    setOpenModal({ state: true, project });
  };

  const description = project.solution || project.description || '';

  const motionProps = prefersReduced
    ? {}
    : {
        whileHover: { y: -6, transition: springTransition },
        whileTap: { scale: 0.98 },
      };

  return (
    <Card featured={isFeatured ? 1 : 0} onClick={handleClick} {...motionProps}>
      {isFeatured && (
        <FeaturedBadge>
          <Icon name="star" size={14} /> Featured
        </FeaturedBadge>
      )}
      <Image src={project.image || project.img} alt={project.title} loading="lazy" />
      <Tags>
        {(project.tags || []).slice(0, 3).map((tag, idx) => (
          <Tag key={idx}>{tag}</Tag>
        ))}
      </Tags>
      <Details>
        <Title>{project.title}</Title>
        {project.keyHighlight && (
          <KeyHighlight>
            <Icon name="sparkles" size={14} /> {project.keyHighlight}
          </KeyHighlight>
        )}
        <Date>{project.date}</Date>
        <Description>{description}</Description>
      </Details>
      {project.member?.length > 0 && (
        <Members>
          {project.member.map((member, idx) => (
            <Avatar key={idx} src={member.img} alt={member.name || 'team member'} />
          ))}
        </Members>
      )}
      <ViewButton>
        View Project <Icon name="external" size={16} />
      </ViewButton>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    description: PropTypes.string,
    solution: PropTypes.string,
    image: PropTypes.string,
    img: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    member: PropTypes.arrayOf(
      PropTypes.shape({
        img: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    level: PropTypes.string,
    keyHighlight: PropTypes.string,
    categoryNormalized: PropTypes.string,
    complexityScore: PropTypes.number,
    links: PropTypes.object,
  }).isRequired,
  setOpenModal: PropTypes.func.isRequired,
  isFeatured: PropTypes.bool,
};

export default ProjectCard;
