import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { getTestimonials } from '../../data/testimonials';
import { useReducedMotion, fadeInUpVariants } from '../../motionConfig';
import { Icon } from '../common/Icon';

/* ---------- Keyframes ---------- */

/* The track holds two identical blocks side by side. Animating the track
   from 0 to -50% moves it by exactly one block width. When the animation
   restarts, the second block is already sitting where the first block
   started, so the loop appears seamless. No JavaScript needed. */
const scrollX = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
`;

/* ---------- Styled ---------- */

const Section = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0 60px;
  background: rgba(12, 12, 29, 0.4);

  @media (max-width: 960px) {
    padding: 60px 0 40px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1350px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  @media (max-width: 960px) {
    padding: 0 16px;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 2.8rem);
  text-align: center;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary, #f2f2f7);
  letter-spacing: -0.02em;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.125rem;
  text-align: center;
  font-weight: 500;
  color: var(--text-secondary, #a0a0b8);
  margin: 0 0 32px 0;
  max-width: 640px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

/* The mask. Hides overflow so cards enter and exit off-screen. Fades the
   left and right edges so the scroll feels infinite rather than cut off. */
const MarqueeMask = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%);

  @media (max-width: 640px) {
    mask-image: none;
    -webkit-mask-image: none;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

/* The track. Two blocks side by side. Width = max-content so it sizes to
   its children. Animated by the scrollX keyframes. */
const Track = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
  gap: 24px;
  animation: ${scrollX} ${({ $duration }) => $duration}s linear infinite;
  will-change: transform;
  backface-visibility: hidden;

  /* Pause on hover and while any child is keyboard-focused. */
  &:hover,
  &:focus-within {
    animation-play-state: paused;
  }

  @media (max-width: 640px) {
    /* On very small screens we fall back to a manually scrollable row.
       The mask fades out, the container becomes a scroller, and the
       animation is disabled so touch users can scroll at their own pace. */
    animation: none;
    gap: 16px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    /* Drop the compositor hint — the animation is off, so promoting the
       track to its own layer is pure waste. */
    will-change: auto;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    gap: 20px;
  }
`;

const Block = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 24px;
  flex-shrink: 0;

  @media (max-width: 640px) {
    gap: 16px;
  }

  @media (prefers-reduced-motion: reduce) {
    flex-wrap: wrap;
    /* Allow the block to shrink into the 100%-wide track instead of
       overflowing it. */
    flex-shrink: 1;
    justify-content: center;
    gap: 20px;
  }
`;

const Card = styled.article`
  position: relative;
  flex: 0 0 auto;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 32px 32px 28px;
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  border-radius: 1.25rem;
  box-shadow: var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.4));
  overflow: hidden;
  transition:
    border-color 300ms ease,
    box-shadow 300ms ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.32);
    box-shadow:
      var(--shadow-md, 0 8px 30px rgba(0, 0, 0, 0.6)),
      0 0 22px rgba(139, 92, 246, 0.16);
  }

  @media (max-width: 768px) {
    width: 320px;
    padding: 28px 24px 24px;
  }

  @media (max-width: 480px) {
    width: 280px;
    padding: 24px 20px 22px;
    gap: 14px;
  }

  @media (prefers-reduced-motion: reduce) {
    width: 360px;
  }
`;

const QuoteMark = styled.div`
  position: absolute;
  top: 6px;
  right: 20px;
  font-size: 96px;
  line-height: 1;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  color: rgba(139, 92, 246, 0.14);
  pointer-events: none;
  user-select: none;

  @media (max-width: 480px) {
    font-size: 72px;
    top: 2px;
    right: 14px;
  }
`;

const Quote = styled.blockquote`
  margin: 0;
  position: relative;
  z-index: 1;
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--text-primary, #e8e8f0);
  font-weight: 500;
  letter-spacing: 0.05px;
  /* Reserve exactly enough vertical space for the longest expected quote
     so cards in a single row have consistent height. */
  min-height: 130px;

  @media (max-width: 480px) {
    font-size: 0.96rem;
    line-height: 1.6;
    min-height: 120px;
  }
`;

const Attribution = styled.footer`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 480px) {
    gap: 10px;
    padding-top: 12px;
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  background: var(--accent-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 255, 255, 0.12);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 480px) {
    width: 42px;
    height: 42px;
    font-size: 13px;
  }
`;

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
`;

const PersonName = styled.div`
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--text-primary, #f2f2f7);
  line-height: 1.3;
`;

const PersonRole = styled.div`
  font-size: 0.82rem;
  color: var(--text-secondary, #a0a0b8);
  line-height: 1.4;
`;

const SourceBadge = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 4px 9px;
  border-radius: 999px;
  color: var(--accent-glow, #8b5cf6);
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.22);
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    background 200ms ease,
    border-color 200ms ease;

  &:hover {
    background: rgba(139, 92, 246, 0.16);
    border-color: rgba(139, 92, 246, 0.45);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-glow, #8b5cf6);
    outline-offset: 2px;
  }
`;

const SourceLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 4px 9px;
  border-radius: 999px;
  color: var(--text-secondary, #a0a0b8);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  white-space: nowrap;
  flex-shrink: 0;
`;

/* ---------- Helpers ---------- */

const getInitials = name => {
  if (!name) return '?';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
};

const buildRoleLine = item => {
  const parts = [item.role, item.company].filter(Boolean);
  return parts.join(' · ');
};

/* Target block width in cards. If we have fewer cards than this, each
   block is duplicated enough times to fill the widest realistic viewport.
   Combined with the second mirrored block, the track always has enough
   cards to fill any screen without gaps. */
const MIN_CARDS_PER_BLOCK = 8;

/* Seconds per card in the marquee animation. Slower is more readable but
   takes longer for the loop to advance. 6s per card is a reasonable
   middle ground for a portfolio. */
const SECONDS_PER_CARD = 6;

/* ---------- Card ---------- */

const TestimonialCard = ({ item }) => (
  <Card>
    <QuoteMark aria-hidden="true">&ldquo;</QuoteMark>
    <Quote>{item.quote}</Quote>
    <Attribution>
      <Avatar aria-hidden="true">
        {item.avatar ? (
          <img src={item.avatar} alt={`${item.name} portrait`} loading="lazy" decoding="async" />
        ) : (
          <span>{getInitials(item.name)}</span>
        )}
      </Avatar>
      <PersonInfo>
        <PersonName>{item.name}</PersonName>
        {buildRoleLine(item) && <PersonRole>{buildRoleLine(item)}</PersonRole>}
      </PersonInfo>
      {item.source &&
        (item.sourceUrl ? (
          <SourceBadge
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View original ${item.source} post`}
          >
            <Icon name="external" size={11} />
            {item.source}
          </SourceBadge>
        ) : (
          <SourceLabel>{item.source}</SourceLabel>
        ))}
    </Attribution>
  </Card>
);

TestimonialCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    quote: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
    company: PropTypes.string,
    avatar: PropTypes.string,
    source: PropTypes.string,
    sourceUrl: PropTypes.string,
  }).isRequired,
};

/* ---------- Component ---------- */

const Testimonials = () => {
  const prefersReduced = useReducedMotion();
  const items = getTestimonials();
  const count = items.length;

  if (count === 0) return null;

  // How many times to repeat the item list inside a single block, so the
  // block is wide enough to fill the screen and the loop has no gap.
  const copiesPerBlock = Math.max(1, Math.ceil(MIN_CARDS_PER_BLOCK / count));
  const cardsInBlock = Array.from({ length: copiesPerBlock }).flatMap(() => items);

  const duration = cardsInBlock.length * SECONDS_PER_CARD;

  return (
    <Section aria-labelledby="testimonials-heading">
      <Wrapper>
        <Title
          id="testimonials-heading"
          variants={prefersReduced ? {} : fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          What People Say
        </Title>

        <Subtitle
          variants={prefersReduced ? {} : fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Feedback from engineers, clients, and collaborators I have worked with.
        </Subtitle>

        <MarqueeMask>
          <Track $duration={duration}>
            <Block>
              {cardsInBlock.map((item, idx) => (
                <TestimonialCard key={`a-${item.id}-${idx}`} item={item} />
              ))}
            </Block>
            <Block aria-hidden="true">
              {cardsInBlock.map((item, idx) => (
                <TestimonialCard key={`b-${item.id}-${idx}`} item={item} />
              ))}
            </Block>
          </Track>
        </MarqueeMask>
      </Wrapper>
    </Section>
  );
};

export default Testimonials;
