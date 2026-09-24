import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { useReducedMotion } from '../../../motionConfig';
import { toWebpSrcSet } from '../../../utils/image';

/* ---------- Styled ---------- */

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(4, 6, 14, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 640px) {
    padding: 0;
    align-items: stretch;
  }
`;

/* Modal panel. On desktop it is a centered card; on mobile it becomes a
   full-screen sheet using 100dvh (dynamic viewport height, which handles
   iOS Safari's URL bar correctly). The meta bar is a flex child of this
   panel, so it never overlaps the image. */
const Panel = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 1100px;
  height: 90vh;
  max-height: 90vh;
  background: rgba(18, 18, 35, 0.96);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.65),
    0 0 40px rgba(139, 92, 246, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 640px) {
    height: 100dvh;
    max-height: 100dvh;
    border-radius: 0;
    border: none;
  }
`;

/* Anchored inside the panel, not to the viewport, so it always sits in
   the top-right corner of the modal regardless of scroll. */
const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  background: rgba(0, 0, 0, 0.85);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  padding: 0;
  transition:
    background 200ms ease,
    border-color 200ms ease,
    transform 200ms ease;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);

  svg {
    width: 22px;
    height: 22px;
    stroke-width: 2.5;
  }

  &:hover {
    background: #8b5cf6;
    border-color: #8b5cf6;
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 3px;
  }

  @media (max-width: 640px) {
    top: 10px;
    right: 10px;
    width: 44px;
    height: 44px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover,
    &:active {
      transform: none;
    }
  }
`;

/* Image area fills all space above the meta bar. min-height: 0 is
   required for a flex child to shrink below its intrinsic content size.
   Generous padding plus the max-width/max-height on the img keep the
   certificate visually smaller and centered with clear margins. */
const ImageArea = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px 30px 40px;
  overflow: auto;

  picture {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    max-height: 100%;
  }

  img {
    max-width: 85%;
    max-height: 85%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    border-radius: 8px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 640px) {
    padding: 60px 20px 20px 20px;

    img {
      max-width: 90%;
      max-height: 90%;
      border-radius: 4px;
    }
  }
`;

/* Meta bar sits directly below the image as a flex child of the panel.
   Not fixed to the viewport, so it never overlaps the image and never
   collides with the phone's home indicator or URL bar. */
const Meta = styled.div`
  flex-shrink: 0;
  padding: 14px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(10, 10, 22, 0.85);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3px;

  @media (max-width: 640px) {
    padding: 12px 16px 14px;
  }
`;

const Issuer = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(238, 242, 248, 0.7);
  font-weight: 500;

  @media (max-width: 640px) {
    font-size: 0.62rem;
    letter-spacing: 0.16em;
  }
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.35;

  @media (max-width: 640px) {
    font-size: 0.9rem;
  }
`;

/* ---------- Animation variants ---------- */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.18 } },
};

/* ---------- Component ---------- */

const CertificateModal = ({ open, certificate, onClose }) => {
  const prefersReduced = useReducedMotion();

  // Esc closes
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Body scroll lock while open
  useEffect(() => {
    if (!open) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!certificate) return null;

  const { issuer, courseTitle, image } = certificate;

  return createPortal(
    <AnimatePresence>
      {open && (
        <Overlay
          key="certificate-overlay"
          variants={prefersReduced ? {} : overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${issuer} — ${courseTitle}`}
        >
          <Panel
            variants={prefersReduced ? {} : panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            <CloseBtn onClick={onClose} aria-label="Close certificate">
              <Icon name="x" size={22} />
            </CloseBtn>

            <ImageArea>
              <picture>
                <source srcSet={toWebpSrcSet(image)} type="image/webp" />
                <img src={image} alt={`${issuer} — ${courseTitle}`} />
              </picture>
            </ImageArea>

            <Meta>
              <Issuer>{issuer}</Issuer>
              <Title>{courseTitle}</Title>
            </Meta>
          </Panel>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );
};

CertificateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  certificate: PropTypes.shape({
    issuer: PropTypes.string,
    courseTitle: PropTypes.string,
    image: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default CertificateModal;
