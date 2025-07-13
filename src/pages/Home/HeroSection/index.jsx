import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../../styles/common';
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
  const [isClient, setIsClient] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      
      // 이미 로드된 경우를 처리
      if (video.readyState >= 3) {
        setIsVideoLoaded(true);
      }

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [isClient]);

  const logos = [
    { src: wordmarkLogo, alt: '랜하우스 워드마크' },
    { src: symbolLogo, alt: '랜하우스 심볼' },
    { src: wordmarkLogo, alt: '랜하우스 워드마크' },
    { src: symbolLogo, alt: '랜하우스 심볼' }
  ];

  return (
    <Hero>
      {isClient && (
        <VideoBackground
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={isVideoLoaded ? 'loaded' : ''}
        >
          <source
            src={isMobile ? "/img/bg3_mobile.mp4" : "/img/bg3_optimized.mp4"}
            type="video/mp4"
          />
        </VideoBackground>
      )}
      
      <Container className='hero-container'>
        <HeroContent>
          <HeroTagline><span>완벽한 우리집을 위한 특별한 방법!</span></HeroTagline>
          <HeroTitle>
            <HeroTitleHighlight><span>HABANG</span></HeroTitleHighlight>
            사전점검 서비스
          </HeroTitle>
          <HeroSubTitle>
          하자 점검 전문가와 함께하는<br/> 체계적인 하자점검
          </HeroSubTitle>
          <CTAButton>
            <a href="/contact">문의하기</a> 
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