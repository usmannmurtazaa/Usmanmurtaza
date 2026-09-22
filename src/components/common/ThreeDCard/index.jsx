import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../../motionConfig';

/* ---------- Styled ---------- */

const Wrapper = styled(motion.div)`
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
  display: inline-block;
`;

/**
 * A single 3D layer inside a ThreeDCard. `$depth` is the translateZ
 * offset in pixels. Positive values float the layer toward the viewer,
 * which is what creates the layered parallax when the parent tilts.
 *
 * Because the parent applies `preserve-3d`, the translateZ is not
 * flattened — the layer literally sits above or below the card plane
 * in 3D space.
 */
export const ThreeDLayer = styled.div`
  transform-style: preserve-3d;
  transform: translateZ(${({ $depth }) => $depth || 0}px);
  will-change: transform;
`;

/* ---------- Component ---------- */

const ThreeDCard = ({ children, className, maxTilt = 15, perspective = 1200 }) => {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  // Motion values — updated directly, no React re-renders on move.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Springs give a natural feel: quick entry, smooth return to rest.
  const springConfig = { stiffness: 200, damping: 25, mass: 0.7 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = e => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateY.set(((x - centerX) / centerX) * maxTilt);
    rotateX.set(-((y - centerY) / centerY) * maxTilt);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Wrapper
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformPerspective: perspective,
      }}
    >
      {children}
    </Wrapper>
  );
};

ThreeDCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxTilt: PropTypes.number,
  perspective: PropTypes.number,
};

export default ThreeDCard;
