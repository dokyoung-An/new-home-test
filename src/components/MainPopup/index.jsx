import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../lib/supabaseClient';

const MainPopup = ({ isOpen, onClose, onCloseToday, popupSettings: propPopupSettings }) => {
  const [popupSettings, setPopupSettings] = useState({
    isActive: true,
    imageUrl: '/img/popup.png',
    showTodayButton: true,
    showCloseButton: true,
    todayButtonText: '오늘만 보기',
    closeButtonText: '닫힘'
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // props로 받은 팝업 설정이 있으면 즉시 사용
  useEffect(() => {
    if (propPopupSettings) {
      setPopupSettings(propPopupSettings);
      setIsDataLoaded(true);
    } else {
      // props가 없으면 기존 방식으로 로드
      loadPopupSettings();
    }
  }, [propPopupSettings]);

  const loadPopupSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('popup_settings')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (error) {
        console.error('팝업 설정 로드 오류:', error);
        // 에러가 있어도 기본값 사용
        setIsDataLoaded(true);
        return;
      }
      
      if (data) {
        setPopupSettings(data);
      }
      setIsDataLoaded(true);
    } catch (err) {
      console.error('팝업 설정 로드 중 예외:', err);
      setIsDataLoaded(true);
    }
  };
  
  if (!isOpen || !popupSettings.isActive) return null;

  // 데이터가 로드되지 않았어도 기본값으로 즉시 표시
  if (!isDataLoaded) {
    // 기본값으로 즉시 표시 (로딩 메시지 제거)
  }

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <PopupImage src={popupSettings.imageUrl} alt="팝업 이미지" />
        <ButtonContainer>
          {popupSettings.showTodayButton && (
            <TodayButton onClick={onCloseToday}>
              {popupSettings.todayButtonText}
            </TodayButton>
          )}
          {popupSettings.showCloseButton && (
            <CloseButton onClick={onClose}>
              {popupSettings.closeButtonText}
            </CloseButton>
          )}
        </ButtonContainer>
        
        {/* 개발용 localStorage 초기화 버튼 (숨김) */}
        <div style={{ 
          position: 'absolute', 
          bottom: '5px', 
          left: '5px', 
          fontSize: '10px', 
          color: '#ccc',
          cursor: 'pointer'
        }} 
        onClick={() => {
          localStorage.removeItem('hasSeenMainPopupToday');
          localStorage.removeItem('mainPopupDate');
          onClose();
        }}>
          초기화
        </div>
      </PopupContainer>
    </PopupOverlay>
  );
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(3px);
  padding: 20px;
  box-sizing: border-box;
  
  /* 모바일에서 스크롤 방지 */
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const LoadingMessage = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  min-width: 200px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContainer = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: fadeInScale 0.3s ease-out;

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    max-width: 85%;
    max-height: 80%;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    max-width: 90%;
    max-height: 75%;
    border-radius: 6px;
  }

  @media (max-width: 360px) {
    max-width: 95%;
    max-height: 70%;
  }
`;

const PopupImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  max-height: 70vh;
  object-fit: contain;

  @media (max-width: 768px) {
    max-height: 55vh;
  }

  @media (max-width: 480px) {
    max-height: 50vh;
  }

  @media (max-width: 360px) {
    max-height: 45vh;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: 16px;
  gap: 12px;
  background: #fff;
  border-top: 1px solid #e5e5e5;

  @media (max-width: 768px) {
    padding: 14px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 8px;
  }

  @media (max-width: 360px) {
    padding: 10px;
    gap: 6px;
  }
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px; /* 터치 친화적 최소 높이 */

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    font-size: 14px;
    min-height: 46px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 13px;
    min-height: 44px;
    border-radius: 5px;
  }

  @media (max-width: 360px) {
    padding: 8px 10px;
    font-size: 12px;
    min-height: 42px;
    border-radius: 4px;
  }
`;

const TodayButton = styled(BaseButton)`
  background-color: #6c757d;
  color: white;

  &:hover {
    background-color: #5a6268;
    box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
  }
`;

const CloseButton = styled(BaseButton)`
  background-color: #1a6dff;
  color: white;

  &:hover {
    background-color: #0056d1;
    box-shadow: 0 4px 12px rgba(26, 109, 255, 0.3);
  }
`;

export default MainPopup;
