import React from 'react';
import styled from 'styled-components';

const IframeBoard = () => {
  return (
    <BoardContainer>
       <SectionHeader>
        <SectionTitle>우리집 VR</SectionTitle>
        <SectionDescription>고객님 전화번호 뒤 4자리를 검색창에 입력하여 VR을 확인해보세요.
          <span>※ 비밀번호는 고객님 전화번호 <br/>010부터 끝까지 숫자로 되어 있습니다. </span>
          <span>보고서가 열리지 않는다면 <br/>고객센터로 문의주시기 바랍니다. </span>
        </SectionDescription>
              
      </SectionHeader>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  background-color: #ffffff;
  padding-top: 100px;

  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;
const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`  
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  word-break: keep-all;
  width: 60%;
  text-align: center;
  margin-bottom: 80px;
  

  span {
    font-size: 1rem;
    color: #666;
    font-weight: 400;
    display: block;
    margin-top: 10px;

    

  }

  br{
    display: none;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    width: 90%;

    span {
      font-size: 0.8rem;
    }

    br{
      display: block;
    }
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