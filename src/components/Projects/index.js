import React, { useState } from 'react';
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from './ProjectsStyle';
import ProjectCard from '../Cards/ProjectCards';
import { projects } from '../../data/constants';

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('all');

  const filteredProjects = toggle === 'all'
    ? projects
    : projects.filter((item) => item.category === toggle);

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
        </Desc>

        <ToggleButtonGroup>
          {['all', 'web app', 'android app', 'machine learning'].map((type, index) => (
            <React.Fragment key={type}>
              <ToggleButton
                active={toggle === type}
                value={type}
                onClick={() => setToggle(type)}
              >
                {type.toUpperCase().replace('APP', "APP'S")}
              </ToggleButton>
              {index < 3 && <Divider />}
            </React.Fragment>
          ))}
        </ToggleButtonGroup>

        <CardContainer>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
