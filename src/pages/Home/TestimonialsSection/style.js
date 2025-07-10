import styled, { keyframes, css } from 'styled-components';
import { fadeIn } from '../../../styles/animations';
import { sectionSpacing } from '../../../styles/common';

// 애니메이션 효과
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const Testimonials = styled.section`
  ${sectionSpacing}
  background-color: #0e1016;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(26, 109, 255, 0.07) 0%, transparent 60%),
    radial-gradient(circle at 80% 70%, rgba(26, 109, 255, 0.1) 0%, transparent 60%),
    radial-gradient(circle at 50% 50%, rgba(25, 30, 45, 0.9) 0%, rgba(14, 16, 22, 1) 70%);
  color: #fff;
  position: relative;
  overflow: hidden;
  padding: 60px 0;
  
  /* 상단 경계선 효과 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, 
      rgba(230, 92, 48, 0), 
      rgba(26, 109, 255, 0.9), 
      rgba(230, 92, 48, 0)
    );
    z-index: 2;
  }
  
  /* 배경 패턴 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(26, 109, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(26, 109, 255, 0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    z-index: 1;
    opacity: 0.8;
  }
  
  /* 글로우 파티클 효과 추가 */
  &:before, &:after, .glow-particle1, .glow-particle2, .glow-particle3 {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    z-index: 1;
    opacity: 0.3;
    pointer-events: none;
  }
  
  .glow-particle1 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle,   rgba(26, 109, 255, 0.4) 0%, transparent 70%);
    top: 10%;
    right: 5%;
    animation: ${float} 20s ease-in-out infinite;
  }
  
  .glow-particle2 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle,rgba(26, 109, 255, 0.4) 0%, transparent 70%);
    bottom: 10%;
    left: 10%;
    animation: ${float} 25s ease-in-out infinite alternate-reverse;
  }
  
  .glow-particle3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(230, 92, 48, 0.25) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${pulse} 15s ease-in-out infinite;
  }
  
  & > div.container {
    position: relative;
    z-index: 5;
  }
  
  @media (max-width: 1024px) {
    padding: 60px 0;
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
  
  @media (max-width: 480px) {
    padding: 40px 0 20px 0;
   
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 0px;
    
  }
`;

export const SectionHeader = styled.div`
  text-align: left;
  margin-bottom: 0;
  flex: 0 0 35%;
  position: relative;
  margin-top: 100px;
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    line-height: 1.8;
    margin-top: 30px;
    animation: ${fadeIn} 1s ease-in-out 0.6s backwards;
    max-width: 500px;
    
    @media (max-width: 1024px) {
      margin: 30px auto 0;
    }
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.7;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
      line-height: 1.8;
      margin-top: 10px;
      
    }
  }
  
  @media (max-width: 1024px) {
    margin-bottom: 20px;
    flex: 0 0 100%;
    text-align: center;
    width: 100%;
  }
  @media (max-width: 480px) {
    margin-top: 30px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 15px;
  animation: ${fadeIn} 1s ease-in-out;
  
  /* 네온 효과 */
  text-shadow: 0 0 10px rgba(26, 109, 255, 0.5),
               0 0 20px rgba(26, 109, 255, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 0px;
  }
`;

export const SectionSubtitle = styled.h3`
  display: inline-block;
  background: linear-gradient(135deg, ${props => props.theme.primaryDark}, ${props => props.theme.primaryColor});
  color: #fff;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 20px;
  box-shadow: 0 0 20px rgba(26, 109, 255, 0.3);
  animation: ${fadeIn} 1s ease-in-out 0.2s backwards;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 7px 18px;
    margin-bottom: 15px;
  }
`;

export const HighlightText = styled.div`
  font-size: 2.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, ${props => props.theme.primaryLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.3;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 1s ease-in-out 0.4s backwards;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-top: 0.5rem;
  }
`;

export const TestimonialContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
  flex: 0 0 60%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -20px;
    right: -20px;
    height: 50%;
    background: linear-gradient(to bottom, transparent, rgba(26, 109, 255, 0.05));
    z-index: 0;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    filter: blur(20px);
  }
  
  @media (max-width: 1024px) {
    flex: 0 0 100%;
  }
`;

export const TestimonialSlider = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 20px;
  padding: 10px;
  z-index: 5;
`;

export const TestimonialSliderTrack = styled.div`
  display: flex;
  width: 200%; /* 복제된 카드 세트를 포함할 충분한 너비 */
  gap: 25px;
  will-change: transform;
  padding: 15px 0;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

export const TestimonialCard = styled.div`
  min-width: 300px;
  flex: 0 0 300px;
  padding: 35px;
  background: linear-gradient(145deg, rgba(35, 38, 48, 0.7), rgba(20, 23, 33, 0.9));
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  border: 1px solid rgba(26, 109, 255, 0.15);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  word-break: keep-all;
  
  &:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 20px 40px rgba(26, 109, 255, 0.25);
    border-color:rgba(26, 109, 255, 0.4);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, 
      rgba(26, 109, 255, 0.3), 
      rgba(26, 109, 255, 0.8), 
      rgba(26, 109, 255, 0.3)
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.08) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(45deg);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    min-width: 280px;
    flex: 0 0 280px;
    padding: 30px;
  }
  
  @media (max-width: 480px) {
    min-width: 260px;
    flex: 0 0 260px;
    padding: 25px;
  }

  .company {
    margin-bottom: 20px;
  }
`;

export const Stars = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`;

export const StarIcon = styled.span`
  color: ${props => props.theme.primaryLight};
  filter: drop-shadow(0 0 3px rgba(26, 109, 255, 0.6));
  font-size: 20px;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 15px;
  text-shadow: 0 0 10px rgba(26, 109, 255, 0.4);
  background: linear-gradient(90deg, #fff, #1a6dff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

export const QuoteIcon = styled.div`
  margin-bottom: 20px;
  color: rgba(26, 109, 255, 0.6);
  
  svg {
    width: 36px;
    height: 36px;
    opacity: 0.7;
  }
  
  @media (max-width: 480px) {
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export const TestimonialContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

export const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

export const ClientAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  border: 2px solid ${props => props.theme.primaryColor};
  box-shadow: 0 0 15px rgba(26, 109, 255, 0.4);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
`;

export const ClientName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 5px;
  text-align: left;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ClientPosition = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.primaryLight};
  margin-bottom: 2px;
  text-align: left;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const ClientCompany = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  text-align: left;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(25, 28, 38, 0.7);
  border: 1px solid ${props => props.theme.primaryColor};
  margin: 0 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.active {
    background-color: ${props => props.theme.primaryColor};
    transform: scale(1.2);
    box-shadow: 0 0 10px rgba(26, 109, 255, 0.6);
  }
  
  &:hover {
    background-color: ${props => props.theme.primaryMiddle};
  }
  
  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
    margin: 0 6px;
  }
`;

export const SliderControls = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  width: 110%;
  max-width: 100%;
  margin: 0 auto;
  z-index: 10;
  pointer-events: none;
  
  button {
    pointer-events: auto;
    background-color: rgba(26, 109, 255, 0.2);
    color: #fff;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    
    &:hover {
      background-color: rgba(26, 109, 255, 0.8);
      transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
    }
    
    @media (max-width: 480px) {
      width: 35px;
      height: 35px;
    }
  }
`; 