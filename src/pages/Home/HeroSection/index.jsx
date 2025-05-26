import React from 'react';
import { Container } from '../../../styles/common';
import ArrowIcon from '../../../components/common/ArrowIcon';
import wordmarkLogo from '../../../assets/images/Wordmark White.png';
import symbolLogo from '../../../assets/images/Symbol White.png';
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
      <VideoBackground autoPlay muted loop playsInline>
        <source src="/img/hero.mp4" type="video/mp4" />
      </VideoBackground>
      
      <Container>
        <HeroContent>
          <HeroTagline><span>부동산 문제, 이제는 VR로!</span></HeroTagline>
          <HeroTitle>
            <HeroTitleHighlight>360°</HeroTitleHighlight>
            VR 랜하우스
          </HeroTitle>
          <HeroSubTitle>
            현장 방문과 똑같은 임장 경험 &
            원상 복구 분쟁 최상의 솔루션
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