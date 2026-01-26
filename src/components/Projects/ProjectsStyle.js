import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 100px 0px 100px 0px;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 960px) {
    padding: 60px 0px;
  }
  @media (max-width: 640px) {
    padding: 40px 0px;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 20px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 0px 16px;
  }
`;

export const Title = styled.h1`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text_primary};
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  @media (max-width: 768px) {
    font-size: 36px;
  }
  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.h2`
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

export const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 800px;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  strong {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
    padding: 0px 16px;
  }
`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1100px;
  margin: 40px auto 60px auto;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 30px auto 40px auto;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 30px 25px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.primary + '20'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary} 0%,
      ${({ theme }) => theme.primary + '80'} 100%
    );
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(133, 76, 230, 0.15);
    border-color: ${({ theme }) => theme.primary + '40'};
  }
  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

export const StatIcon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 15px;
  }
`;

export const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
  line-height: 1;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const StatLabel = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  line-height: 1.5;
  strong {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ToggleButtonGroup = styled.div`
  display: flex;
  border: 2px solid ${({ theme }) => theme.primary + '40'};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 16px;
  font-weight: 600;
  margin: 30px 0px;
  background: ${({ theme }) => theme.card_light};
  padding: 4px;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 14px;
    margin: 25px 0px;
  }
`;

export const ToggleButton = styled.button`
  padding: 10px 24px;
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  font-size: inherit;
  transition: all 0.3s ease;
  white-space: nowrap;
  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.primary};
    color: white;
    box-shadow: 0 4px 15px ${theme.primary + '40'};
    `}
  &:hover {
    background: ${({ active, theme }) => (active ? theme.primary + 'CC' : theme.primary + '15')};
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    padding: 8px 16px;
    border-radius: 10px;
  }
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

export const Divider = styled.div`
  width: 2px;
  background: ${({ theme }) => theme.primary + '40'};
  margin: 8px 4px;
  @media (max-width: 768px) {
    margin: 6px 2px;
  }
`;

export const FilterInfo = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 20px 0 30px;
  text-align: center;
  strong {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }
`;

export const CategoryTag = styled.span`
  display: inline-block;
  background: ${({ category, theme }) => {
    switch (category?.toLowerCase()) {
      case 'web app':
        return theme.primary + '20';

      case 'e-commerce':
        return '#10B98120';

      case 'e-commerce web app':
        return '#10B98120';

      case 'mobile':
        return '#3B82F620';

      default:
        return theme.primary + '20';
    }
  }};
  color: ${({ category, theme }) => {
    switch (category?.toLowerCase()) {
      case 'web app':
        return theme.primary;
      case 'e-commerce':
        return '#10B981';
      case 'e-commerce web app':
        return '#10B981';
      case 'mobile':
        return '#3B82F6';
      default:
        return theme.primary;
    }
  }};

  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 10px;
  border: 1px solid
    ${({ category, theme }) => {
      switch (category?.toLowerCase()) {
        case 'web app':
          return theme.primary + '40';
        case 'e-commerce':
          return '#10B98140';
        case 'e-commerce web app':
          return '#10B98140';
        case 'mobile':
          return '#3B82F640';
        default:
          return theme.primary + '40';
      }
    }};
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 28px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const ViewAllButton = styled.button`
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  border: none;
  color: white;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
  box-shadow: 0 8px 25px rgba(133, 76, 230, 0.3);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(133, 76, 230, 0.4);
    background: linear-gradient(225deg, hsla(271, 100%, 45%, 1) 0%, hsla(294, 100%, 45%, 1) 100%);
  }
  &:active {
    transform: translateY(-1px);
  }
  @media (max-width: 768px) {
    padding: 12px 28px;
    font-size: 15px;
    margin-top: 30px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 600px;
  margin: 0 auto;
  .empty-icon {
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.5;
  }
`;

export const EmptyTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
`;

export const EmptyText = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 1.6;
`;

export const ProjectCount = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
  strong {
    color: ${({ theme }) => theme.primary};
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const GradientLine = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.primary + '00'} 100%
  );
  margin: 20px auto 30px auto;
  border-radius: 2px;
`;
