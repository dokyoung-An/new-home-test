import React from 'react';
import { FloatingContainer, FloatingButton } from './style';
import { FaPhone } from 'react-icons/fa';

const FloatingButtons = () => {
  const handleKakaoChannel = () => {
    window.open(' http://pf.kakao.com/_HxoWPn/chat', '_blank');
  };

  const handlePhoneClick = () => {
    const phoneNumber = '1566-2539';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phoneNumber.replace(/-/g, '')}`;
    } else {
      alert(`대표번호: ${phoneNumber}`);
    }
  };

  return (
    <FloatingContainer>
      <FloatingButton onClick={handleKakaoChannel}>
        <img src="/img/chlogo.png" alt="채널톡" />
      </FloatingButton>
      <FloatingButton className="phone-button" onClick={handlePhoneClick}>
        <FaPhone />
      </FloatingButton>
    </FloatingContainer>
  );
};

export default FloatingButtons; 