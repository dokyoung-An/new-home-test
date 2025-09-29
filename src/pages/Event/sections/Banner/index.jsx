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
  buttonText = '문의하기',
  kakaoText = '카카오톡 상담'
}) => {
    const handlePhoneClick = () => {
        const phoneNumber = '1566-2384';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          window.location.href = `tel:${phoneNumber.replace(/-/g, '')}`;
        } else {
          alert(`대표번호: ${phoneNumber}`);
        }
      };
      const handleKakaoChannel = () => {
        window.open(' http://pf.kakao.com/_hIxdss/chat', '_blank');
      };

  return (
    <BannerWrapper>
    <Container variant={variant}>
      <Content>
        <TextSection>
        
          <MainTitle variant={variant}>
            {mainTitle} 
          </MainTitle>
          <Description>{description}</Description>
          <Wrapper>
          <ContactButton onClick={handlePhoneClick}>
            {buttonText}
          </ContactButton>
          <ContactButton onClick={handleKakaoChannel} className='kakao-button'>
            {kakaoText}
          </ContactButton>
          </Wrapper>
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
  );
};

const GroupBuyBanner = () => {
  return (
    <>
      <BannerItem 
        mainTitle="궁금한 점이 있으시면 하방으로 연락주세요."
    
        description={`고객센터 운영시간 
            : 평일 오전 9시~ 오후 6시, 점심시간 오전 12시~ 오후 1시`}
        imageSrc="/img/price/phone2.png"
        imageAlt="공동구매 캐릭터"
        variant="primary"
        imageSize="normal"
        linkPath="/group-buy"
        buttonText="1566 - 2384"
        kakaoText="카카오톡 상담"
      />
    </>
  );
};

const BannerWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 120px;
  margin-bottom: 140px;

  @media (max-width: 1024px) {
    padding: 0 40px;
    margin-bottom: 100px;
  }
`;


const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 40px 100px;
  border-radius: 20px;
  background: ${({ variant }) => 
    variant === 'primary' 
      ? 'linear-gradient(135deg, #9dbbfd 0%, #9fb7ed 100%)' 
      : 'linear-gradient(135deg, #dad0fc 0%, #caabef 100%)'
  };
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-out;
  margin-bottom: ${({ variant }) => 
    variant === 'primary' ? '40px' : '80px'
  };


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



const MainTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
  word-break: keep-all;
  
  span{
    color: ${({ variant }) => variant === 'secondary' ? '#7710f4' : '#1d60f1'};
  }

  @media (max-width: 1200px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;


const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
  white-space: pre-line;
  word-break: keep-all;
  font-weight: 500;
  padding-left: 20px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    br {
      display: none;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ContactButton = styled.button`
  background: #1a6dff;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 12px 43px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &.kakao-button {
    background: #FEE500;
    color: #000;
  }

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
  max-width: ${({ imageSize }) => imageSize === 'large' ? '320px' : '240px'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform: translateY(20px);

  @media (max-width: 1024px) {
    max-width: 400px;
    margin-right: 0;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    max-width:160px;
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
