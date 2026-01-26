import { CloseRounded, GitHub, LinkedIn, OpenInNew, Code } from '@mui/icons-material';
import { Modal } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 20px;
  z-index: 9999;
  backdrop-filter: blur(5px);
`;

const Wrapper = styled.div`
  max-width: 900px;
  width: 100%;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin: 20px 0;

  @media only screen and (max-width: 768px) {
    padding: 20px;
    margin: 10px;
    border-radius: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 4px;
  font-weight: 500;
`;

const Date = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  background: ${({ theme }) => theme.primary + '15'};
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
  margin-top: 8px;
`;

const CloseButton = styled(CloseRounded)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 50%;
  padding: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    transform: rotate(90deg);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media only screen and (max-width: 768px) {
    height: 250px;
  }
`;

const Content = styled.div`
  margin: 20px 0;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 8px;

  &:before {
    content: '';
    width: 4px;
    height: 20px;
    background: ${({ theme }) => theme.primary};
    border-radius: 2px;
  }
`;

const Desc = styled.div`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;

  strong {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }

  @media only screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 15px 0;
`;

const TechTag = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.primary + '15'};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary + '30'};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    transform: translateY(-2px);
  }
`;

const FeaturesList = styled.ul`
  margin: 15px 0;
  padding-left: 20px;
`;

const FeatureItem = styled.li`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  line-height: 1.6;
  position: relative;

  &:before {
    content: '▸';
    color: ${({ theme }) => theme.primary};
    position: absolute;
    left: -20px;
  }
`;

const MembersSection = styled.div`
  background: ${({ theme }) => theme.bgLight};
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const MemberImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primary};
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 4px;
`;

const MemberRole = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 8px;
`;

const MemberLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
`;

const Button = styled.a`
  flex: 1;
  min-width: 200px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  padding: 16px 24px;
  border-radius: 12px;
  color: ${({ theme }) => theme.text_primary};
  background-color: ${({ primary, theme }) => (primary ? theme.primary : theme.bgLight)};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 2px solid
    ${({ primary, theme }) => (primary ? theme.primary : theme.text_secondary + '30')};

  &:hover {
    background-color: ${({ primary, theme }) => (primary ? theme.primary + 'CC' : theme.bg)};
    transform: translateY(-3px);
    box-shadow: 0 8px 20px
      ${({ primary, theme }) => (primary ? theme.primary + '40' : 'rgba(0, 0, 0, 0.1)')};
  }

  @media only screen and (max-width: 768px) {
    min-width: 100%;
  }
`;

const CategoryBadge = styled.div`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  background: ${({ category, theme }) => {
    switch (category) {
      case 'Web App':
        return theme.primary + '20';
      case 'E-commerce':
        return '#10B98120';
      case 'Mobile':
        return '#3B82F620';
      default:
        return theme.primary + '20';
    }
  }};
  color: ${({ category, theme }) => {
    switch (category) {
      case 'Web App':
        return theme.primary;
      case 'E-commerce':
        return '#10B981';
      case 'Mobile':
        return '#3B82F6';
      default:
        return theme.primary;
    }
  }};
  display: inline-block;
  margin-bottom: 10px;
`;

const ProjectModal = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;

  if (!project) return null;

  const handleClose = () => {
    setOpenModal({ state: false, project: null });
  };

  // Prevent modal close when clicking inside
  const handleContainerClick = e => {
    e.stopPropagation();
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(5px)',
        },
      }}
    >
      <Container onClick={handleClose}>
        <Wrapper onClick={handleContainerClick}>
          <CloseButton onClick={handleClose} />

          <Header>
            <TitleSection>
              <CategoryBadge category={project?.category}>{project?.category}</CategoryBadge>
              <Title>{project?.title}</Title>
              <Subtitle>
                {project?.category === 'Web App'
                  ? 'Modern Web Application'
                  : project?.category === 'E-commerce'
                    ? 'E-commerce Platform'
                    : 'Software Solution'}
              </Subtitle>
              <Date>{project?.date}</Date>
            </TitleSection>
          </Header>

          {project?.image && (
            <ImageContainer>
              <Image
                src={project.image}
                alt={`${project.title} - Project Screenshot`}
                loading="lazy"
              />
            </ImageContainer>
          )}

          <Content>
            <Section>
              <SectionTitle>Project Overview</SectionTitle>
              <Desc>{project?.description}</Desc>
            </Section>

            <Section>
              <SectionTitle>Technologies Used</SectionTitle>
              <TechStack>
                {project?.tags.map((tag, index) => (
                  <TechTag key={index}>{tag}</TechTag>
                ))}
              </TechStack>
            </Section>

            {project?.features && (
              <Section>
                <SectionTitle>Key Features</SectionTitle>
                <FeaturesList>
                  {project.features.map((feature, idx) => (
                    <FeatureItem key={idx}>{feature}</FeatureItem>
                  ))}
                </FeaturesList>
              </Section>
            )}

            {project?.member && project.member.length > 0 && (
              <MembersSection>
                <SectionTitle>Team Members</SectionTitle>
                <MembersGrid>
                  {project.member.map((member, idx) => (
                    <MemberCard key={idx}>
                      <MemberImage src={member.img} alt={member.name} />
                      <MemberInfo>
                        <MemberName>{member.name}</MemberName>
                        <MemberRole>{member.role || 'Developer'}</MemberRole>
                        <MemberLinks>
                          {member.github && (
                            <IconLink
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name}'s GitHub`}
                            >
                              <GitHub fontSize="small" />
                            </IconLink>
                          )}
                          {member.linkedin && (
                            <IconLink
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name}'s LinkedIn`}
                            >
                              <LinkedIn fontSize="small" />
                            </IconLink>
                          )}
                        </MemberLinks>
                      </MemberInfo>
                    </MemberCard>
                  ))}
                </MembersGrid>
              </MembersSection>
            )}

            <Section>
              <SectionTitle>Project Links</SectionTitle>
              <ButtonGroup>
                {project?.github && (
                  <Button
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source code on GitHub"
                  >
                    <Code /> View Source Code
                  </Button>
                )}
                {project?.webapp && (
                  <Button
                    primary
                    href={project.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View live application"
                  >
                    <OpenInNew /> View Live Application
                  </Button>
                )}
              </ButtonGroup>
            </Section>
          </Content>
        </Wrapper>
      </Container>
    </Modal>
  );
};

// Add this at the bottom of the file:
ProjectModal.propTypes = {
  openModal: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    project: PropTypes.object,
  }).isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default ProjectModal;
