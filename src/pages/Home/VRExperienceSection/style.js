import styled, { keyframes, css } from 'styled-components';
import { slideUp, scroll } from '../../../styles/animations';
import { sectionSpacing } from '../../../styles/common';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const highlightAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(1.2); opacity: 0.3; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

export const VRExperience = styled.section`
  ${sectionSpacing}
  background-color: ${({ theme }) => theme.secondaryColor};
  background-image: url('/img/service/vr2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
  max-height: 800px;
  height: auto;
  color: #fff;
  padding-bottom: 0;
  margin-bottom: 0;
  
  
  /* 배경 어두운 오버레이 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 1;
  }
  
  /* 상단 그라데이션 효과 */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 150px;
    width: 100%;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
  }
  
  @media (max-width: 768px) {
    min-height: auto;
    max-height: none;
    height: auto;
    padding-bottom: 0;
    transition: height 0.3s ease, padding-bottom 0.3s ease;
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    padding: 0;
    margin-bottom: 0;
  }
`;

export const ExperienceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;
  height: 100%;
  position: relative;
  z-index: 5;
  padding-bottom: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 300px;
    height: auto;
    gap: 30px;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    padding-bottom: 250px;
  }
`;

export const ExperienceContent = styled.div`
  max-width: 600px;
  padding: 50px;
  text-align: left;
  margin-bottom: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  z-index: 5;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 16px;
  @media (hover: hover) {
    backdrop-filter: blur(20px);
  }
  @media (hover: none) {
    background: rgba(0, 0, 0, 0.85);
  }
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(26, 109, 255, 0.1), transparent);
    border-radius: 16px;
    pointer-events: none;
  }

  p {
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.8;
    margin: 25px 0 35px;
    font-size: 1.1rem;
    font-weight: 400;
    position: relative;
    letter-spacing: 0.3px;
    max-width: 500px;
    text-shadow: none;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
    padding: 35px;
    height: auto;
    margin-bottom: 40px;
    
    p {
      font-size: 1rem;
      word-break: keep-all;
      margin-left: auto;
      margin-right: auto;
    }
  }
  
  @media (max-width: 480px) {
    padding: 30px;
  }
`;

export const ExperienceSubtitle = styled.h3`
  color: ${({ theme }) => theme.primaryLight};
  font-size: 1.1rem;
  margin-bottom: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-block;
  position: relative;
  
  span {
    color: #fff;
    opacity: 0.9;
    font-weight: 500;
    margin-left: 8px;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ExperienceTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  line-height: 1.2;
  letter-spacing: -0.5px;

  span {
    color: ${({ theme }) => theme.primaryLight};
    font-size: 1.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    span {
      font-size: 1.2rem;
    }
  }
`;

export const ExperienceHighlight = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, ${({ theme }) => theme.primaryLight}, #4A90E2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 25px;
  line-height: 1.3;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const ExperienceCTA = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 15px;
  margin-top: 30px;
  max-width: 480px;
`;

export const CTAItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.08);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.12);
  }

  @media (max-width: 468px) { 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    word-break: keep-all;
    width: 100%;
  }

`;

export const CTAIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.2),#1a6dff);
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  flex-shrink: 0;
`;

export const CTAText = styled.div`
  color: #fff;
  
  h4 {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 3px;
  }
  
  p {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.3;
    margin: 0;
  }
`;

export const ExperienceSlider = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 20px;
  position: relative;
  backdrop-filter: blur(5px);
  max-width: 600px;
  transition: all 0.3s ease;
  overflow: visible;
  z-index: 5;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  margin-bottom: 0;
  
  @media (max-width: 768px) {
    height: 300px;
    margin-top: 15px;
    max-width: 100%;
    width: 100%;
    overflow: hidden;
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
  }
  
  @media (max-width: 480px) {
    border-radius: 0;
    height: 250px;
    margin-bottom: 0;
  }
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const SliderTrack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: ${slideUp} 30s linear infinite;
  
  /* 애니메이션이 끝날 때 점프하지 않도록 처음과 끝 스타일 동일하게 설정 */
  animation-fill-mode: forwards;
  
  /* 더 매끄러운 루프를 위해 복제 슬라이드가 시작되는 위치에서 애니메이션이 반복되도록 설정 */
  animation-timing-function: linear;
  
  &:hover {
    animation-play-state: paused;
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    animation: ${scroll} 50s linear infinite;
    width: fit-content;
    padding: 10px 0;
    
    /* 슬라이드 복제 간 간격 조정 */
    & > div:nth-of-type(7):after {
      content: '';
      display: block;
      width: 20px;
    }
  }
`;

export const SlideItem = styled.div`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 16/9;
  padding: 0px;
  margin: 0 auto 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  overflow: visible;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background-image: url('/img/vr-icon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 20;
    
  }

  &::after {
    content: '클릭하여 VR을 체험해 보세요';
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 20;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    white-space: nowrap;
    
  }
  
  &:hover {
    transform: scale(1.03);
    z-index: 10;
    box-shadow: 0 8px 15px rgba(247, 222, 153, 0.25);
    

    &::before,
    &::after {
      opacity: 1;
    }

    .slide-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 15;
      opacity: 1;
    }
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    height: 200px;
    margin: 0 10px;
    min-width: 280px;
    max-width: 280px;
    
    &::after {
      font-size: 0.9rem;
    }
    
    &:hover, &:active {
      transform: translateY(-5px) scale(1.03);
      box-shadow: 0 8px 15px rgba(180, 58, 27, 0.25);
    }
    
    &:first-child {
      margin-left: 20px;
    }
    
    &:last-child {
      margin-right: 20px;
    }
  }
  
  @media (max-width: 480px) {
    height: 150px;
    margin: 0 8px;
    min-width: 220px;
    max-width: 220px;

    &::after {
      font-size: 0.8rem;
    }
  }
`;

export const SlideContent = styled.div`
  padding: 35px;
  color: #fff;
  width: 100%;
  height: 100%;
  background-image: url(${props => `/img/${props.bgImage}`});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  will-change: transform;
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
    transition: all 0.3s ease;
  }
  
 
  
  h3, p {
    position: relative;
    z-index: 2;
  }
  
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }
    
    p {
      font-size: 0.9rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    &::after {
      bottom: 5px;
      font-size: 0.7rem;
      padding: 4px 8px;
    }

    &::after {
    content: '이미지를 터치해 직접 체험해 보세요 ↑';
    position: absolute;
    bottom: 10px;
    left: 5%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    z-index: 3;
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    border-radius: 15px;
    white-space: nowrap;
    animation: ${floatAnimation} 2s ease-in-out infinite;
  }
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    
    h3 {
      font-size: 1.1rem;
    }
    
    p {
      font-size: 0.8rem;
      -webkit-line-clamp: 2;
    }
    
    &::after {
      bottom: 3px;
      font-size: 0.7rem;
      padding: 3px 6px;
    }
  }
`;

export const VRPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const VRPopupContent = styled.div`
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  background-color: #000;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  padding: 20px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  @media (max-width: 480px) {
    width: 98%;
    padding: 10px;
    max-height: 85vh;
  }
  
  /* 모바일 가로 모드 대응 */
  @media (max-height: 500px) and (orientation: landscape) {
    max-height: 95vh;
    padding: 10px;
  }
`;

export const VRPopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
    padding-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
    padding-bottom: 6px;
  }
`;

export const VRPopupTitle = styled.h3`
  color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

export const IframeContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 비율 */
  overflow: hidden;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    padding-top: 150%; /* 2:3 세로 비율 */
  }
  
  @media (max-width: 480px) {
    padding-top: 177.78%; /* 9:16 세로 비율 */
    border-radius: 6px;
  }
  
  /* 모바일 가로 모드일 때 다시 가로 비율로 복원 */
  @media (max-height: 500px) and (orientation: landscape) {
    padding-top: 56.25%;
  }
`;

export const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  
  @media (max-width: 768px) {
    border-radius: 6px;
  }
`;

export const ClickGuide = styled.div`
  display: none;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  text-align: center;
  animation: bounce 2s infinite;
  pointer-events: none;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translate(-50%, 0);
    }
    40% {
      transform: translate(-50%, -10px);
    }
    60% {
      transform: translate(-50%, -5px);
    }
  }

  svg {
    color: #fff;
    font-size: 28px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  span {
    display: block;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-top: 0px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;



