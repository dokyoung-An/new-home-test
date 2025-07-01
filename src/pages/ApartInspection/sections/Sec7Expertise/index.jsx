import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const expertiseData = [
  {
    id: 1,
    image: '/img/service/001.png',
    title: '열화상 카메라 점검',
    description: '전문 장비를 활용한 정밀 하자 점검'
  },
  {
    id: 2,
    image: '/img/service/002.png',
    title: '전문가 교육 현장',
    description: '체계적인 교육을 통한 전문성 강화'
  },
  {
    id: 3,
    image: '/img/service/003.png',
    title: '하자 부위 기록',
    description: '꼼꼼한 현장 기록과 문서화'
  },
  {
    id: 4,
    image: '/img/service/004.png',
    title: '현장 출동 차량',
    description: '신속한 현장 대응 시스템'
  },
  {
    id: 5,
    image: '/img/service/005.png',
    title: '정밀 장비 점검',
    description: '수평계와 습도계를 통한 정확한 측정'
  }
];

const Sec7Expertise = () => {
  return (
    <Container>
      <CardStrip>
        {expertiseData.map((item) => (
          <Card
            key={item.id}
            whileHover="hover"
            initial="initial"
            variants={{
              initial: { filter: 'grayscale(0.2)' },
              hover: { filter: 'grayscale(0)', scale: 1.05 }
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <ImageWrapper>
              <CardImage src={item.image} alt={item.title} />
              <Overlay
                variants={{
                  initial: { opacity: 0, y: 20 },
                  hover: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <TextContent>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </TextContent>
              </Overlay>
            </ImageWrapper>
          </Card>
        ))}
      </CardStrip>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  margin: 120px 0;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
`;

const CardStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 40%,
      rgba(0, 0, 0, 0.4) 65%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;
    opacity: 0.7;
    transition: opacity 0.4s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: center;
  transition: transform 0.4s ease;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 25px;
`;

const TextContent = styled.div`
  transform-origin: bottom left;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
`;

export default Sec7Expertise; 