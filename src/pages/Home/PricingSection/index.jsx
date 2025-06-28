import React ,{useState} from 'react';
import { Container } from '../../../styles/common';
import {
  PricingWrapper,
  SectionSubtitle,
  SectionTitle,
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
  Wrapper,
  Label,
  Select,
  PriceBox,
} from './style';

const priceDetails = {
  '사전점검 서비스': {
    description: `육안점검 + 장비점검 + 하자 접수 \n+ 하자점검 보고서 + VR 세대기록`,
    prices: {
      '25평 이하': '240,000원',
      '30평': '270,000원',
      '34평': '300,000원',
      '40평': '330,000원',
      '40평 이상': '상담문의',
    },
  },
  '입주 전 사전점검 서비스': {
    description: '육안점검 + 장비점검 + 하자 접수 + 하자점검 보고서',
    prices: {
      '25평 이하': '140,000원',
      '30평': '160,000원',
      '34평': '180,000원',
      '40평': '200,000원',
      '40평 이상': '상담문의',
    },
  },
};


const PricingSectionComponent = () => {
  const [service, setService] = useState('사전점검 서비스');
  
  const [size, setSize] = useState('25평 이하');

  const selected = priceDetails[service];
  const price = selected.prices[size];

  return (
    <section id="PricingSection">
      <PricingWrapper>
        <Container>
          <SectionSubtitle>Price</SectionSubtitle>
          <SectionTitle>하방 서비스 가격 안내</SectionTitle>
          <DescriptionText>
            합리적인 비용으로 하자 점검 서비스를 이용하세요. <br/>
          </DescriptionText>

          <Wrapper>
      <Label htmlFor="service">서비스명</Label>
      <Select id="service" value={service} onChange={(e) => setService(e.target.value)}>
        {Object.keys(priceDetails).map((svc) => (
          <option key={svc} value={svc}>{svc}</option>
        ))}
      </Select>

      <Label htmlFor="size">평형</Label>
      <Select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
        {Object.keys(selected.prices).map((sz) => (
          <option key={sz} value={sz}>{sz}</option>
        ))}
      </Select>

      <PriceBox>
        <div className='description'>{selected.description}</div>
        <div className='price'>{price} <span>VAT포함</span>  </div>
        <div className='price-description'>
          <ul> 
            <li>6세대 이상 공동구매 진행 시 추가 1만원 할인</li>
            <li>경상도 지역 외 출장비 추가. 상담문의</li>
          </ul>
        </div>
      </PriceBox>
    </Wrapper>
          
          {/* <PricingPlans>
            <PricingCard>
              <CardNumber>01</CardNumber>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                기본형
              </CardTitle>
              <HighlightTitle>1세대 ~ </HighlightTitle>
              <CardDescription>
                사전점검, 준공 후, 임대차 전 개별 예약으로 진행되는
                촬영 패키지입니다.
              </CardDescription>
              <PricingBox>
                <SizeBadge> 평당</SizeBadge>
                <Price>8,500 원 <VAT>(VAT 포함)</VAT></Price>
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
                공동구매
              </CardTitle>
              <HighlightTitle>10세대 이상 ~</HighlightTitle>
              <CardDescription>
                사전점검 후, 준공 후, 카페나 단체방을 통해 함께 하실 분을 모아주세요.
                모이시는 만큼 비용은 내려갑니다.
                <ul>
                <li>10세대 ~ 19세대 : 10% 할인</li>
                <li>20세대 ~ 29세대 : 20% 할인</li>
                <li>30세대 ~ 49세대 : 30% 할인</li>
                <li>50세대 ~ 69세대 : 40% 할인</li>
                <li>70세대 ~ 99세대 : 45% 할인</li>
                </ul>
              </CardDescription>
              <PricingBox>
                <SizeBadge>평당</SizeBadge>
                <Price> ~ 4,500 원 <VAT>(VAT 포함)</VAT></Price>
              </PricingBox>
            </PricingCard>
            
            <PricingCard>
              <CardNumber>03</CardNumber>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                기업형
              </CardTitle>
              <HighlightTitle>임대관리업, 공인중개사 대상</HighlightTitle>
              <CardDescription>
                임대 관리, 매매-임대차를 전문으로 하시는 임대관리업체, 공인중개사 대상
                프리미엄 패키지입니다.
              </CardDescription>
              <PricingBox>
                <SizeBadge></SizeBadge>
                <Price>견적 문의</Price>
              </PricingBox>
            </PricingCard>
          </PricingPlans> */}
        </Container>
        
       
      </PricingWrapper>
    </section>
  );
};

export default PricingSectionComponent; 