import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

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
  CTAText,
  ClickGuide,
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
   
      bgImage: 'eloi.jpg',
      vrUrl: ' https://lanhouse-in-port.vercel.app/더샵엘로이/'
    },
    {
      title: '수원아이파크시티12단지',
      
      bgImage: 'suwon.jpg',
      vrUrl: 'https://lanhouse-in-port.vercel.app/수원아이파크시티12단지/'
    },
    {
      title: '분당어울림',
      
      bgImage: 'bundangulim.jpg',
      vrUrl: 'https://lanhouse-in-port.vercel.app/금호어울림/'
    },
    {
      title: '리버센SK뷰',
      
      bgImage: 'deone.jpg',
      vrUrl: 'https://lanhouse-in-port.vercel.app/리버센sk뷰/'
    },
   
    {
      title: '화성비봉금강펜테리움',
     
      bgImage: 'bibong.jpg',
      vrUrl: ' https://lanhouse-in-port.vercel.app/비봉금강펜테리움/'
    },
    {
      title: '도심역한양수자인리버파인',
      
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
    <section id="VRExperience" style={{ marginBottom: 0, paddingBottom: 0, paddingTop: 0}}>
      <VRExperience>
        <Container>
          <ExperienceWrapper>
            <ExperienceContent>
              <ExperienceSubtitle><span>Special Service</span>_세대기록 서비스</ExperienceSubtitle>
              <ExperienceTitle>우리집 <span>in Digital World</span></ExperienceTitle>
              <ExperienceHighlight>언제 어디서든 VR Check</ExperienceHighlight>
              <p>
                소중한 공간의 가치를 지키기 위한 시작엔 확실한 기록이 있습니다.
                사전점검대행업체 하방 X 랜하우스 360° VR은 단순한 사진으론 담을 수 없는, 
                사전점검 현장의 모습을 생생하게 담아드립니다.
              </p>
              <ExperienceCTA>
                <CTAItem>
                  <CTAIcon>
                    <MdVrpano />
                  </CTAIcon>
                  <CTAText>
                    <h4>360° VR 투어</h4>
                    <p>현장감 넘치는 렌선 투어</p>
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
                    <p>2주 이내 VR 투어 제작</p>
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
        
        {isPopupOpen && selectedSlide && (
          <VRPopupOverlay onClick={closePopup}>
            <VRPopupContent onClick={(e) => e.stopPropagation()}>
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
            </VRPopupContent>
          </VRPopupOverlay>
        )}
         <ClickGuide>
                  <IoIosArrowUp />
                  <span>Click!</span>
                </ClickGuide>
      </VRExperience>
    </section>
  );
};

export default VRExperienceSection; 