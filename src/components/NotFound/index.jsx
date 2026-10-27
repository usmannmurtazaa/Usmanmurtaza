import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ---------- Styled Components ---------- */

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  padding: 20px;
  width: 100%;
`;

const Card = styled(motion.div)`
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  border-radius: 1.5rem;
  padding: 60px 40px;
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-shadow: var(--shadow-md, 0 8px 30px rgba(0, 0, 0, 0.6));

  @media (max-width: 480px) {
    padding: 40px 24px;
  }
`;

const Title = styled.h1`
  font-size: clamp(5rem, 15vw, 8rem);
  font-weight: 800;
  line-height: 1;
  margin-bottom: 10px;
  background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.05em;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary, #f2f2f7);
  margin-bottom: 16px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Text = styled.p`
  font-size: 1.125rem;
  color: var(--text-secondary, #a0a0b8);
  margin-bottom: 40px;
  line-height: 1.6;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  color: white;
  background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.25);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(139, 92, 246, 0.4);
    filter: brightness(1.1);
  }
`;

/* ---------- Component ---------- */

const NotFound = () => {
  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Title>404</Title>
        <Subtitle>Page Not Found</Subtitle>
        <Text>
          The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back
          on track.
        </Text>
        <Button href="/">Back to Portfolio</Button>
      </Card>
    </Container>
  );
};

export default NotFound;
