import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

// 재사용 가능한 배너 컴포넌트
const BannerItem = ({ 
  topText, 
  mainTitle, 
  highlightText, 
  description, 
  imageSrc, 
  imageAlt, 
  variant = 'primary',
  imageSize = 'normal',
  linkPath = '/contact',
  buttonText = '문의하기'
}) => {
  const handleContactClick = () => {
    window.location.href = linkPath;
  };

  return (
    <>
    <BannerWrapper>
    <Container variant={variant}>
      <Content>
        <TextSection>
          <TopText>{topText}</TopText>
          <MainTitle variant={variant}>
            {mainTitle} <span>{highlightText}</span>
          </MainTitle>
          <Description>{description}</Description>
          <ContactButton onClick={handleContactClick}>
            {buttonText}
          </ContactButton>
        </TextSection>
        
        <ImageSection imageSize={imageSize}>
          <CharacterImage 
            src={imageSrc} 
            alt={imageAlt}
            imageSize={imageSize}
          />
        </ImageSection>
      </Content>
    </Container>
   
    </BannerWrapper>
  
     </>
  );
};

const GroupBuyBanner = () => {
  return (
    <>
      <BannerItem 
        topText="함께하는 더 커지는 혜택!"
        mainTitle="우리 아파트"
        highlightText="공동구매"
        description={`이웃과 함께하면 더욱 저렴한 점검이 가능합니다.
더 많이 모일수록 할인이 점점 커집니다.`}
        imageSrc="/img/price/buy.png"
        imageAlt="공동구매 캐릭터"
        variant="primary"
        imageSize="normal"
        linkPath="/group-buy"
        buttonText="공동구매 신청"
      />
      
      <BannerItem 
        topText="지금 참여하면 더 큰 혜택!"
        mainTitle="하방"
        highlightText="점검 EVENT"
        description="참여하면 더 큰 할인 혜택이 기다립니다!"
        imageSrc="/img/price/events.png"
        imageAlt="이벤트 캐릭터"
        variant="secondary"
        imageSize="large"
        linkPath="/event"
        buttonText="이벤트 참여"
      />
    </>
  );
};

const BannerWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 120px;
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
`;




const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 60px 100px;
  border-radius: 20px;

  background: ${({ variant }) => 
    variant === 'primary' 
      ? 'linear-gradient(135deg, #5d8cf1 0%, #9fb7ed 100%)' 
      : 'linear-gradient(135deg, #a58cfd 0%, #caabef 100%)'
  };
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-out;
  margin-bottom: ${({ variant }) => 
    variant === 'primary' ? '40px' : '80px'
  };

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
   
  }
`;


const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const TextSection = styled.div`
  flex: 1;
  max-width: 600px;
  color: #333;


  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const TopText = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
  opacity: 0.9;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;

  span{
    color: ${({ variant }) => variant === 'secondary' ? '#7710f4' : '#1d60f1'};
  }

  @media (max-width: 1200px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;


const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
  white-space: pre-line;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    br {
      display: none;
    }
  }
`;

const ContactButton = styled.button`
  background: #1a6dff;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 400;
  padding: 12px 43px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
 

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
    background: #f8f9fa;
    color: #1a6dff;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  max-width: ${({ imageSize }) => imageSize === 'large' ? '320px' : '260px'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right:  ${({ imageSize }) => imageSize === 'large' ? '20px' : '60px'};
  transform: translateY(${({ imageSize }) => imageSize === 'large' ? '20px' : '50px'});

  @media (max-width: 1024px) {
    max-width: 400px;
    margin-right: 0;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    max-width: ${({ imageSize }) => imageSize === 'large' ? '220px' : '160px'};
    margin-top:20px;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: auto;
  max-width: ${({ imageSize }) => {
    switch(imageSize) {
      case 'large': return '450px';
      case 'small': return '300px';
      default: return '400px';
    }
  }};
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
  animation: bounce 3s ease-in-out infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 768px) {
    max-width: 250px;
  }
`;

export default GroupBuyBanner;
