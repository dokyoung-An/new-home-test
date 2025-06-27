import React from 'react';
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
  VideoBackground
} from './style';

const HeroSection = () => {
  const logos = [
    { src: wordmarkLogo, alt: '랜하우스 워드마크' },
    { src: symbolLogo, alt: '랜하우스 심볼' },
    { src: wordmarkLogo, alt: '랜하우스 워드마크' },
    { src: symbolLogo, alt: '랜하우스 심볼' }
  ];

  return (
    <Hero>
      <VideoBackground autoPlay muted loop playsInline preload="auto"  poster="/img/hero-poster.png" >
        <source src="/img/bg3.mp4" type="video/mp4" />
        <source src="/img/bg3.webm" type="video/webm"/>
      </VideoBackground>
      
      <Container>
        <HeroContent>
          <HeroTagline><span>신축아파트 하자 확인! 입주 전 필수</span></HeroTagline>
          <HeroTitle>
            <HeroTitleHighlight><span>HABANG</span></HeroTitleHighlight>
            사전점검대행 서비스 
          </HeroTitle>
          <HeroSubTitle>
           하자 확인에서 접수까지! 모든 과정을 완벽하게 대행해드립니다.
          </HeroSubTitle>
          <CTAButton>
            <a href="#ContactFormSection">서비스 문의하기</a> <ArrowIcon color="#fff" />
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