import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Bio } from '../../data/constants';

const FooterContainer = styled.div`
  width: 100%;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    100.26deg,
    rgba(0, 102, 255, 0.05) 42.33%,
    rgba(150, 0, 225, 0.05) 127.07%
  );
  border-top: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  margin-top: 2rem;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 28px;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Tagline = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
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
    font-size: 12px;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  padding: 4px 8px;
  border-radius: 6px;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary + '10'};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialMediaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 1.5rem 0;
`;

const SocialMediaTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
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
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.8rem;
  transition: all 0.3s ease-in-out;
  border: 1px solid ${({ theme }) => theme.text_secondary + '30'};

  &:hover {
    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.primary};
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 8px 20px ${({ theme }) => theme.primary + '40'};
  }
`;

const Copyright = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  line-height: 1.6;
  max-width: 800px;
  padding: 0 1rem;
`;

const CopyrightLine = styled.p`
  margin: 5px 0;
`;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterWrapper>
        <LogoSection>
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

        <SocialMediaSection>
          <SocialMediaTitle>Connect With Me</SocialMediaTitle>
          <SocialMediaIcons>
            <SocialMediaIcon
              href={Bio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon />
            </SocialMediaIcon>
            <SocialMediaIcon
              href={Bio.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <GitHubIcon />
            </SocialMediaIcon>
            <SocialMediaIcon
              href={Bio.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
            >
              <TwitterIcon />
            </SocialMediaIcon>
            <SocialMediaIcon
              href={Bio.insta}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
            >
              <InstagramIcon />
            </SocialMediaIcon>
            <SocialMediaIcon
              href={Bio.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
            >
              <FacebookIcon />
            </SocialMediaIcon>
            <SocialMediaIcon
              href={`mailto:${Bio.email || 'usmanmurtazaportfolio@gmail.com'}`}
              aria-label="Send Email"
            >
              <EmailIcon />
            </SocialMediaIcon>
          </SocialMediaIcons>
        </SocialMediaSection>
        <Copyright>
          <CopyrightLine>&copy; {currentYear} Usman Murtaza. All Rights Reserved.</CopyrightLine>
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;
