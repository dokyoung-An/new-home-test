import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import HeroSection from './HeroSection';
import SloganSection from './SloganSection';
import VRExperienceSection from './VRExperienceSection';
import BenefitsSection from './BenefitsSection';
import UseCasesSection from './UseCasesSection';
import FeaturesSection from './FeaturesSection';
import CTABannerSection from './CTABannerSection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import PromotionSection from './PromotionSection';
import ProcessSection from './ProcessSection';
import ContactFormSection from './ContactFormSection';
import BannerSection from './BannerSection';
import AdminLink from './AdminLink';
import NewsSection from './NewsSection';
import FAQSection from './FAQSection';
import CoworkerSection from './CoworkerSection';


const Home = () => {
  return (
    <>
      <Header />
      <HeroSection/>
      <SloganSection/>
     
      <VRExperienceSection/>
      <ContactFormSection />
     
      
      <CTABannerSection/>
      <FeaturesSection/>
      
      <UseCasesSection/>
      <BenefitsSection/>
      <TestimonialsSection />
      <ProcessSection/>
      <PricingSection/>
      
      <PromotionSection/>
      
     
      <NewsSection/>
      <CoworkerSection/>
      <FAQSection/>
     
      
     
     
      <BannerSection/>
      <Footer />
      <AdminLink />
    </>
  );
};

export default Home; 