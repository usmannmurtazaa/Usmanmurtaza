import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

/* ---------- Keyframes ----------
   Only transform and opacity animate. No layout, no paint, no blur.
   Durations are deliberately long (28–40s) so the motion is barely
   perceptible while scrolling — a "live" feeling, not a distracting one.
*/

const driftA = keyframes`
  0% {
    transform: translate3d(0%, 0%, 0) scale(1);
  }
  50% {
    transform: translate3d(6%, -4%, 0) scale(1.08);
  }
  100% {
    transform: translate3d(0%, 0%, 0) scale(1);
  }
`;

const driftB = keyframes`
  0% {
    transform: translate3d(0%, 0%, 0) scale(1.05);
  }
  50% {
    transform: translate3d(-8%, 6%, 0) scale(1);
  }
  100% {
    transform: translate3d(0%, 0%, 0) scale(1.05);
  }
`;

const driftC = keyframes`
  0% {
    transform: translate3d(0%, 0%, 0) scale(1);
    opacity: 0.65;
  }
  50% {
    transform: translate3d(4%, 8%, 0) scale(1.12);
    opacity: 0.9;
  }
  100% {
    transform: translate3d(0%, 0%, 0) scale(1);
    opacity: 0.65;
  }
`;

/* ---------- Styled ---------- */

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  /* Sits above body::before (z-index -1) and above the Layout's
     semi-transparent main background, but below the sections
     (which use z-index 1). */
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  /* No background on the wrapper itself — the base colour comes from
     body / body::before. Only the blobs paint on this layer. */
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  will-change: transform, opacity;
  pointer-events: none;
`;

const BlobA = styled(Blob)`
  top: -10%;
  left: -10%;
  width: 60vw;
  height: 60vw;
  max-width: 1000px;
  max-height: 1000px;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(139, 92, 246, 0.3) 0%,
    rgba(139, 92, 246, 0.08) 40%,
    transparent 70%
  );
  animation: ${driftA} 28s ease-in-out infinite;
`;

const BlobB = styled(Blob)`
  bottom: -15%;
  right: -10%;
  width: 65vw;
  height: 65vw;
  max-width: 1100px;
  max-height: 1100px;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(59, 130, 246, 0.28) 0%,
    rgba(59, 130, 246, 0.07) 40%,
    transparent 70%
  );
  animation: ${driftB} 34s ease-in-out infinite;
  animation-delay: 4s;
`;

const BlobC = styled(Blob)`
  top: 30%;
  left: 40%;
  width: 45vw;
  height: 45vw;
  max-width: 700px;
  max-height: 700px;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(6, 182, 212, 0.24) 0%,
    rgba(6, 182, 212, 0.06) 40%,
    transparent 70%
  );
  opacity: 0.65;
  animation: ${driftC} 40s ease-in-out infinite;
  animation-delay: 8s;

  /* Hide the third blob on small screens to save GPU work. */
  @media (max-width: 768px) {
    display: none;
  }
`;

/* ---------- Component ---------- */

const LiveBackground = ({ className }) => {
  return (
    <Wrapper className={className} aria-hidden="true">
      <BlobA />
      <BlobB />
      <BlobC />
    </Wrapper>
  );
};

LiveBackground.propTypes = {
  className: PropTypes.string,
};

export default LiveBackground;
