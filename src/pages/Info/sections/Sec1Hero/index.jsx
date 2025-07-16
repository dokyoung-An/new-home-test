import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';
import { useState, useEffect } from 'react';

const Sec1Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 비디오 프리로드
    const preloadVideo = () => {
      const videoUrl = isMobile ? "/img/video/video_mobile.mp4" : "/img/video/video_optimized.mp4";
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = videoUrl;
      document.head.appendChild(link);
    };

    preloadVideo();

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  return (
    <Container>
      <Content>
        <TextBlock>
          <Title>
            사전점검<br />
            <Highlight><span>왜?</span> 해야할까요!</Highlight>
          </Title>
          <Description>
            하자 정보를 찾고 계신가요?<br />
            하방에서 제공하는 하자 정보를 확인해 보세요.
          </Description>
          <Button><a href="/contact">서비스 문의하기</a></Button>
        </TextBlock>
        <VideoBlock>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={isVideoLoaded ? 'loaded' : ''}
          >
            <source
              src={isMobile ? "/img/video/video_mobile.mp4" : "/img/video/video_optimized.mp4"}
              type="video/mp4"
            />
          </video>
        </VideoBlock>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100vh;
  min-height: 800px;
  background: linear-gradient(to right,#bfdcff 60%, ${({ theme }) => `${theme.primaryLight}15`});
  display: flex;
  align-items: center;
  
  @media (max-width: 1024px) {
    height: auto;
    min-height: auto;
    padding: 120px 0;
  }
  @media (max-width: 768px) {
    height: auto;
    min-height: auto;
    padding: 120px 20px 20px 20px;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  animation: ${fadeIn} 1s ease-out;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 0px;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  max-width: 700px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 30px;
  word-break: keep-all;
  
  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};

  span{
    color: ${({ theme }) => theme.primaryMiddle};
    font-size: 4.2rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 40px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    br {
      display: none;
    }
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primaryMiddle};
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 18px 40px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: ${({ theme }) => theme.primaryMiddle};
    border: 1px solid ${({ theme }) => theme.primaryMiddle};
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;
const VideoBlock = styled.div`
  flex: 1;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    height: 550px;
    object-fit: contain;
    opacity: 0;
    transition: opacity 0.3s ease-in;
    
    &.loaded {
      opacity: 1;
    }
    
    @media (max-width: 768px) {
      height: auto;
    }
  }
`;


export default Sec1Hero; 