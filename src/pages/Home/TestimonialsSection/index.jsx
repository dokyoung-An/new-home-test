import React, { useEffect, useRef } from 'react';
import { Container } from '../../../styles/common';
import {
  Testimonials,
  SectionContainer,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  HighlightText,
  TestimonialContainer,
  TestimonialSlider,
  TestimonialSliderTrack,
  TestimonialCard,
  Stars,
  StarIcon,
  CardTitle,
  CardText
} from './style';

const TestimonialsSection = () => {
  const sliderRef = useRef(null);
  const sliderTrackRef = useRef(null);
  
  const testimonials = [
    {
      id: 1,
      title: '원상복구 분쟁 없이 퇴거완료',
      content: `“VR 덕분에 입주 전 상태를 그대로 증명할 수 있었어요”
이전에는 퇴거 시 벽지나 바닥 흠집을 두고 말다툼이 많았는데, 랜하우스로 입주 전 VR 촬영을 해두니 퇴거할 때 딱 비교해서 보여줄 수 있었어요.
관리실에서도 “이건 확실하네요” 하고 공제 없이 마무리! 정말 스트레스 줄었습니다.`,
      stars: 5
    },
    {
      id: 2,
      title: ' 직접 안 가도, 집 구조가 다 보이네요',
      content: `“VR로 둘러보고 관심 있는 집만 보러 가니 훨씬 효율적이에요”
지방에 있다 보니 서울 매물 볼 때마다 일정 맞추기 힘들었는데, 랜하우스에서 VR로 집 구조를 정확히 볼 수 있어서 이건 아닌 집은 거르고, 괜찮은 집만 임장 갔어요.
발품 덜 팔고 더 빠르게 계약했습니다.`,
      stars: 5
    },
    {
      id: 3,
      title: '입주할 때 찍어둔 VR이 확실한 증거',
      content: `“임대해줄 때 이런 하자 없다고 할 때 VR 보여줬죠”
입주하기 전 상태를 랜하우스로 찍어놨었거든요.
나중에 집주인이 "이건 왜 이렇게 더러워졌냐"고 할 때 VR 보여주니 말이 쏙 들어가더라고요.
감정 싸움 없이 깔끔하게 정산할 수 있었습니다.`,
      stars: 5
    },
    {
      id: 4,
      title: '중개 효율이 진짜 달라졌어요',
      content: `“VR 먼저 보여주고 나면, 진짜 계약할 사람만 임장 와요”
전에는 무조건 보여주고 봐야 하니 시간 낭비가 심했어요.
랜하우스로 VR 영상 먼저 보내주면, 고객이 미리 본 다음 마음에 드는 매물만 보자고 하니까 훨씬 빠르게 계약으로 이어집니다.
중개사 입장에선 정말 효율적인 시스템이에요.`,
      stars: 5
    }
  ];
  
  // 무한 슬라이드 구현을 위해 카드 복제
  const allCards = [...testimonials, ...testimonials, ...testimonials];
  
  // 무한 슬라이드 애니메이션
  useEffect(() => {
    if (!sliderTrackRef.current) return;
    
    const infiniteScroll = () => {
      // CSS 애니메이션 제거
      sliderTrackRef.current.style.transition = 'none';
      sliderTrackRef.current.style.transform = 'translateX(0)';
      
      // 애니메이션 시작 - 끝으로 이동
      setTimeout(() => {
        sliderTrackRef.current.style.transition = 'transform 30s linear';
        sliderTrackRef.current.style.transform = `translateX(-50%)`;
      }, 50);
    };
    
    // 초기 애니메이션 시작
    sliderTrackRef.current.style.transition = 'transform 30s linear';
    sliderTrackRef.current.style.transform = `translateX(-50%)`;
    
    // 애니메이션이 끝난 후 다시 시작
    const transitionEndHandler = () => {
      infiniteScroll();
    };
    
    sliderTrackRef.current.addEventListener('transitionend', transitionEndHandler);
    
    return () => {
      if (sliderTrackRef.current) {
        sliderTrackRef.current.removeEventListener('transitionend', transitionEndHandler);
      }
    };
  }, []);

  return (
    <Testimonials id="testimonials">
      {/* 배경 효과 요소 */}
      <div className="glow-particle1"></div>
      <div className="glow-particle2"></div>
      <div className="glow-particle3"></div>
      
      <Container>
        <SectionContainer>
          <SectionHeader>
            <SectionSubtitle>고객 후기</SectionSubtitle>
            <SectionTitle>랜하우스</SectionTitle>
            <HighlightText>고객님들의 후기</HighlightText>
            <p>
              방문은 줄이고, 분쟁은 막고, 기록은 남겼습니다.<br/>
              고객이 말하는 랜하우스의 진짜 가치, 지금 만나보세요.
            </p>
          </SectionHeader>
          
          <TestimonialContainer>
            <TestimonialSlider ref={sliderRef}>
              <TestimonialSliderTrack ref={sliderTrackRef}>
                {allCards.map((testimonial, index) => (
                  <TestimonialCard key={`${testimonial.id}-${index}`}>
                    <div className="company">
                      <Stars>
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <StarIcon key={i}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                          </StarIcon>
                        ))}
                      </Stars>
                    </div>
                    <CardTitle>{testimonial.title}</CardTitle>
                    <CardText>{testimonial.content}</CardText>
                  </TestimonialCard>
                ))}
              </TestimonialSliderTrack>
            </TestimonialSlider>
          </TestimonialContainer>
        </SectionContainer>
      </Container>
    </Testimonials>
  );
};

export default TestimonialsSection; 