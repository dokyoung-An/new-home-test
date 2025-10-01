import React from 'react';
import { Container } from '../../../../styles/common';
import { BsPeople, BsWrench, BsBadgeVr,BsJournalText } from 'react-icons/bs';
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

const Items = () => {
  const processes = [
    {
      icon: <BsPeople />,
      title: '전문가 육안점검',
      description: '숙련된 사전점검 전문가가 세대 내부를 꼼꼼히 확인하여 눈으로 보이는 모든 하자를 체크합니다.'
    },
    {
      icon: <BsWrench />,
      title: '전문 장비 점검',
      description: '레이저 수평기, 열화상 카메라, 공기질 점검 등 눈으로 확인하기 어려운 부분까지 전문 장비로 정확히 진단합니다.'
    },
    {
      icon: <BsJournalText />,
      title: '고품질 보고서',
      description: '점검 결과를 사진과 함께 체계적으로 정리한 하방의 맞춤 보고서를 제공합니다.'
    },
    {
      icon: <BsBadgeVr />,
      title: 'VR 무상 서비스',
      description: '사전점검 당일 우리집 세대 내부 모습을 VR로 담아 언제 어디서든 확인이 가능해집니다.'
    }
  ];

  const handleKakaoClick = () => {
    window.open('http://pf.kakao.com/_hIxdss/chat', '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:1566-2384';
  };

  return (
    <ContainerWrapper>
      <Container>
        <DividerIcon>
          <MdSettings />
        </DividerIcon>
        <SectionTitle>포함 서비스 항목</SectionTitle>
        <SectionSubtitle>
         전문가의 육안점검부터 장비점검, 하자접수까지 한번에!<br/>
         추가 비용 없는 올인원 점검 서비스로 안심을 더합니다. 
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
                  <BannerTitle>하자 컨설팅 진행 중!</BannerTitle>
                  <BannerDescription>하자에 관한 궁금한 점이 있으신가요?</BannerDescription>
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

export default Items; 