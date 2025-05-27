import React from 'react';
import { Container } from '../../../styles/common';
import {
  CTABanner,
  CTASubtitle,
  CTATitle,
  CTAHighlight,
  CameraContainer,
  CameraImg,
  PartnersSlider,
  PartnersTrack,
  PartnerLogo
} from './style';

const CTABannerSection = () => {
  // 파트너 이미지 객체 배열 (타입 구분)
  const partners = [
    { src: 'partner1-1.png', type: 'png', alt: '자이' },
    { src: 'partner1-2.png', type: 'png', alt: '케이디리빙' },
    { src: 'partner1-3.png', type: 'png', alt: '래미안' },
    { src: 'partner1-4.png', type: 'png', alt: '푸르지오' },
    { src: 'partner1-5.png', type: 'png', alt: '디에트르' },
    { src: 'partner1-7.png', type: 'png', alt: '더샵' },
    { src: 'partner1-8.png', type: 'png', alt: '엘리프' },
    { src: 'partner1-1.svg', type: 'svg', alt: '서한이다음' },
    { src: 'partner1-2.svg', type: 'svg', alt: '서희스타힐스' },
    { src: 'partner1-3.svg', type: 'svg', alt: '아이파크' }
  ];

  return (
    <CTABanner>
      <Container>
        <CTASubtitle>어떻게 생겼는지 궁금해!!😆</CTASubtitle>
        <CTATitle>대표 건설사 아파트 내부,</CTATitle>
        <CTAHighlight>랜하우스로 편하게 구경하세요.</CTAHighlight>
      
       
      </Container>
      
      <CameraContainer>
        <CameraImg src={'/img/camera.png'} alt="VR 카메라" />
      </CameraContainer>
      
      <PartnersSlider>
        <PartnersTrack>
          {partners.map((partner, index) => (
            <PartnerLogo 
              key={index} 
              src={'/img/' + partner.src} 
              alt={partner.alt}
              $isSvg={partner.type === 'svg'}
            />
          ))}
          
          {/* 무한 애니메이션을 위한 복제 */}
          {partners.map((partner, index) => (
            <PartnerLogo 
              key={`dup-${index}`} 
              src={'/img/' + partner.src} 
              alt={partner.alt}
              $isSvg={partner.type === 'svg'}
            />
          ))}
        </PartnersTrack>
      </PartnersSlider>
    </CTABanner>
  );
};

export default CTABannerSection; 