import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const Sec3ServiceFlow = () => {
  return (
    <Container>
      <Content>
        <TitleBlock>
          <Title>하자 정보 안내</Title>
          <Description>
            입주 전 확인해야 할 주요 하자 유형과<br />
            대응 방법을 알려드립니다.
          </Description>
        </TitleBlock>
        <IframeWrapper>
          <StyledIframe
            src="https://habang.imweb.me/info"
            title="하자 정보 안내"
            frameBorder="0"
            scrolling="no"
          />
        </IframeWrapper>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background: #fff;

  @media (max-width: 768px) {
    padding: 50px 0;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  animation: ${fadeIn} 1s ease-out;
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const TitleBlock = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const IframeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 700px;
  border: none;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Firefox */
  scrollbar-width: none;
  
  /* IE and Edge */
  -ms-overflow-style: none;

  @media (max-width: 768px) {
    height: 1000px;
  }
`;

export default Sec3ServiceFlow;
