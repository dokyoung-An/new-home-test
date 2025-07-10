import React from 'react';

import HeroSection from './HeroSection';
import SloganSection from './SloganSection';
import VRExperienceSection from './VRExperienceSection';
import BenefitsSection from './BenefitsSection';
import UseCasesSection from './UseCasesSection';

import TestimonialsSection from './TestimonialsSection';
import AdvantagesSection from './AdvantagesSection';
import ServiceSection from './ServiceSection';
import NewsSection from './NewsSection';
import FAQSection from '../ContactPage/FAQSection';
import CoworkerSection from './CoworkerSection';
import ProcessSection from '../ContactPage/ProcessSection';


import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#VRExperience') {
      const el = document.getElementById('VRExperience');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // 렌더 완료 후 약간의 딜레이
      }
    }
  }, [location]);
  
  return (
    <>
      <HeroSection/>
      <SloganSection/>
    
      <AdvantagesSection/>
      <ServiceSection/>
      <VRExperienceSection/>
      <TestimonialsSection />
      <BenefitsSection/>
      <UseCasesSection/>
    
      
     
    
     
      <ProcessSection/>
      <FAQSection/> 
      <NewsSection/>
      <CoworkerSection/>
    </>
  );
};

export default Home; 