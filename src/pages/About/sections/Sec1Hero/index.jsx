import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const Sec1Hero = () => {
  return (
    <Container>
      <VideoBackground autoPlay muted loop playsInline>
        <source src="/img/banner.mp4" type="video/mp4" />
      </VideoBackground>
      <Overlay />
      <Content>
        <Title>하자 점검의 기준, 하방</Title>
        <Subtitle>
          전문성과 혁신으로 고객의 자산가치를 높이는<br />
          대한민국 대표 하자점검 기업입니다
        </Subtitle>
      </Content>
      <ScrollIndicator />
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;

const Content = styled.div`
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 2px solid white;
  border-radius: 15px;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    transform: translateX(-50%);
    animation: scroll 2s infinite;
  }
  
  @keyframes scroll {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Sec1Hero; 