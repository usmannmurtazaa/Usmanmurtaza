import React, { useState } from 'react';
import ReactDOM from 'react-dom'; // ✅ portal
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import ProjectCard from '../Cards/ProjectCards';
import ProjectCaseStudy from '../ProjectCaseStudy';
import {
  Container,
  Wrapper,
  Title,
  Subtitle,
  Desc,
  CardContainer,
  FeaturedContainer,
  SectionDivider,
  StatsSection,
  StatCard,
  StatIcon,
  StatNumber,
  StatLabel,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  FilterInfo,
  CategoryTag,
  ViewAllButton,
} from './ProjectsStyle';
import { projects } from '../../data/constants';
import { Icon } from '../common/Icon';
import { useReducedMotion, fadeInUpVariants } from '../../motionConfig';
import { trackEvent } from '../../analytics';

/* ---------- Animation Variants ---------- */
const statsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Projects = ({ openModal = { state: false, project: null }, setOpenModal }) => {
  const prefersReduced = useReducedMotion();
  const [toggle, setToggle] = useState('all');

  const visibleProjects = projects.filter(p => p.level !== 'utility');
  const featuredProjects = visibleProjects.filter(p => p.level === 'featured');
  const secondaryProjects = visibleProjects.filter(p => p.level === 'secondary');

  const totalFeatured = featuredProjects.length;
  const totalSecondary = secondaryProjects.length;
  const totalProjects = visibleProjects.length;

  const categories = [
    'all',
    ...new Set(visibleProjects.map(p => p.categoryNormalized?.toLowerCase() || 'other')),
  ];

  const filteredProjects =
    toggle === 'all'
      ? visibleProjects
      : visibleProjects.filter(p => p.categoryNormalized?.toLowerCase() === toggle);

  const handleViewAllClick = () => {
    trackEvent('click_view_all', 'projects', 'View All Projects');
    setToggle('all');
  };

  return (
    <Container id="projects">
      <Wrapper>
        <Title
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </Title>
        <Subtitle
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Real‑world SaaS & Applications
        </Subtitle>
        <Desc
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          I build production‑grade applications that solve real problems. Below are my{' '}
          <strong>featured projects</strong> – each one demonstrates deep technical skill and
          product thinking.
        </Desc>

        {/* Stats Cards */}
        <StatsSection
          as={motion.div}
          variants={prefersReduced ? {} : statsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <StatCard variants={prefersReduced ? {} : statCardVariants}>
            <StatIcon>
              <Icon name="rocket" size={32} />
            </StatIcon>
            <StatNumber>{totalFeatured}</StatNumber>
            <StatLabel>
              Featured <strong>SaaS</strong> Projects
            </StatLabel>
          </StatCard>
          <StatCard variants={prefersReduced ? {} : statCardVariants}>
            <StatIcon>
              <Icon name="box" size={32} />
            </StatIcon>
            <StatNumber>{totalSecondary}</StatNumber>
            <StatLabel>
              Additional <strong>Projects</strong>
            </StatLabel>
          </StatCard>
          <StatCard variants={prefersReduced ? {} : statCardVariants}>
            <StatIcon>
              <Icon name="zap" size={32} />
            </StatIcon>
            <StatNumber>{totalProjects}</StatNumber>
            <StatLabel>
              Total <strong>Public</strong> Projects
            </StatLabel>
          </StatCard>
        </StatsSection>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <>
            <FeaturedContainer>
              {featuredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  setOpenModal={setOpenModal}
                  isFeatured={true}
                />
              ))}
            </FeaturedContainer>
            <SectionDivider />
          </>
        )}

        {/* Category Filter */}
        <ToggleButtonGroup>
          {categories.map((type, index) => (
            <React.Fragment key={type}>
              <ToggleButton
                $active={toggle === type}
                value={type}
                onClick={() => {
                  setToggle(type);
                  trackEvent('filter_projects', 'projects', type);
                }}
              >
                {type === 'all' ? 'ALL' : type.toUpperCase()}
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

        {/* Secondary Projects */}
        {secondaryProjects.length > 0 && (
          <>
            <Subtitle
              style={{ marginTop: '20px' }}
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              Other Projects
            </Subtitle>
            <CardContainer>
              {filteredProjects
                .filter(p => p.level === 'secondary')
                .map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    setOpenModal={setOpenModal}
                    isFeatured={false}
                  />
                ))}
            </CardContainer>
          </>
        )}

        {/* View All Button */}
        {toggle !== 'all' && filteredProjects.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <ViewAllButton
              onClick={handleViewAllClick}
              whileHover={prefersReduced ? {} : { scale: 1.03 }}
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              View All {totalProjects} Projects
            </ViewAllButton>
          </div>
        )}
      </Wrapper>

      {/* ✅ Modal rendered into document.body via portal – overlays everything */}
      {openModal.state &&
        ReactDOM.createPortal(
          <ProjectCaseStudy openModal={openModal} setOpenModal={setOpenModal} />,
          document.body
        )}
    </Container>
  );
};

Projects.propTypes = {
  openModal: PropTypes.shape({
    state: PropTypes.bool,
    project: PropTypes.object,
  }),
  setOpenModal: PropTypes.func.isRequired,
};

export default Projects;
