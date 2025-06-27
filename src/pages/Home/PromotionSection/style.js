import styled, { keyframes } from 'styled-components';
import { sectionSpacing} from '../../../styles/common';

// 브랜드 컬러 상수
const BRAND_COLORS = {
  primary: '#E65C30',
  secondary: '#1A1F36',
  accent: '#FF7F50',
  darkNavy: '#0A1015',
  darkerNavy: '#070B0F',
  white: '#FFFFFF',
  lightGray: 'rgba(255, 255, 255, 0.1)'
};

export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  &::-webkit-media-controls {
    display: none !important;
  }
  &::-webkit-media-controls-start-playback-button {
    display: none !important;
    -webkit-appearance: none;
  }
`;


// 애니메이션 효과
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shine = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const riseUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const unwrap = keyframes`
  0% {
    opacity: 0;
    transform: perspective(1000px) rotateX(20deg) translateY(100px);
  }
  50% {
    transform: perspective(1000px) rotateX(-5deg) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: perspective(1000px) rotateX(0) translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const sparkleEffect = keyframes`
  0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
`;

const subtleShine = keyframes`
  from {
    background-position: 200% center;
  }
  to {
    background-position: -200% center;
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(66, 99, 235, 0.2); }
  50% { box-shadow: 0 0 20px rgba(66, 99, 235, 0.4); }
  100% { box-shadow: 0 0 5px rgba(66, 99, 235, 0.2); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;



export const Promotion = styled.section`
  ${sectionSpacing}
  position: relative;
  color: ${BRAND_COLORS.white};
  text-align: left;
  padding: 180px 0;
  overflow: hidden;
  background: ${BRAND_COLORS.darkNavy};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${BRAND_COLORS.darkerNavy} 0%,
      ${BRAND_COLORS.darkNavy} 25%,
      rgba(26, 109, 255, 0.12) 60%,
      rgba(26, 109, 255, 0.05) 100%
    );
    background-size: 200% 200%;
    
    z-index: 1;
    transform-origin: bottom right;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      -45deg,
      transparent 0%,
      rgba(26, 109, 255, 0.08) 35%,
      rgba(2  6, 109, 255, 0.03) 70%,
      transparent 100%
    );
    background-size: 200% 200%;
   
    z-index: 1;
    transform-origin: top left;
    mix-blend-mode: soft-light;
  }
`;

export const PromotionContainer = styled.div`
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: -50px;
    right: -50px;
    bottom: -100px;
    background: radial-gradient(
      circle at 30% 50%,
      rgba(26, 109, 255, 0.08) 0%,
      transparent 60%
    );
   
    filter: blur(30px);
    z-index: -1;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const PromotionContent = styled.div`
  position: sticky;
  top: 100px;
  padding-top: 40px;
  animation: ${slideInLeft} 0.8s ease-out forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -200px;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle at 70% 30%,
      rgba(26, 109, 255, 0.1) 0%,
      rgba(26, 109, 255, 0.05) 30%,
      transparent 70%
    );
    z-index: -1;
    
    filter: blur(20px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle at 30% 70%,
      rgba(26, 109, 255, 0.12) 0%,
      rgba(26, 109, 255, 0.06) 40%,
      transparent 70%
    );
    z-index: -1;
    
    filter: blur(15px);
  }

  @media (max-width: 1024px) {
    position: static;
    padding-top: 0;
    text-align: center;
  }
`;

export const TitleDecoration = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  animation: ${slideInLeft} 0.8s ease-out forwards;
  animation-delay: 0.2s;
  position: relative;

  &::before {
    content: '🎀';
    font-size: 2rem;
    margin-right: 15px;
    animation: ${floatAnimation} 3s ease-in-out infinite;
  }

  &::after {
    content: '';
    flex: 1;
    height: 2px;
    margin-left: 15px;
    background: linear-gradient(90deg, ${props => props.theme.primaryReward}, transparent);
    opacity: 0.5;
  }

  @media (max-width: 1024px) {
    justify-content: center;
    
    &::after {
      max-width: 100px;
    }
  }
`;

export const PromotionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 25px;
  color: ${BRAND_COLORS.white};
  line-height: 1.4;
  animation: ${slideInLeft} 0.8s ease-out forwards;
  animation-delay: 0.4s;
  position: relative;
  
  background: linear-gradient(
    135deg,
    ${props => props.theme.primarypurple} 0%,
    rgba(255, 255, 255, 0.9) 50%,
    ${props => props.theme.primaryMiddle} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${shine} 5s linear infinite;

  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
    line-height: 1.4;
  }
`;

export const PromotionText = styled.p`
  margin-bottom: 40px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: 500px;
  animation: ${slideInLeft} 0.8s ease-out forwards;
  animation-delay: 0.6s;
  word-break: keep-all;

  
  @media (max-width: 1024px) {
    margin: 0 auto 30px;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const PromotionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  perspective: 1000px;
  
  & > div:nth-child(even) {
    margin-top: 40px;
  }
  
  @media (max-width: 1200px) {
    gap: 20px;
    & > div:nth-child(even) {
      margin-top: 30px;
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    & > div:nth-child(even) {
      margin-top: 0;
    }
  }
`;

export const PromotionCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  opacity: 0;
  animation: ${slideInUp} 0.8s ease-out forwards;
  animation-delay: ${props => props.index * 0.2}s;
  transform-origin: center;
  backdrop-filter: blur(10px);
  
  ${PromotionGrid}:hover & {
    transform: scale(0.7);
    opacity: 0.6;
    filter: blur(2px);
  }
  
  &:hover {
    transform: scale(1.1) translateY(-10px) !important;
    box-shadow: 0 20px 40px rgba(26, 109, 255, 0.2);
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(26, 109, 255, 0.3);
    z-index: 2;
    opacity: 1 !important;
    filter: blur(0) !important;

    .card-icon {
      animation: ${floatAnimation} 2s ease-in-out infinite;
      background: linear-gradient(135deg, ${props => props.theme.primaryMiddle}, ${BRAND_COLORS.accent});
      color: white;
    }

    h3 {
      color: ${props => props.theme.primaryMiddle};
    }

    li::before {
      transform: scale(1.2);
      background: ${props => props.theme.primaryMiddle};
    }
  }

  .header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  
  .card-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    transition: all 0.3s ease;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${BRAND_COLORS.white};
    margin: 0;
    line-height: 1.3;
    transition: color 0.3s ease;
    word-break: keep-all;
  }

  ul {
    list-style: none;
    padding: 0 0 0 30px;
    margin: 0;
  }

  li {
    position: relative;
    padding-left: 32px;
    margin-bottom: 16px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    line-height: 1.5;
    display: flex;
    align-items: flex-start;
    transition: all 0.3s ease;
    word-break: keep-all;
    
    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      content: '✦';
      position: absolute;
      left: 0;
      top: 1px;
      font-size: 14px;
      color: ${props => props.theme.primaryMiddle};
      background: linear-gradient(135deg, ${props => props.theme.primaryMiddle}, ${BRAND_COLORS.accent});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    &:hover {
      color: rgba(255, 255, 255, 0.9);
      transform: translateX(5px);

      &::before {
        transform: scale(1.2) rotate(180deg);
      }
    }

    &:has(🔸) {
      margin-top: 20px;
      color: ${props => props.theme.primaryLight};
      font-weight: 500;
      background: linear-gradient(135deg, 
        rgba(26, 109, 255, 0.15) 0%, 
        rgba(230, 92, 48, 0.05) 100%
      );
      border-radius: 12px;
      padding: 14px 18px 14px 32px;
      margin-left: -8px;
      margin-right: -8px;
      border: 1px solid rgba(26, 109, 255, 0.2);
      backdrop-filter: blur(5px);

      &::before {
        content: '★';
        top: 14px;
        font-size: 16px;
      }

      &:hover {
        background: linear-gradient(135deg, 
          rgba(26, 109, 255, 0.02) 0%, 
          rgba(26, 109, 255, 0.08) 100%
        );
        border-color: rgba(26, 109, 255, 0.3);
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 25px;
    
    .header {
      gap: 14px;
      margin-bottom: 16px;
    }

    .card-icon {
      width: 42px;
      height: 42px;
      font-size: 22px;
    }
    
    h3 {
      font-size: 1.15rem;
    }
    
    li {
      font-size: 0.9rem;
      padding-left: 28px;
      
      &:has(🔸) {
        padding: 12px 16px 12px 28px;
      }

      &::before {
        font-size: 12px;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    
    .header {
      gap: 12px;
      margin-bottom: 14px;
    }

    .card-icon {
      width: 38px;
      height: 38px;
      font-size: 20px;
    }
    
    h3 {
      font-size: 1.1rem;
    }
    
    li {
      font-size: 0.85rem;
      padding-left: 24px;
      
      &:has(🔸) {
        padding: 10px 14px 10px 24px;
      }

      &::before {
        font-size: 11px;
      }
    }
  }
`; 