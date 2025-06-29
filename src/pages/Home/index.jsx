import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import HeroSection from './HeroSection';
import SloganSection from './SloganSection';
import VRExperienceSection from './VRExperienceSection';
import BenefitsSection from './BenefitsSection';
import UseCasesSection from './UseCasesSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import BannerSection from './BannerSection';
import AdminLink from './AdminLink';
import NewsSection from './NewsSection';
import FAQSection from '../ContactPage/FAQSection';
import CoworkerSection from './CoworkerSection';

import BestPoint from './BestPoint';

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection/>
      <SloganSection/>
      <BestPoint/>
      <BenefitsSection/>
      <FeaturesSection/>
      <VRExperienceSection/>
     
      <UseCasesSection/>
      <TestimonialsSection />
      <CoworkerSection/>
      
     
    
      <FAQSection/>
    
     
      
      <NewsSection/>
  
      <BannerSection/>
      <Footer />
    </>
  );
};

export default Home; 