import React from 'react';
import HeroBackground from '../HeroBgAnimation';
import HeroImageDecorator from '../HeroImageDecorator';
import HeroSvgAnimation from '../HeroSvgAnimation';
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
import {
  useReducedMotion,
  fadeInUpVariants,
  springTransition,
  staggerContainer,
} from '../../motionConfig';
import { trackHireMeClick, trackViewProjectsClick, trackEvent } from '../../analytics';

// Badge items with float speeds
const BADGES = [
  { name: 'React.js', speed: 2.5 },
  { name: 'Node.js', speed: 3.2 },
  { name: 'JavaScript', speed: 2.8 },
];

const HeroSection = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section id="hero" aria-label="Hero Section">
      <HeroContainer>
        <HeroBg>
          <HeroBackground />
        </HeroBg>

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
                as={motion.a}
                whileHover={prefersReduced ? {} : { scale: 1.03 }}
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
                transition={springTransition}
                onClick={() => trackEvent('click_resume', 'cta', 'Hero Resume')}
              >
                View Resume
              </ResumeButton>
              <SecondaryButton
                href="#contact"
                aria-label="Contact me for opportunities"
                as={motion.a}
                whileHover={prefersReduced ? {} : { scale: 1.03 }}
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
                transition={springTransition}
                onClick={trackHireMeClick}
              >
                Hire Me
              </SecondaryButton>
              <SecondaryButton
                href="#projects"
                aria-label="View my projects"
                as={motion.a}
                whileHover={prefersReduced ? {} : { scale: 1.03 }}
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
                transition={springTransition}
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
            {/* Geometric SVG animation behind the image */}
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

            <Img
              src={HeroImg}
              alt="Usman Murtaza - Full Stack React Developer creating modern web applications"
              title="Usman Murtaza | React.js & Full Stack Developer"
              loading="eager"
            />

            {/* Animated badges */}
            <motion.div
              className="image-badge"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              {BADGES.map(badge => (
                <motion.span
                  key={badge.name}
                  className="badge"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  animate={
                    prefersReduced
                      ? {}
                      : {
                          y: [0, -4, 0],
                          transition: {
                            duration: badge.speed,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                        }
                  }
                >
                  {badge.name}
                </motion.span>
              ))}
            </motion.div>
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </section>
  );
};

export default HeroSection;
