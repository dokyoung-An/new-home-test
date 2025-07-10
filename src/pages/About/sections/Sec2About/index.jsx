import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const Sec2About = () => {
  return (
    <Container id="introduce">
      <Content>
        <TextSection>
          <Title>하방은 고객의 소중한 자산을 <br />지키는 전문가입니다</Title>
          <Description>
            하방은 전문적인 하자 점검 서비스를 제공하며, 
            최신 VR 기술을 활용한 정밀한 기록과 
            체계적인 보고서를 통해 고객의 자산 가치를 
            보호하고 있습니다.
          </Description>
        </TextSection>
        
        <ImageGrid>
          <ImageBox>
            <img src="/img/service/001.png" alt="전문적인 하자 점검" />
            <Label>전문적인 하자 점검</Label>
          </ImageBox>
          <ImageBox>
            <img src="/img/service/vr.png" alt="VR 기록" />
            <Label>VR 기록</Label>
          </ImageBox>
          <ImageBox>
            <img src="/img/service/report.png" alt="체계적인 보고서" />
            <Label>체계적인 보고서</Label>
          </ImageBox>
        </ImageGrid>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 80px 20px 40px 20px;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;
  word-break: keep-all;

  @media (max-width: 768px) {
    br{
      display: none;
    }
  }
`;

const TextSection = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ImageBox = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
  
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    img {
      height: 250px;
    }
  }
`;

const Label = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
`;

export default Sec2About; 