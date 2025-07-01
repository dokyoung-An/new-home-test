import React from 'react';
import styled from 'styled-components';
import Sec1Hero from './sections/Sec1Hero';
import Sec2About from './sections/Sec2About';
import Sec3Strength from './sections/Sec3Strength';
import Sec4History from './sections/Sec4History';
import Sec5Vision from './sections/Sec5Vision';
import Sec6News from './sections/Sec6News';

const AboutPage = () => {
  return (
    <Container>
      <Sec1Hero />
      <Sec2About />
      <Sec3Strength />
      <Sec4History />
      <Sec5Vision />
   
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

export default AboutPage; 