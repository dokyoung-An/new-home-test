import React from 'react';
import styled from 'styled-components';
import Sec1Hero from './sections/Sec1Hero';

import Sec3ServiceFlow from './sections/Sec3ServiceFlow';
import Sec4News from './sections/Sec4News';



const ApartInspection = () => {
  return (
    <Container>
      <Sec1Hero />
     
      <Sec3ServiceFlow />
      <Sec4News />
    
     
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

export default ApartInspection; 