import React from 'react';
import { Container } from '../../../../styles/common';
import { BsPeople, BsClock, BsFileEarmarkText, BsCamera } from 'react-icons/bs';
import { MdOutlineQuestionMark, MdSettings } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { IoCall } from 'react-icons/io5';

import {
  ProcessWrapper,
  ProcessGrid,
  IconWrapper,
  ProcessItem,
  ProcessTitle,
  ProcessDescription,
  ConsultBanner,
  BannerContent,
  BannerTitle,
  BannerDescription,
  QuestionIcon,
  ButtonGroup,
  ContactButton,
  SectionTitle,
  SectionSubtitle,
  InfoWrapper,
  TextWrapper,
  DividerIcon,
  ContainerWrapper
} from './style';

const InspectionProcessSection = () => {
  const processes = [
    {
      icon: <BsPeople />,
      title: '전문 인력 구성',
      description: '하자 점검 전문 인력 1인이 파견되어 꼼꼼한 점검을 진행합니다.'
    },
    {
      icon: <BsClock />,
      title: '점검 소요 시간',
      description: '84타입 기준 약 2~3시간 소요되며, 완료 후 발견된 하자에 관해 브리핑을 진행합니다.'
    },
    {
      icon: <BsFileEarmarkText />,
      title: '보고서 작성',
      description: '점검 완료 후 2주 이내에 전문적이고 상세한 하자 보고서를 제공해드립니다.'
    },
  ];

  const handleKakaoClick = () => {
    window.open('https://pf.kakao.com/_IxoRxjb', '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:1544-1516';
  };

  return (
    <ContainerWrapper>
      <Container>
        <DividerIcon>
          <MdSettings />
        </DividerIcon>
        <SectionTitle>하방의 점검 프로세스</SectionTitle>
        <SectionSubtitle>
          전문성과 신뢰성을 바탕으로 체계적인 점검 프로세스를 제공합니다.<br />
          하자 발견부터 보고서 작성까지, 모든 과정을 꼼꼼하게 진행합니다.
        </SectionSubtitle>
        <ProcessWrapper>
          <ProcessGrid>
            {processes.map((process, index) => (
              <ProcessItem key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <IconWrapper>
                  {process.icon}
                </IconWrapper>
                <ProcessTitle>{process.title}</ProcessTitle>
                <ProcessDescription>{process.description}</ProcessDescription>
              </ProcessItem>
            ))}
          </ProcessGrid>
          
          <ConsultBanner>
            <BannerContent>
              <InfoWrapper>
                <QuestionIcon>
                  <MdOutlineQuestionMark />
                </QuestionIcon>
                <TextWrapper>
                  <BannerTitle>하방 하자 컨설팅 진행 중!</BannerTitle>
                  <BannerDescription>하자 접수 중 궁금하신 점이 있으신가요?</BannerDescription>
                </TextWrapper>
              </InfoWrapper>
              <ButtonGroup>
                <ContactButton onClick={handleKakaoClick} $isKakao>
                  <RiKakaoTalkFill />
                  카카오톡 상담
                </ContactButton>
                <ContactButton onClick={handleCallClick}>
                  <IoCall />
                  전화 상담
                </ContactButton>
              </ButtonGroup>
            </BannerContent>
          </ConsultBanner>
        </ProcessWrapper>
      </Container>
    </ContainerWrapper>
  );
};

export default InspectionProcessSection; 