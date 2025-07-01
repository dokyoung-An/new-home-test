import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const Sec4News = () => {
  return (
    <Container>
      <Content>
        <TextBlock>
          <Title>하자 없는 입주를 위한 선택</Title>
          <Description>
            하방은 신축 아파트 입주민을 위해<br />
            하자 발생 전 선제적 점검을 수행합니다.
          </Description>
          <FeatureList>
            <Feature>
              <FeatureNumber>01</FeatureNumber>
              <FeatureTitle>전문가의 세밀한 점검</FeatureTitle>
              <FeatureDescription>
                20년 이상의 경력을 가진 전문가가 직접 점검합니다.
              </FeatureDescription>
            </Feature>
            <Feature>
              <FeatureNumber>02</FeatureNumber>
              <FeatureTitle>첨단 장비 활용</FeatureTitle>
              <FeatureDescription>
                최신 장비를 활용하여 정확한 하자 진단을 제공합니다.
              </FeatureDescription>
            </Feature>
            <Feature>
              <FeatureNumber>03</FeatureNumber>
              <FeatureTitle>VR 기록 보관</FeatureTitle>
              <FeatureDescription>
                입주 시점의 상태를 VR로 기록하여 영구 보관합니다.
              </FeatureDescription>
            </Feature>
          </FeatureList>
        </TextBlock>
        <ImageBlock>
          <MainImage src="/img/haja/411.png" alt="하방 점검 현장" />
          <SubImage src="/img/service/7.png" alt="하방 VR 점검" />
        </ImageBlock>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background: #fff;
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  animation: ${fadeIn} 1s ease-out;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 60px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    text-align: center;
    max-width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 30px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 60px;
  word-break: keep-all;
  
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 40px;
    
    br {
      display: none;
    }
  }
`;

const FeatureList = styled.div`
  display: grid;
  gap: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const Feature = styled.div`
  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const FeatureNumber = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryDark};
  margin-bottom: 15px;
  display: block;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  word-break: keep-all;
  word-wrap: break-word;
`;

const ImageBlock = styled.div`
  flex: 1;
  max-width: 600px;
  position: relative;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 500px;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const SubImage = styled.img`
  position: absolute;
  bottom: -40px;
  right: -40px;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    bottom: -20px;
    right: -20px;
  }
`;

export default Sec4News; 