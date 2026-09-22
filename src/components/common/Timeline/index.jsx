import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../../motionConfig';

/* ---------- Styled Components ---------- */

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 80rem; /* ~1280px */
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2.5rem;
  }
`;

const ItemsWrap = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 5rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 2.5rem;
  position: relative;

  @media (min-width: 768px) {
    padding-top: 8rem;
    gap: 2.5rem;
  }
`;

const LeftCol = styled.div`
  /* On mobile the left column collapses — the title moves above the
     content in the right column. On desktop it becomes a sticky sidebar
     that parks below the navbar as you scroll. */
  position: sticky;
  top: 10rem;
  align-self: flex-start;
  display: none;
  z-index: 40;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    max-width: 20rem;
  }

  @media (min-width: 1024px) {
    max-width: 24rem;
  }
`;

const Dot = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--bg-primary, #0c0c1d);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  @media (max-width: 767px) {
    left: 0.75rem;
  }
`;

const DotInner = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: rgba(160, 160, 184, 0.35);
  border: 1px solid rgba(160, 160, 184, 0.6);
  transition:
    background 300ms ease,
    border-color 300ms ease;

  ${Row}:hover & {
    background: var(--accent-glow, #8b5cf6);
    border-color: var(--accent-glow, #8b5cf6);
  }
`;

const DesktopTitle = styled.h3`
  display: none;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-secondary, #a0a0b8);
  margin: 0;
  padding-left: 5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    display: block;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

const RightCol = styled.div`
  position: relative;
  width: 100%;
  padding-left: 5rem;
  padding-right: 0.5rem;

  @media (min-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const MobileTitle = styled.h3`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-secondary, #a0a0b8);
  margin: 0 0 1rem 0;
  text-align: left;
  letter-spacing: -0.01em;

  @media (min-width: 768px) {
    display: none;
  }
`;

const BeamTrack = styled.div`
  position: absolute;
  left: 2rem;
  top: 0;
  width: 2px;
  overflow: hidden;
  /* Soft neutral rail behind the animated beam. Fades at top and bottom. */
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 10%,
    rgba(255, 255, 255, 0.08) 90%,
    transparent 100%
  );
  mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  pointer-events: none;
`;

/* The animated fill — height is driven by scroll progress. */
const BeamFill = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 2px;
  border-radius: 999px;
  background: linear-gradient(
    to top,
    #8b5cf6 0%,
    #3b82f6 10%,
    rgba(59, 130, 246, 0.4) 55%,
    transparent 100%
  );
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.4);
`;

/* ---------- Component ---------- */

const Timeline = ({ data }) => {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const prefersReduced = useReducedMotion();

  // Measure the total items height so the beam track can match it.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setHeight(rect.height);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scroll-driven progress: 0 when the timeline top reaches 10% of the
  // viewport, 1 when the timeline bottom reaches 50% of the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // When reduced motion is on, show the beam at full height with no
  // scroll-driven animation.
  const beamStyle = prefersReduced
    ? { height: `${height}px`, opacity: 1 }
    : { height: heightTransform, opacity: opacityTransform };

  return (
    <Container ref={containerRef}>
      <ItemsWrap>
        {data.map((item, index) => (
          <Row key={index}>
            <LeftCol>
              <Dot>
                <DotInner />
              </Dot>
              <DesktopTitle>{item.title}</DesktopTitle>
            </LeftCol>

            <RightCol>
              <MobileTitle>{item.title}</MobileTitle>
              {item.content}
            </RightCol>
          </Row>
        ))}

        <BeamTrack style={{ height: `${height}px` }} aria-hidden="true">
          <BeamFill style={beamStyle} />
        </BeamTrack>
      </ItemsWrap>
    </Container>
  );
};

Timeline.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Timeline;
