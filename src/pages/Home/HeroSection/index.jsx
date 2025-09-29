import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../../styles/common';


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
        const videoUrl = isMobile ? "/img/video/bg.mp4" : "/img/video/bg.mp4";
        
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
          poster="/img/bg-poster.webp"
          className={isVideoLoaded ? 'loaded' : ''}
          onError={(e) => console.error('Video error:', e)}
        >
          <source
            src="/img/video/bg.mp4"
            type="video/mp4"
          />
        </VideoBackground>
      )}
      
      <Container className='hero-container'>
        <HeroContent>
          <HeroTagline><span>경상권 사전점검 1위</span></HeroTagline>
          <HeroTitle>
        <span>가장 가까운 곳에서 만나는</span>
            가장 확실한 사전점검
          </HeroTitle>
          <HeroSubTitle>
          당신 곁의 아파트 사전점검 전문가, <br/>하방에 문의해보세요!
          </HeroSubTitle>
          <CTAButton as="a" href="/contact">
            문의하기
          </CTAButton>
        </HeroContent>
      </Container>

     
    </Hero>
  );
};

export default HeroSection; 