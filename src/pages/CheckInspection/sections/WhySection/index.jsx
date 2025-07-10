import React from 'react';
import styled from 'styled-components';
import { Container } from '../../../../styles/common';
import { fadeIn } from '../../../../styles/animations';
import { ChecklistIcon, MagnifierIcon, ThermalCameraIcon, FolderIcon } from './icons';

const WhySection = () => {
  const reasons = [
    {
      icon: <ChecklistIcon />,
      title: "보수 품질 확인",
      description: "사전점검 시 발견된 하자가 제대로 보수되었는지 확인합니다"
    },
    {
      icon: <MagnifierIcon />,
      title: "추가 하자 발견",
      description: "보수 과정에서 발생할 수 있는 2차 하자를 확인합니다"
    },
    {
      icon: <ThermalCameraIcon />,
      title: "보일러 배관점검",
      description: "보일러 배관 설치상태를 열화상 카메라로 확인합니다."
    },
    {
      icon: <FolderIcon />,
      title: "기록 관리",
      description: "하자 보수 이력을 체계적으로 기록하고 관리합니다"
    }
  ];

  return (
    <Section>
      <Container>
        <Content>
          <TextBlock>
            <Slogan>후점검 꼭 해야해?</Slogan>
            <Title>
              후점검이 <br />
              필요한 이유는?
            </Title>
            <Description>
              사전점검 때 신청한 하자! <br/>제대로 고쳐졌는지 확인이 필요합니다.
            </Description>
          </TextBlock>
          <CardGrid>
            {reasons.map((reason, index) => (
              <Card key={index}>
                <IconWrapper>
                  {reason.icon}
                </IconWrapper>
                <CardTitle>{reason.title}</CardTitle>
                <CardDescription>{reason.description}</CardDescription>
              </Card>
            ))}
          </CardGrid>
        </Content>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #0B1B35 0%, #0A1F45 50%, #0B2555 100%);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 150%, rgba(26, 109, 255, 0.08) 0%, transparent 50%);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 80% -50%, rgba(75, 159, 255, 0.08) 0%, transparent 50%);
  }
  @media (max-width: 768px) {
    height: auto;
    min-height: auto;
    padding: 60px 20px 60px 20px;
   
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: 200px;
  animation: ${fadeIn} 1s ease-out;
  
  @media (max-width: 1200px) {
    gap: 150px;
    padding: 0 30px;
  }
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 60px;
    align-items: center;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 40px;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  max-width: 500px;

  @media (max-width: 768px) {
    min-width: 300px;
    word-break: keep-all;
   
  }
`;

const Slogan = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;
  padding: 10px 30px;
  
  /* 옵션 1: 밝은 파란색 라인 */
  &:before, &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30px;
    height: 2px;
    background: linear-gradient(to right, #4B9FFF, #1a6dff);
  }
  
  &:before {
    right: 100%;
    margin-right: 15px;
  }
  
  &:after {
    left: 100%;
    margin-left: 15px;
  }

  /* 옵션 2: 텍스트 그라데이션 */
  background: linear-gradient(to right, #4B9FFF, #83B9FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding:10px 20px;
  }
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.95);
  
  
  @media (max-width: 1200px) {
    font-size: 3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    br {
      display: none;
    }
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    br {
      display: none;
    }
  }
`;

const CardGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  width: 100%;
  max-width: 600px;
  min-width: 600px;
  
  @media (max-width: 1200px) {
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 500px;
    min-width: 300px;
    margin: 0 auto;
  }
  @media (max-width: 480px) {
    min-width: 200px;
  }
`;

const Card = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1200px) {
    padding: 30px 25px;
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.secondary};
  text-align: center;
  
  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.textLight};
  word-break: keep-all;
  text-align: center;
  
  @media (max-width: 1200px) {
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export default WhySection; 