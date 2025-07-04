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
import { useMediaQuery } from 'react-responsive';

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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
            src={isMobile ? "/img/0619_mobile.mp4" : "/img/0619_optimized.mp4"}
            type="video/mp4"
          />
        </VideoBackground>
      )}
      <Container>
        <FeatureTag>Our Features</FeatureTag>
        <FeatureTitle>하방의 올인원 서비스</FeatureTitle>
        <FeatureParagraph>
          사전점검 때 입주민 여러분께서 겪으실 고민 <br/>
          하방의 올인원 서비스로 해결하세요
        </FeatureParagraph>
        <FeatureGrid>
          <Row1>
            <FeatureCard className="card-inspection">
              <IconContainer>
                <CardIcon src="/img/service/001.png" alt="Icon 1" />
              </IconContainer>
              <CardContent>
                <h3>육안점검</h3>
                <p>국토부 하자규정/7년의 정수 하방 하자 DB 기반 점검</p>
              </CardContent>
            </FeatureCard>
            <FeatureCard className="card-repair">
              <IconContainer>
                <CardIcon src="/img/service/7.png" alt="Icon 2" />
              </IconContainer>
              <CardContent>
                <h3>장비점검</h3>
                <p>전문장비로 눈에 보이지 않는 하자 확인</p>
              </CardContent>
            </FeatureCard>
          </Row1>
          <Row2>
            <FeatureCard className="card-consultation">
              <IconContainer>
                <CardIcon src="/img/service/hand.jpg" alt="Icon 3" />
              </IconContainer>
              <CardContent>
                <h3>하자접수</h3>
                <p>서면 체크리스트 / 어플 하자 접수 </p>
              </CardContent>
            </FeatureCard>
            <FeatureCard className="card-report">
              <IconContainer>
                <CardIcon src="/img/service/report.png" alt="Icon 4" />
              </IconContainer>
              <CardContent>
                <h3>하자점검 보고서</h3>
                <p>점검 결과를 체계적인 보고서로 제공</p>
              </CardContent>
            </FeatureCard>
            <FeatureCard className="card-vr">
              <IconContainer>
                <CardIcon src="/img/service/vr2.png" alt="Icon 4" />
              </IconContainer>
              <CardContent>
                <h3>VR 세대기록</h3>
                <p>사전점검 현장 디지털 복원</p>
              </CardContent>
            </FeatureCard>
          </Row2>
        </FeatureGrid>
      </Container>
    </Features>
  );
};

export default FeaturesSection; 