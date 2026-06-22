import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  Span,
  NavItems,
  NavLink,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileLink,
} from './NavbarStyledComponent';
import { Icon } from '../common/Icon';
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
      style={{
        // Glassmorphism + reinforce sticky
        background: 'var(--bg-glass, rgba(18, 18, 35, 0.6))',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: '1px solid var(--border-glass, rgba(255, 255, 255, 0.1))',
        boxShadow: 'var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.4))',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <NavbarContainer>
        <NavLogo to="/">
          <Icon name="layers" size={32} />
          <Span>Portfolio</Span>
        </NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <Icon name="menu" size={28} />
        </MobileIcon>

        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
        </NavItems>

        <ButtonContainer>
          <GitHubButton
            as={motion.a}
            href={Bio.github}
            target="_blank"
            whileHover={prefersReduced ? {} : { scale: 1.03 }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
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
            style={{
              background: 'var(--bg-glass, rgba(18, 18, 35, 0.8))',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid var(--border-glass, rgba(255, 255, 255, 0.1))',
              boxShadow: 'var(--shadow-md, 0 8px 30px rgba(0,0,0,0.6))',
              borderRadius: '1rem',
              marginTop: '8px',
            }}
          >
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
                background: 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))',
                color: 'white',
                width: 'max-content',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
              }}
              as={motion.a}
              href={Bio.github}
              target="_blank"
              whileHover={prefersReduced ? {} : { scale: 1.03 }}
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
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
