import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import BenefitsSection from './sections/BenefitsSection';
import StatisticsSection from './sections/StatisticsSection';
import CaseStudySection from './sections/CaseStudySection';
import CTASection from './sections/CTASection';

const PageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const B2BLanding = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <StatisticsSection />
      <CaseStudySection />
      <CTASection />
    </PageWrapper>
  );
};

export default B2BLanding; 