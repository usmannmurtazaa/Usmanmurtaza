import React from 'react';
import PropTypes from 'prop-types';
import { ICON_MAP } from './icons';

const Icon = ({ name, size = 24, color = 'currentColor', className = '', ariaLabel, ...props }) => {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel || undefined}
        {...props}
      >
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="8" x2="12" y2="8" />
        <line x1="8" y1="16" x2="14" y2="16" />
      </svg>
    );
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={1.5}
      className={className}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel || undefined}
      {...props}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Icon;
