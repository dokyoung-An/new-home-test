import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const stats = [
  {
    number: 2017,
    label: '설립연도',
    suffix: '년',
    width: '250px'
  },
  {
    number: 20,
    label: '전문가 경력',
    suffix: '년+',
    width: '200px'
  },
  {
    number: 19067,
    label: '누적 점검 세대',
    suffix: '세대+',
    width: '350px',
    useComma: true
  },
  {
    number: 98,
    label: '고객 만족도',
    suffix: '%',
    width: '150px'
  }
];

const easeOutQuad = t => t * (2 - t);

const AnimatedNumber = ({ number, suffix, useComma, isVisible }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    const duration = 2000; // 2초
    const startTime = Date.now();
    const startValue = 0;
    const endValue = number;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = easeOutQuad(progress);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeProgress);

      if (countRef.current !== currentCount) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(updateCount);
      }
    };

    frameRef.current = requestAnimationFrame(updateCount);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isVisible, number]);

  return (
    <Number>
      {useComma ? count.toLocaleString() : count}<Suffix>{suffix}</Suffix>
    </Number>
  );
};

const Sec4History = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
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
        <Title>하방의 발자취</Title>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatBox key={index} width={stat.width}>
              <AnimatedNumber 
                number={stat.number} 
                suffix={stat.suffix}
                useComma={stat.useComma}
                isVisible={isVisible}
              />
              <Label>{stat.label}</Label>
            </StatBox>
          ))}
        </StatsGrid>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('/public/img/bg4.png') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  color: white;
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
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 60px;
  }
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 30px;
  }
`;

const StatBox = styled.div`
  text-align: center;
  padding: 20px;
  width: ${props => props.width || '150px'};
  
  @media (max-width: 768px) {
    width: 40%;
    
    &:nth-child(3),
    &:nth-child(4) {
      margin-top: 20px;
    }
  }
  
  @media (max-width: 480px) {
    width: 100%;
    margin-top: 20px !important;
    
    &:first-child {
      margin-top: 0;
    }
  }
`;

const Number = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.primaryLight};
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Suffix = styled.span`
  font-size: 2rem;
  margin-left: 4px;
`;

const Label = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export default Sec4History; 