import React from 'react';
import {
  Nav,
  NavLink,
  NavbarContainer,
  Span,
  NavLogo,
  NavItems,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileNavLogo,
  MobileLink
} from './NavbarStyledComponent';
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              marginBottom: '20px',
              cursor: 'pointer'
            }}
          >
            <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
          </a>

        </NavLogo>

        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>

        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
        </NavItems>

        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank">
            Github Profile
          </GitHubButton>
        </ButtonContainer>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#about" onClick={() => setIsOpen(false)}>
              About
            </MobileLink>
            <MobileLink href="#skills" onClick={() => setIsOpen(false)}>
              Skills
            </MobileLink>
            <MobileLink href="#experience" onClick={() => setIsOpen(false)}>
              Experience
            </MobileLink>
            <MobileLink href="#projects" onClick={() => setIsOpen(false)}>
              Projects
            </MobileLink>
            <MobileLink href="#education" onClick={() => setIsOpen(false)}>
              Education
            </MobileLink>
            <GitHubButton
              style={{
                padding: '10px 16px',
                background: `${theme.primary}`,
                color: 'white',
                width: 'max-content',
              }}
              href={Bio.github}
              target="_blank"
            >
              Github Profile
            </GitHubButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
