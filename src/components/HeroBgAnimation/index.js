import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useReducedMotion } from '../../motionConfig';
import './HeroBgAnimationStyle.css';

const BLOB_LAYERS = [
  {
    size: '70vw',
    from: { x: ['-15%', '15%', '-10%'], y: ['-25%', '5%', '-20%'] },
    duration: 25,
    className: 'blob blob-deep blur-3xl',
  },
  {
    size: '50vw',
    from: { x: ['-35%', '-5%', '-25%'], y: ['15%', '-15%', '10%'] },
    duration: 20,
    className: 'blob blob-mid-left blur-2xl',
  },
  {
    size: '45vw',
    from: { x: ['70%', '40%', '60%'], y: ['-20%', '20%', '-5%'] },
    duration: 22,
    className: 'blob blob-mid-right blur-2xl',
  },
  {
    size: '25vw',
    from: { x: ['5%', '35%', '15%'], y: ['45%', '65%', '55%'] },
    duration: 30,
    className: 'blob blob-foreground blur-xl',
  },
];

const Blob = ({ size, from, duration, className, reducedMotion }) => {
  const animateProps = reducedMotion ? {} : { x: from.x, y: from.y };
  const transitionProps = reducedMotion
    ? {}
    : {
        duration,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'mirror',
      };

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      animate={animateProps}
      transition={transitionProps}
    />
  );
};

Blob.propTypes = {
  size: PropTypes.string.isRequired,
  from: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.string).isRequired,
    y: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  duration: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  reducedMotion: PropTypes.bool.isRequired,
};

const HeroBackground = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div className="hero-bg-container" aria-hidden="true">
      {BLOB_LAYERS.map((layer, i) => (
        <Blob key={i} {...layer} reducedMotion={prefersReduced} />
      ))}
      <div className="vignette" />
      <div className="noise-overlay" />
      <div className="contrast-overlay" />
    </div>
  );
};

export default HeroBackground;
