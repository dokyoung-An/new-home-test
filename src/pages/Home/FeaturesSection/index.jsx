import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../../styles/common';
import {
  Features,
  FeatureTag,
  FeatureTitle,
  FeatureParagraph,
  FeatureGrid,
  Row1,
  Row2,
  FeatureCard,
  IconContainer,
  CardIcon,
  CardContent,
  VideoBackground
} from './style';

// 애니메이션을 위한 별도 스타일
const animationStyle = {
  pulse: {
    animation: 'pulse 2s infinite',
  },
  float: {
    animation: 'float 3s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' },
  },
};

const FeaturesSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // 50% 느리게 재생
    }
  }, []);
  
  // iframe 로드 완료 처리
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  // 컴포넌트 마운트 시 5초 후 로딩 상태 해제 (iframe 로드가 안되는 경우 대비)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // VR 활성화 함수 - 매우 단순화된 버전
  const handlePromoClick = () => {
    setShowOverlay(false);
  };

  return (
    <Features id="FeaturesSection">
      <VideoBackground ref={videoRef} autoPlay muted loop playsInline>
        <source src="/img/event.mp4" type="video/mp4" />
      </VideoBackground>
      <Container>
        <FeatureTag>VIRTUAL TOUR</FeatureTag>
        <FeatureTitle>최고의 가상현실 경험</FeatureTitle>
        <FeatureParagraph>
          랜하우스는 최첨단 360도 카메라와 전문 기술을 통해 놀라운 VR 경험을 제공합니다
        </FeatureParagraph>
        
        {/* VR 데모 컨테이너 - 최대한 단순화 */}
        <div 
          style={{
            position: 'relative',
            backgroundColor: 'rgba(40, 30, 20, 0.2)',
            borderRadius: '20px',
            margin: '60px 0',
            minHeight: '300px',
            maxWidth: '100%',
           boxShadow: '0 25px 40px rgba(0, 0, 0, 0.25)',
            height: '600px',
            overflow: 'hidden',
          }}
        >
          {/* iframe */}
          <iframe 
            src="https://lanhouse-in-port.vercel.app/부산에코델타/"
            title="랜하우스 VR 데모"
            allowFullScreen
            allow="xr-spatial-tracking; gyroscope; accelerometer"
            onLoad={handleIframeLoad}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              zIndex: 10,
              pointerEvents: showOverlay ? 'none' : 'auto'
            }}
          />
          
          {/* 로딩 인디케이터 */}
          {isLoading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              zIndex: 40,
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}>
              VR 컨텐츠를 불러오는 중입니다...
            </div>
          )}
          
          {/* 클릭 유도 오버레이 */}
          {showOverlay && (
            <div 
              onClick={handlePromoClick}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(20, 15, 10, 0.3), rgba(20, 15, 10, 0.5))',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'grab'
              }}
            >
              <div style={{
                color: 'white',
                fontSize: '1.7rem',
                fontWeight: '600',
                textAlign: 'center',
                padding: '20px',
                textShadow: '0 0 20px rgba(20, 15, 10, 0.9)',
                marginBottom: '80px',
                letterSpacing: '0.5px',
              }}>
                클릭해 직접 체험해 보세요
              </div>
              <div style={{
                width: '70px', 
                height: '70px',
                backgroundImage: 'url(/img/vr-icon.svg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter: 'drop-shadow(0 0 15px rgba(230, 92, 48, 0.8))',
              }} />
            </div>
          )}
        </div>
        
        <FeatureGrid>
          <Row1>
            <FeatureCard className="row1-card1">
              <CardContent className="space-bg">
                <IconContainer>
                  <CardIcon>🏠</CardIcon>
                </IconContainer>
                <div>
                  <h3>실제와 동일한 공간감</h3>
                  <p>실제 방문한 것처럼 생생한 공간감을 경험할 수 있습니다</p>
                </div>
              </CardContent>
            </FeatureCard>
            
            <FeatureCard className="dark">
              <CardContent className="multi-platform-bg">
                <IconContainer>
                  <CardIcon>📱</CardIcon>
                </IconContainer>
                <div>
                  <h3>멀티 플랫폼 지원</h3>
                  <p>웹, 모바일, VR 헤드셋 등 다양한 기기에서 이용 가능합니다</p>
                </div>
              </CardContent>
            </FeatureCard>
          </Row1>
          
          <Row2>
            <FeatureCard>
              <CardContent className="zoom-bg">
                <IconContainer>
                  <CardIcon>🔍</CardIcon>
                </IconContainer>
                <div>
                  <h3>상세 확대 기능</h3>
                  <p>주요 포인트를 세밀하게 살펴볼 수 있는 줌 기능 제공</p>
                </div>
              </CardContent>
            </FeatureCard>
            
            <FeatureCard className="orange">
              <CardContent className="business-bg">
                <IconContainer>
                  <CardIcon>💼</CardIcon>
                </IconContainer>
                <div>
                  <h3>비즈니스 최적화</h3>
                  <p>부동산 비즈니스에 최적화된 기능과 인터페이스로 고객과의 소통을 원활하게 합니다</p>
                </div>
              </CardContent>
            </FeatureCard>
            
            <FeatureCard>
              <CardContent className="data-bg">
                <IconContainer>
                  <CardIcon>📊</CardIcon>
                </IconContainer>
                <div>
                  <h3>데이터 분석</h3>
                  <p>방문자 통계와 관심 지점 분석으로 마케팅 전략 수립</p>
                </div>
              </CardContent>
            </FeatureCard>
          </Row2>
        </FeatureGrid>
      </Container>
    </Features>
  );
};

export default FeaturesSection; 