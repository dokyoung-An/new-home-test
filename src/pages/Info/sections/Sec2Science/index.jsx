import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from '../../../../styles/animations';
import { PersonIcon, TimeIcon, ReportIcon, PhoneIcon } from './icons';

const images = [
  {
    src: '/img/haja/42.jpg',
    // caption: '열화상 카메라를 통한 누수 점검'
  },
  {
    src: '/img/haja/40.jpg',
    // caption: '전문 장비를 활용한 정밀 점검'
  },
  {
    src: '/img/haja/44.jpg',
    // caption: '하자 부위 상세 촬영'
  }
];

const Sec2Science = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: PersonIcon, text: '전문가 1인 현장 방문' },
    { icon: TimeIcon, text: '1시간 내외 점검' },
    { icon: ReportIcon, text: '상세 보고서 제공' },
    { icon: PhoneIcon, text: '하자 접수 진행' },
  ];

  return (
    <Container>
      <Content>
        <ImageBlock>
          <SlideContainer>
            {images.map((image, index) => (
              <SlideImage
                key={index}
                src={image.src}
                alt={image.caption}
                $isActive={index === currentImageIndex}
              />
            ))}
          </SlideContainer>
          <ImageCaption>{images[currentImageIndex].caption}</ImageCaption>
          <Indicators>
            {images.map((_, index) => (
              <Indicator
                key={index}
                $isActive={index === currentImageIndex}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </Indicators>
        </ImageBlock>
        <TextBlock>
          <SubTitle>보수가 잘됐는지 걱정되신다면 추가하세요!</SubTitle>
          <Title>
          입주 전 최종 확인<br/>
          보수 완료 여부를 점검합니다
          </Title>
          <Description>
            하자 보수 상태를 확인하는 후점검 서비스<br />
          </Description>
          <FeatureList>
            {features.map((feature, index) => (
              <Feature key={index}>
                <IconWrapper>
                  <feature.icon />
                </IconWrapper>
                <FeatureText>{feature.text}</FeatureText>
              </Feature>
            ))}
          </FeatureList>
        </TextBlock>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background: linear-gradient(to right, rgba(191, 220, 255, 0.5), rgba(227, 239, 255, 0.5));
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const TitleBox = styled.div`
  text-align: center;
  margin-bottom: 80px;
  background-color: ${({ theme }) => theme.primaryLight};
  padding: 20px 0;

  color: #222;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  animation: ${fadeIn} 1s ease-out;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 60px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const ImageBlock = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 500px;
    order: 2;
  }
`;

const ImageCaption = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
  text-align: center;
  margin-top: 15px;
`;

const TextBlock = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    order: 1;
    text-align: center;
  }
`;

const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryDark};
  margin-bottom: 20px;
  letter-spacing: 2px;


`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 30px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 40px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    br {
      display: none;
    }
  }
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    max-width: 500px;
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 12px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: white;
  opacity: 0.9;
  transition: all 0.3s ease;

  ${Feature}:hover & {
    opacity: 1;
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const FeatureText = styled.span`
  color: #222;
  font-size: 1.1rem;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.05);
  }
  20%, 80% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const SlideImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.$isActive ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  animation: ${props => props.$isActive ? fadeInOut : 'none'} 3s ease-in-out;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

const Indicator = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$isActive ? props.theme.primary : props.theme.primaryLight};
  opacity: ${props => props.$isActive ? 1 : 0.5};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    opacity: 1;
  }
`;

export default Sec2Science; 