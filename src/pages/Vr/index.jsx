import React from 'react';
import styled from 'styled-components';
import HeroSection from './HeroSection';
import VrBoard from './sections/VrBoard';

const Vr = () => {
  return (
    <PageContainer>
      <HeroSection />
      <VrBoard />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
`;

export default Vr; 