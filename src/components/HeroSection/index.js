import React from 'react';
import HeroBackground from '../HeroBgAnimation';
import HeroImageDecorator from '../HeroImageDecorator';
import HeroSvgAnimation from '../HeroSvgAnimation';
import ThreeDCard, { ThreeDLayer } from '../common/ThreeDCard';
import Vortex from '../common/Vortex';
import styled from 'styled-components';
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
  ResumeButton,
  SecondaryButton,
  Img,
  HeroStats,
  StatItem,
  StatNumber,
  StatLabel,
  CTAButtons,
} from './HeroStyle';
import HeroImg from '../../images/HeroImage.png';
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import { motion } from 'framer-motion';
import { fadeInUpVariants } from '../../motionConfig';
import { trackHireMeClick, trackViewProjectsClick, trackEvent } from '../../analytics';

const BADGES = ['React.js', 'Node.js', 'JavaScript'];

/* Vortex background layer.
   Desktop: full hero area (inset: 0), sits above HeroBg (z-index 0)
   and below HeroInnerContainer (z-index 2).
   Mobile/tablet (<= 960px, when the hero stacks vertically): the layer
   is constrained to the top region so particles render behind the hero
   image instead of spreading down into the text area. */
const VortexLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;

  @media (max-width: 960px) {
    bottom: auto;
    height: min(115vw, 520px);
  }
`;

/* Sizing container for the 3D hero image. Keeps the image at the same
   effective size the plain <picture> used to occupy, while giving the
   3D card a proper width to transform within. The `> *` rule forces
   the ThreeDCard's inner motion.div to fill this slot — without it
   the reusable wrapper (display: inline-block) shrink-wraps the image
   to its intrinsic width. */
const HeroCardSlot = styled.div`
  width: 100%;
  max-width: 400px;

  > * {
    display: block;
    width: 100%;
  }

  @media (max-width: 768px) {
    max-width: 350px;
  }

  @media (max-width: 640px) {
    max-width: 280px;
  }
`;

const HeroSection = () => {
  return (
    <section id="hero" aria-label="Hero Section">
      <HeroContainer>
        <HeroBg>
          <HeroBackground />
        </HeroBg>

        <VortexLayer>
          <Vortex opacity={0.4} particleCount={400} mobileParticleCount={150} />
        </VortexLayer>

        <HeroInnerContainer>
          {/* ---------- Left Side ---------- */}
          <HeroLeftContainer id="Left">
            <Title
              as={motion.h1}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8 }}
            >
              Hi, I&apos;m <br />
              <span className="gradient-text">{Bio.name}</span>
              <br />
              <span className="subtitle">Full Stack & React Developer</span>
            </Title>

            <TextLoop
              as={motion.div}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Specializing in{' '}
              <Span>
                <Typewriter
                  options={{
                    strings: [
                      'React.js Development',
                      'Modern Web App',
                      'Responsive UI/UX',
                      'Web Performance',
                      'JavaScript',
                      'Scalable Backend',
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </Span>
            </TextLoop>

            <SubTitle
              as={motion.p}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I build <strong>high-performance, scalable web applications</strong> with modern
              technologies. As a passionate <strong>Full Stack Developer </strong>
              specializing in <strong>React.js, Node.js, and modern JavaScript</strong>, I create{' '}
              <strong>responsive, user-centric solutions</strong> that deliver exceptional
              experiences. Focused on clean code, optimized performance, and innovative
              problem-solving.
            </SubTitle>

            <HeroStats
              as={motion.div}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <StatItem>
                <StatNumber>2+</StatNumber>
                <StatLabel>Years Experience</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>15+</StatNumber>
                <StatLabel>Projects Delivered</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>100%</StatNumber>
                <StatLabel>Client Satisfaction</StatLabel>
              </StatItem>
            </HeroStats>

            <CTAButtons
              as={motion.div}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ResumeButton
                href={Bio.resume}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View my resume"
                onClick={() => trackEvent('click_resume', 'cta', 'Hero Resume')}
              >
                View Resume
              </ResumeButton>
              <SecondaryButton
                href="#contact"
                aria-label="Contact me for opportunities"
                onClick={trackHireMeClick}
              >
                Hire Me
              </SecondaryButton>
              <SecondaryButton
                href="#projects"
                aria-label="View my projects"
                onClick={trackViewProjectsClick}
              >
                View Projects
              </SecondaryButton>
            </CTAButtons>
          </HeroLeftContainer>

          {/* ---------- Right Side (image + decorations) ---------- */}
          <HeroRightContainer
            id="Right"
            as={motion.div}
            variants={fadeInUpVariants}
            initial="visible"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Geometric SVG layer behind the image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'visible',
              }}
            >
              <HeroSvgAnimation />
            </div>

            <HeroImageDecorator />

            {/* Hero image with WebP preferred, wrapped in a 3D tilt card.
                The ThreeDLayer adds a small translateZ depth so the image
                floats forward slightly when the card tilts. */}
            <HeroCardSlot>
              <ThreeDCard maxTilt={12} perspective={1000}>
                <ThreeDLayer $depth={30}>
                  <picture style={{ display: 'contents' }}>
                    <source srcSet={`${process.env.PUBLIC_URL}/HeroImage.webp`} type="image/webp" />
                    <Img
                      src={HeroImg}
                      alt="Usman Murtaza - Full Stack React Developer creating modern web applications"
                      title="Usman Murtaza | React.js & Full Stack Developer"
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                      width="400"
                      height="500"
                    />
                  </picture>
                </ThreeDLayer>
              </ThreeDCard>
            </HeroCardSlot>

            {/* Static badges */}
            <div className="image-badge">
              {BADGES.map(name => (
                <span key={name} className="badge">
                  {name}
                </span>
              ))}
            </div>
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </section>
  );
};

export default HeroSection;
