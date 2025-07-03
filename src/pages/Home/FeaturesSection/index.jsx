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
  VideoBackground,
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
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // 50% 느리게 재생
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <Features id="FeaturesSection">
      {(!isMobile || isVideoLoaded) && (
        <VideoBackground 
          ref={videoRef} 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
        >
          <source src={isMobile ? "/img/0619_mobile.mp4" : "/img/0619.mp4"} type="video/mp4" />
        </VideoBackground>
      )}
      <Container>
        <FeatureTag>SERVICE</FeatureTag>
        <FeatureTitle>하방은 이렇게 다릅니다</FeatureTitle>
        <FeatureParagraph>
          하자체크는 기본! 하자 접수에 우리집 사이버모델하우스까지
        </FeatureParagraph>
        
        <FeatureGrid>
          <Row1>
            <FeatureCard className="row1-card1">
              <CardContent className="space-bg">
                <IconContainer>
                  <CardIcon>🔍</CardIcon>
                </IconContainer>
                <div>
                  <h3>육안점검</h3>
                  <p>국토부 하자점검규정 및 하방자체 DB를 바탕으로 <br/>미관상 하자, 중대하자 250여 가지 체크 항목을 확인합니다.</p>
                </div>
              </CardContent>
            </FeatureCard>
            
            <FeatureCard className="dark">
              <CardContent className="multi-platform-bg">
                <IconContainer>
                  <CardIcon>🔌</CardIcon>
                </IconContainer>
                <div>
                  <h3>장비점검</h3>
                  <p>공기 속 유해물질에서부터 바닥 기울어짐까지!<br/> 눈으로 볼 수 없는 사항을 점검합니다.</p>
                </div>
              </CardContent>
            </FeatureCard>
          </Row1>
          
          <Row2>
            <FeatureCard>
              <CardContent className="zoom-bg">
                <IconContainer>
                  <CardIcon>📲</CardIcon>
                </IconContainer>
                <div>
                  <h3>하자접수</h3>
                  <p>사전점검 때 발견된 하자를 체크리스트 or 건설사 하자 접수 어플에 당일 접수해 드립니다다</p>
                </div>
              </CardContent>
            </FeatureCard>
            
            <FeatureCard className="orange">
              <CardContent className="business-bg">
                <IconContainer>
                  <CardIcon>📊</CardIcon>
                </IconContainer>
                <div>
                  <h3>하자점검 보고서</h3>
                  <p>사전점검 후, 하자 사진과 하자 내용을 <br/>한 눈에 볼 수 있는 보고서를 제공합니다.</p>
                </div>
              </CardContent>
            </FeatureCard>
            
            <FeatureCard>
              <CardContent className="data-bg">
                <IconContainer>
                  <CardIcon>❓</CardIcon>
                </IconContainer>
                <div>
                  <h3>360도 VR 세대기록</h3>
                  <p>사전점검 현장을, 360도 VR로 기록해 점검 후에도 쉽게 확인할 수 있습니다.</p>
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