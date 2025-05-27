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
import ReservationSection from './ReservationSection';
import FAQSection from './FAQSection';
import CoworkerSection from './CoworkerSection';

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection/>
      <SloganSection/>
     
      <VRExperienceSection/>
      <ReservationSection/>
      
      <CTABannerSection/>
      <FeaturesSection/>
      <BenefitsSection/>
      <UseCasesSection/>
      <ProcessSection/>
     
      <TestimonialsSection />
      <PricingSection/>
      <FAQSection/>
      <PromotionSection/>
      <ContactFormSection />
      <NewsSection/>
      <CoworkerSection/>
     
      
     
     
      <BannerSection/>
      <Footer />
      <AdminLink />
    </>
  );
};

export default Home; 