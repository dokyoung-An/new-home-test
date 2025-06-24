import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../../styles/common';
import {
  Benefits,
  SectionContainer,
  SectionTitle,
  SectionSubtitle,
  BenefitsMent,
  StatsContainer,
  StatBox,
  StatTitle,
  StatBoxContent,
  PlusSign,
  StatNumber,
  Unit,
  StatIcon
} from './style';

const BenefitsSection = () => {
  // 목표 숫자
  const targetStats = {
    cost: 30,
    time: 70,
    rate: 98,
    satisfaction: 80,
  };

  // 현재 숫자 상태 - 초기값은 0
  const [stats, setStats] = useState({
    cost: 0,
    time: 0,
    rate: 0,
    satisfaction: 0,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  
  // IntersectionObserver로 섹션이 화면에 들어왔을 때 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      }, 
      { 
        threshold: 0.25,
        rootMargin: '-50px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  // 카운팅 애니메이션
  useEffect(() => {
    if (!isVisible) {
      // 화면에서 벗어났을 때 숫자 초기화
      setStats({
        cost: 0,
        time: 0,
        rate: 0,
        satisfaction: 0,
      });
      return;
    }

    const duration = 2000; // 총 지속 시간 2초
    const fps = 30;        // 초당 프레임 수
    const totalSteps = Math.floor(duration / (1000 / fps));
    let currentStep = 0;
  
    const easeOutQuad = (t) => t * (2 - t); // 부드러운 효과

    // 이전 애니메이션이 있다면 정리
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
  
    animationRef.current = setInterval(() => {
      currentStep++;
      const progress = easeOutQuad(currentStep / totalSteps);
  
      setStats({
        cost: Math.round(targetStats.cost * progress),
        time: Math.round(targetStats.time * progress),
        rate: Math.round(targetStats.rate * progress),
        satisfaction: Math.round(targetStats.satisfaction * progress),
      });
  
      if (currentStep >= totalSteps) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    }, 1000 / fps);
  
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isVisible]);
  
  
  
  return (
    <section id="BenefitsSection">
      <Benefits ref={sectionRef}>
        <Container>
          <SectionContainer>
            <SectionSubtitle>하방 100% 활용하면</SectionSubtitle>
            <SectionTitle>이렇게 달라집니다!</SectionTitle>
            
            <BenefitsMent>
            <p>입주 전에 하자를 찾아 <span>입주 후 불편을 줄이고</span><br/>
            세대 상태를 VR로 기록해 <span>시공 분쟁</span>과 <span>임대 복구</span>에 대비할 수 있습니다<br/>
            임대 관리도 주기적인 <span>하자 점검</span>과 <span>기록 관리</span>로 더 체계적으로 바뀝니다<br/>
            확실한 사전점검과 스마트한 관리 하방이 해냅니다</p>
            </BenefitsMent>
            
            <StatsContainer>
            <StatBox>
                <StatIcon>
                  <img src={process.env.PUBLIC_URL + '/img/bosu.svg'} alt="계약률 상승" />
                </StatIcon>
                <StatTitle>하자보수율</StatTitle>
                <StatBoxContent>
                  <PlusSign>+</PlusSign>
                  <StatNumber>{stats.satisfaction}</StatNumber>
                  <Unit>%</Unit>
                </StatBoxContent>
              </StatBox>

              <StatBox>
                <StatIcon>
                  <img src={process.env.PUBLIC_URL + '/img/icon-time.svg'} alt="시간 단축" />
                </StatIcon>
                <StatTitle>하자점검 시간 단축</StatTitle>
                <StatBoxContent>
                  <PlusSign>-</PlusSign>
                  <StatNumber>{stats.time}</StatNumber>
                  <Unit>분</Unit>
                </StatBoxContent>
              </StatBox>

              <StatBox>
                <StatIcon>
                  <img src={process.env.PUBLIC_URL + '/img/icon-cost.svg'} alt="비용 절감" />
                </StatIcon>
                <StatTitle>임대차 분쟁 발생률 감소</StatTitle>
                <StatBoxContent>
                  <PlusSign>-</PlusSign>
                  <StatNumber>{stats.cost}</StatNumber>
                  <Unit>%</Unit>
                </StatBoxContent>
              </StatBox>
              
              
              
              <StatBox>
                <StatIcon>
                  <img src={process.env.PUBLIC_URL + '/img/icon-satisfaction.svg'} alt="고객 만족도" />
                </StatIcon>
                <StatTitle>고객 만족도</StatTitle>
                <StatBoxContent>
                  <StatNumber>{stats.rate}</StatNumber>
                  <Unit className="per">%</Unit>
                </StatBoxContent>
              </StatBox>
              
             
            </StatsContainer>
          </SectionContainer>
        </Container>
      </Benefits>
    </section>
  );
};

export default BenefitsSection; 