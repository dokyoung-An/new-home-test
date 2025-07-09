import styled, { keyframes, css } from 'styled-components';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const iconStyles = css`
  width: 80px;
  height: 80px;
  background: rgba(45, 91, 255, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #2D5BFF;
  font-size: 32px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    font-size: 28px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 30px;
  word-break: keep-all;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  text-align: center;
  color: ${({ theme }) => theme.textLight || '#666'};
  margin-bottom: 60px;
  word-break: keep-all;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 40px;
    padding: 0 20px;
    br {
      display: none;
    }
  }
`;

export const ProcessWrapper = styled.div`
  width: 100%;
`;

export const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 0px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 30px;
  }
`;

export const IconWrapper = styled.div`
  ${iconStyles}
`;

export const ProcessItem = styled.div`
  text-align: center;
  padding: 30px 20px;
  background: #fff;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    
    ${IconWrapper} {
      background: #2D5BFF;
      color: #fff;
    }
  }
`;

export const ProcessTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const ProcessDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    br {
      display: none;
    }
  }
`;

export const ConsultBanner = styled.div`
  background: url('/img/service/2.png') no-repeat center center;
  border-radius: 30px;
  padding: 40px;
  margin-bottom: 0px;
  transform: translateY(50px);
  box-shadow: 0 20px 40px rgba(45, 91, 255, 0.15);
  position: relative;
  background-size: cover;
  z-index: 2;
  overflow: hidden;


  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index:-1;
    background: rgba(0,0,0,0.4);
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    border-radius: 20px;
  }
`;

export const BannerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const TextWrapper = styled.div`
  @media (max-width: 1024px) {
    text-align: center;
  }
`;

export const QuestionIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 30px;
  animation: ${float} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 25px;
  }
`;

export const BannerTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const BannerDescription = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
`;

export const ContactButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  ${props => props.$isKakao ? `
    background: #FEE500;
    color: #000;
    
    &:hover {
      background: #FDD700;
    }
  ` : `
    background: #fff;
    color: #2D5BFF;
    
    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
  `}
  
  svg {
    font-size: 20px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
  }
`;

export const DividerIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(45, 91, 255, 0.1);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: #2D5BFF;
  font-size: 28px;
  
  svg {
    animation: ${rotate} 8s linear infinite;
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 24px;
    margin-bottom: 25px;
  }
`; 