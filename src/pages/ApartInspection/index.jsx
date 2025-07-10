import React from 'react';
import styled from 'styled-components';
import Sec1Hero from './sections/Sec1Hero';
import Sec2Science from './sections/Sec2Science';
import Sec3ServiceFlow from './sections/Sec3ServiceFlow';

import Sec5SNS from './sections/Sec5SNS';
import Sec7Expertise from './sections/Sec7Expertise';
import FAQSection from './sections/FAQSection';
import GuaranteeSection from './sections/GuaranteeSection';
import ServiceDetailSection from './sections/ServiceDetailSection';
import WhyInspectionSection from './sections/WhyInspectionSection';
import InspectionProcessSection from './sections/InspectionProcessSection';


const ApartInspection = () => {
  return (
    <Container>
      <Sec1Hero />
      <WhyInspectionSection />
      <ServiceDetailSection />
      <InspectionProcessSection />
     
      <Sec7Expertise />
     
   
     
      <Sec5SNS />
    
      <FAQSection />
      <GuaranteeSection />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

export default ApartInspection; 