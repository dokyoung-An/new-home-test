import React, { useState, useEffect } from 'react';
import ArrowIcon from '../../../components/common/ArrowIcon';
import { Container } from '../../../styles/common';
import {
  VRExperience,
  ExperienceWrapper,
  ExperienceContent,
  ExperienceSubtitle,
  ExperienceTitle,
  ExperienceHighlight,
  ExperienceCTA,
  ExperienceSlider,
  SliderContainer,
  SliderTrack,
  SlideItem,
  SlideContent,
  VRPopupOverlay,
  VRPopupContent,
  VRPopupHeader,
  VRPopupTitle,
  CloseButton,
  IframeContainer,
  StyledIframe,
  CTAItem,
  CTAIcon,
  CTAText
} from './style';
import { MdVrpano, MdPhotoCamera, MdOutlineSpeed, MdDevices } from 'react-icons/md';

const VRExperienceSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
    {
      title: '더샵 엘로이',
      description: '부동산 방문 없이도 실제 공간을 체험할 수 있는 가상 투어 서비스',
      bgImage: 'eloi.jpg',
      vrUrl: ' https://lanhouse-in-port.vercel.app/더샵엘로이/'
    },
    {
      title: '수원아이파크시티12단지',
      description: '관심 있는 매물만 방문하여 효율적인 부동산 탐색 가능',
      bgImage: 'suwon.jpg',
      vrUrl: 'https://lanhouse-in-port.vercel.app/수원아이파크시티12단지/'
    },
    {
      title: '분당어울림',
      description: '360도 4K 고화질 촬영으로 공간의 디테일까지 섬세하게 표현',
      bgImage: 'bundangulim.jpg',
      vrUrl: 'https://lanhouse-in-port.vercel.app/금호어울림/'
    },
    {
      title: '리버센SK뷰',
      description: '웹사이트, 소셜 미디어, 메신저 등 다양한 플랫폼에서 공유 가능',
      bgImage: 'deone.jpg',
      vrUrl: 'https://lanhouse-in-port.vercel.app/리버센sk뷰/'
    },
   
    {
      title: '화성비봉금강펜테리움',
      description: '사용자 친화적 인터페이스로 쉽게 공간을 이동하고 탐색 가능',
      bgImage: 'bibong.jpg',
      vrUrl: ' https://lanhouse-in-port.vercel.app/비봉금강펜테리움/'
    },
    {
      title: '도심역한양수자인리버파인인',
      description: '사용자 친화적 인터페이스로 쉽게 공간을 이동하고 탐색 가능',
      bgImage: 'dosim.jpg',
      vrUrl: ' https://lanhouse-in-port.vercel.app/도심역한양수자인/'
    },
   
  ];

  // 이미지 프리로드
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach((slide) => {
        const img = new Image();
        img.src = `/img/${slide.bgImage}`;
        img.onload = () => {
          setImagesLoaded(prev => ({
            ...prev,
            [slide.bgImage]: true
          }));
        };
      });
    };

    preloadImages();
  }, []);

  // 모바일 환경 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openPopup = (slide) => {
    setSelectedSlide(slide);
    setIsPopupOpen(true);
    // 팝업이 열렸을 때 스크롤 방지
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // 팝업이 닫혔을 때 스크롤 다시 활성화
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="VRExperience" style={{ marginBottom: 0, paddingBottom: 0 }}>
      <VRExperience>
        <Container>
          <ExperienceWrapper>
            <ExperienceContent>
              <ExperienceSubtitle>Premium VR 솔루션</ExperienceSubtitle>
              <ExperienceTitle>부동산 문제 해결 혁신</ExperienceTitle>
              <ExperienceHighlight>몰입형 VR </ExperienceHighlight>
              <p>
                랜하우스 VR은 부동산 비즈니스에 차별화된 경쟁력을 제공합니다. 
                고품질 360° 촬영과 직관적인 인터페이스로 고객에게 잊을 수 없는 
                가상 투어 경험을 선사합니다.
              </p>
              <ExperienceCTA>
                <CTAItem>
                  <CTAIcon>
                    <MdVrpano />
                  </CTAIcon>
                  <CTAText>
                    <h4>360° VR 투어</h4>
                    <p>현장 몰입감 느끼는 가상 투어</p>
                  </CTAText>
                </CTAItem>
                <CTAItem>
                  <CTAIcon>
                    <MdPhotoCamera />
                  </CTAIcon>
                  <CTAText>
                    <h4>전문 촬영</h4>
                    <p>고품질 파노라마 촬영 서비스</p>
                  </CTAText>
                </CTAItem>
                <CTAItem>
                  <CTAIcon>
                    <MdOutlineSpeed />
                  </CTAIcon>
                  <CTAText>
                    <h4>빠른 제작</h4>
                    <p>48시간 이내 VR 투어 제작</p>
                  </CTAText>
                </CTAItem>
                <CTAItem>
                  <CTAIcon>
                    <MdDevices />
                  </CTAIcon>
                  <CTAText>
                    <h4>모든 기기 지원</h4>
                    <p>PC, 모바일 등 크로스 플랫폼</p>
                  </CTAText>
                </CTAItem>
              </ExperienceCTA>
            </ExperienceContent>
            
            <ExperienceSlider>
              <SliderContainer>
                <SliderTrack>
                  {slides.map((slide, index) => (
                    <SlideItem key={index} onClick={() => openPopup(slide)}>
                      <SlideContent 
                        bgImage={slide.bgImage}
                        className={`slide-content ${imagesLoaded[slide.bgImage] ? 'loaded' : ''}`}
                      >
                        <div className="text-container">
                          <h3>{slide.title}</h3>
                          <p>{slide.description}</p>
                        </div>
                      </SlideContent>
                    </SlideItem>
                  ))}
                  
                  {/* 무한 애니메이션을 위한 복제 슬라이드 */}
                  {slides.map((slide, index) => (
                    <SlideItem key={`duplicate-${index}`} onClick={() => openPopup(slide)}>
                      <SlideContent 
                        bgImage={slide.bgImage}
                        className={`slide-content ${imagesLoaded[slide.bgImage] ? 'loaded' : ''}`}
                      >
                        <div className="text-container">
                          <h3>{slide.title}</h3>
                          <p>{slide.description}</p>
                        </div>
                      </SlideContent>
                    </SlideItem>
                  ))}
                </SliderTrack>
              </SliderContainer>
            </ExperienceSlider>
          </ExperienceWrapper>
        </Container>
        
        {/* VR 팝업 */}
        <VRPopupOverlay isOpen={isPopupOpen} onClick={closePopup}>
          <VRPopupContent onClick={(e) => e.stopPropagation()}>
            {selectedSlide && (
              <>
                <VRPopupHeader>
                  <VRPopupTitle>{selectedSlide.title} VR 투어</VRPopupTitle>
                  <CloseButton onClick={closePopup}>×</CloseButton>
                </VRPopupHeader>
                {isMobile && (
                  <div style={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    fontSize: '12px', 
                    marginBottom: '10px',
                    textAlign: 'center',
                    padding: '6px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px'
                  }}>
                    <span role="img" aria-label="회전">🔄</span> 최적의 경험을 위해 화면을 가로로 회전해보세요
                  </div>
                )}
                <IframeContainer>
                  <StyledIframe
                    src={selectedSlide.vrUrl}
                    title={`${selectedSlide.title} VR 투어`}
                    allowFullScreen
                    allow="xr-spatial-tracking; gyroscope; accelerometer"
                  />
                </IframeContainer>
              </>
            )}
          </VRPopupContent>
        </VRPopupOverlay>
      </VRExperience>
    </section>
  );
};

export default VRExperienceSection; 