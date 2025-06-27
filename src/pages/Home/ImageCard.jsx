// InfiniteCarouselCards.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const SlideWrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  background: #e8f1ff;
  padding: 100px 0 50px 0;
`;

const SlideTrack = styled.div`
  display: flex;
  transition: ${({ $transition }) => $transition ? 'transform 0.5s ease-in-out' : 'none'};
  transform: translateX(${({ translateX }) => translateX}%);
`;

const Slide = styled.div`
  min-width: 20%;
  padding: 1rem;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 1024px) {
    min-width: 33.333%;
  }

  @media (max-width: 768px) {
    min-width: 50%;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    padding: 0.5rem;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease-in-out;
  transform: translateY(${({ offsetY }) => offsetY || 0}px) 
    scale(${({ $isCenter, $isMobile }) => ($isCenter && $isMobile) ? 1 : 0.9});
  opacity: ${({ $isCenter, $isMobile }) => ($isCenter && $isMobile) ? 1 : 0.7};

  @media (max-width: 480px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;

const Title = styled.h4`
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: #333;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Navigator = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#1a6dff' : '#ccc')};
  border: none;
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#1a6dff' : '#999')};
  }

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
    margin: 0 3px;
  }
`;

const data = [
  {
    img: '/img/haja/1.jpg',
    title: '바닥 들뜸',
    desc: '마루 바닥 일부가 들떠 있어 재시공 필요.',
    offsetY: 0,
  },
  {
    img: '/img/haja/2.jpg',
    title: '가구 파손',
    desc: '신발장 내부 선반 파손.',
    offsetY: -10,
  },
  {
    img: '/img/haja/3.jpg',
    title: '스위치 작동불량',
    desc: 'IOT 시스템 전등스위치 작동 불량.',
    offsetY: 10,
  },
  {
    img: '/img/haja/4.jpg',
    title: '코킹 마감 미시공',
    desc: '아트월 타일 코킹 마감 미시공.',
    offsetY: -5,
  },
  {
    img: '/img/haja/5.jpg',
    title: '콘센트 커버 미고정',
    desc: '콘센트 커버 미고정으로 흔들림.',
    offsetY: 15,
  },
  {
    img: '/img/haja/6.jpg',
    title: '벽지 울음',
    desc: '벽지 울음으로 주름 발생.',
    offsetY: 0,
  },
  {
    img: '/img/haja/7.jpg',
    title: '세면대 하부 이음새 마감 미시공공',
    desc: '세면대 하부 코킹 미시공으로 누수 발생.',
    offsetY: -10,
  },
  {
    img: '/img/haja/8.jpg',
    title: '도장 오염',
    desc: '도장 오염으로 벽면 미관상 하자 발생.',
    offsetY: 10,
  },
  {
    img: '/img/haja/11.jpg',
    title: '창문 소음 및 개폐 간섭',
    desc: '창문 소음발생 및 개폐불량으로 주거 환경 불편.',
    offsetY: -5,
  },
  {
    img: '/img/haja/12.jpg',
    title: '거울장 고정 불량',
    desc: '거울장 고정 불량으로 안전상 위험 발생.',
    offsetY: 15,
  },
  {
    img: '/img/haja/17.jpg',
    title: '서랍장 간섭 발생',
    desc: '서랍장 간섭 발생으로 주거 환경 불편.',
    offsetY: 15,
  },
  {
    img: '/img/haja/26.jpg',
    title: '바닥 물고임',
    desc: '바닥 물고임으로 주거 환경 불편.',
    offsetY: 15,
  },
  {
    img: '/img/haja/30.jpg',
    title: '타일 들뜸',
    desc: '타일 들뜸으로 파손 가능성 발생.',
    offsetY: 15,
  },
    {
      img: '/img/haja/31.jpg',
      title: '천정 누수',
      desc: '천정 누수로 감전 및 악취 발생 위험 증가',
      offsetY: 15,
    },
    {
      img: '/img/haja/34.jpg',
      title: '오토씰 작동불량',
      desc: '오토씰 작동불량으로 기능 불량 발생.',
      offsetY: 15,
    },
  
];

const repeatCount = 3;
const newData = Array(repeatCount).fill(data).flat();
const originalLength = data.length;
const totalLength = newData.length;
const initialIndex = originalLength; // 중앙에서 시작

const InfiniteCarouselCards = () => {
  const [index, setIndex] = useState(initialIndex);
  const [transition, setTransition] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex(prev => prev + 1);
      setTransition(true);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (index === totalLength - originalLength) {
      setTimeout(() => {
        setTransition(false);
        setIndex(originalLength);
      }, 500);
    }
    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(totalLength - 2 * originalLength);
      }, 500);
    }
  }, [index]);

  const handleDotClick = (idx) => {
    setIndex(idx + originalLength);
    setTransition(true);
    clearInterval(intervalRef.current);
  };

  const getSlideWidth = () => {
    if (window.innerWidth <= 480) return 100;
    if (window.innerWidth <= 768) return 50;
    if (window.innerWidth <= 1024) return 33.333;
    return 20;
  };

  return (
    <SlideWrapper>
      <SlideTrack
        $transition={transition}
        translateX={-index * getSlideWidth()}
      >
        {newData.map((item, i) => (
          <Slide key={i}>
            <Card 
              offsetY={item.offsetY}
              $isCenter={i === index}
              $isMobile={isMobile}
            >
              <Image src={item.img} alt={item.title} />
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
            </Card>
          </Slide>
        ))}
      </SlideTrack>
      <Navigator>
        {data.map((_, i) => (
          <Dot 
            key={i} 
            active={i + originalLength === index} 
            onClick={() => handleDotClick(i)} 
          />
        ))}
      </Navigator>
    </SlideWrapper>
  );
};

export default InfiniteCarouselCards;