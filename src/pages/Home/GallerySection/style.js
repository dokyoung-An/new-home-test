import styled from 'styled-components';

export const GalleryContainer = styled.section`
  padding: 100px 0;
  background: #f8f9fa;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const GalleryContent = styled.div`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const GalleryTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  word-break: keep-all;
  span {
    color: #007bff;
    font-weight: 600;
    font-size: 38px;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
`;

export const GallerySubtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 60px;
  word-break: keep-all;

  br {
    display: none;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
    br {
      display: block;
    }
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

export const OverlayIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  
  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
    
    img {
      width: 60px;
      height: 60px;
    }
  }
`;

export const GalleryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
`;

export const ImageTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.48);
  color: white;
  padding: 15px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  word-break: keep-all;
  letter-spacing:0.5px;
  
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const OverlayContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 1);
  transition: opacity 0.3s ease;
   
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const OverlayTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  word-break: keep-all;
 
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;

export const OverlayDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  word-break: keep-all;
  color: #333;
  max-width: 90%;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 1.5;
  }
`;

export const GalleryItem = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
  }
  
  &:hover ${GalleryOverlay} {
    opacity: 1;
  }
  
  &:hover ${OverlayContent} {
    opacity: 0;
  }
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  overflow: hidden;
  
  ${GalleryItem}:hover & {
    transform: scale(1.01);
  }
`;
