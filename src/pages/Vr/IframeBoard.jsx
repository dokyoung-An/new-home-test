import React from 'react';
import styled from 'styled-components';

const IframeBoard = () => {
  return (
    <BoardContainer>
      <BoardIframe
        src="https://vink2.imweb.me/vr2"
        title="Report Board"
        frameBorder="0"
        scrolling="no"
      />
    </BoardContainer>
  );
};

const BoardContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  background-color: #ffffff;
  padding-top: 100px;

  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;

const BoardIframe = styled.iframe`
  width: 90%;
  height: 750px;
  border: none;
  background: white;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Firefox */
  scrollbar-width: none;
  
  /* IE and Edge */
  -ms-overflow-style: none;

  @media (max-width: 1200px) {
    height: 650px;
  }

@media (max-width: 1024px) {
  height: 650px;
}
@media (max-width: 900px) {
  height: 650px;
}
@media (max-width: 768px) {
  height: 600px;
}
@media (max-width: 600px) {
  height: 650px;
}
@media (max-width: 480px) {
  height: 800px;
}
@media (max-width: 380px) {
  height: 850px;
}
`;

export default IframeBoard; 