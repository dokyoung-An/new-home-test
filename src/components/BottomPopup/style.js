import styled from 'styled-components';

export const PopupContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  
  /* 모든 기기에서 표시 */
`;

export const PopupWrapper = styled.div`
  width: 1200px;
  max-width: 95%;
  display: flex;
  gap: 0;
`;

export const PopupButton = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  background: ${props => props.variant === 'left' ? 'linear-gradient(to right, #1a6dff, #7EC1D4)' : 'linear-gradient(to right, #85A3D0, #4968B4)'};
  color: white;
  text-decoration: none;
  border-top-left-radius: ${props => props.variant === 'left' ? '15px' : '0'};
  border-top-right-radius: ${props => props.variant === 'right' ? '15px' : '0'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.variant === 'left' ? '#3d7fff' : '#33c9b3'};
  }
  
  &:active {
    background: ${props => props.variant === 'left' ? '#1557cc' : '#00a693'};
  }
  
  @media (max-width: 768px) {
    padding: 15px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 15px;
  }
`;

export const ButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-align: center;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const ArrowIcon = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  transition: transform 0.3s ease;
  
  ${PopupButton}:hover & {
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-left: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    margin-left: 6px;
  }
`;
