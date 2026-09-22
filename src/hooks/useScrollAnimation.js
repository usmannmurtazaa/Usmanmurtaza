import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion, fadeInUpVariants } from '../motionConfig';

/**
 * useScrollAnimation – returns a ref and animation props for Framer Motion.
 *
 * Uses the shared `fadeInUpVariants` from motionConfig so the reveal timing
 * and easing stay consistent with every other section on the site. The
 * blur-filter that used to be part of this hook's default variants was
 * removed for performance (animating a CSS blur filter forces per-frame
 * GPU rasterization).
 *
 * @param {object} options
 * @param {object} [options.variants] – motion variants (defaults to fadeInUpVariants)
 * @param {number} [options.amount]   – "amount" threshold for useInView (0 – 1)
 * @param {boolean} [options.once]    – only animate once
 * @returns {{ ref: React.Ref, animation: object }}
 */
export const useScrollAnimation = ({ variants, amount = 0.2, once = true } = {}) => {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const isInView = useInView(ref, { amount, once });

  const animation = prefersReduced
    ? {}
    : {
        initial: 'hidden',
        animate: isInView ? 'visible' : 'hidden',
        variants: variants || fadeInUpVariants,
        transition: { duration: 0.5, ease: 'easeOut' },
      };

  return { ref, animation };
};

export default useScrollAnimation;
