import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Bio } from '../../data/constants';
import { fadeInUpVariants } from '../../motionConfig';
import { trackEvent } from '../../analytics';
import { Icon } from '../common/Icon';

/* ---------- Styled Components (Glassmorphism + Design System) ---------- */

const FooterContainer = styled.footer`
  width: 100%;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  background: rgba(12, 12, 29, 0.6);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-top: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  margin-top: 2rem;
  position: relative;
  z-index: 1;
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 1rem;
  color: var(--text-primary, #f2f2f7);
`;

const LogoSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 28px;
  background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Tagline = styled.p`
  font-size: 16px;
  color: var(--text-secondary, #a0a0b8);
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
  font-weight: 500;
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const NavLink = styled.a`
  color: var(--text-primary, #f2f2f7);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  padding: 4px 8px;
  border-radius: 6px;

  &:hover {
    color: var(--accent-glow, #8b5cf6);
    background: rgba(139, 92, 246, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialMediaSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 1.5rem 0;
`;

const SocialMediaTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary, #f2f2f7);
`;

const SocialMediaIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const SocialMediaIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-primary, #f2f2f7);
  transition: all 0.3s ease-in-out;

  &:hover {
    color: white;
    background: var(--accent-gradient);
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.5);
  }
`;

const Copyright = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--text-secondary, #a0a0b8);
  text-align: center;
  line-height: 1.6;
  max-width: 800px;
  padding: 0 1rem;
`;

const CopyrightLine = styled.p`
  margin: 5px 0;
`;

/* ---------- Analytics Helper ---------- */

const handleSocialClick = platform => {
  trackEvent('click_social', 'footer', platform);
};

/* ---------- Component ---------- */

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterWrapper>
        <LogoSection
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Logo>Usman Murtaza</Logo>
          <Tagline>
            Full Stack & React Developer specializing in modern web applications, responsive design,
            and scalable JavaScript solutions.
          </Tagline>
        </LogoSection>

        <Nav>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </Nav>

        <SocialMediaSection
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SocialMediaTitle>Connect With Me</SocialMediaTitle>
          <SocialMediaIcons>
            <SocialMediaIcon
              href={Bio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              onClick={() => handleSocialClick('LinkedIn')}
            >
              <Icon name="linkedin" size={22} />
            </SocialMediaIcon>
            <SocialMediaIcon
              href={Bio.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              onClick={() => handleSocialClick('GitHub')}
            >
              <Icon name="github" size={22} />
            </SocialMediaIcon>
            <SocialMediaIcon
              href={Bio.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              onClick={() => handleSocialClick('Twitter')}
            >
              <Icon name="twitter" size={22} />
            </SocialMediaIcon>
            <SocialMediaIcon
              href={Bio.insta}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              onClick={() => handleSocialClick('Instagram')}
            >
              <Icon name="instagram" size={22} />
            </SocialMediaIcon>
            <SocialMediaIcon
              href={Bio.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
              onClick={() => handleSocialClick('Facebook')}
            >
              <Icon name="facebook" size={22} />
            </SocialMediaIcon>
            <SocialMediaIcon
              href={`mailto:${Bio.email || 'usmanmurtazaportfolio@gmail.com'}`}
              aria-label="Send Email"
              onClick={() => handleSocialClick('Email')}
            >
              <Icon name="mail" size={22} />
            </SocialMediaIcon>
          </SocialMediaIcons>
        </SocialMediaSection>

        <Copyright>
          <CopyrightLine> &copy; {currentYear} Usman Murtaza. All Rights Reserved. </CopyrightLine>
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;
