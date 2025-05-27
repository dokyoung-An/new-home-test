import styled, { keyframes, css } from 'styled-components';
import { fadeIn } from '../../../styles/animations';
import { sectionSpacing, SectionHeader as CommonSectionHeader } from '../../../styles/common';

// 새로운 애니메이션 추가
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const ProcessWrapper = styled.section`
  ${sectionSpacing}
  background-color: #0e1016;
  color: #ffffff;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 0;
  z-index: 1;
  padding: 220px 0;
  
  /* 배경 이미지와 오버레이 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('${process.env.PUBLIC_URL}/img/processbg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(0.3) contrast(1.2);
    z-index: -2;
  }
  
  /* 패턴 효과 추가 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(230, 92, 48, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(230, 92, 48, 0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    z-index: -1;
    opacity: 0.8;
  }
  
  /* 글로우 파티클 효과 */
  .glow-particle1, .glow-particle2 {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    z-index: -1;
    opacity: 0.3;
    pointer-events: none;
  }
  
  .glow-particle1 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(230, 92, 48, 0.3) 0%, transparent 70%);
    top: 10%;
    right: 5%;
    animation: ${float} 20s ease-in-out infinite;
  }
  
  .glow-particle2 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(230, 92, 48, 0.2) 0%, transparent 70%);
    bottom: 10%;
    left: 10%;
    animation: ${float} 25s ease-in-out infinite alternate-reverse;
  }
  
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
      rgba(230, 92, 48, 0.7), 
      rgba(230, 92, 48, 0)
    );
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    padding: 90px 0;
    min-height: auto;
  }
  
  @media (max-width: 480px) {
    padding: 70px 0;
  }
`;

export const ProcessContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  position: relative;
  z-index: 5;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const SectionHeader = styled(CommonSectionHeader)`
  text-align: center;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto 70px;
  position: relative;
  
  /* 장식용 요소 추가 */
  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, 
      rgba(230, 92, 48, 0.3), 
      rgba(230, 92, 48, 0.8), 
      rgba(230, 92, 48, 0.3)
    );
    border-radius: 2px;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    line-height: 1.8;
    margin-top: 30px;
    animation: ${fadeIn} 1s ease-in-out 0.6s backwards;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.7;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
      line-height: 1.8;
      word-break: keep-all;
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 50px;
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
  box-shadow: 0 0 20px rgba(180, 58, 27, 0.3);
  animation: ${fadeIn} 1s ease-in-out 0.2s backwards;
  letter-spacing: 0.5px;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 7px 18px;
    margin-bottom: 15px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  animation: ${fadeIn} 1s ease-in-out;
  
  /* 네온 효과 */
  text-shadow: 0 0 10px rgba(230, 92, 48, 0.5),
               0 0 20px rgba(180, 58, 27, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem; 
    margin-bottom: 0px;
  }
`;

export const HighlightText = styled.div`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 10%, ${props => props.theme.primaryLight} 50%, #fff 90%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.3;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 1s ease-in-out 0.4s backwards, ${shimmer} 3s linear infinite;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-top: 0.5rem;
  }
`;

export const ProcessSteps = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  /* 연결선 추가 */
  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 5%;
    width: 90%;
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(230, 92, 48, 0.3), 
      rgba(230, 92, 48, 0.8), 
      rgba(230, 92, 48, 0.3)
    );
    z-index: 1;
  }
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 50px;
    
    &::before {
      width: 2px;
      height: 90%;
      left: 40px;
      top: 5%;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 50px;
    
    &::before {
      left: 30px;
    }
  }
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: ${fadeIn} 0.5s ease-in-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.index * 0.2}s;
  flex: 1;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    
    ${props => props.index % 2 === 0 
      ? css`animation: ${float} 3s ease-in-out infinite;`
      : css`animation: ${pulse} 3s ease-in-out infinite;`
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 20px;
    
    &:hover {
      transform: translateX(10px);
    }
  }
`;

export const StepIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 25px;
  background: linear-gradient(145deg, rgba(35, 38, 48, 0.7), rgba(20, 23, 33, 0.9));
  backdrop-filter: blur(10px);
  border-radius: 50%;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(230, 92, 48, 0.15);
  transition: all 0.4s ease;
  
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.15);
  }
  
  @media (max-width: 768px) {
    margin-right: 30px;
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    
    img {
      width: 30px;
      height: 30px;
    }
  }
`;

export const StepText = styled.div`
  text-align: center;
  color: #ffffff;
  background: linear-gradient(145deg, rgba(35, 38, 48, 0.4), rgba(20, 23, 33, 0.6));
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(230, 92, 48, 0.1);
  transition: all 0.3s ease;
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &:hover {
    border-color: rgba(230, 92, 48, 0.3);
    box-shadow: 0 12px 30px rgba(230, 92, 48, 0.15);
  }
  
  @media (max-width: 768px) {
    text-align: left;
    min-height: auto;
    padding: 15px;
  }
`;

export const StepTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(230, 92, 48, 0.4);
  background: linear-gradient(90deg, #fff, #f5a583);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const StepDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;