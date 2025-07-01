import React from 'react';
import styled from 'styled-components';
import ContactFormSection from './ContactFormSection';


const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const ContactPage = () => {
  return (
    <PageContainer>
    
      <ContactFormSection />
    
    </PageContainer>
  );
};

export default ContactPage; 