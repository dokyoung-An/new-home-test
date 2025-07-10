import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';
import { keyframes } from 'styled-components';
import { MdOutlinePhotoCamera } from 'react-icons/md';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;


const snsImages = [
  {
    thumbnail: '/img/video/boil.png',
    full: '/img/video/5.mp4',
    description: '보일러 연결 미흡'
  },
  {
    thumbnail: '/img/video/nusu.png',
    full: '/img/video/6.mp4',
    description: '욕실 천정 누수'
  },
  {
    thumbnail: '/img/video/gyelro2.jpg',
    full: '/img/video/gyelro2.jpg',
    description: '창문 결로'
  },
  {
    thumbnail: '/img/video/14.jpg',
    full: '/img/video/13.jpg',
    description: '변기 수전 결로'
  },
  {
    thumbnail: '/img/haja/47.jpg',
    full: '/img/haja/47.jpg',
    description: ' 거실창 유리 굴절'
  },
  {
    thumbnail: '/img/haja/34.jpg',
    full: '/img/haja/34.jpg',
    description: '오토씰 작동불량'
  }
];

const Sec5SNS = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Container>
      <Content>
        <TitleBlock>
          <DividerIcon>
            <MdOutlinePhotoCamera />
          </DividerIcon>
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
                <ThumbnailText>{image.description}</ThumbnailText>
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
  background: linear-gradient(180deg, #F5F7FF 0%, rgba(245, 247, 255, 0.5) 100%);
  @media (max-width: 768px) {
    padding: 60px 20px 0 20px;
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

const DividerIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 50px;
    height: 1px;
    background-color: #ddd;
    
    @media (max-width: 768px) {
      width: 30px;
    }
  }
  
  &::before {
    right: calc(50% + 30px);
  }
  
  &::after {
    left: calc(50% + 30px);
  }
  
  svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.primaryDark};
  }
  
  @media (max-width: 768px) {
    svg {
      font-size: 1.8rem;
    }
  }
`;

const Title = styled.h2`
 
  font-size: 3rem;
  font-weight: 800;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(20%);
  transition: all 0.4s ease;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    opacity: 1;
    transform: translateY(0);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
  }
`;

const ImageItem = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 비율 */
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    
    ${Thumbnail} {
      transform: scale(1.05);
    }

    ${ThumbnailOverlay} {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    &:hover {
      transform: none;
      
      ${Thumbnail} {
        transform: none;
      }
    }
  }
`;

const ThumbnailText = styled.span`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  word-break: keep-all;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1rem;
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