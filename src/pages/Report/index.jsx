import React from 'react';
import styled from 'styled-components';
import HeroSection from './HeroSection';
import IframeBoard from './IframeBoard';
import ReportBoard from './sections/ReportBoard';

const Report = () => {
  return (
    <PageContainer>
      <HeroSection />
      <ReportBoard />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
`;

export default Report; 