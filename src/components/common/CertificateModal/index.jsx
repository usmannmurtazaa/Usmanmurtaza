import React, { useEffect } from 'react';
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
`;

/* The image is constrained by viewport units directly. No parent height
   math, no flex-basis tricks, no overflow clipping. max-width and
   max-height alone guarantee the image never exceeds the viewport. */
const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;

  picture {
    display: contents;
  }

  img {
    max-width: 90vw;
    max-height: 85vh;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    border-radius: 12px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);

    @media (max-width: 640px) {
      max-width: 95vw;
      max-height: 78vh;
      border-radius: 8px;
    }
  }
`;

/* Anchored to the viewport, not to any parent. Cannot be hidden. */
const CloseBtn = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
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
  z-index: 10001;
  padding: 0;
  transition:
    background 200ms ease,
    border-color 200ms ease,
    transform 200ms ease;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);

  svg {
    width: 24px;
    height: 24px;
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
    top: 12px;
    right: 12px;
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

/* Anchored to the bottom of the viewport, centered horizontally. */
const Meta = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10001;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  max-width: calc(100vw - 40px);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);

  @media (max-width: 640px) {
    bottom: 12px;
    padding: 8px 16px;
    border-radius: 10px;
  }
`;

const Issuer = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(238, 242, 248, 0.75);
  font-weight: 500;
`;

const Title = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.3;

  @media (max-width: 640px) {
    font-size: 0.85rem;
  }
`;

/* ---------- Animation variants ---------- */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
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

  return (
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
          <ImageWrapper onClick={e => e.stopPropagation()}>
            <picture>
              <source srcSet={toWebpSrcSet(image)} type="image/webp" />
              <img src={image} alt={`${issuer} — ${courseTitle}`} />
            </picture>
          </ImageWrapper>

          <Meta onClick={e => e.stopPropagation()}>
            <Issuer>{issuer}</Issuer>
            <Title>{courseTitle}</Title>
          </Meta>

          <CloseBtn
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close certificate"
          >
            <Icon name="x" size={24} />
          </CloseBtn>
        </Overlay>
      )}
    </AnimatePresence>
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
