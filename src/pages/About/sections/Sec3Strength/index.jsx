import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const strengthData = [
  {
    title: '정밀한 기록',
    description: 'VR 촬영과 전문 장비를 활용한 정밀한 하자 기록으로 누락 없는 점검을 진행합니다.',
    icon: '📸'
  },
  {
    title: '전문적인 판단',
    description: '20년 이상의 경험을 가진 전문가들이 정확하고 공정한 하자 판단을 제공합니다.',
    icon: '🔍'
  },
  {
    title: '체계적인 보고',
    description: '사진, 동영상, VR을 포함한 종합적인 보고서로 하자 현황을 한눈에 파악할 수 있습니다.',
    icon: '📊'
  }
];

const Sec3Strength = () => {
  return (
    <Container>
      <Content>
        <Title>하방의 강점</Title>
        <SubTitle>20년 이상의 경험과 최신 기술의 결합</SubTitle>
        
        <CardGrid>
          {strengthData.map((item, index) => (
            <Card key={index}>
              <IconWrapper>{item.icon}</IconWrapper>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </CardGrid>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background-color: ${({ theme }) => theme.secondaryLight};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  text-align: center;
  word-break: keep-all;
`;

export default Sec3Strength; 