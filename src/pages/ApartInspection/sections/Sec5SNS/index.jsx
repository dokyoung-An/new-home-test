import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';
import { keyframes } from 'styled-components';


const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const snsImages = [
  {
    thumbnail: '/img/haja/rayser.png',
    full: '/img/video/rayser.mp4',
    description: '바닥 기울어짐'
  },
  {
    thumbnail: '/img/video/nusu2.png',
    full: '/img/video/7.mp4',
    description: '욕실 천정 누수'
  },
  {
    thumbnail: '/img/video/chang.png',
    full: '/img/video/13.mp4',
    description: '창문 개폐 시 소음발생'
  },
  {
    thumbnail: '/img/video/gyelro.png',
    full: '/img/video/8.mp4',
    description: '결로 하자'
  },
  {
    thumbnail: '/img/video/bal.png',
    full: '/img/video/11.mp4',
    description: '바닥 들뜸'
  },
  {
    thumbnail: '/img/video/jam.png',
    full: '/img/video/3.mp4',
    description: '잠금장치 불량'
  }
];

const Sec5SNS = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Container>
      <Content>
        <TitleBlock>
          <SubTitle>INSPECTION CASES</SubTitle>
          <Title>하자 점검 사례</Title>
          <Description>
            하방이 발견한 다양한 하자 사례를 소개합니다.<br />
            신축아파트 하자 사례를 직접 확인해 보세요.
          </Description>
        </TitleBlock>
        
        <ImageGrid>
          {snsImages.map((image, index) => (
            <ImageItem key={index} onClick={() => setSelectedImage(image)}>
              <Thumbnail src={image.thumbnail} alt={image.description} />
              <ThumbnailOverlay>
  <ThumbnailText> {image.description}</ThumbnailText>
</ThumbnailOverlay>
            </ImageItem>
          ))}
        </ImageGrid>
      </Content>

      {selectedImage && (
  <Modal onClick={() => setSelectedImage(null)}>
    <ModalContent onClick={e => e.stopPropagation()}>
      {selectedImage.full.endsWith('.mp4') ? (
        <ModalVideo
          src={selectedImage.full}
          controls
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <ModalImage
          src={selectedImage.full}
          alt={selectedImage.description}
        />
      )}
      <ModalDescription>{selectedImage.description}</ModalDescription>
      <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
    </ModalContent>
  </Modal>
)}

    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background: linear-gradient(to right Top, rgba(255, 255, 255,0.4), rgba(26, 109, 255,0.15));  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  animation: ${fadeIn} 1s ease-out;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const TitleBlock = styled.div`
  text-align: center;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    margin-bottom: 60px;
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
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    br {
      display: none;
    }
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  transform: translateY(20%);
  transition: all 0.4s ease;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ImageItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  cursor: pointer;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    
    ${Thumbnail} {
      transform: scale(1.1);
    }

    ${ThumbnailOverlay} {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    &:hover {
      transform: none;
    }
  }
`;




const ThumbnailText = styled.span`
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  word-break: keep-all;

  @media (max-width: 768px) {
    animation: ${pulse} 1.8s ease-in-out infinite;
  }

`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 40px;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90vh;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
`;

const ModalDescription = styled.p`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -40px;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    top: -50px;
    right: 0;
  }
`;

const ModalVideo = styled.video`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  background: black;
`;

export default Sec5SNS; 