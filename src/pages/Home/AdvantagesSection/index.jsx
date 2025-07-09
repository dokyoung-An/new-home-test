import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AdvantagesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const advantages = [
    {
      subtitle: "EXPERT",
      title: "검증된 전문가",
      description: "10년 이상의 경력을 가진 전문가들이 함께합니다",
      image: "/img/bestpoint/1.png",
    },
    {
      subtitle: "TRAINING",
      title: "하자 전문가 양성 프로그램",
      description: "분기별 하자 점검 교육 & 전문가 양성 프로그램",
      image: "/img/bestpoint/2.jpeg",
    },
    {
      subtitle: "SYSTEM",
      title: "체계적인 점검 시스템",
      description: "철저한 매뉴얼로 꼼꼼하게 점검합니다",
      image: "/img/bestpoint/7.jpeg",
    },
    {
      subtitle: "SATISFACTION",
      title: "고객 만족도 100%",
      description: "믿고 함께 맞기는 파트너. 박람회 주관사 협업",
      image: "/img/bestpoint/4.jpg",
    },
    {
      subtitle: "TECHNOLOGY",
      title: "끊임없는 기술 개발",
      description: "끊임없는 기술 개발로 최적의 서비스를 제공합니다",
      image: "/img/bestpoint/vr2.png",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % advantages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      {advantages.map((advantage, index) => (
        <Slide key={index} active={index === currentSlide}>
          <BackgroundImage src={advantage.image} alt={advantage.title} />
          <Overlay />
          <ContentWrapper>
            <Content>
              <TextContent>
                <Subtitle>{advantage.subtitle}</Subtitle>
                <Title>{advantage.title}</Title>
                <Description>{advantage.description}</Description>
              </TextContent>
              <StyledLink to="/inspection">
                서비스 상세 확인
                <ArrowIcon />
              </StyledLink>
            </Content>
          </ContentWrapper>
        </Slide>
      ))}
      <Indicators>
        {advantages.map((_, index) => (
          <Indicator 
            key={index} 
            active={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Indicators>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 0.8s ease-in-out;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05);
  transition: transform 8s ease-out;
  ${Slide}[active="true"] & {
    transform: scale(1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContent = styled.div`
  color: #FFF;
  max-width: 600px;
`;

const Subtitle = styled.span`
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primaryLight || '#1557cc'};
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 0.9;
  font-weight: 300;
  letter-spacing: -0.01em;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #FFF;
  text-decoration: none;
  font-weight: 400;
  font-size: 1.1rem;
  padding: 12px 0;
  position: relative;
  transition: all 0.3s ease;
  position: absolute;
  bottom: 18%;
  right: 20%;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #FFF;
    transition: width 0.3s ease;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    svg {
      transform: translateX(5px);
    }
    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 2;
`;

const Indicator = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#FFF' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: #FFF;
  }
`;

export default AdvantagesSection; 