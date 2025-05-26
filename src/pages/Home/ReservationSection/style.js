import styled, { keyframes } from 'styled-components';
import { sectionSpacing } from '../../../styles/common';

const slideUp = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
`;

export const ReservationWrapper = styled.div`
  ${sectionSpacing}
  padding: 0px 0;
  background-color: #fff;
`;

export const SectionContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const BoardsContainer = styled.div`
  display: flex;
  gap: 140px;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

export const BoardColumn = styled.div`
  flex: 1;
  max-width: 550px;
`;

export const BoardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 2px solid #333;
  margin-bottom: 0;
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
  
  .more {
    font-size: 13px;
    color: #666;
    display: flex;
    align-items: center;
    cursor: pointer;
    
    &:hover {
      color: ${props => props.theme.primaryColor};
    }
    
    &::after {
      content: '';
      width: 6px;
      height: 10px;
      margin-left: 8px;
      background: url('/images/icon-arrow.png') no-repeat center/contain;
    }
  }
`;

export const BoardListWrapper = styled.div`
  position: relative;
  height: 252px; /* 6개 아이템 x 42px */
  overflow: hidden;
`;

export const BoardList = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  animation: ${slideUp} 30s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

export const BoardListClone = styled(BoardList)`
  top: 100%;
`;

export const BoardItem = styled.div`
  display: flex;
  align-items: center;
  height: 42px; /* 고정 높이 설정 */
  padding: 5px 0;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  
  &:hover {
    background-color: #fafafa;
  }
`;

export const ItemDate = styled.div`
  color: #666;
  font-size: 15px;
  width: 100px;
  flex-shrink: 0;
  line-height: 42px;
`;

export const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  
  > div:first-child {
    color: #333;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }
`;

export const ItemLocation = styled.div`
  color: #999;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
`;

export const StatusButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

export const StatusButton = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.active ? '#333' : '#f0f0f0'};
  color: ${props => props.active ? '#fff' : '#666'};

  &:hover {
    background-color: ${props => props.active ? '#222' : '#e0e0e0'};
  }
`;

export const StatusText = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
  line-height: 20px;
  
  ${({ status }) => {
    switch (status?.toLowerCase()) {
      case 'new':
        return `
          background-color: #e3f2fd;
          color: #1976d2;
        `;
      case 'in-progress':
        return `
          background-color: #fff3e0;
          color: #f57c00;
        `;
      case 'completed':
        return `
          background-color: #e8f5e9;
          color: #388e3c;
        `;
      default:
        return `
          background-color: #f5f5f5;
          color: #666;
        `;
    }
  }}
`;

export const ItemStatus = styled.div`
  font-size: 13px;
  flex-shrink: 0;
  text-align: center;
  min-width: 70px;
  line-height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
`; 