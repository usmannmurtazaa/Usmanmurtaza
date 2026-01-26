import styled from 'styled-components';

export const HeroContainer = styled.div`
  background: ${({ theme }) => theme.card_light};
  display: flex;
  justify-content: center;
  position: relative;
  padding: 20px 10px 40px 10px;
  @media (max-width: 960px) {
    padding: 40px 16px 60px 16px;
  }
  @media (max-width: 640px) {
    padding: 60px 16px 60px 16px;
  }
  z-index: 1;

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;

export const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1350px;
  overflow: hidden;
  padding: 0 30px;
  top: 55%;
  left: 56%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
    top: 45%;
    left: 48%;
  }
  @media (max-width: 640px) {
    justify-content: center;
    padding: 0 0px;
    top: 46%;
    left: 42%;
  }
`;

export const HeroInnerContainer = styled.div`
  position: relative;
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
    background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 24px;
    color: ${({ theme }) => theme.text_secondary};
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
    bottom: -20px;
    left: 65%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
    justify-content: center;
    max-width: 90%;
    z-index: 2;

    @media (max-width: 960px) {
      bottom: -25px;
      flex-wrap: wrap;
    }
  }

  .badge {
    background: ${({ theme }) => theme.primary};
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    animation: float 3s ease-in-out infinite;
    box-shadow: 0 4px 12px rgba(133, 76, 230, 0.3);

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.5s;
    }
    &:nth-child(3) {
      animation-delay: 1s;
    }
    &:nth-child(4) {
      animation-delay: 1.5s;
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
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
  border: 3px solid ${({ theme }) => theme.primary};
  box-shadow: 0 10px 40px rgba(133, 76, 230, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 50px rgba(133, 76, 230, 0.3);
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

export const Title = styled.div`
  font-weight: 700;
  font-size: 52px;
  color: ${({ theme }) => theme.text_primary};
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
  color: ${({ theme }) => theme.text_primary};
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
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  min-height: 40px;
  display: inline-block;

  @media (max-width: 640px) {
    min-height: 35px;
  }
`;

export const SubTitle = styled.div`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.text_primary + 95};
  max-width: 600px;

  strong {
    color: ${({ theme }) => theme.primary};
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
  flex-wrap: nowrap;

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
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  min-width: 120px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(133, 76, 230, 0.15);
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
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
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
  color: ${({ theme }) => theme.text_secondary};
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
  color: ${({ theme }) => theme.white};
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  box-shadow: 0 8px 20px rgba(133, 76, 230, 0.25);
  border: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(133, 76, 230, 0.4);
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
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  font-weight: 600;
  padding: 14px 30px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px ${({ theme }) => theme.primary + '40'};
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
