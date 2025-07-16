// components/FixedBottomButtons.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const FixedBottomWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: transparent;
  display: none;
  justify-content: center;
  gap: 1rem;
  z-index: 1000;

  @media (max-width: 1086px) {
    display: flex;
    background: #fff;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  }
`;

const Button = styled.button`
  flex: 1;
  max-width: 160px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: ${({ variant }) => (variant === 'outlined' ? '1px solid #007bff' : 'none')};
  background-color: ${({ variant }) => (variant === 'outlined' ? '#fff' : '#007bff')};
  color: ${({ variant }) => (variant === 'outlined' ? '#007bff' : '#fff')};
  cursor: pointer;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const PopupContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
  height: 90vh;
  background: white;
  border-radius: 12px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  z-index: 2001;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const FixedBottomButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showVRPopup, setShowVRPopup] = useState(false);

  const handleVRClick = () => {
    setShowVRPopup(true);
  };

  return (
    <>
      <FixedBottomWrapper>
        <Button variant="outlined" onClick={handleVRClick}>VR체험</Button>
        <Button><a href="/contact">상담신청</a></Button>
      </FixedBottomWrapper>

      {showVRPopup && (
        <PopupOverlay>
          <PopupContent>
            <CloseButton onClick={() => setShowVRPopup(false)}>×</CloseButton>
            <StyledIframe
              src="https://lanhouse-in-port.vercel.app/더샵엘로이/"
              title="VR 체험"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </PopupContent>
        </PopupOverlay>
      )}
    </>
  );
};

export default FixedBottomButtons;
