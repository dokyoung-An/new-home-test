import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const Sec8Partners = () => {
  const partners = [
    { name: '부경', logo: '/img/bukyoung1.png' },
    { name: '에버스카이', logo: '/img/ever.png' },
    { name: '원패스', logo: '/img/onepass.png' },
    { name: '투게더', logo: '/img/togather.png' },
    { name: '엣지컴퍼니', logo: '/img/edge.png' },
    { name: '우집사', logo: '/img/woozi.png' },
  ];

  // 캐러셀 효과를 위해 배열 복제
  const duplicatedPartners = [...partners, ...partners];

  return (
    <Section>
      <Container>
        <Title>파트너사</Title>
        <Subtitle>하방은 입주박람회 주관사와 함께 합니다</Subtitle>
        
        <CarouselContainer>
          <CarouselTrack>
            {duplicatedPartners.map((partner, index) => (
              <LogoContainer key={index}>
                <Logo src={partner.logo} alt={partner.name} />
              </LogoContainer>
            ))}
          </CarouselTrack>
        </CarouselContainer>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  width: 100%;
  padding: 80px 0;
  background: linear-gradient(to right, #0a1229 0%, #1a2744 100%);
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: white;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 4rem;
  color: rgba(255, 255, 255, 0.8);
`;

const slideAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 20px 0;

  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
  }

  &:before {
    left: 0;
    background: linear-gradient(to right, #0a1229 0%, transparent 100%);
  }

  &:after {
    right: 0;
    background: linear-gradient(to left, #0a1229 0%, transparent 100%);
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  animation: ${slideAnimation} 36s linear infinite;
  width: fit-content;

  &:hover {
    animation-play-state: paused;
  }
`;

const LogoContainer = styled.div`
  flex: 0 0 200px;
  height: 80px;
  margin: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
`;

const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.8;
  transition: opacity 0.3s ease;

  ${LogoContainer}:hover & {
    opacity: 1;
  }
`;

export default Sec8Partners; 