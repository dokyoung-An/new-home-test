import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PopupPreview = () => {
  const [popupData, setPopupData] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // localStorage에서 팝업 미리보기 데이터 가져오기
    const previewData = localStorage.getItem('popupPreview');
    if (previewData) {
      setPopupData(JSON.parse(previewData));
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleTodayClose = () => {
    // 오늘 날짜를 localStorage에 저장
    const today = new Date().toDateString();
    localStorage.setItem('hasSeenMainPopupToday', 'true');
    localStorage.setItem('mainPopupDate', today);
    setIsVisible(false);
  };

  if (!isVisible || !popupData) {
    return (
      <Container>
        <Message>팝업이 닫혔습니다.</Message>
        <BackButton onClick={() => window.close()}>창 닫기</BackButton>
      </Container>
    );
  }

  return (
    <PopupOverlay>
      <PopupContainer>
        <PopupImage src={popupData.imageUrl} alt="팝업 이미지" />
        <ButtonContainer>
          {popupData.showTodayButton && (
            <TodayButton onClick={handleTodayClose}>
              {popupData.todayButtonText}
            </TodayButton>
          )}
          {popupData.showCloseButton && (
            <CloseButton onClick={handleClose}>
              {popupData.closeButtonText}
            </CloseButton>
          )}
        </ButtonContainer>
        
        {/* 미리보기 정보 */}
        <PreviewInfo>
          <PreviewTitle>{popupData.title}</PreviewTitle>
          <PreviewDescription>{popupData.description}</PreviewDescription>
        </PreviewInfo>
      </PopupContainer>
    </PopupOverlay>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`;

const Message = styled.div`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #5a6fd8;
  }
`;

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
  z-index: 1000;
`;

const PopupContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
`;

const PopupImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 400px;
  max-height: 600px;
  object-fit: contain;
  display: block;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const TodayButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6fd8;
    transform: translateY(-1px);
  }
`;

const CloseButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6268;
    transform: translateY(-1px);
  }
`;

const PreviewInfo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
`;

const PreviewTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const PreviewDescription = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
`;

export default PopupPreview;
