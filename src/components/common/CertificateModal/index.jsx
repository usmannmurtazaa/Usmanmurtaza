import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { useReducedMotion } from '../../../motionConfig';

/* ---------- Styled ---------- */

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(4, 6, 14, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow: hidden;

  @media (max-width: 640px) {
    padding: 0;
    align-items: stretch;
  }
`;

const Inner = styled(motion.div)`
  position: relative;
  background: rgba(18, 18, 35, 0.92);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.6),
    0 0 40px rgba(139, 92, 246, 0.15);
  width: 100%;
  max-width: 1100px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 640px) {
    /* Full-screen sheet on mobile. 100dvh handles mobile browser
       chrome (URL bar) correctly, unlike 100vh which overflows on
       iOS Safari. */
    height: 100dvh;
    max-height: 100dvh;
    border-radius: 0;
    border: none;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #eef2f8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 200ms ease;

  &:hover {
    background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
    border-color: transparent;
    transform: rotate(90deg);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-glow, #8b5cf6);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

/* Image area flexes to fill all space left over by the meta footer.
   `min-height: 0` is required for a flex child to shrink below its
   intrinsic content height — without it the image would force the
   modal to grow. */
const ImageWrap = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow: auto;

  /* Center horizontally when the image is narrower than the wrap */
  & > img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    border-radius: 8px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    /* Prevent iOS long-press ghosting on the image */
    -webkit-touch-callout: none;
  }

  @media (max-width: 640px) {
    padding: 8px 0;
    /* Allow horizontal scroll when the image is wider than the modal
       on very narrow phones. */
    overflow-x: auto;
    overflow-y: hidden;

    & > img {
      border-radius: 0;
      box-shadow: none;
    }
  }
`;

const Meta = styled.div`
  padding: 16px 24px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  flex-shrink: 0;

  @media (max-width: 640px) {
    padding: 12px 16px 14px;
  }
`;

const Issuer = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(238, 242, 248, 0.55);
  font-weight: 500;

  @media (max-width: 640px) {
    font-size: 0.65rem;
    letter-spacing: 0.18em;
  }
`;

const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #eef2f8;
  line-height: 1.3;

  @media (max-width: 640px) {
    font-size: 0.95rem;
  }
`;

/* ---------- Animation variants ---------- */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const innerVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.2 } },
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
          <Inner
            variants={prefersReduced ? {} : innerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            <CloseBtn onClick={onClose} aria-label="Close certificate">
              <Icon name="x" size={20} />
            </CloseBtn>

            <ImageWrap>
              <img src={image} alt={`${issuer} — ${courseTitle}`} />
            </ImageWrap>

            <Meta>
              <Issuer>{issuer}</Issuer>
              <Title>{courseTitle}</Title>
            </Meta>
          </Inner>
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
