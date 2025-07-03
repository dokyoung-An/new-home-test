import React, { useState, useEffect } from 'react';
import { Container } from '../../../styles/common';
import ArrowIcon from '../../../components/common/ArrowIcon';
import wordmarkLogo from '../../../assets/images/logo.png';
import symbolLogo from '../../../assets/images/habang4.png';

import {
  Hero,
  HeroContent,
  HeroTagline,
  HeroTitle,
  HeroTitleHighlight,
  HeroSubTitle,
  CTAButton,
  LogoSliderContainer,
  LogoSlider,
  SlideTrack,
  SliderLogo,
  VideoBackground,
} from './style';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const logos = [
    { src: wordmarkLogo, alt: '랜하우스 워드마크' },
    { src: symbolLogo, alt: '랜하우스 심볼' },
    { src: wordmarkLogo, alt: '랜하우스 워드마크' },
    { src: symbolLogo, alt: '랜하우스 심볼' }
  ];

  return (
    <Hero>
      {(!isMobile || isVideoLoaded) && (
        <VideoBackground
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/img/bg-poster.png"
          onLoadedData={handleVideoLoad}
        >
          <source
            src={isMobile ? "/img/main3-mobile.mp4" : "/img/main3.mp4"}
            type="video/mp4"
          />
        </VideoBackground>
      )}
      
      <Container className='hero-container'>
        <HeroContent>
          <HeroTagline><span>특별한 우리집을 위한 단 하나의 방법!</span></HeroTagline>
          <HeroTitle>
            <HeroTitleHighlight><span>HABANG</span></HeroTitleHighlight>
            사전점검대행 
          </HeroTitle>
          <HeroSubTitle>
          신축아파트 입주 전, 세대 내 하자 확인 대행 서비스
          </HeroSubTitle>
          <CTAButton>
            <a href="/contact">상담 신청 하기</a> 
          </CTAButton>
        </HeroContent>
      </Container>

      <LogoSliderContainer>
        <LogoSlider>
          <SlideTrack>
            {logos.map((logo, index) => (
              <SliderLogo 
                key={index} 
                src={logo.src} 
                alt={logo.alt} 
              />
            ))}
            
            {/* 무한 애니메이션을 위한 복제 */}
            {logos.map((logo, index) => (
              <SliderLogo 
                key={`duplicate-${index}`} 
                src={logo.src} 
                alt={logo.alt} 
              />
            ))}
          </SlideTrack>
        </LogoSlider>
      </LogoSliderContainer>
    </Hero>
  );
};

export default HeroSection; 