import styled, { keyframes } from 'styled-components';

const slideUpLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60px) translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
`;

const slideUpRight = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60px) translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
`;

export const BenefitsContainer = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #1f2353 0%, #363b70 100%);
  color: white;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const BenefitsContent = styled.div`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const BenefitsTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  word-break: keep-all;
  span {
    color: #8bb3fa;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
`;

export const BenefitsSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 60px;
  word-break: keep-all;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
    
    br {
      display: none;
    }
  }
`;

export const BenefitsSubtitle2 = styled.p`
  font-size: 18px;
  color: #8bb3fa;
  
  word-break: keep-all;
  line-height: 1.6;
`;

export const BenefitsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    gap: 40px;
  }
`;

export const BenefitCard = styled.div`
  padding: 40px;
  
  /* 초기 상태 */
  opacity: 0;
  transform: ${props => props.imagePosition === 'left' ? 
    'translateY(80px) translateX(-50px)' : 
    'translateY(80px) translateX(50px)'};
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${props => props.delay}ms;
  
  /* 애니메이션 활성화 */
  &.animate {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
  
  /* PC/태블릿 레이아웃 */
  .desktop-layout {
    display: flex;
    align-items: center;
    gap: 80px;
    width: 100%;
  }
  
  .mobile-layout {
    display: none;
  }
  
  .image-section {
    flex: 0 0 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 100%;
      height: auto;
      max-height: 260px;
      object-fit: contain;
      border-radius: 12px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 30px 25px;
    gap: 25px;
    
    /* 모바일에서는 아래에서만 올라오도록 */
    transform: translateY(80px);
    
    &.animate {
      transform: translateY(0);
    }
    
    /* PC 레이아웃 숨기기 */
    .desktop-layout {
      display: none;
    }
    
    /* 모바일 레이아웃 표시 */
    .mobile-layout {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 25px;
      width: 100%;
    }
      
    .image-section {
      flex: none;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      
      img {
        max-height: 280px;
        width: 100%;
      }
    }
  }
`;

export const CardIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  
  @media (max-width: 768px) {
    font-size: 40px;
    height: 60px;
    margin-bottom: 15px;
  }
`;





export const CardContent = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: white;
  word-break: keep-all;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 12px;
    line-height: 1.5;
  }
`;

export const CardDescription = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  word-break: keep-all;
  max-width: 430px;

  
  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 280px;
    margin: 0 auto;
    
  }
`;
