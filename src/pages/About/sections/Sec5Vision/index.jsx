import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const visionData = [
  {
    icon: '/img/icons/Calling.svg',
    title: '고객 신뢰',
    description: '정직과 신뢰를 바탕으로 고객의 입장에서 생각하고, 최상의 서비스를 제공하여 고객 만족을 실현합니다.',
  },
  {
    icon: '/img/icons/Laptop.svg',
    title: '전문성',
    description: '20년 이상의 전문 경력을 바탕으로 정확하고 철저한 하자 점검 서비스를 제공합니다.',
  },
  {
    icon: '/img/icons/Camera.svg',
    title: '혁신',
    description: 'VR 촬영과 AI 기술을 활용한 하자 점검으로 업계의 새로운 기준을 제시합니다.',
  }
];

const Sec5Vision = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Container ref={sectionRef}>
      <Content>
        <Title>하방의 비전</Title>
        <Subtitle>고객의 자산가치 향상을 위한 하방의 약속</Subtitle>
        <CardGrid>
          {visionData.map((item, index) => (
            <Card key={index} $isVisible={isVisible} $delay={index * 0.2}>
              <IconWrapper>
                <Icon src={item.icon} alt={item.title} />
              </IconWrapper>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </CardGrid>
      </Content>
    </Container>
  );
};

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 80px;
  color: ${({ theme }) => theme.textLight};
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 60px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;
  opacity: 0;
  animation: ${slideUp} 0.8s ease-out forwards;
  animation-delay: ${props => props.$delay}s;
  animation-play-state: ${props => props.$isVisible ? 'running' : 'paused'};
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const IconWrapper = styled.div`
  width: 110px;
  height: 110px;
  margin: 0 auto 25px;
  background: ${({ theme }) => `${theme.primaryLight}20`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${Card}:hover & {
    background: ${({ theme }) => theme.primary};
    transform: scale(1.05);
  }
`;

const Icon = styled.img`
  width: 45px;
  height: 45px;
  filter: ${({ theme }) => `brightness(0) invert(40%) sepia(80%) saturate(1500%) hue-rotate(230deg) brightness(95%)`};
  transition: all 0.3s ease;
  opacity: 0.9;

  ${Card}:hover & {
    filter: brightness(0) invert(1);
    opacity: 1;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.primary};
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  word-break: keep-all;
`;

export default Sec5Vision; 