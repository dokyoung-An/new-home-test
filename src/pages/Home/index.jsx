import React from 'react';

import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import ProjectSection from './ProjectSection';
import GallerySection from './GallerySection';
import BenefitsAnimationSection from './BenefitsAnimationSection';
import ContactSection from './ContactSection';
import TestimonialsSection from './TestimonialsSection';
import ServiceSection from './ServiceSection';
import NewsSection from './NewsSection';
import FAQSection from '../ContactPage/FAQSection';
import CoworkerSection from './CoworkerSection';
import ProcessSection from '../ContactPage/ProcessSection';
import UseCasesSection from './UseCasesSection';



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
      <StatsSection/>
      <ProjectSection/>
      <GallerySection/>
      <ServiceSection/>
      <BenefitsAnimationSection/>   
      <ProcessSection/>
      <TestimonialsSection />
      <UseCasesSection/>    
      <FAQSection/> 
      <ContactSection/>
      <CoworkerSection/>

    </>
  );
};

export default Home; 