import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useReducedMotion, springTransition } from '../../../motionConfig'; // adjust path as needed

/* ---------- Styled Motion Button ---------- */
const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ size }) => (size === 'large' ? '16px 32px' : '12px 24px')};
  border-radius: 12px;
  font-weight: 600;
  font-size: ${({ size }) => (size === 'large' ? '18px' : '16px')};
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  border: 1px solid transparent;
  min-height: 44px;
  min-width: 44px;

  /* Primary variant – accent gradient background */
  background: ${({ variant }) =>
    variant === 'primary'
      ? 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))'
      : 'transparent'};

  color: ${({ variant }) => (variant === 'primary' ? '#fff' : 'var(--accent-glow, #8b5cf6)')};

  border-color: ${({ variant }) =>
    variant === 'secondary' ? 'var(--accent-glow, #8b5cf6)' : 'transparent'};

  box-shadow: ${({ variant }) =>
    variant === 'primary' ? '0 8px 20px rgba(139, 92, 246, 0.25)' : 'none'};

  /* Glass hover effect */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  &:hover {
    border-color: ${({ variant }) =>
      variant === 'secondary' ? 'var(--accent-gradient, #8b5cf6)' : 'transparent'};
    box-shadow: ${({ variant }) =>
      variant === 'primary'
        ? '0 12px 30px rgba(139, 92, 246, 0.4)'
        : '0 8px 20px rgba(139, 92, 246, 0.15)'};
    background: ${({ variant }) =>
      variant === 'secondary'
        ? 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))'
        : 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))'};
    color: #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
`;

const Button = ({ children, variant = 'primary', size = 'medium', ...props }) => {
  const prefersReduced = useReducedMotion();

  // Micro‑interactions (disabled if reduced motion)
  const motionProps = prefersReduced
    ? {}
    : {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
        transition: springTransition,
      };

  return (
    <StyledButton variant={variant} size={size} {...motionProps} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['medium', 'large']),
};

export default Button;
