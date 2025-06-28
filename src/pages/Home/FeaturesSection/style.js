import styled, { keyframes } from 'styled-components';
import { sectionSpacing } from '../../../styles/common';


export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.1;
`;


// 홀로그램 파티클 효과
const particleFloat = keyframes`
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.3;
  }
`;

// 호버링 애니메이션
const hovering = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// 3D 회전 효과
const rotate3d = keyframes`
  0% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(1000px) rotateX(2deg) rotateY(5deg);
  }
  100% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  }
`;

// 유려한 곡선 애니메이션
const wavyLine = keyframes`
  0% {
    d: path("M0,50 C150,20 350,120 500,50 C650,20 850,120 1000,50 L1000,450 L0,450 Z");
  }
  50% {
    d: path("M0,100 C150,150 350,20 500,100 C650,150 850,20 1000,100 L1000,450 L0,450 Z");
  }
  100% {
    d: path("M0,50 C150,20 350,120 500,50 C650,20 850,120 1000,50 L1000,450 L0,450 Z");
  }
`;

// 파티클 패턴 효과
const particlePattern = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
`;

export const Features = styled.section`
  ${sectionSpacing}
  text-align: center;
  background-color: #101010;
 
  color: #fff;
  position: relative;
  overflow: hidden;
  padding: 100px 0;
  
  /* 3D 그리드 패턴 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(230, 92, 48, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(230, 92, 48, 0.02) 1px, transparent 1px);
    background-size: 30px 30px;
    perspective: 1000px;
    transform-style: preserve-3d;
    transform: rotateX(60deg) scale(3);
    opacity: 0.5;
    z-index: 1;
    animation: ${particlePattern} 30s linear infinite;
  }
  
  /* 상단 경계선 효과 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, 
      rgba(230, 92, 48, 0), 
rgba(26, 109, 255,0.7),
      rgba(230, 92, 48, 0)
    );
    z-index: 3;
  }
  
  /* 유려한 곡선 SVG */
  .wavy-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    
    path {
      fill: rgba(230, 92, 48, 0.02);
      animation: ${wavyLine} 15s ease-in-out infinite;
    }
    
    .wave2 {
      fill: rgba(244, 167, 122, 0.01);
      animation: ${wavyLine} 12s ease-in-out infinite reverse;
      animation-delay: -5s;
    }
  }
  
  /* 글로우 파티클 효과 1 */
  .glow-particle {
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(230, 92, 48, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(30px);
    z-index: 1;
    opacity: 0.6;
    pointer-events: none;
  }
  
  .glow-particle1 {
    top: 10%;
    right: 5%;
    width: 400px;
    height: 400px;
    animation: ${particleFloat} 20s ease-in-out infinite alternate;
  }
  
  .glow-particle2 {
    bottom: 10%;
    left: 10%;
    width: 350px;
    height: 350px;
    animation: ${particleFloat} 25s ease-in-out infinite alternate-reverse;
  }
  
  /* 3D 파티클 그룹 */
  .particle-group {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    perspective: 1000px;
    pointer-events: none;
  }
  
  /* 작은 파티클 요소들 */
  .small-particle {
    position: absolute;
    background-color: rgba(230, 92, 48, 0.2);
    border-radius: 50%;
    filter: blur(1px);
    pointer-events: none;
    opacity: 0.5;
    animation: ${hovering} 5s ease-in-out infinite;
  }
  
  .p1 {
    top: 20%;
    left: 15%;
    width: 6px;
    height: 6px;
    animation-duration: 8s;
  }
  
  .p2 {
    top: 40%;
    right: 20%;
    width: 10px;
    height: 10px;
    animation-duration: 12s;
    animation-delay: -3s;
  }
  
  .p3 {
    bottom: 30%;
    left: 30%;
    width: 8px;
    height: 8px;
    animation-duration: 10s;
    animation-delay: -5s;
  }
  
  .p4 {
    top: 70%;
    right: 25%;
    width: 5px;
    height: 5px;
    animation-duration: 9s;
    animation-delay: -2s;
  }
  
  .p5 {
    top: 15%;
    right: 35%;
    width: 7px;
    height: 7px;
    animation-duration: 11s;
    animation-delay: -7s;
  }
  
  & > div.container {
    position: relative;
    z-index: 5;
  }
  
  @media (max-width: 1024px) {
    padding: 120px 0;
  }
  
  @media (max-width: 768px) {
    padding: 100px 0;
  }
  
  @media (max-width: 480px) {
    padding: 80px 0;
  }
`;

export const FeatureTag = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, ${props => props.theme.primaryDark}, ${props => props.theme.primaryColor});
  color: #fff;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 30px;
  box-shadow: 0 0 20px rgba(180, 58, 27, 0.3);

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

export const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  position: relative;
  color: #fff;
  
 
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
    word-break: keep-all;
  }
`;

export const FeatureParagraph = styled.p`
  max-width: 700px;
  margin: 10px auto 80px;
  line-height: 1.8;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  word-break: keep-all;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 60px;
    

  }
`;





export const FeatureGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  margin-top: 60px;
  position: relative;
  z-index: 5;
  
  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

export const Row1 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  gap: 30px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;


export const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 30px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    gap: 20px;
    margin-top: 20px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-top: 15px;
  }
`;

export const FeatureCard = styled.div`
  border-radius: 20px;
  padding: 30px;
  height: 420px;
  background-color: rgba(35, 38, 48, 0.7);
  @media (hover: hover) {
    backdrop-filter: blur(10px);
  }
  @media (hover: none) {
    background-color: rgba(35, 38, 48, 0.9);
  }
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  transform: translateZ(0);
  
  &:hover {
    transform: translateY(-8px) translateZ(0);
    box-shadow: 0 20px 40px rgba(26, 109, 255, 0.25), 0 10px 20px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(26, 109, 255, 0.15);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(26, 109, 255, 0.1) 0%,
      rgba(26, 109, 255, 0.05) 40%,
      transparent 60%
    );
    pointer-events: none;
  }
  
  &.dark {
    background-color: rgba(25, 28, 40, 0.8);
    color: #fff;
    
    h3, p {
      color: #fff;
    }
  }
  
  &.orange {
    background: linear-gradient(135deg, 
      rgba(26, 109, 255, 0.3), 
      rgba(26, 109, 255, 0.7)
    );
    color: #fff;
    
    h3, p {
      color: #fff;
    }
  }
  
  &.row1-card1 {
    background-image: url(${process.env.PUBLIC_URL + '/img/'});
    background-size: cover;
    background-position: center;
    color: #fff;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(25, 28, 40, 0.6), rgba(25, 28, 40, 0.9));
      z-index: 1;
    }
    
    h3, p {
      color: #fff;
      position: relative;
      z-index: 2;
    }
  }
  
  @media (max-width: 768px) {
    height: 320px;
    padding: 25px;
  }
  
  @media (max-width: 480px) {
    height: 280px;
    padding: 20px;
  }
`;

export const CardContent = styled.div`
  margin-top: 0px;
  z-index: 2;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  /* 배경 이미지 설정 */
  &::before {
    content: '';
    position: absolute;
    top: -30px;
    left: -30px;
    width: calc(100% + 60px);
    height: calc(100% + 60px);
    background-size: cover;
    background-position: center;
    opacity: 0.5;
    z-index: -1;
    transition: all 0.4s ease;
    border-radius: 15px;
    filter: contrast(1.2) brightness(1);
  }
  
  /* 호버 시 배경 이미지 더 선명하게 */
  ${FeatureCard}:hover & {
    &::before {
      opacity: 0.65;
      filter: contrast(1.3) brightness(1.1);
      transform: scale(1.02);
    }
  }
  
  /* 클래스 기반 배경 이미지 설정 */
  &.space-bg::before {
    background-image: url('/img/service/1.jpg');
  }
  
  &.multi-platform-bg::before {
    background-image: url('/img/service/7.png');
  }
  
  &.zoom-bg::before {
    background-image: url('/img/service/hand.jpg');
    background-position: center;
    opacity: 0.25;
  }
  
  &.business-bg::before {
    background-image: url('/img/service/report.png');
  }
  
  &.data-bg::before {
    background-image: url('/img/service/vr2.png');
  }
  
  h3 {
    font-size: 1.35rem;
    margin-bottom: 15px;
    color: #fff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.4);
    position: relative;
    font-weight: 600;
    letter-spacing: 0.5px;
    
    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.95);
    font-size: 1rem;
    line-height: 1.6;
    position: relative;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    word-break: keep-all;
    word-wrap: nowrap;
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

export const IconContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  ${FeatureCard}:hover & {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgb(26, 109, 255,0.25);
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
  
  ${FeatureCard}:hover & {
    transform: scale(1.1);
  }
`; 

export const circle = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  img {
    width: 60px;
    height: 60px;
    animation: ${circle} 3s infinite;
    margin-bottom: 10px;
  }
`;

export const line = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

