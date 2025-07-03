import React, { useState, useEffect } from 'react';
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Features>
      {isClient && (
        <VideoBackground
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ playbackRate: 0.5 }}
        >
          <source
            src={isMobile ? "/img/0619_mobile.mp4" : "/img/0619.mp4"}
            type="video/mp4"
          />
        </VideoBackground>
      )}
      <Container>
        <FeatureTag>Our Features</FeatureTag>
        <FeatureTitle>하방만의 특별한 서비스</FeatureTitle>
        <FeatureParagraph>
          하자 점검 전문가가 직접 찾아가는 하자 점검 서비스
        </FeatureParagraph>
        <FeatureGrid>
          <Row1>
            <FeatureCard>
              <IconContainer>
                <CardIcon src="/img/service/001.png" alt="Icon 1" />
              </IconContainer>
              <CardContent>
                <h3>전문가의 꼼꼼한 점검</h3>
                <p>하자 전문가가 직접 방문하여 꼼꼼하게 점검합니다.</p>
              </CardContent>
            </FeatureCard>
            <FeatureCard>
              <IconContainer>
                <CardIcon src="/img/service/002.png" alt="Icon 2" />
              </IconContainer>
              <CardContent>
                <h3>신속한 보수 지원</h3>
                <p>발견된 하자에 대해 신속한 보수를 지원합니다.</p>
              </CardContent>
            </FeatureCard>
          </Row1>
          <Row2>
            <FeatureCard>
              <IconContainer>
                <CardIcon src="/img/service/003.png" alt="Icon 3" />
              </IconContainer>
              <CardContent>
                <h3>전문적인 상담</h3>
                <p>하자 관련 전문적인 상담을 제공합니다.</p>
              </CardContent>
            </FeatureCard>
            <FeatureCard>
              <IconContainer>
                <CardIcon src="/img/service/004.png" alt="Icon 4" />
              </IconContainer>
              <CardContent>
                <h3>체계적인 보고서</h3>
                <p>점검 결과를 체계적인 보고서로 제공합니다.</p>
              </CardContent>
            </FeatureCard>
          </Row2>
        </FeatureGrid>
      </Container>
    </Features>
  );
};

export default FeaturesSection; 