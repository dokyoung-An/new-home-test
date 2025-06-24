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
  AddContainer,
  AddTitle,
  ArrowIcon
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
        <FeatureTag>HABANG SERVICE</FeatureTag>
        <FeatureTitle>7년의 노하우!!<br/>하방의 특별한 점검 서비스</FeatureTitle>
        <FeatureParagraph>
          하자체크는 기본! 하자 접수까지 진행하는<br/>올인원 서비스
        </FeatureParagraph>
        
       
        
        <FeatureGrid>
          <Row1>
            <FeatureCard className="row1-card1">
              <CardContent className="space-bg">
                <IconContainer>
                  <CardIcon>🏠</CardIcon>
                </IconContainer>
                <div>
                  <h3>육안점검</h3>
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
                  <h3>장비점검</h3>
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
                  <h3>하자접수</h3>
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
                  <h3>하자점검 보고서</h3>
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
                  <h3>하자 Q&A</h3>
                  <p>방문자 통계와 관심 지점 분석으로 마케팅 전략 수립</p>
                </div>
              </CardContent>
            </FeatureCard>
          </Row2>
        </FeatureGrid>
      </Container>

      <AddContainer>
        <img src="/img/plus.png" alt="add" />
        <AddTitle>SPECIAL SERVICE</AddTitle>
        <ArrowIcon>⬇️</ArrowIcon>
      </AddContainer>
    </Features>
  );
};

export default FeaturesSection; 