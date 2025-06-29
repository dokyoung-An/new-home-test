import React, { useRef, useEffect, useState } from 'react';
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

const CoworkerSection = () => {
  const partners = [
    { src: 'gonggam.png', type: 'png', alt: '공감', title: '공감' },
    { src: 'edge.png', type: 'png', alt: '엣지컴퍼니', title: '엣지컴퍼니' },
    { src: 'bukyoung1.png', type: 'png', alt: '부경', title: '부경' },
    { src: 'togather.png', type: 'png', alt: '투게더', title: '투게더' },
    { src: 'onepass.png', type: 'png', alt: '원패스', title: '원패스' },
    { src: 'woozi.png', type: 'png', alt: '우집사', title: '우집사' },
    { src: 'ever.png', type: 'png', alt: '에버스카이', title: '에버스카이' },
  ];

  const repeatedPartners = [...partners, ...partners];
  const sliderRef = useRef(null);
  const [position, setPosition] = useState(0);
  
  const partnerWidth = 180; // 로고 + 마진 너비
  const totalWidth = partners.length * partnerWidth;
  const animationDuration = 20; // 전체 애니메이션 시간(초)

  useEffect(() => {
    const startTime = Date.now();
    let animationFrame;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000; // 초 단위로 변환
      
      // 전체 너비를 animationDuration 초 동안 이동
      const newPosition = (elapsed % animationDuration) * (totalWidth / animationDuration);
      
      // 첫 번째 세트가 완전히 지나가면 position을 리셋
      if (newPosition >= totalWidth) {
        setPosition(0);
      } else {
        setPosition(-newPosition);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [totalWidth]);

  return (
    <CTABanner>
      <Container>
        <CTASubtitle>파트너사</CTASubtitle>
        <CTATitle>하방은 경상권 입주 박람회 주관사의의</CTATitle>
<CTAHighlight>공식 파트너로 활동 하고 있습니다.</CTAHighlight>
      </Container>
      <PartnersSlider>
        <PartnersTrack
          ref={sliderRef}
          style={{
            transform: `translateX(${position}px)`,
            width: `${repeatedPartners.length * partnerWidth}px`
          }}
        >
          {repeatedPartners.map((partner, index) => (
            <PartnerLogo
              key={index}
              src={'/img/' + partner.src}
              alt={partner.alt}
              title={partner.title}
              $isSvg={partner.type === 'svg'}
              loading="lazy"
            />
          ))}
        </PartnersTrack>
      </PartnersSlider>
    </CTABanner>
  );
};

export default CoworkerSection; 