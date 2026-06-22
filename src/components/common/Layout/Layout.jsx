import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import { useReducedMotion } from '../../../motionConfig';
import { trackEvent } from '../../../analytics';

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, scale: 1.02, filter: 'blur(4px)', transition: { duration: 0.3 } },
};

const Layout = ({ children }) => {
  const prefersReduced = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    trackEvent('page_view', 'layout', location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={prefersReduced ? {} : pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            background: 'var(--bg-glass, rgba(18, 18, 35, 0.6))',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            borderTop: '1px solid var(--border-glass, rgba(255, 255, 255, 0.1))',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100vw',
            overflowX: 'hidden',
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
};

Layout.propTypes = { children: PropTypes.node.isRequired };
export default Layout;
