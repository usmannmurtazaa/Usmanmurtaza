import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useReducedMotion, fadeInUpVariants } from '../../../motionConfig'; // adjust path as needed

/* ---------- Styled Components (Design Tokens) ---------- */

const Wrapper = styled(motion.div)`
  text-align: ${({ align }) => align || 'center'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '50px'};
`;

const Title = styled.h2`
  font-size: ${({ size }) => (size === 'large' ? '42px' : size === 'small' ? '28px' : '36px')};
  font-weight: 700;
  color: var(--text-primary, #f2f2f7);
  margin-bottom: 8px;

  /* Optional: gradient accent for the title */
  background: ${({ accent }) =>
    accent ? 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))' : 'none'};
  -webkit-background-clip: ${({ accent }) => (accent ? 'text' : 'unset')};
  -webkit-text-fill-color: ${({ accent }) =>
    accent ? 'transparent' : 'var(--text-primary, #f2f2f7)'};
  background-clip: ${({ accent }) => (accent ? 'text' : 'unset')};

  @media (max-width: 768px) {
    font-size: ${({ size }) => (size === 'large' ? '36px' : size === 'small' ? '24px' : '28px')};
  }
`;

const GradientLine = styled.div`
  width: 80px;
  height: 4px;
  background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
  border-radius: 2px;
  margin: ${({ align }) => (align === 'center' ? '12px auto 0' : '12px 0 0')};
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: var(--text-secondary, #a0a0b8);
  max-width: 700px;
  margin: ${({ align }) => (align === 'center' ? '12px auto 0' : '12px 0 0')};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SectionHeader = ({
  title,
  subtitle,
  align = 'center',
  marginBottom,
  size = 'medium',
  accent = true, // 🆕 makes title gradient
  animate = true, // 🆕 enables fade-in motion
}) => {
  const prefersReduced = useReducedMotion();

  // Motion props (disabled if no animation or reduced motion)
  const motionProps =
    animate && !prefersReduced
      ? {
          variants: fadeInUpVariants,
          initial: 'hidden',
          whileInView: 'visible',
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6 },
        }
      : {};

  return (
    <Wrapper align={align} marginBottom={marginBottom} {...motionProps}>
      <Title size={size} accent={accent}>
        {title}
      </Title>
      <GradientLine align={align} />
      {subtitle && <Subtitle align={align}>{subtitle}</Subtitle>}
    </Wrapper>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(['center', 'left', 'right']),
  marginBottom: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  accent: PropTypes.bool, // 🆕
  animate: PropTypes.bool, // 🆕
};

export default SectionHeader;
