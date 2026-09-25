import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavItems,
  NavLink,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileLink,
} from './NavbarStyledComponent';
import { Icon } from '../common/Icon';
import Signature from '../common/Signature';
import { Bio } from '../../data/constants';
import { useReducedMotion } from '../../motionConfig';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  return (
    <Nav
      as={motion.nav}
      variants={prefersReduced ? {} : navVariants}
      initial="hidden"
      animate="visible"
    >
      <NavbarContainer>
        <NavLogo as={Link} to="/" aria-label="Usman Portfolio">
          <Signature height={48} fontSize="2.2rem" iconSize={24} />
        </NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <Icon name="menu" size={28} />
        </MobileIcon>

        <NavItems>
          <NavLink as={Link} to="/#about">
            About
          </NavLink>
          <NavLink as={Link} to="/#skills">
            Skills
          </NavLink>
          <NavLink as={Link} to="/#experience">
            Experience
          </NavLink>
          <NavLink as={Link} to="/#projects">
            Projects
          </NavLink>
          <NavLink as={Link} to="/#education">
            Education
          </NavLink>
          <NavLink as={Link} to="/blog">
            Blog
          </NavLink>
        </NavItems>

        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={18} style={{ marginRight: '8px' }} />
            Github Profile
          </GitHubButton>
        </ButtonContainer>

        {isOpen && (
          <MobileMenu
            $isOpen={isOpen}
            as={motion.div}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MobileLink as={Link} to="/#about" onClick={() => setIsOpen(false)}>
              About
            </MobileLink>
            <MobileLink as={Link} to="/#skills" onClick={() => setIsOpen(false)}>
              Skills
            </MobileLink>
            <MobileLink as={Link} to="/#experience" onClick={() => setIsOpen(false)}>
              Experience
            </MobileLink>
            <MobileLink as={Link} to="/#projects" onClick={() => setIsOpen(false)}>
              Projects
            </MobileLink>
            <MobileLink as={Link} to="/#education" onClick={() => setIsOpen(false)}>
              Education
            </MobileLink>
            <MobileLink as={Link} to="/blog" onClick={() => setIsOpen(false)}>
              Blog
            </MobileLink>
            <GitHubButton
              style={{
                padding: '10px 16px',
                background: 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))',
                color: 'white',
                width: 'max-content',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
              }}
              href={Bio.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size={18} style={{ marginRight: '8px' }} />
              Github Profile
            </GitHubButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
