import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useReducedMotion } from '../../motionConfig';

const DecoratorWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: visible;

  @media (min-width: 961px) {
    transform: translateX(18.5%);
  }
`;

const useResponsiveData = () => {
  const readViewport = () => {
    if (typeof window === 'undefined') {
      return { starMin: 14, starMax: 28, count: 10 };
    }
    const w = window.innerWidth;
    if (w < 768) {
      return { starMin: 8, starMax: 16, count: 6 };
    }
    return { starMin: 14, starMax: 28, count: 10 };
  };

  const [data, setData] = useState(readViewport);

  useEffect(() => {
    const handleResize = () => setData(readViewport());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return data;
};

const DASHED_RINGS = [
  {
    radius: 18,
    dashArray: '4 8',
    strokeWidth: 0.25,
    color: 'rgba(139,92,246,0.15)',
    duration: 30,
  },
  {
    radius: 22,
    dashArray: '8 12',
    strokeWidth: 0.2,
    color: 'rgba(59,130,246,0.12)',
    duration: 35,
  },
  {
    radius: 26,
    dashArray: '2 6',
    strokeWidth: 0.3,
    color: 'rgba(6,182,212,0.1)',
    duration: 40,
  },
];

const Star = ({ size, color, radius, angle, pulse, duration, $reduced }) => {
  // Precompute oscillation endpoints once per mount (no per-frame math).
  const x1 = Math.cos(angle) * radius;
  const x2 = Math.cos(angle + Math.PI) * radius;
  const y1 = Math.sin(angle) * radius;
  const y2 = Math.sin(angle + Math.PI) * radius;

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: `${size}vw`,
        height: `${size}vw`,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 2}vw ${color}`,
        top: '50%',
        left: '50%',
        willChange: 'transform',
      }}
      animate={
        $reduced
          ? {}
          : {
              x: [`${x1}vw`, `${x2}vw`, `${x1}vw`],
              y: [`${y1}vw`, `${y2}vw`, `${y1}vw`],
              scale: [1, pulse, 1],
            }
      }
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    />
  );
};

Star.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  pulse: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  $reduced: PropTypes.bool.isRequired,
};

const DashedRing = ({ radius, dashArray, strokeWidth, color, duration, $reduced }) => (
  <motion.svg
    width="100%"
    height="100%"
    viewBox={`0 0 ${radius * 2 + 2} ${radius * 2 + 2}`}
    style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
    animate={$reduced ? {} : { rotate: [0, 360] }}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  >
    <circle
      cx="50%"
      cy="50%"
      r={radius}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={dashArray}
    />
  </motion.svg>
);

DashedRing.propTypes = {
  radius: PropTypes.number.isRequired,
  dashArray: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  $reduced: PropTypes.bool.isRequired,
};

const HeroImageDecorator = () => {
  const prefersReduced = useReducedMotion();
  const { starMin, starMax, count } = useResponsiveData();

  // Computed once. No state updates during animation.
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: `star-${i}`,
        size: 0.4 + Math.random() * 0.4,
        color: `rgba(${139 + Math.random() * 30}, ${92 + Math.random() * 30}, ${
          246 + Math.random() * 9
        }, ${0.5 + Math.random() * 0.3})`,
        radius: starMin + Math.random() * (starMax - starMin),
        angle: Math.random() * 360,
        pulse: 1.05 + Math.random() * 0.2,
        duration: 3 + Math.random() * 2,
      })),
    [starMin, starMax, count]
  );

  return (
    <DecoratorWrapper aria-hidden="true">
      {DASHED_RINGS.map(ring => (
        <DashedRing key={ring.radius} {...ring} $reduced={prefersReduced} />
      ))}
      {stars.map(star => (
        <Star key={star.id} {...star} $reduced={prefersReduced} />
      ))}
    </DecoratorWrapper>
  );
};

export default HeroImageDecorator;
