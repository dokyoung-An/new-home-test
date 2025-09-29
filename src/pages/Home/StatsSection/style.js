import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StatsContainer = styled.section`
  min-height: 80vh;
  background: linear-gradient(135deg, #0f1b3d 0%, #1a2852 50%, #0f1b3d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(26, 109, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    min-height: 60vh;
    padding: 60px 0;
  }
`;

export const StatsContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin:0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

export const StatsTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 60px;
  color: rgba(255, 255, 255, 0.9);
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 40px;
    line-height: 1.5;
  }
`;

export const StatsGrid = styled.div`
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const StatItem = styled.div`
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  word-break: keep-all;
  
  span {
    font-size: 48px;
    font-weight: 700;
    color: #3d7fff;
    text-shadow: 0 0 20px rgba(61, 127, 255, 0.3);
    margin: 0 8px;
    letter-spacing: 1px;
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
    
    span {
      font-size: 36px;
      margin: 0 4px;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    
    span {
      font-size: 28px;
    }
  }
`;

export const StatLabel = styled.div`
  font-size: 32px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  word-break: keep-all;
  
  span {
    font-size: 48px;
    font-weight: 700;
    color: #00bfa6;
    text-shadow: 0 0 20px rgba(0, 191, 166, 0.3);
    margin: 0 8px;
    letter-spacing: 1px;
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
    
    span {
      font-size: 36px;
      margin: 0 4px;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    
    span {
      font-size: 28px;
    }
  }
`;

export const StatDescription = styled.p`
  font-size: 32px;
  font-weight: 800;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.5;
    
    br {
      display: block;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
