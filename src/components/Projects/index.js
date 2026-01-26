import React, { useState } from 'react';
import {
  Container,
  Wrapper,
  Title,
  Subtitle,
  Desc,
  CardContainer,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  StatsSection,
  StatCard,
  StatIcon,
  StatNumber,
  StatLabel,
  FilterInfo,
  CategoryTag,
  ViewAllButton,
  EmptyState,
  EmptyTitle,
  EmptyText,
  ProjectCount,
  SectionHeader,
  GradientLine,
} from './ProjectsStyle';
import ProjectCard from '../Cards/ProjectCards';
import { projects } from '../../data/constants';
import PropTypes from 'prop-types';

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('all');

  // Calculate project statistics
  const totalProjects = projects.length;
  const webApps = projects.filter(p => p.category === 'Web App').length;
  const ecommerce = projects.filter(p => p.category === 'E-commerce Web App').length;
  const activeProjects = projects.filter(p => p.date.includes('Present')).length;

  // Get unique categories from projects
  const categories = ['all', ...new Set(projects.map(p => p.category.toLowerCase()))];

  const filteredProjects =
    toggle === 'all' ? projects : projects.filter(item => item.category.toLowerCase() === toggle);

  const handleViewAll = () => {
    setToggle('all');
    // Smooth scroll to top of projects section
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container id="projects">
      <Wrapper>
        <SectionHeader>
          <Title>Portfolio Projects</Title>
          <GradientLine />
          <Subtitle>Real-World Applications & Solutions</Subtitle>
        </SectionHeader>

        <Desc>
          Explore my collection of <strong>modern web applications</strong> built with cutting-edge
          technologies. Each project demonstrates my expertise in{' '}
          <strong>React.js development</strong>,<strong> responsive design</strong>,{' '}
          <strong>web performance optimization</strong>, and{' '}
          <strong>full stack implementation</strong>. From <strong>e-commerce platforms</strong>
          to <strong>project management tools</strong>, these applications showcase practical
          solutions to real-world problems.
        </Desc>

        <StatsSection>
          <StatCard>
            <StatIcon>🚀</StatIcon>
            <StatNumber>{totalProjects}+</StatNumber>
            <StatLabel>
              Projects <strong>Completed</strong> with modern web technologies
            </StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon>⚛️</StatIcon>
            <StatNumber>{webApps}+</StatNumber>
            <StatLabel>
              <strong>React.js</strong> Applications built with best practices
            </StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon>🛒</StatIcon>
            <StatNumber>{ecommerce}</StatNumber>
            <StatLabel>
              <strong>E-commerce</strong> Solutions with secure payment integration
            </StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon>⚡</StatIcon>
            <StatNumber>{activeProjects}</StatNumber>
            <StatLabel>
              Projects in <strong>Active Development</strong>
            </StatLabel>
          </StatCard>
        </StatsSection>

        <ProjectCount>
          Total portfolio: <strong>{totalProjects}</strong> projects across{' '}
          <strong>{categories.length - 1}</strong> categories
        </ProjectCount>

        <ToggleButtonGroup>
          {categories.map((type, index) => (
            <React.Fragment key={type}>
              <ToggleButton
                active={toggle === type}
                value={type}
                onClick={() => setToggle(type)}
                aria-label={`Filter projects by ${type === 'all' ? 'all categories' : type}`}
                aria-pressed={toggle === type}
              >
                {type === 'all'
                  ? 'ALL PROJECTS'
                  : type === 'web app'
                    ? 'WEB APPLICATIONS'
                    : type.charAt(0).toUpperCase() + type.slice(1)}
              </ToggleButton>
              {index < categories.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </ToggleButtonGroup>

        <FilterInfo>
          Showing <strong>{filteredProjects.length}</strong> project
          {filteredProjects.length !== 1 ? 's' : ''}
          {toggle !== 'all' && (
            <>
              {' in '}
              <CategoryTag category={toggle}>
                {toggle === 'web app'
                  ? 'Web Applications'
                  : toggle === 'e-commerce web app'
                    ? 'E-commerce'
                    : toggle.charAt(0).toUpperCase() + toggle.slice(1)}
              </CategoryTag>
            </>
          )}
        </FilterInfo>

        <CardContainer>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id || index}
                project={project}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            ))
          ) : (
            <EmptyState>
              <div className="empty-icon">📁</div>
              <EmptyTitle>No Projects Found</EmptyTitle>
              <EmptyText>
                No projects match the selected filter. Try selecting a different category or view
                all projects to explore my complete portfolio.
              </EmptyText>
              <ViewAllButton onClick={handleViewAll}>View All Projects</ViewAllButton>
            </EmptyState>
          )}
        </CardContainer>

        {toggle !== 'all' && filteredProjects.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <ViewAllButton onClick={handleViewAll}>View All {totalProjects} Projects</ViewAllButton>
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

// Add prop types validation
Projects.propTypes = {
  openModal: PropTypes.shape({
    state: PropTypes.bool,
    project: PropTypes.object,
  }),
  setOpenModal: PropTypes.func.isRequired,
};

// Default props
Projects.defaultProps = {
  openModal: { state: false, project: null },
};

export default Projects;
