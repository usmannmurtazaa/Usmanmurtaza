import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledContainer = styled.div`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${({ padding }) => padding || '0 20px'};

  /* Optional glassmorphism background.
     Note: no backdrop-filter here on purpose. A Container is a layout
     primitive and typically spans full section width; blurring it would
     force the compositor to blur a section-sized region on every scroll
     frame. The translucent background + border + shadow already provide
     the intended glass look. Consumers that need a blurred surface should
     apply it to a small, focal element instead. */
  ${({ glass }) =>
    glass &&
    `
    background: var(--bg-glass, rgba(18, 18, 35, 0.6));
    border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
    border-radius: 1.5rem;
    box-shadow: var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.4));
    padding: ${({ padding }) => padding || '24px'};
  `}
`;

const Container = ({ children, maxWidth, padding, className, glass }) => {
  return (
    <StyledContainer maxWidth={maxWidth} padding={padding} className={className} glass={glass}>
      {children}
    </StyledContainer>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  padding: PropTypes.string,
  className: PropTypes.string,
  glass: PropTypes.bool,
};

export default Container;
