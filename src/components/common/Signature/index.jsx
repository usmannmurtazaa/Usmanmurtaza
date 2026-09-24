import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

/* ---------- Keyframes ---------- */

const iconIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.7) rotate(-15deg);
  }
  60% {
    opacity: 1;
    transform: scale(1.1) rotate(3deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

const textIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-6px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const strokeDraw = keyframes`
  from {
    stroke-dashoffset: 210;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

/* ---------- Styled ---------- */

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: ${({ $height }) => $height}px;
  line-height: 1;
  cursor: pointer;
  transform: translateZ(0);
  transition:
    transform 250ms ease,
    opacity 250ms ease,
    filter 250ms ease;

  &:hover {
    transform: scale(1.04);
    filter: drop-shadow(0 0 14px rgba(139, 92, 246, 0.45));
  }

  &:active {
    transform: scale(0.99);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-glow, #8b5cf6);
    outline-offset: 4px;
    border-radius: 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:active {
      transform: none;
      filter: none;
    }
  }
`;

const SignatureIcon = styled.svg`
  width: ${({ $iconSize }) => $iconSize}px;
  height: ${({ $iconSize }) => $iconSize}px;
  flex-shrink: 0;
  color: var(--accent-glow, #8b5cf6);
  opacity: 0;
  transform-origin: 50% 50%;
  animation: ${iconIn} 500ms ease-out 100ms forwards;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const TextBlock = styled.span`
  position: relative;
  display: inline-block;
  line-height: 1;
`;

const SignatureText = styled.span`
  display: inline-block;
  /* 'Yellowtail' (loaded via Google Fonts in index.html) is a casual brush
     script that closely matches Brush Script MT. It renders on every
     platform, so the signature looks the same on desktop and mobile.
     The remaining families are graceful fallbacks if the webfont fails
     to load or is blocked. */
  font-family: 'Yellowtail', 'Dancing Script', 'Brush Script MT', 'Lucida Handwriting', cursive;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 400;
  white-space: nowrap;
  line-height: 1;
  letter-spacing: 0.02em;

  /* Gradient shimmer across the calligraphy. The text is painted with
     a three-stop accent gradient that slowly slides across. Falls back
     to the inherited color if background-clip: text is unsupported. */
  color: inherit;
  background: linear-gradient(
    100deg,
    #8b5cf6 0%,
    #3b82f6 35%,
    #06b6d4 55%,
    #3b82f6 75%,
    #8b5cf6 100%
  );
  background-size: 220% 100%;
  background-position: 0% 50%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  opacity: 0;
  animation:
    ${textIn} 600ms ease-out 200ms forwards,
    ${shimmer} 6s linear 800ms infinite;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
    background-position: 0% 50%;
    color: inherit;
    -webkit-text-fill-color: inherit;
    background: none;
  }
`;

const UnderlineSvg = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  width: 100%;
  height: 8px;
  overflow: visible;
  pointer-events: none;

  path {
    fill: none;
    stroke: var(--accent-glow, #8b5cf6);
    stroke-width: 1.4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 210;
    stroke-dashoffset: 210;
    opacity: 0.55;
    animation: ${strokeDraw} 900ms ease-out 350ms forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    path {
      stroke-dashoffset: 0;
      animation: none;
    }
  }
`;

/* ---------- Component ---------- */

const Signature = ({
  children = 'Usman.',
  fontSize = '2.4rem',
  height = 52,
  iconSize = 28,
  className,
  ariaLabel,
}) => {
  const accessibilityProps = ariaLabel
    ? { role: 'img', 'aria-label': ariaLabel }
    : { 'aria-hidden': 'true' };

  return (
    <Wrapper $height={height} className={className} {...accessibilityProps}>
      <SignatureIcon
        $iconSize={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Code icon — </> — pairs with the calligraphy signature. */}
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </SignatureIcon>

      <TextBlock>
        <SignatureText $fontSize={fontSize}>{children}</SignatureText>
        <UnderlineSvg viewBox="0 0 200 6" preserveAspectRatio="none">
          <path d="M 2 4 Q 60 1 100 3 Q 140 5 198 3" />
        </UnderlineSvg>
      </TextBlock>
    </Wrapper>
  );
};

Signature.propTypes = {
  children: PropTypes.node,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  iconSize: PropTypes.number,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Signature;
