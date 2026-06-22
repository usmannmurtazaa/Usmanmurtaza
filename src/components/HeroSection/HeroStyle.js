import styled from 'styled-components';

const bgGlass = 'var(--bg-glass, rgba(18, 18, 35, 0.6))';
const borderGlass = 'var(--border-glass, rgba(255, 255, 255, 0.1))';
const textPrimary = 'var(--text-primary, #f2f2f7)';
const textSecondary = 'var(--text-secondary, #a0a0b8)';
const accent = 'var(--accent-glow, #8b5cf6)';
const accentGradient = 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))';

export const HeroContainer = styled.section`
  background: ${bgGlass};
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid ${borderGlass};
  display: flex;
  justify-content: center;
  position: relative;
  padding: 20px 10px 40px 10px;
  z-index: 1;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);

  @media (max-width: 960px) {
    padding: 40px 16px 60px 16px;
  }
  @media (max-width: 640px) {
    padding: 60px 16px 60px 16px;
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

export const HeroInnerContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1270px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .gradient-text {
    background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% auto;
    animation: flowGradient 1s ease-in-out infinite alternate;
    font-weight: 800;
  }
  @keyframes flowGradient {
    0% {
      background-position: 0% center;
    }
    100% {
      background-position: 100% center;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .gradient-text {
      animation: none;
    }
  }

  .subtitle {
    font-size: 24px;
    color: ${textSecondary};
    font-weight: 500;
    margin-top: 10px;
    display: block;
    @media (max-width: 640px) {
      font-size: 20px;
    }
  }
`;

export const HeroRightContainer = styled.div`
  width: 100%;
  display: flex;
  order: 2;
  justify-content: end;
  gap: 12px;
  position: relative;
  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;
  }
  @media (max-width: 640px) {
    margin-bottom: 30px;
  }

  .image-badge {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    flex-wrap: nowrap;
    justify-content: center;
    max-width: 90%;
    z-index: 2;
    @media (max-width: 640px) {
      bottom: -35px;
      gap: 6px;
    }
  }

  .badge {
    background: ${accentGradient};
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    transition: transform 0.2s ease;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

export const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 500px;
  border-radius: 50%;
  border: 3px solid ${accent};
  box-shadow: 0 10px 40px rgba(139, 92, 246, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 50px rgba(139, 92, 246, 0.3);
  }
  @media (max-width: 768px) {
    max-width: 350px;
    max-height: 450px;
  }
  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 380px;
  }
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 52px;
  color: ${textPrimary};
  line-height: 1.2;
  margin-bottom: 20px;
  @media (max-width: 960px) {
    text-align: center;
    font-size: 44px;
  }
  @media (max-width: 640px) {
    font-size: 36px;
    line-height: 1.3;
    margin-bottom: 16px;
  }
  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

export const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${textPrimary};
  line-height: 1.4;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 960px) {
    text-align: center;
    justify-content: center;
    font-size: 28px;
  }
  @media (max-width: 640px) {
    font-size: 22px;
    line-height: 1.5;
    margin-bottom: 16px;
    flex-direction: column;
    gap: 8px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const Span = styled.span`
  color: ${accent};
  min-height: 40px;
  display: inline-block;
  @media (max-width: 640px) {
    min-height: 35px;
  }
`;

export const SubTitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 32px;
  color: ${textSecondary};
  max-width: 600px;
  strong {
    color: ${accent};
    font-weight: 600;
  }
  @media (max-width: 960px) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 640px) {
    font-size: 17px;
    line-height: 1.7;
    padding: 0 10px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const HeroStats = styled.div`
  display: flex;
  gap: 30px;
  margin: 30px 0;
  @media (max-width: 960px) {
    justify-content: center;
    gap: 25px;
  }
  @media (max-width: 640px) {
    gap: 15px;
    margin: 25px 0;
    flex-wrap: wrap;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 25px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${borderGlass};
  border-radius: 12px;
  min-width: 120px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
  }
  @media (max-width: 640px) {
    padding: 12px 20px;
    min-width: 100px;
  }
  @media (max-width: 480px) {
    padding: 10px 15px;
    min-width: 85px;
  }
`;

export const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  background: ${accentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  @media (max-width: 640px) {
    font-size: 28px;
  }
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: ${textSecondary};
  margin-top: 5px;
  text-align: center;
  font-weight: 500;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;
  @media (max-width: 960px) {
    justify-content: center;
  }
  @media (max-width: 640px) {
    gap: 15px;
    margin-top: 25px;
    flex-direction: column;
    align-items: center;
  }
`;

export const ResumeButton = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  width: 100%;
  max-width: 220px;
  text-align: center;
  padding: 16px 0;
  color: white;
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  background: ${accentGradient};
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.25);
  border: none;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(139, 92, 246, 0.4);
    filter: brightness(1.1);
  }
  &:active {
    transform: translateY(-1px);
  }
  @media (max-width: 640px) {
    padding: 14px 0;
    font-size: 16px;
    max-width: 280px;
  }
`;

export const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background: transparent;
  border: 2px solid ${accent};
  color: ${accent};
  font-size: 18px;
  font-weight: 600;
  padding: 14px 30px;
  border-radius: 12px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
  min-width: 180px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  &:hover {
    background: ${accentGradient};
    color: white;
    border-color: transparent;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
  }
  &:active {
    transform: translateY(-1px);
  }
  @media (max-width: 640px) {
    font-size: 16px;
    padding: 12px 24px;
    min-width: 280px;
    max-width: 280px;
  }
`;
