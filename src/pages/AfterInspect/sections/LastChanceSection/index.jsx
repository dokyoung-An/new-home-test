import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container } from '../../../../styles/common';

const LastChanceSection = () => {
  return (
    <SectionWrapper>
      <BackgroundOverlay />
      <StyledContainer>
        <ContentWrapper>
          <TextContent>
            <Subheadline>
              1인 점검이라 <Highlight>더 합리적인 가격</Highlight>
            </Subheadline>
            <Headline>
              입주 전 마지막 기회
            </Headline>
            <BodyText>
              단 한 세대에 집중한<br className="mobile-only" /> 여유롭고 꼼꼼한 점검을 약속드립니다.
            </BodyText>
            <CTAButton href="/contact">서비스 문의</CTAButton>
          </TextContent>
          <ImageContent />
        </ContentWrapper>
      </StyledContainer>
    </SectionWrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionWrapper = styled.section`
  position: relative;
  width: 100vw;
  min-height: 450px;
  background: ${({ theme }) => theme.primaryDark || '#2D5BFF'};
  color: white;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 3rem 0;

  @media (max-width: 1024px) {
    padding: 4rem 0;
  }
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    rgba(45, 91, 255, 0.9) 0%,
    rgba(45, 91, 255, 0.7) 60%,
    rgba(45, 91, 255, 0.1) 100%);
  z-index: 0;
`;

const StyledContainer = styled(Container)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16rem;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 1200px) {
    gap: 8rem;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 4rem;
    align-items: center;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  max-width: 600px;
  padding: 2rem 0;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 0;
  }
`;

const Headline = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    font-size: 2.4rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subheadline = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Highlight = styled.span`
  color: #FFD700;
  font-weight: 700;
`;

const BodyText = styled.p`
  font-size: 1.2rem;
  opacity: 0.85;
  line-height: 1.6;
  margin-bottom: 2.5rem;

  .mobile-only {
    display: none;
  }

  @media (max-width: 1024px) {
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.05rem;
    .mobile-only {
      display: inline;
    }
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background: white;
  color: ${({ theme }) => theme.primaryDark || '#2D5BFF'};
  font-size: 1rem;
  font-weight: 600;
  padding: 14px 36px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: #f2f2f2;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 12px 32px;
  }
`;

const ImageContent = styled.div`
  flex: 1;
  max-width: 500px;
  height: 400px;
  background-image: url('/img/service/check.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transform: perspective(1000px) rotateY(-4deg);
  transition: transform 0.4s ease;

  &:hover {
    transform: perspective(1000px) rotateY(0deg);
  }

  @media (max-width: 1200px) {
    max-width: 400px;
    height: 320px;
  }

  @media (max-width: 1024px) {
    max-width: 360px;
    height: 280px;
    transform: none;
    
    &:hover {
      transform: none;
    }
  }

  @media (max-width: 768px) {
    max-width: 300px;
    height: 240px;
  }
`;

export default LastChanceSection;
