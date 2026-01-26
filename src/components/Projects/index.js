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
        <Title>Portfolio Projects</Title>
        <Subtitle>Real-World Applications & Solutions</Subtitle>
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
            <StatLabel>Projects Completed</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon>⚛️</StatIcon>
            <StatNumber>{webApps}+</StatNumber>
            <StatLabel>React Applications</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon>🛒</StatIcon>
            <StatNumber>{ecommerce}</StatNumber>
            <StatLabel>E-commerce Solutions</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon>⚡</StatIcon>
            <StatNumber>{activeProjects}</StatNumber>
            <StatLabel>Active Development</StatLabel>
          </StatCard>
        </StatsSection>

        <ToggleButtonGroup>
          {categories.map((type, index) => (
            <React.Fragment key={type}>
              <ToggleButton
                active={toggle === type}
                value={type}
                onClick={() => setToggle(type)}
                aria-label={`Filter projects by ${type === 'all' ? 'all categories' : type}`}
              >
                {type === 'all'
                  ? 'ALL PROJECTS'
                  : type === 'web app'
                    ? 'WEB APPLICATIONS'
                    : type.toUpperCase()}
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
                key={index}
                project={project}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            ))
          ) : (
            <div>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📁</div>
              <h3 style={{ marginBottom: '10px' }}>No projects found in this category</h3>
              <p>Try selecting a different filter or view all projects.</p>
              <ViewAllButton onClick={handleViewAll}>View All Projects</ViewAllButton>
            </div>
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

// Add this at the bottom of the file:
Projects.propTypes = {
  openModal: PropTypes.object,
  setOpenModal: PropTypes.func.isRequired,
};

export default Projects;
