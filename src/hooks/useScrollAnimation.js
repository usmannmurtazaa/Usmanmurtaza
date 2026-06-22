import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '../motionConfig'; // shared hook

/**
 * useScrollAnimation – returns a ref and animation props for Framer Motion.
 *
 * @param {object} options
 * @param {object} options.variants   – motion variants (defaults to fadeInUp)
 * @param {number} options.amount     – "amount" threshold for useInView (0 - 1)
 * @param {boolean} options.once      – only animate once
 * @returns {{ ref: React.Ref, animation: object }}
 */
export const useScrollAnimation = ({ variants, amount = 0.2, once = true } = {}) => {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  // Import fadeInUpVariants lazily to avoid circular dependency
  let defaultVariants;
  if (!variants) {
    // We import dynamically inside the hook to avoid issues,
    // but you can also import at the top if motionConfig doesn't import this hook.
    defaultVariants = {
      hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    };
  }

  const isInView = useInView(ref, { amount, once });

  const animation = prefersReduced
    ? {}
    : {
        initial: 'hidden',
        animate: isInView ? 'visible' : 'hidden',
        variants: variants || defaultVariants,
        transition: { duration: 0.5, ease: 'easeOut' },
      };

  return { ref, animation };
};

export default useScrollAnimation;
