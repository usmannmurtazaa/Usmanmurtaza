import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useReducedMotion, springTransition } from '../motionConfig';

// Glassmorphism wrapper for the entire social block (optional)
export const SocialMediaIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

// Individual icon link with glass + glow
export const SocialMediaIconLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(139, 92, 246, 0.5);
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 18px rgba(139, 92, 246, 0.25);
  }

  /* Accessibility – larger tap target on touch devices */
  @media (hover: none) and (pointer: coarse) {
    width: 48px;
    height: 48px;
  }
`;

// Optional: wrapper for the icon that respects reduced motion
export const SocialMediaIcon = ({ href, children, ...props }) => {
  const prefersReduced = useReducedMotion();

  return (
    <SocialMediaIconLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props['aria-label'] || 'Social media link'}
      whileHover={prefersReduced ? {} : { scale: 1.08 }}
      whileTap={prefersReduced ? {} : { scale: 0.95 }}
      transition={springTransition}
      {...props}
    >
      {children}
    </SocialMediaIconLink>
  );
};
