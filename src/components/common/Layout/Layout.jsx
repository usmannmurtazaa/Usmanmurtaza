import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import { trackEvent } from '../../../analytics';

const Layout = ({ children }) => {
  useEffect(() => {
    // Single-page site: there is exactly one path. Fire the page view once
    // on mount instead of reading from a router location that never changes.
    trackEvent('page_view', 'layout', '/');
  }, []);

  return (
    <>
      <Navbar />
      <main
        style={{
          background: 'var(--bg-glass, rgba(18, 18, 35, 0.6))',
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
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
