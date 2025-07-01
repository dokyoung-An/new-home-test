import React from 'react';
import styled from 'styled-components';

import ContactFormSection from './ContactFormSection';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

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