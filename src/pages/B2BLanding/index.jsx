import React from 'react';
import styled from 'styled-components';
import HeroSection from './sections/HeroSection';
import VRAdvantagesSection from './sections/VRAdvantagesSection';
import CaseStudySection from './sections/CaseStudySection';
import CTASection from './sections/CTASection';
import FAQSection from './sections/FAQSection';

const B2BLanding = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <VRAdvantagesSection />
      <CaseStudySection />
      <FAQSection />
      <CTASection />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export default B2BLanding; 