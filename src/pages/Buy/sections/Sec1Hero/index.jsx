import React, { useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const Sec1Hero = () => {
  useEffect(() => {
    // 이미지 프리로드
    const preloadImage = () => {
      const imageUrl = '/img/price/buy.png';
      const img = new Image();
      img.src = imageUrl;
    };
    preloadImage();
  }, []);

  return (
    <Container>
      <Content>
        <TextBlock>
          <TopText>함께하는 더 커지는 혜택!</TopText>
          <Title>
            우리아파트 <Highlight>공동구매</Highlight>
          </Title>
          <Description>
            이웃과 함께하면 더욱 저렴한 점검이 가능합니다.<br />
            더 많이 모일수록 할인이 점점 커집니다.
          </Description>
        </TextBlock>
        <ImageBlock>
          <MainImage 
            src="/img/price/buy.png"
            alt="공동구매 캐릭터"
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
  background: linear-gradient(135deg, #5d8cf1 0%, #9fb7ed 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  /* &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  } */
  
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
  color: #1d60f1;
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
