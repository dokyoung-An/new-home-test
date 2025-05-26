import styled, { keyframes } from 'styled-components';

export const BannerWrapper = styled.section`
  min-height: 75vh; /* ✅ 높이 0.75배로 조정 */
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;


export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px; /* 고정 높이 */
  min-height: 260px;
  z-index: 1;
  margin-top: 80px;

  @media (max-width: 768px) {
    height: 220px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

export const TypingLine = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #ffffff;
  min-height: 3em;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  .cursor {
    display: inline-block;
    margin-left: 4px;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @media (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.9rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FixedLine = styled.h2`
  font-size: 2.7rem; /* 기존 2.5rem → 조금 더 큼 */
  font-weight: 700;
  color: ${({ theme }) => theme.primaryColor};
  margin-top: -50px;
  opacity: 0;
  visibility: hidden;
  min-height: 3em;
  transition: opacity 0.3s ease;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  &.fade-in {
    animation: ${fadeInUp} 0.6s ease-out forwards;
    visibility: visible;
  }

  @media (max-width: 1024px) {
    font-size: 2.4rem;
  }

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;


const pulseOnce = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
  50% {
    transform: scale(1.15);
    box-shadow: 0 0 16px rgba(255, 255, 255, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
`;

export const ButtonCircle = styled.a`
  margin-top: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.lightColor};
  font-size: 1.5rem;
  line-height: 48px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: background-color 0.3s;
  z-index: 1;

  &.highlight {
    animation: ${pulseOnce} 1.5s ease-out;
  }

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
`;

export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none; // 마우스 클릭 통과
  opacity: 0.65;
  filter: blur(4px);
 
`;

// ✅ 오버레이 추가
export const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 검정 반투명 */
  z-index: 0.5;
  pointer-events: none;
`;

