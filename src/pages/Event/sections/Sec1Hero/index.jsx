import React, { useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const Sec1Hero = () => {
  useEffect(() => {
    // 이미지 프리로드
    const preloadImage = () => {
      const imageUrl = '/img/price/events.png';
      const img = new Image();
      img.src = imageUrl;
    };
    preloadImage();
  }, []);

  return (
    <Container>
      <Content>
        <TextBlock>
          <TopText>지금 참여하면 더 혜택!</TopText>
          <Title>
            하방 <Highlight>점검 EVENT</Highlight>
          </Title>
          <Description>
            참여만 해도 좋은 혜택이 기다립니다.
          </Description>
        </TextBlock>
        <ImageBlock>
          <MainImage 
            src="/img/price/events.png"
            alt="이벤트 캐릭터"
            loading="eager"
          />
        </ImageBlock>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 70vh;
  min-height: 600px;
  background: linear-gradient(135deg, #c8a2e8 0%, #e1c4f7 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    height: auto;
    min-height: auto;
    padding: 120px 0 80px 0;
  }
  
  @media (max-width: 768px) {
    height: auto;
    min-height: auto;
    padding: 120px 20px 60px 20px;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 300px;
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  z-index: 2;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const TextBlock = styled.div`
  max-width: 1000px;
  color: #333;
`;

const TopText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 15px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
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
  color: #8b5cf6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 40px;
  word-break: keep-all;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    br {
      display: none;
    }
  }
`;

const ImageBlock = styled.div`
  flex: 1;
  max-width: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: none;
  }
`;

const MainImage = styled.img`
  width: 330px !important;
  height: auto;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
  animation: bounce 3s ease-in-out infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 1200px) {
    width: 330px !important;
  }

  @media (max-width: 768px) {
    width: 230px !important;
  }
`;

export default Sec1Hero;
