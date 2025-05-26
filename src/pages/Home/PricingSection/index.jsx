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
        
        <LastSection>
          <Container>
            <ServiceSectionTitle>
              <svg className="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span className="title-text">
                촬영 전 <span className="highlight">유의사항</span>
              </span>
            </ServiceSectionTitle>
            <ServiceCardsContainer>
              <ServiceCard>
                <ServiceIconWrapper bgColor="#FFF5F2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E65C30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </ServiceIconWrapper>
                <ServiceTitle>공간 정리</ServiceTitle>
                <ServiceDescription>최상의 결과물을 위해 촬영 전 공간 정리와 청소가 필요합니다</ServiceDescription>
              </ServiceCard>

              <ServiceCard>
                <ServiceIconWrapper bgColor="#F2F7FF">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A72B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                </ServiceIconWrapper>
                <ServiceTitle>조명 확인</ServiceTitle>
                <ServiceDescription>충분한 조명이 확보된 상태에서 촬영을 진행합니다</ServiceDescription>
              </ServiceCard>

              <ServiceCard>
                <ServiceIconWrapper bgColor="#F5F2FF">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B4DE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                  </svg>
                </ServiceIconWrapper>
                <ServiceTitle>귀중품 보관</ServiceTitle>
                <ServiceDescription>귀중품은 안전한 곳에 미리 보관해 주세요</ServiceDescription>
              </ServiceCard>

              <ServiceCard>
                <ServiceIconWrapper bgColor="#F2FFF7">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#30B266" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h18v18H3zM21 12H3M12 3v18"></path>
                  </svg>
                </ServiceIconWrapper>
                <ServiceTitle>창문 청소</ServiceTitle>
                <ServiceDescription>창문은 깨끗하게 닦아 자연광을 최대한 활용합니다</ServiceDescription>
              </ServiceCard>

              <ServiceCard>
                <ServiceIconWrapper bgColor="#FFF8F2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E6A23C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </ServiceIconWrapper>
                <ServiceTitle>물건 배치</ServiceTitle>
                <ServiceDescription>공간의 장점이 잘 드러나도록 물건을 적절히 배치해주세요</ServiceDescription>
              </ServiceCard>
            </ServiceCardsContainer>
          </Container>
        </LastSection>
      </PricingWrapper>
    </section>
  );
};

export default PricingSectionComponent; 