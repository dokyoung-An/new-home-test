import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../../styles/common';
import {
  BenefitsContainer,
  BenefitsContent,
  BenefitsTitle,
  BenefitsSubtitle,
  BenefitsGrid,
  BenefitCard,
  BenefitsSubtitle2,
  CardContent,
  CardTitle,
  CardDescription,
  
} from './style';

const BenefitsAnimationSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const benefitsData = [
    {
      id: 1,
      image: '/img/service/1.png',
      title: '필요한 정보는 빠르게',
      subtitle: '공동구매 아파트별 단톡방 지원',
      description: '30세대 이상 예약 시, 하방 전담  매니저 + 하자 팀장 배정 \n 입주 지정기간 종료일까지 실시간 안내로 불안함을 줄여드립니다.',
      imagePosition: 'left',
      delay: 0
    },
    {
      id: 2,
      image: '/img/service/2-1.png',
      title: '믿어주신 분들께 끝까지',
      subtitle: '준공 이후까지 책임지는 하자 컨설팅',
      description: '전용 단톡방에서, 하자 상담과 하자 처리대응에 관한 \n컨설팅 제공! 어려운 하자 문제도 전문가가 끝까지 함께 합니다',
      imagePosition: 'right',
      delay: 200
    },
    {
      id: 3,
      image: '/img/service/3.png',
      title: '함께할 수록 더 커지는 혜택',
      subtitle: '예약 세대에 따른 추가 혜택 제공',
      description: '지역업체의 장점을 살려 합리적이고, 세심한 혜택을 제공! \n 함께 할 수록 부담은 낮아지고 만족은 더 커집니다',
      imagePosition: 'left',
      delay: 400
    },
    {
      id: 4,
      image: '/img/service/4-1.png',
      title: '업계 최고! 360°로 만나는',
      subtitle: '우리집 VR 기록 서비스',
      description: '준공 전 우리집, 사전점검 현장을 그대로 담아 PC/모바일로 언제든 확인 가능!\n 부동산 홍보, 인테리어 공사 등에 적극 활용하세요.',
      imagePosition: 'right',
      delay: 600
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // 섹션이 화면에서 벗어나면 애니메이션 상태 리셋
          setIsInView(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <BenefitsContainer ref={sectionRef}>
      <Container>
        <BenefitsContent>
            <BenefitsSubtitle2>오직 하방에서만 만나보세요</BenefitsSubtitle2>
          <BenefitsTitle><span>경상권 전용</span> 안심 점검 혜택</BenefitsTitle>
          <BenefitsSubtitle>
            믿고 선택할 수 있는
            <br />
            전문성과 꼼꼼함을 담았습니다.
          </BenefitsSubtitle>
          
          <BenefitsGrid className={isInView ? 'animate' : ''}>
            {benefitsData.map((benefit, index) => (
              <BenefitCard
                key={benefit.id}
                imagePosition={benefit.imagePosition}
                delay={index * 200}
                className={isInView ? 'animate' : ''}
              >
                {/* PC에서는 기존 레이아웃 */}
                <div className="desktop-layout">
                  {benefit.imagePosition === 'left' ? (
                    <>
                      <div className="image-section">
                        <img src={benefit.image} alt={benefit.title} />
                      </div>
                      <CardContent>
                        <CardTitle style={{ fontSize: '14px', color: '#9bbeff'}}>{benefit.title}</CardTitle>
                        {benefit.subtitle && (
                          <CardTitle style={{ fontSize: '24px', color: '#9bbeff' }}>
                            {benefit.subtitle}
                          </CardTitle>
                        )}
                        <CardDescription>
                          {benefit.description.split('\n').map((line, idx) => (
                            <React.Fragment key={idx}>
                              {line}
                              {idx < benefit.description.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </CardDescription>
                      </CardContent>
                    </>
                  ) : (
                    <>
                      <CardContent>
                        <CardTitle style={{ fontSize: '14px', color: '#a5b3f9'}}>{benefit.title}</CardTitle>
                        {benefit.subtitle && (
                          <CardTitle style={{ fontSize: '24px', color: '#a5b3f9'}}>
                            {benefit.subtitle}
                          </CardTitle>
                        )}
                        <CardDescription>
                          {benefit.description.split('\n').map((line, idx) => (
                            <React.Fragment key={idx}>
                              {line}
                              {idx < benefit.description.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </CardDescription>
                      </CardContent>
                      <div className="image-section"> 
                          <img src={benefit.image} alt={benefit.title} />                   
                      </div>
                    </>
                  )}
                </div>
                
                {/* 모바일에서는 항상 이미지 먼저 */}
                <div className="mobile-layout">
                  <div className="image-section">
                    <img src={benefit.image} alt={benefit.title} />
                  </div>
                  <CardContent>
                    <CardTitle style={{ fontSize: '14px', color: '#9bbeff'}}>{benefit.title}</CardTitle>
                    {benefit.subtitle && (
                      <CardTitle style={{ fontSize: '24px', color: '#9bbeff' }}>
                        {benefit.subtitle}
                      </CardTitle>
                    )}
                    <CardDescription>
                      {benefit.description.split('\n').map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          {idx < benefit.description.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </CardDescription>
                  </CardContent>
                </div>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </BenefitsContent>
      </Container>
    </BenefitsContainer>
  );
};

export default BenefitsAnimationSection;
