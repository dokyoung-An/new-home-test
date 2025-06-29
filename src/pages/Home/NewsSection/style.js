import styled from 'styled-components';

export const NewsSection = styled.section`
  padding: 100px 0;
  background-color: #fff;
  position: relative;

  @media (max-width: 480px) {
    padding: 60px 20px  ;
  }
`;

export const DesignElement1 = styled.div`
  position: absolute;
  top: 125px;
  left: calc((100% - 1200px) / 2 - 20px);
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #1a6dff, #bfdcff);
  border-radius: 6px;
  opacity: 0.9;
  transform: rotate(-15deg);
  
  @media (max-width: 1240px) {
    left: 10px;
  }
  
  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
    top: 105px;
  }
  @media (max-width: 480px) {
    width: 15px;
    height: 15px;
    top: 60px;
  }
`;

export const DesignElement2 = styled.div`
  position: absolute;
  top: 105px;
  left: calc((100% - 1200px) / 2 + 10px);
  width: 25px;
  height: 25px;
  background: linear-gradient(135deg, #1a6dff, #00BFA6);
  border-radius: 8px;
  opacity: 0.85;
  transform: rotate(10deg);
  
  @media (max-width: 1240px) {
    left: 40px;
  }
  
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
    top: 85px;
  }
  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
    top: 35px;
    left: 10px;
  }
`;

export const DesignElement3 = styled.div`
  position: absolute;
  top: 145px;
  left: calc((100% - 1200px) / 2 - 5px);
  width: 15px;
  height: 15px;
  background: linear-gradient(135deg, 	#00C896, #A259FF);
  border-radius: 5px;
  opacity: 0.95;
  transform: rotate(30deg);
  
  @media (max-width: 1240px) {
    left: 25px;
  }
  
  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
    top: 120px;
  }
  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
    top: 50px;
    left: 30px;
  }
`;

export const NewsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

export const NewsSectionHeader = styled.div`
  margin-bottom: 60px;
  text-align: left;
`;

export const NewsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

export const NewsSubTitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-top: 8px;
  line-height: 1.6;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const NewsCard = styled.div`
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

export const NewsCardImage = styled.div`
  width: 100%;
  height: 160px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
  }
`;

export const NewsCardHeader = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
`;

export const NewsCategory = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: ${({ type }) => {
    switch (type) {
      case 'notice':
        return '#00BFA6';
      case 'event':
        return '#FF4C29';
      case 'news':
        return '#1a6dff';
      default:
        return '#1a6dff';
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case 'notice':
        return '#fff';
      case 'event':
        return '#fff';
      case 'news':
        return '#fff';
      default:
        return '#1a6dff';
    }
  }};
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const NewsCardContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const NewsCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const NewsCardDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 44px;
`;

export const NewsCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
`;

export const NewsDate = styled.span`
  font-size: 13px;
  color: #888;
`;

export const NewsLink = styled.a`
  color: ${({ theme }) => theme.primaryMiddle};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const PopupContent = styled.div`
  background: #fff;
  border-radius: 15px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

export const PopupHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  background: #fff;
  border-radius: 15px 15px 0 0;
`;

export const PopupBody = styled.div`
  padding: 24px;
`;

export const PopupFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  background: #fafafa;
  border-radius: 0 0 15px 15px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: #333;
  }
`; 