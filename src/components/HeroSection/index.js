import React from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
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

const HeroSection = () => {
  return (
    <section id="hero" aria-label="Hero Section">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>

        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <Title>
              Hi, I&apos;m <br />
              <span className="gradient-text">{Bio.name}</span>
              <br />
              <span className="subtitle">Full Stack & React Developer</span>
            </Title>

            <TextLoop>
              Specializing in
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

            <SubTitle>
              I build <strong>high-performance, scalable web applications</strong> with modern
              technologies. As a passionate <strong>Full Stack Developer</strong>
              specializing in <strong>React.js, Node.js, and modern JavaScript</strong>, I create{' '}
              <strong>responsive, user-centric solutions</strong> that deliver exceptional
              experiences. Focused on clean code, optimized performance, and innovative
              problem-solving.
            </SubTitle>

            <HeroStats>
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

            <CTAButtons>
              <ResumeButton
                href={Bio.resume}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View my resume"
              >
                View Resume
              </ResumeButton>
              <SecondaryButton href="#contact" aria-label="Contact me for opportunities">
                Hire Me
              </SecondaryButton>
              <SecondaryButton href="#projects" aria-label="View my projects">
                View Projects
              </SecondaryButton>
            </CTAButtons>
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <Img
              src={HeroImg}
              alt="Usman Murtaza - Full Stack React Developer creating modern web applications"
              title="Usman Murtaza | React.js & Full Stack Developer"
              loading="eager"
            />
            <div className="image-badge">
              <span className="badge">React.js</span>
              <span className="badge">Node.js</span>
              <span className="badge">JavaScript</span>
            </div>
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </section>
  );
};

export default HeroSection;
