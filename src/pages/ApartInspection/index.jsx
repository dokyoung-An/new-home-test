import React from 'react';
import styled from 'styled-components';
import Sec1Hero from './sections/Sec1Hero';
import Sec2Science from './sections/Sec2Science';
import Sec3ServiceFlow from './sections/Sec3ServiceFlow';
import Sec4News from './sections/Sec4News';
import Sec5SNS from './sections/Sec5SNS';
import GuaranteeSection from './sections/GuaranteeSection';
import FAQSection from './sections/FAQSection';
import Sec7Experience from './sections/Sec7Expertise';

const ApartInspection = () => {
  return (
    <Container>
      <Sec1Hero />
     
      <Sec3ServiceFlow />
      <Sec4News />
      <Sec2Science />
      <Sec7Experience />
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