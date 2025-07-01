import React from 'react';
import styled from 'styled-components';

const IframeBoard = () => {
  return (
    <BoardContainer>
      <BoardIframe
        src="https://vink2.imweb.me/report2025"
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
  height: 800px;
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

  @media (max-width: 768px) {
    height: 1000px;
    width: 100%;
  }
`;

export default IframeBoard; 