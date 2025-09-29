import React from 'react';
import styled from 'styled-components';

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <MainTitle>
          사전점검 <br/>
          결과 보고서 
          
        </MainTitle>
        <SubTitle>
          <span>사전점검 때 발견한<br/> 하자를 정리한 보고서입니다.</span>
          <span>하자보수 확인을 위해<br/> 보고서를 활용해 보세요.</span>
        </SubTitle>
      </HeroContent>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  width: 100%;
  height: 60vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('/img/report/1.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  position: relative;
  color: white;
  word-break: keep-all;

  @media (max-width: 768px) {
    height: auto;
    min-height: auto;
    padding: 120px 20px 80px 20px;
    

   
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 0 20px;
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;

  br{
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    text-align: center;

    br{
      display: block;
    }
  }
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  opacity: 0.9;
  font-weight: 300;
  text-align: center;

  span {
    display: block;
   
  }

  br{
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
    word-break: keep-all;

    br{
      display: block;
    }
  }
`;

export default HeroSection; 