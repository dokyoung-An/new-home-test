import React from 'react';
import styled from 'styled-components';
import Sec1Hero from './sections/Sec1Hero';
import EventBoard from './sections/EventBoard';
import ActiveEventBoard from './sections/ActiveEventBoard';
import Banner from './sections/Banner';

const Event = () => {
  return (
    <Container>
      <Sec1Hero />
      <EventBoard />
      <ActiveEventBoard />
      <Banner/>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default Event;
