// components/FixedBottomButtons.jsx
import React from 'react';
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



const FixedBottomButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleVRClick = () => {
    if (location.pathname !== '/') {
      // 다른 페이지일 경우: 이동 후 hash 전달
      navigate('/#VRExperience');
    } else {
      // 현재가 홈이면 직접 스크롤
      const el = document.getElementById('VRExperience');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <FixedBottomWrapper>
      <Button variant="outlined" onClick={handleVRClick}>VR체험</Button>
      <Button><a href="/contact">상담신청</a></Button>
    </FixedBottomWrapper>
  );
};

export default FixedBottomButtons;
