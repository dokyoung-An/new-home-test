import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const scaleUp = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const lineAnimation = keyframes`
  0% {
    width: 0;
    opacity: 0;
  }
  50% {
    width: 100%;
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: ${props => props.isLoading ? 1 : 0};
  transition: opacity 1s ease-out;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LogoText = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  color: #1557cc;
  letter-spacing: 0.2em;
  animation: ${scaleUp} 0.8s ease-out forwards;
  font-family: 'Arial', sans-serif;
`;

const Line = styled.div`
  height: 3px;
  background-color: #1557cc;
  animation: ${lineAnimation} 1s ease-out forwards;
  opacity: 0;
`;

const LoadingScreen = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // transition이 끝난 후 컴포넌트를 제거
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 1000); // transition 시간과 동일하게 설정

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <Container isLoading={isLoading}>
      <LogoContainer>
        <LogoText>HABANG</LogoText>
        <Line />
      </LogoContainer>
    </Container>
  );
};

export default LoadingScreen; 