import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const snsImages = [
  {
    thumbnail: '/img/haja/1.jpg',
    full: '/img/haja/1.jpg',
    description: '마룻바닥 들뜸'
  },
  {
    thumbnail: '/img/haja/46.jpg',
    full: '/img/haja/46.jpg',
    description: '발코니 바닥 물고임'
  },
  {
    thumbnail: '/img/haja/30.jpg',
    full: '/img/haja/30.jpg',
    description: '바닥타일 들뜸'
  },
  {
    thumbnail: '/img/haja/11.jpg',
    full: '/img/haja/4.jpg',
    description: '주방 타일 들뜸'
  },
  {
    thumbnail: '/img/haja/5.jpg',
    full: '/img/haja/5.jpg',
    description: '창호 실리콘 마감 불량'
  },
  {
    thumbnail: '/img/haja/6.jpg',
    full: '/img/haja/6.jpg',
    description: '베란다 방수 하자'
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
            숨겨진 하자도 놓치지 않고 찾아냅니다.
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
            <ModalImage src={selectedImage.full} alt={selectedImage.description} />
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
  background: linear-gradient(to bottom, #fff, #f8f9fa);
  
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
    
    img {
      transform: scale(1.1);
    }
    
    div {
      opacity: 1;
    }
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ThumbnailText = styled.span`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  padding: 0 20px;
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

export default Sec5SNS; 