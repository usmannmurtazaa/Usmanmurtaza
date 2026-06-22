import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useReducedMotion } from '../../motionConfig';

// ── Wrapper that shifts animation slightly left on desktop ──
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

// ── Custom hook that generates responsive stars / nodes ──
const useResponsiveData = () => {
  const getRadius = () => {
    if (typeof window === 'undefined')
      return { starMin: 14, starMax: 28, nodeMin: 16, nodeMax: 32 };
    const w = window.innerWidth;
    if (w < 480) return { starMin: 10, starMax: 20, nodeMin: 12, nodeMax: 24 };
    if (w < 768) return { starMin: 12, starMax: 24, nodeMin: 14, nodeMax: 28 };
    return { starMin: 14, starMax: 28, nodeMin: 16, nodeMax: 32 };
  };

  const [radii, setRadii] = useState(getRadius);

  useEffect(() => {
    const handleResize = () => setRadii(getRadius());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: `star-${i}`,
        size: 0.4 + Math.random() * 0.4,
        color: `rgba(${139 + Math.random() * 30}, ${92 + Math.random() * 30}, ${246 + Math.random() * 9}, ${0.5 + Math.random() * 0.3})`,
        radius: radii.starMin + Math.random() * (radii.starMax - radii.starMin),
        angle: Math.random() * 360,
        speed: 0.2 + Math.random() * 0.4,
        pulse: Math.random() * 2 + 1,
      })),
    [radii]
  );

  const nodes = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: `node-${i}`,
        size: 0.8 + Math.random() * 0.5,
        color: i % 2 === 0 ? 'rgba(139, 92, 246, 0.95)' : 'rgba(59, 130, 246, 0.9)',
        radiusX: radii.nodeMin + Math.random() * (radii.nodeMax - radii.nodeMin),
        radiusY: radii.nodeMin + Math.random() * (radii.nodeMax - radii.nodeMin),
        offset: Math.random() * 360,
        speed: 0.15 + Math.random() * 0.3,
      })),
    [radii]
  );

  return { stars, nodes };
};

// ── Dashed rings ──
const DASHED_RINGS = [
  {
    radius: 18,
    dashArray: '4 8',
    strokeWidth: 0.25,
    color: 'rgba(139,92,246,0.15)',
    duration: 30,
    delay: 0,
  },
  {
    radius: 22,
    dashArray: '8 12',
    strokeWidth: 0.2,
    color: 'rgba(59,130,246,0.12)',
    duration: 35,
    delay: 5,
  },
  {
    radius: 26,
    dashArray: '2 6',
    strokeWidth: 0.3,
    color: 'rgba(6,182,212,0.1)',
    duration: 40,
    delay: 10,
  },
];

// ── Energy arcs ──
const ENERGY_ARCS = [
  { id: 'arc-1', r: 16, color: 'rgba(139,92,246,0.25)', duration: 12, delay: 0 },
  { id: 'arc-2', r: 20, color: 'rgba(59,130,246,0.2)', duration: 14, delay: 3 },
  { id: 'arc-3', r: 24, color: 'rgba(6,182,212,0.18)', duration: 16, delay: 6 },
];

// ── Edge strokes ──
const EDGE_STROKES = [
  {
    x: '5%',
    y: '10%',
    width: '30%',
    height: 2,
    gradient: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)',
    duration: 18,
    moveX: ['0%', '10%', '-5%', '0%'],
    moveY: ['0%', '10%', '-5%', '0%'],
  },
  {
    x: '60%',
    y: '85%',
    width: '30%',
    height: 2,
    gradient: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent)',
    duration: 22,
    moveX: ['0%', '-15%', '10%', '0%'],
    moveY: ['0%', '-10%', '5%', '0%'],
  },
  {
    x: '5%',
    y: '50%',
    width: 2,
    height: '25%',
    gradient: 'linear-gradient(0deg, transparent, rgba(168,85,247,0.6), transparent)',
    duration: 20,
    moveX: ['0%', '5%', '-5%', '0%'],
    moveY: ['0%', '10%', '-10%', '0%'],
  },
  {
    x: '90%',
    y: '30%',
    width: 2,
    height: '25%',
    gradient: 'linear-gradient(0deg, transparent, rgba(59,130,246,0.6), transparent)',
    duration: 24,
    moveX: ['0%', '-5%', '5%', '0%'],
    moveY: ['0%', '-10%', '10%', '0%'],
  },
];

const MAX_DISTANCE = 18; // vw

// ── Custom hook: animated node positions ──
const useNodePositions = (nodes, reduced) => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let frame;
    const tick = t => {
      setTime(t / 1000);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return useMemo(
    () =>
      nodes.map(node => {
        const angle = (node.offset + time * node.speed) % (Math.PI * 2);
        const x = Math.cos(angle) * node.radiusX;
        const y = Math.sin(angle) * node.radiusY;
        return { id: node.id, x, y, size: node.size, color: node.color };
      }),
    [time, nodes]
  );
};

// ── Subcomponents ──
const Star = ({ size, color, radius, angle, speed, pulse, reduced }) => (
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
      reduced
        ? {}
        : {
            x: [
              `${Math.cos(angle) * radius}vw`,
              `${Math.cos(angle + Math.PI) * radius}vw`,
              `${Math.cos(angle) * radius}vw`,
            ],
            y: [
              `${Math.sin(angle) * radius}vw`,
              `${Math.sin(angle + Math.PI) * radius}vw`,
              `${Math.sin(angle) * radius}vw`,
            ],
            scale: [1, pulse, 1],
          }
    }
    transition={{ duration: (2 * Math.PI) / speed, repeat: Infinity, ease: 'linear' }}
  />
);

Star.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  pulse: PropTypes.number.isRequired,
  reduced: PropTypes.bool.isRequired,
};

const DashedRing = ({ radius, dashArray, strokeWidth, color, duration, delay, reduced }) => (
  <motion.svg
    width="100%"
    height="100%"
    viewBox={`0 0 ${radius * 2 + 2} ${radius * 2 + 2}`}
    style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
    animate={reduced ? {} : { rotate: [0, 360] }}
    transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
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
  delay: PropTypes.number.isRequired,
  reduced: PropTypes.bool.isRequired,
};

const EnergyArc = ({ r, color, duration, delay, reduced }) => {
  const circumference = 2 * Math.PI * r;
  const dashLength = circumference * 0.25;
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${r * 2 + 2} ${r * 2 + 2}`}
      style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
      animate={reduced ? {} : { rotate: [0, 360] }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <circle
        cx="50%"
        cy="50%"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="0.2"
        strokeDasharray={`${dashLength} ${circumference - dashLength}`}
        strokeLinecap="round"
      />
    </motion.svg>
  );
};

EnergyArc.propTypes = {
  r: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
  reduced: PropTypes.bool.isRequired,
};

const EdgeStroke = ({ x, y, width, height, gradient, duration, moveX, moveY, reduced }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      background: gradient,
      borderRadius: 4,
      filter: 'blur(1px)',
      willChange: 'transform, opacity',
    }}
    animate={reduced ? {} : { x: moveX, y: moveY, opacity: [0.7, 1, 0.7] }}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  />
);

EdgeStroke.propTypes = {
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  gradient: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  moveX: PropTypes.arrayOf(PropTypes.string).isRequired,
  moveY: PropTypes.arrayOf(PropTypes.string).isRequired,
  reduced: PropTypes.bool.isRequired,
};

const ConstellationConnections = ({ nodePositions, reduced }) => {
  if (reduced || nodePositions.length < 2) return null;
  const lines = [];
  for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
      const dx = nodePositions[i].x - nodePositions[j].x;
      const dy = nodePositions[i].y - nodePositions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DISTANCE) {
        const opacity = 1 - dist / MAX_DISTANCE;
        lines.push(
          <line
            key={`${i}-${j}`}
            x1={`calc(50% + ${nodePositions[i].x}vw)`}
            y1={`calc(50% + ${nodePositions[i].y}vw)`}
            x2={`calc(50% + ${nodePositions[j].x}vw)`}
            y2={`calc(50% + ${nodePositions[j].y}vw)`}
            stroke={`rgba(139,92,246,${opacity * 0.3})`}
            strokeWidth="1"
          />
        );
      }
    }
  }
  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}
    >
      {lines}
    </svg>
  );
};

ConstellationConnections.propTypes = {
  nodePositions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  reduced: PropTypes.bool.isRequired,
};

// ── Main Decorator ──
const HeroImageDecorator = () => {
  const prefersReduced = useReducedMotion();
  const { stars, nodes } = useResponsiveData();
  const nodePositions = useNodePositions(nodes, prefersReduced);

  return (
    <DecoratorWrapper aria-hidden="true">
      {EDGE_STROKES.map((s, i) => (
        <EdgeStroke key={`edge-${i}`} {...s} reduced={prefersReduced} />
      ))}
      {DASHED_RINGS.map(ring => (
        <DashedRing key={ring.radius} {...ring} reduced={prefersReduced} />
      ))}
      {ENERGY_ARCS.map(arc => (
        <EnergyArc key={arc.id} {...arc} reduced={prefersReduced} />
      ))}
      <ConstellationConnections nodePositions={nodePositions} reduced={prefersReduced} />
      {stars.map(star => (
        <Star key={star.id} {...star} reduced={prefersReduced} />
      ))}
      {nodePositions.map(node => (
        <motion.div
          key={node.id}
          style={{
            position: 'absolute',
            width: `${node.size}vw`,
            height: `${node.size}vw`,
            borderRadius: '50%',
            background: node.color,
            boxShadow: `0 0 ${node.size * 3}vw ${node.color}`,
            top: '50%',
            left: '50%',
            x: `${node.x}vw`,
            y: `${node.y}vw`,
            willChange: 'transform',
          }}
          animate={prefersReduced ? {} : { scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.div
        style={{
          position: 'absolute',
          width: '40vw',
          height: '40vw',
          maxWidth: '300px',
          maxHeight: '300px',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
        }}
        animate={prefersReduced ? {} : { scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </DecoratorWrapper>
  );
};

export default HeroImageDecorator;
