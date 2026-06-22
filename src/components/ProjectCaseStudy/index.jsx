import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Icon } from '../common/Icon';
import { useReducedMotion } from '../../motionConfig';
import { trackEvent } from '../../analytics';

/* ---------- Design Tokens (via global.css variables) ---------- */

const accent = 'var(--accent-glow, #8b5cf6)';
const accentGradient = 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))';
const textPrimary = 'var(--text-primary, #f2f2f7)';
const textSecondary = 'var(--text-secondary, #a0a0b8)';
const bgGlass = 'var(--bg-glass, rgba(18, 18, 35, 0.6))';
const borderGlass = 'var(--border-glass, rgba(255, 255, 255, 0.1))';
const shadowMd = 'var(--shadow-md, 0 8px 30px rgba(0,0,0,0.6))';
const shadowGlow = 'var(--shadow-glow, 0 0 20px rgba(139,92,246,0.25))';

/* ---------- Styled Components ---------- */

const Container = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 20px;
  z-index: 9999;
`;

const Wrapper = styled.div`
  max-width: 900px;
  width: 100%;
  border-radius: 20px;
  background: ${bgGlass};
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid ${borderGlass};
  color: ${textPrimary};
  padding: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: ${shadowMd}, ${shadowGlow};
  margin: 20px 0;
  max-height: 90vh;
  overflow-y: auto;

  @media only screen and (max-width: 768px) {
    padding: 20px;
    margin: 10px;
    border-radius: 16px;
  }
`;

const CloseButton = styled.button`
  position: sticky;
  top: 0;
  align-self: flex-end;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  padding: 6px;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${textPrimary};

  &:hover {
    background: ${accentGradient};
    color: white;
    transform: rotate(90deg);
    box-shadow: ${shadowGlow};
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 10px 0 8px 0;
  color: ${textPrimary};
  line-height: 1.3;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const Meta = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 14px;
  color: ${textSecondary};
  align-items: center;
`;

const Badge = styled.span`
  background: rgba(139, 92, 246, 0.12);
  padding: 4px 14px;
  border-radius: 20px;
  color: ${accent};
  font-weight: 600;
  font-size: 13px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const LevelIcon = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: ${textSecondary};
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const ComplexityBadge = styled.span`
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 14px;
  border-radius: 20px;
  color: ${textSecondary};
  font-weight: 500;
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const ImageContainer = styled.div`
  width: 100%;
  margin: 16px 0 20px 0;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: ${shadowMd};
`;

const Image = styled.img`
  width: 100%;
  height: 380px;
  object-fit: cover;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media only screen and (max-width: 768px) {
    height: 220px;
  }
`;

const Content = styled.div`
  margin: 8px 0;
`;

const Section = styled.div`
  margin-bottom: 28px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: ${textPrimary};
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background: ${accent};
    border-radius: 2px;
    flex-shrink: 0;
  }
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${textPrimary};
  margin: 0 0 6px 0;

  strong {
    color: ${accent};
    font-weight: 600;
  }

  @media only screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const StackList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
`;

const StackItem = styled.span`
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${textSecondary};
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${accent};
    color: ${accent};
    transform: translateY(-2px);
  }
`;

const ImpactBox = styled.div`
  background: rgba(139, 92, 246, 0.06);
  padding: 16px 20px;
  border-radius: 12px;
  border-left: 4px solid ${accent};
  font-weight: 500;
  color: ${textPrimary};
  line-height: 1.6;
  margin: 4px 0;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  background: ${({ $primary }) => ($primary ? accentGradient : 'rgba(255, 255, 255, 0.05)')};
  color: ${({ $primary }) => ($primary ? 'white' : textPrimary)};
  border: 1px solid ${({ $primary }) => ($primary ? 'transparent' : 'rgba(255, 255, 255, 0.1)')};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${shadowGlow};
    background: ${({ $primary }) =>
      $primary ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255, 255, 255, 0.08)'};
  }

  &:active {
    transform: translateY(-1px);
  }

  @media only screen and (max-width: 768px) {
    padding: 12px 20px;
    font-size: 14px;
    flex: 1;
    min-width: 140px;
    justify-content: center;
  }
`;

const MembersSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 12px;
`;

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadowGlow};
    border-color: rgba(139, 92, 246, 0.25);
  }
`;

const MemberImage = styled.img`
  width: 52px;
  height: 52px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid ${accent};
  flex-shrink: 0;
`;

const MemberInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MemberName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${textPrimary};
  margin-bottom: 2px;
`;

const MemberRole = styled.div`
  font-size: 13px;
  color: ${textSecondary};
`;

const MemberLinks = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;
`;

const MemberLink = styled.a`
  color: ${textSecondary};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: ${accent};
    transform: translateY(-2px);
  }
`;

/* ---------- Animation Variants ---------- */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

/* ---------- Component ---------- */

const ProjectCaseStudy = ({ openModal, setOpenModal }) => {
  const prefersReduced = useReducedMotion();
  const project = openModal?.project;

  if (!project) return null;

  const handleClose = () => {
    setOpenModal({ state: false, project: null });
  };

  const handleContainerClick = e => {
    e.stopPropagation();
  };

  // Analytics wrappers
  const handleLiveClick = () => {
    trackEvent('click_live_demo', 'project_case_study', project.title);
  };

  const handleGithubClick = () => {
    trackEvent('click_source_code', 'project_case_study', project.title);
  };

  const title = project.title || 'Project';
  const description = project.solution || project.description || '';
  const problem = project.problem || '';
  const technicalChallenge = project.technicalChallenge || '';
  const myRole = project.myRole || '';
  const stack = project.stack || project.tags || [];
  const impact = project.impact || '';
  const image = project.image || project.img || '';
  const links = project.links || {};
  const liveUrl = links.live || project.webapp || '';
  const githubUrl = links.github || project.github || '';
  const category = project.categoryNormalized || project.category || 'Project';
  const level = project.level || 'secondary';
  const complexity = project.complexityScore || null;
  const members = project.member || [];

  const levelLabels = {
    featured: 'Featured',
    secondary: 'Secondary',
    utility: 'Utility',
  };

  return (
    <AnimatePresence>
      {openModal.state && (
        <Container
          key="modal-overlay"
          variants={prefersReduced ? {} : overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose}
        >
          <Wrapper
            as={motion.div}
            variants={prefersReduced ? {} : cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleContainerClick}
          >
            <CloseButton onClick={handleClose} aria-label="Close project details">
              <Icon name="x" size={28} />
            </CloseButton>

            <Title>{title}</Title>

            <Meta>
              <Badge>{category}</Badge>
              {level && level !== 'utility' && (
                <LevelIcon>
                  <Icon
                    name={level === 'featured' ? 'star' : 'folder'}
                    size={14}
                    color="currentColor"
                  />
                  {levelLabels[level] || level}
                </LevelIcon>
              )}
              {project.date && <span>• {project.date}</span>}
              {complexity && (
                <ComplexityBadge>
                  <Icon name="activity" size={14} /> Complexity: {complexity}/10
                </ComplexityBadge>
              )}
            </Meta>

            {image && (
              <ImageContainer>
                <Image src={image} alt={`${title} - Project Screenshot`} loading="lazy" />
              </ImageContainer>
            )}

            <Content>
              {problem && (
                <Section>
                  <SectionTitle>
                    <Icon name="alert-circle" size={20} /> Problem
                  </SectionTitle>
                  <Text>{problem}</Text>
                </Section>
              )}

              {description && (
                <Section>
                  <SectionTitle>
                    <Icon name="lightbulb" size={20} /> Solution
                  </SectionTitle>
                  <Text>{description}</Text>
                </Section>
              )}

              {technicalChallenge && (
                <Section>
                  <SectionTitle>
                    <Icon name="cpu" size={20} /> Technical Challenge
                  </SectionTitle>
                  <Text>{technicalChallenge}</Text>
                </Section>
              )}

              {myRole && (
                <Section>
                  <SectionTitle>
                    <Icon name="user" size={20} /> My Role
                  </SectionTitle>
                  <Text>{myRole}</Text>
                </Section>
              )}

              {stack.length > 0 && (
                <Section>
                  <SectionTitle>
                    <Icon name="code" size={20} /> Tech Stack
                  </SectionTitle>
                  <StackList>
                    {stack.map((tech, idx) => (
                      <StackItem key={idx}>{tech}</StackItem>
                    ))}
                  </StackList>
                </Section>
              )}

              {impact && (
                <Section>
                  <SectionTitle>
                    <Icon name="trending-up" size={20} /> Impact
                  </SectionTitle>
                  <ImpactBox>{impact}</ImpactBox>
                </Section>
              )}

              {members.length > 0 && (
                <MembersSection>
                  <SectionTitle style={{ marginBottom: '4px' }}>
                    <Icon name="users" size={20} /> Team
                  </SectionTitle>
                  <MembersGrid>
                    {members.map((member, idx) => (
                      <MemberCard key={idx}>
                        <MemberImage src={member.img} alt={member.name || 'Team member'} />
                        <MemberInfo>
                          <MemberName>{member.name || 'Team Member'}</MemberName>
                          {member.role && <MemberRole>{member.role}</MemberRole>}
                          <MemberLinks>
                            {member.github && (
                              <MemberLink
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${member.name}'s GitHub`}
                              >
                                <Icon name="github" size={18} />
                              </MemberLink>
                            )}
                            {member.linkedin && (
                              <MemberLink
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${member.name}'s LinkedIn`}
                              >
                                <Icon name="linkedin" size={18} />
                              </MemberLink>
                            )}
                          </MemberLinks>
                        </MemberInfo>
                      </MemberCard>
                    ))}
                  </MembersGrid>
                </MembersSection>
              )}

              {(liveUrl || githubUrl) && (
                <Section>
                  <SectionTitle>
                    <Icon name="link" size={20} /> Project Links
                  </SectionTitle>
                  <ButtonGroup>
                    {liveUrl && (
                      <Button
                        $primary
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View live application"
                        onClick={handleLiveClick}
                      >
                        <Icon name="external" size={18} /> Live Demo
                      </Button>
                    )}
                    {githubUrl && (
                      <Button
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source code on GitHub"
                        onClick={handleGithubClick}
                      >
                        <Icon name="github" size={18} /> Source Code
                      </Button>
                    )}
                  </ButtonGroup>
                </Section>
              )}
            </Content>
          </Wrapper>
        </Container>
      )}
    </AnimatePresence>
  );
};

ProjectCaseStudy.propTypes = {
  openModal: PropTypes.shape({
    state: PropTypes.bool,
    project: PropTypes.object,
  }).isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default ProjectCaseStudy;
