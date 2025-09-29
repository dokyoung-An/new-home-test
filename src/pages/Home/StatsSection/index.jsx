import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../../styles/common';
import {
  StatsContainer,
  StatsContent,
  StatsTitle,
  StatsGrid,
  StatItem,
  StatNumber,
  StatLabel,
  StatDescription
} from './style';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    satisfaction: 0,
    inspections: 0
  });
  const sectionRef = useRef(null);

  // 카운트 애니메이션 함수
  const animateCount = (target, key, duration = 2000) => {
    const start = 0;
    const startTime = Date.now();
    
    const updateCount = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOut 애니메이션 커브
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + (target - start) * easeOut);
      
      setCounts(prev => ({ ...prev, [key]: currentValue }));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  // Intersection Observer로 화면에 보일 때 애니메이션 시작
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          // 약간의 지연을 두고 애니메이션 시작
          setTimeout(() => {
            animateCount(568, 'satisfaction', 2500);
          }, 300);
          
          setTimeout(() => {
            animateCount(20284, 'inspections', 2800);
          }, 600);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <StatsContainer ref={sectionRef}>
      <Container>
        <StatsContent>
          <StatsTitle>
            전문가가 알아보는 하자. 사전점검은 전문가 대행이 필요합니다.
          </StatsTitle>
          
          <StatsGrid>
            <StatItem>
              <StatNumber>
                하방의 점검한 단지 <span>{counts.satisfaction.toLocaleString()}개 +</span>
              </StatNumber>
              <StatLabel>
                하방에서 점검한 세대수 <span>{counts.inspections.toLocaleString()}세대+</span>
              </StatLabel>
            </StatItem>
          </StatsGrid>
          
          <StatDescription>
            시간이 만든 전문성.<br/>
            하방은 7년을 축적해왔습니다.
          </StatDescription>
        </StatsContent>
      </Container>
    </StatsContainer>
  );
};

export default StatsSection;
