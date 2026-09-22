import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useReducedMotion, fadeInUpVariants } from '../../motionConfig';
import CertificateModal from '../common/CertificateModal';

/* ---------- Certificates data ---------- */

/* Images live in public/certificates/ so they are served as static files,
   not bundled. Issuer and course titles are set to the exact names
   provided by the portfolio owner. */
const certificates = [
  {
    id: 'saylani-modern-web-app',
    issuer: 'Saylani Mass IT Training',
    courseTitle: 'Modern Web App Development',
    image: `${process.env.PUBLIC_URL}/certificates/saylani-modern-web-app.jpg`,
  },
  {
    id: 'coursera-ui-ux',
    issuer: 'Coursera',
    courseTitle: 'UI/UX Design',
    image: `${process.env.PUBLIC_URL}/certificates/coursera-ui-ux-design.jpg`,
  },
  {
    id: 'coursera-instructional-design',
    issuer: 'Coursera',
    courseTitle: 'Instructional Design Foundations and Applications',
    image: `${process.env.PUBLIC_URL}/certificates/coursera-instructional-design.jpg`,
  },
];

/* ---------- Styled Components ---------- */

const Section = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 80px;
  background: rgba(12, 12, 29, 0.4);

  @media (max-width: 960px) {
    padding: 60px 0;
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
  margin-bottom: 10px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Desc = styled(motion.p)`
  font-size: 1.125rem;
  text-align: center;
  max-width: 800px;
  margin-bottom: 50px;
  color: var(--text-secondary);
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 40px;
    padding: 0 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 20px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 34px;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
`;

const CardSlot = styled(motion.div)`
  width: 100%;
  display: flex;
`;

/* Card is a <button> for proper keyboard + click semantics.
   Reset default button styling and re-style as a glass card. */
const Card = styled.button`
  all: unset;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  border-radius: 1.25rem;
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  box-shadow: var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.4));
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  cursor: pointer;
  transition:
    transform 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(139, 92, 246, 0.35);
    box-shadow:
      var(--shadow-md, 0 8px 30px rgba(0, 0, 0, 0.6)),
      0 0 24px rgba(139, 92, 246, 0.18);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-glow, #8b5cf6);
    outline-offset: 4px;
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover,
    &:active {
      transform: none;
    }
  }
`;

const Thumb = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 0.9rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.06);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    transition: transform 500ms ease;
  }

  /* Enlarge the image on card hover (desktop only). */
  @media (hover: hover) {
    ${Card}:hover & img {
      transform: scale(1.08);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
    }
    ${Card}:hover & img {
      transform: none;
    }
  }
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 4px 2px 4px;
  text-align: left;
`;

const Issuer = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(238, 242, 248, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CourseTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary, #f2f2f7);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

/* ---------- Component ---------- */

const Certificates = () => {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const openModal = cert => setActive(cert);
  const closeModal = () => setActive(null);

  return (
    <Section id="certificates" aria-labelledby="certificates-heading">
      <Wrapper>
        <Title
          className="gradient-text"
          id="certificates-heading"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Certifications
        </Title>

        <Subtitle
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Learning That Shapes the Craft
        </Subtitle>

        <Desc
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          A collection of programs and courses I have completed while building my foundation in{' '}
          <strong>modern web development</strong>, <strong>interface design</strong>, and{' '}
          <strong>instructional design</strong>. Click any certificate to view the full document.
        </Desc>

        <Grid
          as={motion.div}
          variants={prefersReduced ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {certificates.map(cert => (
            <CardSlot key={cert.id} variants={prefersReduced ? {} : fadeInUpVariants}>
              <Card
                type="button"
                onClick={() => openModal(cert)}
                aria-label={`View certificate: ${cert.courseTitle} from ${cert.issuer}`}
              >
                <Thumb>
                  <img src={cert.image} alt={cert.courseTitle} loading="lazy" decoding="async" />
                </Thumb>
                <Meta>
                  <Issuer>{cert.issuer}</Issuer>
                  <CourseTitle>{cert.courseTitle}</CourseTitle>
                </Meta>
              </Card>
            </CardSlot>
          ))}
        </Grid>
      </Wrapper>

      <CertificateModal open={active !== null} certificate={active} onClose={closeModal} />
    </Section>
  );
};

export default Certificates;
