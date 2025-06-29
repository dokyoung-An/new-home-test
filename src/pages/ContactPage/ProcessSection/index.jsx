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
      icon: 'phone.svg',
      title: '예약문의',
      description: '전화 문의를 통해 서비스 제공일을 예약해주세요.'
    },
    {
      id: 2,
      icon: 'sms.svg',
      title: '해피콜',
      description: '사전점검 2~3일 전 서비스 진행에 관한 안내문자 발송 드립니다'
    },
    {
      id: 3,
      icon: 'check.svg',
      title: '사전점검진행',
      description: '사전점검 당일 하자 체크 및 사진 촬영. 하자 보수 신청 현장 접수.'
    },
    {
      id: 4,
      icon: 'link.svg',
      title: `하자점검 보고서 \n + VR링크 전달`,
      description: '사진과 하자 내용을 담은 보고서 및 세대 현장 기록 360VR 링크 전달'
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
          <HighlightText>하방의 사전점검</HighlightText>
          <p>
            입주민 여러분의 당당한 권리행사, 하방과 함께 강력히 행사하세요
           
          </p>
        </SectionHeader>
        
        <ProcessSteps>
          {processSteps.map((step, index) => (
            <Step key={step.id} index={index}>
              <StepIcon>
                <img src={`${process.env.PUBLIC_URL}/img/service/${step.icon}`} alt={`${step.title} 아이콘`} />
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