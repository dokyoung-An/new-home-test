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
    { src: 'g-logo.png', type: 'png', alt: '공감' },
    { src: 'woori.png', type: 'png', alt: '우리홈' },
    { src: 'logo-wozip.png', type: 'png', alt: '우집사' },
    { src: 'habang.png', type: 'png', alt: '하방' },
    { src: 'g-logo.png', type: 'png', alt: '공감' },
    { src: 'woori.png', type: 'png', alt: '우리홈' },
    { src: 'habang.png', type: 'png', alt: '하방' }
  
  ];

  return (
    <CTABanner>
      <Container>
        <CTASubtitle>랜하우스 제휴사</CTASubtitle>
        <CTATitle>비지니스의 매력을 한층 끓어올릴,</CTATitle>
        <CTAHighlight>360° VR를 도입하세요.</CTAHighlight>
      
       
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