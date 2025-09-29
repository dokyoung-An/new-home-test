import React from 'react';
import styled from 'styled-components';
import Sec1Hero from './sections/Sec1Hero';
import GroupBuyBoard from './sections/GroupBuyBoard';

const Buy = () => {
  return (
    <Container>
      <Sec1Hero />
      <GroupBuyBoard />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default Buy;
