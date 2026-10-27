import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const [activeSection, setActiveSection] = useState('');
  const prefersReduced = useReducedMotion();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isBlogPage = location.pathname.startsWith('/blog');

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  // Scroll Spy logic to highlight the active section (only runs on the homepage)
  useEffect(() => {
    if (!isHomePage) return undefined;

    const sections = ['about', 'skills', 'experience', 'projects', 'education'];

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Triggers when section is in the middle 20% of the screen
      threshold: 0,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

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
          <NavLink as={Link} to="/#about" $active={isHomePage && activeSection === 'about'}>
            About
          </NavLink>
          <NavLink as={Link} to="/#skills" $active={isHomePage && activeSection === 'skills'}>
            Skills
          </NavLink>
          <NavLink
            as={Link}
            to="/#experience"
            $active={isHomePage && activeSection === 'experience'}
          >
            Experience
          </NavLink>
          <NavLink as={Link} to="/#projects" $active={isHomePage && activeSection === 'projects'}>
            Projects
          </NavLink>
          <NavLink as={Link} to="/#education" $active={isHomePage && activeSection === 'education'}>
            Education
          </NavLink>
          <NavLink as={Link} to="/blog" $active={isBlogPage}>
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
            <MobileLink
              as={Link}
              to="/#about"
              onClick={() => setIsOpen(false)}
              $active={isHomePage && activeSection === 'about'}
            >
              About
            </MobileLink>
            <MobileLink
              as={Link}
              to="/#skills"
              onClick={() => setIsOpen(false)}
              $active={isHomePage && activeSection === 'skills'}
            >
              Skills
            </MobileLink>
            <MobileLink
              as={Link}
              to="/#experience"
              onClick={() => setIsOpen(false)}
              $active={isHomePage && activeSection === 'experience'}
            >
              Experience
            </MobileLink>
            <MobileLink
              as={Link}
              to="/#projects"
              onClick={() => setIsOpen(false)}
              $active={isHomePage && activeSection === 'projects'}
            >
              Projects
            </MobileLink>
            <MobileLink
              as={Link}
              to="/#education"
              onClick={() => setIsOpen(false)}
              $active={isHomePage && activeSection === 'education'}
            >
              Education
            </MobileLink>
            <MobileLink as={Link} to="/blog" onClick={() => setIsOpen(false)} $active={isBlogPage}>
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
