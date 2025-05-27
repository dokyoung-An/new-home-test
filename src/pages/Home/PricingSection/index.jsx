import React from 'react';
import { Container } from '../../../styles/common';
import {
  PricingWrapper,
  PricingContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  HighlightText,
  DescriptionText,
  PricingPlans,
  PricingCard,
  CardNumber,
  CardTitle,
  HighlightTitle,
  CardDescription,
  PricingBox,
  SizeBadge,
  Price,
  VAT,
  LastSection,
  ServiceSectionTitle,
  ServiceCardsContainer,
  ServiceCard,
  ServiceIconWrapper,
  ServiceTitle,
  ServiceDescription
} from './style';

const PricingSectionComponent = () => {
  return (
    <section id="PricingSection">
      <PricingWrapper>
        <Container>
          <SectionSubtitle>가격 안내</SectionSubtitle>
          <SectionTitle>랜하우스 VR 촬영 패키지 요금제</SectionTitle>
          <DescriptionText>
            합리적인 비용으로 고품질 VR 촬영 서비스를 이용하세요. <br/>
            부동산 규모와 요구사항에 맞는 다양한 패키지를 제공합니다.
          </DescriptionText>
          
          <PricingPlans>
            <PricingCard>
              <CardNumber>01</CardNumber>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                기본형
              </CardTitle>
              <HighlightTitle>소형 평수 패키지</HighlightTitle>
              <CardDescription>
                소형 주택, 원룸, 오피스텔에 적합한 패키지입니다. 
                기본적인 VR 촬영과 1개월 호스팅이 포함되어 있습니다.
              </CardDescription>
              <PricingBox>
                <SizeBadge>10평 이하</SizeBadge>
                <Price>30만원 <VAT>(VAT 별도)</VAT></Price>
              </PricingBox>
            </PricingCard>
            
            <PricingCard>
              <CardNumber>02</CardNumber>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                스탠다드
              </CardTitle>
              <HighlightTitle>중형 평수 패키지</HighlightTitle>
              <CardDescription>
                아파트, 중형 사무실에 적합한 패키지입니다.
                상세한 VR 촬영과 3개월 호스팅, 추가 인포포인트 10개가 포함됩니다.
              </CardDescription>
              <PricingBox>
                <SizeBadge>30평 이하</SizeBadge>
                <Price>45만원 <VAT>(VAT 별도)</VAT></Price>
              </PricingBox>
            </PricingCard>
            
            <PricingCard>
              <CardNumber>03</CardNumber>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                프리미엄
              </CardTitle>
              <HighlightTitle>대형 평수 패키지</HighlightTitle>
              <CardDescription>
                대형 주택, 펜트하우스, 상업 공간에 적합한 프리미엄 패키지입니다.
                최상급 화질의 VR 촬영과 6개월 호스팅, 맞춤형 추가 기능이 포함됩니다.
              </CardDescription>
              <PricingBox>
                <SizeBadge>60평 이하</SizeBadge>
                <Price>75만원 <VAT>(VAT 별도)</VAT></Price>
              </PricingBox>
            </PricingCard>
          </PricingPlans>
        </Container>
        
       
      </PricingWrapper>
    </section>
  );
};

export default PricingSectionComponent; 