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

      // 비디오 버퍼링 최적화
      const optimizeVideoPlayback = () => {
        if (video.readyState >= 3) {
          setIsVideoLoaded(true);
        }
        
        // 모바일에서 데이터 사용량 최적화
        if (isMobile) {
          video.setAttribute('playsinline', '');
          video.setAttribute('webkit-playsinline', '');
        }

        // 백그라운드 탭에서 비디오 일시정지
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            video.pause();
          } else {
            video.play();
          }
        });
      };

      // 비디오 프리로드 최적화
      const preloadVideo = () => {
        const videoUrl = isMobile ? "/img/bg3_mobile.mp4" : "/img/bg3_optimized.mp4";
        
        // 연결 상태 확인
        if (navigator.connection) {
          const connection = navigator.connection;
          // 느린 연결에서는 프리로드 스킵
          if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            return;
          }
        }

        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = videoUrl;
        document.head.appendChild(link);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      optimizeVideoPlayback();
      preloadVideo();

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        document.removeEventListener('visibilitychange', () => {});
      };
    }
  }, [isClient, isMobile]);

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
          preload="metadata"
          poster="/img/bg-poster.webp"
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
          <CTAButton as="a" href="/contact">
            문의하기
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
                loading="lazy"
              />
            ))}
            
            {/* 무한 애니메이션을 위한 복제 */}
            {logos.map((logo, index) => (
              <SliderLogo 
                key={`duplicate-${index}`} 
                src={logo.src} 
                alt={logo.alt}
                loading="lazy"
              />
            ))}
          </SlideTrack>
        </LogoSlider>
      </LogoSliderContainer>
    </Hero>
  );
};

export default HeroSection; 