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
      title: '입주 후 불편 없이 바로 생활 시작',
      content: `“하방 덕분에 하자를 미리 다 고쳤어요”
  지난 번 아파트에서 입주하고 나서 창문, 방문이 안 잠기고, 바닥이 기울어져 있어 진짜 스트레스였는데,
  이번엔 하방에서 사전점검을 대신해줘서 작은 하자까지 다 발견하고 미리 보수했어요.
  덕분에 바로 짐 풀고 편하게 시작할 수 있었습니다.`,
      stars: 5
    },
    {
      id: 2,
      title: '전문가가 보니까 확실히 다르네요',
      content: `“저 혼자 봤으면 절대 몰랐을 하자를 다 찾아줬어요”
  처음 입주라 뭘 봐야 할지 몰랐는데, 하방에서 레이저 장비랑 전문 장비로 꼼꼼히 점검해주더라고요.
  눈에 안 보이던 문틀 수평, 벽 마감 같은 것도 다 잡아줘서 정말 든든했어요.`,
      stars: 5
    },
    {
      id: 3,
      title: '하자 찾아 준것도 좋은데, VR이 짱이예요',
      content: `“계속 볼 수 있는 우리집 원하는 것 모두 하방에서 얻었어요”
  하자는 하방에 맡겨서 걱정 없었는데, 입주가 빠르다보니 준비를 못하는게 걱정이었어요.
  그런데 걱정 끝! 하방에서 만들어주는 VR로 인테리어 준비 확실하게 할 수 있었습니다!`,
      stars: 5
    },
    {
      id: 4,
      title: '바쁘신 분들은 무조건 맡기세요',
      content: `“시간 없어서 못 챙길 뻔했는데 대신 다 해주셨어요”
  갑자기 출장이 잡혀서 갈 수가 없었어요. 첫집인데 하자가 많으면 어쩌지 걱정도 되고, 구경도하고 싶었는데
  하방에서 대신 가서 점검하고 VR까지 보내줘 첫집 구경도 원없이 했어요.
  하자 접수도 같이 해줘서 정말 수월하게 끝났습니다. 돈 아깝지 않아요.`,
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
            <SectionTitle>사전점검대행 하방</SectionTitle>
            <HighlightText>REAL 체험 후기</HighlightText>
            <p>
              하방을 먼저 경험하신  <br/>
              진짜 고객님의 이야기를 확인해 보세요.
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