import React from 'react';
import styled from 'styled-components';
import ProcessSection from './ProcessSection';
import PromotionSection from './PromotionSection';
import ContactFormSection from './ContactFormSection';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import AdminLink from '../Home/AdminLink';
import FAQSection from './FAQSection';


const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const ContactPage = () => {
  return (
    <PageContainer>
      <Header />
    
      <ContactFormSection />
     
      
      <Footer />
    </PageContainer>
   
  );
};

export default ContactPage; 