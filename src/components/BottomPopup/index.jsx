import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  PopupContainer,
  PopupWrapper,
  PopupButton,
  ButtonText,
  ArrowIcon
} from './style';

const BottomPopup = () => {
  const location = useLocation();
  
  // 루트 페이지('/')에서만 표시
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <PopupContainer>
      <PopupWrapper>
        <PopupButton href="/group-buy" variant="left">
          <ButtonText>공동구매 단지 보기<ArrowIcon>›</ArrowIcon></ButtonText>
        </PopupButton>
        
        <PopupButton href="/event" variant="right">
          <ButtonText>하방혜택 바로보기<ArrowIcon>›</ArrowIcon></ButtonText>
          
        </PopupButton>
      </PopupWrapper>
    </PopupContainer>
  );
};

export default BottomPopup;
