import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ---------- Design Tokens (use global CSS variables) ---------- */

const accent = 'var(--accent-glow, #8b5cf6)';
const accentGradient = 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))';
const textPrimary = 'var(--text-primary, #f2f2f7)';
const textSecondary = 'var(--text-secondary, #a0a0b8)';
const bgGlass = 'var(--bg-glass, rgba(18, 18, 35, 0.6))';
const borderGlass = 'var(--border-glass, rgba(255, 255, 255, 0.1))';
const shadowSm = 'var(--shadow-sm, 0 4px 12px rgba(0,0,0,0.4))';
const shadowMd = 'var(--shadow-md, 0 8px 30px rgba(0,0,0,0.6))';
const shadowGlow = 'var(--shadow-glow, 0 0 20px rgba(139, 92, 246, 0.25))';

/* ---------- Base Container (with glass background) ---------- */

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 100px 0 100px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(12, 12, 29, 0.4);

  @media (max-width: 960px) {
    padding: 60px 0;
  }
  @media (max-width: 640px) {
    padding: 40px 0;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0 20px;
  gap: 12px;
  @media (max-width: 960px) {
    padding: 0 16px;
  }
`;

/* ---------- Typography (using CSS variables + gradient text) ---------- */

export const Title = styled(motion.h1)`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${textPrimary};
  background: ${accentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 36px;
  }
  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled(motion.h2)`
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  background: ${accentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

export const Desc = styled(motion.p)`
  font-size: 18px;
  text-align: center;
  max-width: 800px;
  margin-bottom: 50px;
  color: ${textSecondary};
  line-height: 1.6;
  strong {
    color: ${accent};
    font-weight: 600;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
    padding: 0 16px;
  }
`;

/* ---------- Stats Cards (Glassmorphism) ---------- */

export const StatsSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1100px;
  margin: 40px auto 60px auto;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 30px auto 40px auto;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

export const StatCard = styled(motion.div)`
  background: ${bgGlass};
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid ${borderGlass};
  border-radius: 1.25rem;
  padding: 30px 25px;
  text-align: center;
  box-shadow: ${shadowSm};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${accentGradient};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadowMd}, ${shadowGlow};
    border-color: rgba(139, 92, 246, 0.3);
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

export const StatIcon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
  color: ${accent};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 15px;
  }
`;

export const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${textPrimary};
  margin-bottom: 10px;
  line-height: 1;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const StatLabel = styled.div`
  font-size: 15px;
  color: ${textSecondary};
  font-weight: 500;
  line-height: 1.5;
  strong {
    color: ${accent};
    font-weight: 600;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

/* ---------- Filter Toggle (Glass buttons) ---------- */

export const ToggleButtonGroup = styled.div`
  display: flex;
  border: 2px solid rgba(139, 92, 246, 0.3);
  font-size: 16px;
  border-radius: 16px;
  font-weight: 600;
  margin: 30px 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 4px;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 14px;
    margin: 25px 0;
  }
`;

export const ToggleButton = styled.button`
  padding: 10px 24px;
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: ${textPrimary};
  font-weight: 600;
  font-size: inherit;
  transition: all 0.3s ease;
  white-space: nowrap;

  ${({ $active }) =>
    $active &&
    `
    background: ${accentGradient};
    color: white;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
  `}

  &:hover {
    background: ${({ $active }) =>
      $active ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(139, 92, 246, 0.1)'};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    border-radius: 10px;
  }
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

export const Divider = styled.div`
  width: 2px;
  background: rgba(139, 92, 246, 0.3);
  margin: 8px 4px;
  @media (max-width: 768px) {
    margin: 6px 2px;
  }
`;

export const FilterInfo = styled.div`
  font-size: 16px;
  color: ${textSecondary};
  margin: 20px 0 30px;
  text-align: center;
  strong {
    color: ${accent};
    font-weight: 600;
  }
`;

/* ---------- Category Tags (Glass pills) ---------- */

export const CategoryTag = styled.span`
  display: inline-block;
  background: rgba(139, 92, 246, 0.1);
  color: ${accent};
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 10px;
  border: 1px solid rgba(139, 92, 246, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadowGlow};
  }
`;

/* ---------- Project Cards Grid ---------- */

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 28px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const FeaturedContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 30px auto 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

/* ---------- Section Divider (Gradient) ---------- */

export const SectionDivider = styled.hr`
  width: 100%;
  max-width: 800px;
  border: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(139, 92, 246, 0.3), transparent);
  margin: 40px auto;
`;

/* ---------- View All Button (Gradient + glow) ---------- */

export const ViewAllButton = styled(motion.button)`
  background: ${accentGradient};
  border: none;
  color: white;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(139, 92, 246, 0.4);
    background: linear-gradient(135deg, #7c3aed, #2563eb);
  }
  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 12px 28px;
    font-size: 15px;
    margin-top: 30px;
  }
`;

/* ---------- Empty State ---------- */

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: ${textSecondary};
  max-width: 600px;
  margin: 0 auto;
  .empty-icon {
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.5;
  }
`;

export const EmptyTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${textPrimary};
  margin-bottom: 10px;
`;

export const EmptyText = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 1.6;
`;

/* ---------- Project Count ---------- */

export const ProjectCount = styled.div`
  font-size: 14px;
  color: ${textSecondary};
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
  strong {
    color: ${accent};
  }
`;

/* ---------- Section Header ---------- */

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const GradientLine = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, ${accent} 0%, ${accent}00 100%);
  margin: 20px auto 30px auto;
  border-radius: 2px;
`;
