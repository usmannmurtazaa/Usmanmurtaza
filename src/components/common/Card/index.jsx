import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useReducedMotion, springTransition } from '../../../motionConfig'; // adjust path as needed

/* ---------- Styled Glass Card ---------- */
const StyledCard = styled(motion.div)`
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  border-radius: 1.25rem;
  padding: ${({ padding }) => padding || '24px'};
  box-shadow: var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.4));
  transition:
    box-shadow 0.25s ease,
    border-color 0.25s ease;
`;

const Card = ({ children, hoverable = true, padding, className }) => {
  const prefersReduced = useReducedMotion();

  // Hover animation props (respect reduced motion)
  const motionProps =
    hoverable && !prefersReduced
      ? {
          whileHover: { y: -4, transition: springTransition },
          whileTap: { scale: 0.98 },
        }
      : {};

  return (
    <StyledCard
      className={className}
      padding={padding}
      {...motionProps}
      // Hover styles applied via CSS-in-JS for shadow/glow
      whileHover={
        hoverable && !prefersReduced
          ? {
              y: -4,
              boxShadow:
                'var(--shadow-md, 0 8px 30px rgba(0,0,0,0.6)), 0 0 20px rgba(139,92,246,0.25)',
              borderColor: 'rgba(139,92,246,0.3)',
            }
          : undefined
      }
      transition={springTransition}
    >
      {children}
    </StyledCard>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  hoverable: PropTypes.bool,
  padding: PropTypes.string,
  className: PropTypes.string,
};

export default Card;
