import React from 'react';
import styled from 'styled-components';
import Sec1Hero from './sections/Sec1Hero';
import PricingSection from './sections/PricingSection'; 
import Items from './sections/Items';
import GroupBuyBanner from './sections/GroupBuyBanner';

const Price = () => {
  return (
    <Container>
      <Sec1Hero />
      <PricingSection />
      <Items />
      <GroupBuyBanner />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default Price;
