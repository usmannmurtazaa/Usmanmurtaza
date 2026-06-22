import { Link as LinkR } from 'react-router-dom';
import styled from 'styled-components';

/* ---------- Design Tokens (via global.css) ---------- */
const bgGlass = 'var(--bg-glass, rgba(18, 18, 35, 0.6))';
const borderGlass = 'var(--border-glass, rgba(255, 255, 255, 0.1))';
const textPrimary = 'var(--text-primary, #f2f2f7)';
const accent = 'var(--accent-glow, #8b5cf6)';
const accentGradient = 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))';
const shadowSm = 'var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.4))';
const shadowMd = 'var(--shadow-md, 0 8px 30px rgba(0, 0, 0, 0.6))';

export const Nav = styled.nav`
  background: ${bgGlass};
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid ${borderGlass};
  box-shadow: ${shadowSm};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;

  /* 🔒 Fixed – always stays on top */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1100;

  transition: background 0.3s ease;
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
`;

export const NavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  color: ${textPrimary};

  @media (max-width: 640px) {
    padding: 0 0px;
  }
`;

export const Span = styled.div`
  padding: 0 4px;
  font-weight: bold;
  font-size: 18px;
  color: ${textPrimary};
  background: ${accentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: ${textPrimary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 6px;

  &:hover {
    color: ${accent};
    background: rgba(139, 92, 246, 0.1);
    transform: translateY(-2px);
  }

  &.active {
    border-bottom: 2px solid ${accent};
  }
`;

export const GitHubButton = styled.a`
  border: 1.8px solid ${accent};
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${accent};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s ease;
  background: transparent;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  &:hover {
    background: ${accentGradient};
    color: white;
    border-color: transparent;
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${textPrimary};
  }
`;

export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${bgGlass};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${borderGlass};
  border-radius: 0 0 1.5rem 1.5rem;
  box-shadow: ${shadowMd};
  transition: all 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  z-index: ${({ $isOpen }) => ($isOpen ? '1000' : '-1000')};
`;

export const MobileMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
  width: 100%;
  height: 100%;
`;

export const MobileMenuLink = styled(LinkR)`
  color: ${textPrimary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    color: ${accent};
  }

  &.active {
    border-bottom: 2px solid ${accent};
  }
`;

export const MobileMenuButton = styled.a`
  border: 1.8px solid ${accent};
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${accent};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s ease;
  background: transparent;

  &:hover {
    background: ${accentGradient};
    color: white;
    border-color: transparent;
  }
`;

export const MobileLink = styled.a`
  color: ${textPrimary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    color: ${accent};
  }

  &.active {
    border-bottom: 2px solid ${accent};
  }
`;

export const MobileNavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  color: ${textPrimary};

  @media (max-width: 640px) {
    padding: 0 0px;
  }
`;
