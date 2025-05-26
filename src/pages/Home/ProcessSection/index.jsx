import React from 'react';
import { Container } from '../../../styles/common';
import {
  ProcessWrapper,
  ProcessContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  HighlightText,
  ProcessSteps,
  Step,
  StepIcon,
  StepText,
  StepTitle,
  StepDescription
} from './style';

const ProcessSection = () => {
  const processSteps = [
    {
      id: 1,
      icon: 'Calling.svg',
      title: '예약문의',
      description: '전화 문의를 통해 서비스 제공일을 예약해주세요.'
    },
    {
      id: 2,
      icon: 'Camera.svg',
      title: '현장촬영',
      description: '전문 촬영팀이 현장에서 VR 촬영을 진행합니다.'
    },
    {
      id: 3,
      icon: 'Laptop.svg',
      title: 'VR제작',
      description: '촬영된 영상을 바탕으로 고품질 VR 콘텐츠를 제작합니다.'
    },
    {
      id: 4,
      icon: 'Share.svg',
      title: '링크전송',
      description: '완성된 VR 콘텐츠의 링크를 고객님께 전송해 드립니다.'
    }
  ];

  return (
    <ProcessWrapper id="process">
      <div className="glow-particle1"></div>
      <div className="glow-particle2"></div>
      
      <Container>
        <SectionHeader>
          <SectionSubtitle>간편한 이용 절차</SectionSubtitle>
          <SectionTitle>4단계로 완성되는</SectionTitle>
          <HighlightText>VR 부동산 솔루션</HighlightText>
          <p>
            전화 한 통으로 시작하여 링크 한 개로 완성되는 랜하우스만의 프로세스입니다.
            <br/>고객님의 소중한 시간을 위해 모든 절차가 최적화되어 있습니다.
          </p>
        </SectionHeader>
        
        <ProcessSteps>
          {processSteps.map((step, index) => (
            <Step key={step.id} index={index}>
              <StepIcon>
                <img src={`${process.env.PUBLIC_URL}/img/icons/${step.icon}`} alt={`${step.title} 아이콘`} />
              </StepIcon>
              <StepText>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepText>
            </Step>
          ))}
        </ProcessSteps>
      </Container>
    </ProcessWrapper>
  );
};

export default ProcessSection; 