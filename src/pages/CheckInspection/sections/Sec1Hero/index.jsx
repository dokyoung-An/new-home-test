import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const Sec1Hero = () => {
  return (
    <Container>
      <Content>
        <TextBlock>
          <Title>
            소중한 우리집<br />
            <Highlight>끝까지 완벽하게</Highlight>
          </Title>
          <Description>
            사전점검 때 찾은 하자를<br />
            보수가 잘 되었는지 확인하세요
          </Description>
          <Button><a href="/contact">서비스 문의</a></Button>
        </TextBlock>
        <ImageBlock>
          <MainImage src="/img/service/check.png" alt="하방 서비스" />
        </ImageBlock>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background: linear-gradient(to right, #fff 60%, ${({ theme }) => `${theme.primaryLight}15`});
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 1024px) {
    height: auto;
    min-height: auto;
    padding: 120px 0;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 300px;
  animation: ${fadeIn} 1s ease-out;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  max-width: 600px;
  text-align: left;
  
  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 30px;
  word-break: keep-all;
  
  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 40px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    br {
      display: none;
    }
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primaryMiddle};
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 18px 40px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: ${({ theme }) => theme.primaryMiddle};
    border: 1px solid ${({ theme }) => theme.primaryMiddle};
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const ImageBlock = styled.div`
  flex: 1;
  max-width: 600px;
  position: relative;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 500px;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
`;

export default Sec1Hero; 