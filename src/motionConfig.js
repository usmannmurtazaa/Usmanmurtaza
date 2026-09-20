import { useEffect, useState } from 'react';

export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const handler = e => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return prefersReduced;
};

// Apple‑like pillowy spring for micro‑interactions
export const springTransition = {
  type: 'spring',
  stiffness: 150,
  damping: 18,
  mass: 0.8,
};

// Scroll reveal variants.
// NOTE: no `filter: blur(...)` here on purpose. Animating a blur filter
// forces the browser to re‑rasterize the element on every frame, which is
// a significant GPU cost when this variant is used across all sections.
// Fade + translate alone is visually equivalent and far cheaper.
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Staggered container for cascading reveals
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};
