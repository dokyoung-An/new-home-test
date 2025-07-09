import React from 'react';
import styled from 'styled-components';
import { Container } from '../../../../styles/common';

const TimingSection = () => {
  return (
    <Section>
      <Container>
        <TitleWrapper>
          <TitleIconWrapper>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </TitleIconWrapper>
          <Title>후점검, 언제 하는게 좋을까요?</Title>
          <Subtitle>
            시기에 따른 장단점을 비교하여 최적의 점검 시기를 결정하세요
          </Subtitle>
        </TitleWrapper>
        <ComparisonContainer>
          <TimingCard>
            <CardHeader>
              <CardIconWrapper>
                <img src="/img/apartment/apart.png" alt="준공 직후" />
              </CardIconWrapper>
              <CardTitle>준공 직후</CardTitle>
            </CardHeader>
            <ListContainer>
              <ListColumn>
                <ListTitle>
                  <PlusIcon>✓</PlusIcon>
                  장점
                </ListTitle>
                <List>
                  <ListItem>시공사의 빠른 대응</ListItem>
                  <ListItem>책임 소재 명확</ListItem>
                  <ListItem>입주 전 보수 가능</ListItem>
                </List>
              </ListColumn>
              <Divider />
              <ListColumn>
                <ListTitle>
                  <MinusIcon>!</MinusIcon>
                  단점
                </ListTitle>
                <List>
                  <ListItem>일부 하자 발견 어려움</ListItem>
                  <ListItem>계절성 하자 확인 불가</ListItem>
                  <ListItem style={{opacity: 0}}>더미 텍스트</ListItem>
                </List>
              </ListColumn>
            </ListContainer>
          </TimingCard>

          <TimingCard>
            <CardHeader>
              <CardIconWrapper>
                <img src="/img/apartment/room.png" alt="입주 후" />
              </CardIconWrapper>
              <CardTitle>입주 후</CardTitle>
            </CardHeader>
            <ListContainer>
              <ListColumn>
                <ListTitle>
                  <PlusIcon>✓</PlusIcon>
                  장점
                </ListTitle>
                <List>
                  <ListItem>실생활 하자 발견</ListItem>
                  <ListItem>계절성 하자 확인</ListItem>
                  <ListItem>다양한 하자 발견</ListItem>
                </List>
              </ListColumn>
              <Divider />
              <ListColumn>
                <ListTitle>
                  <MinusIcon>!</MinusIcon>
                  단점
                </ListTitle>
                <List>
                  <ListItem>시공사 대응 지연</ListItem>
                  <ListItem>보수 중 생활 불편</ListItem>
                  <ListItem>책임 소재 불분명</ListItem>
                </List>
              </ListColumn>
            </ListContainer>
          </TimingCard>
        </ComparisonContainer>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  padding: 10px 0 80px;
  background: #1a6dff;
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const TitleIconWrapper = styled.div`
  width: 200px;
  aspect-ratio: 1/1;
  margin:0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 3s ease-in-out infinite;
  margin-bottom: -50px;

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  word-break: keep-all;
  line-height: 1.3;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgb(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  word-break: keep-all;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 20px;
  }
`;

const ComparisonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const TimingCard = styled.div`
  flex: 1;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
`;

const CardIconWrapper = styled.div`
  width: 200px;
  height: 200px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    text-align: center;
  }
`;

const ListContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 25px;
  }
`;

const ListColumn = styled.div`
  flex: 1;
`;

const Divider = styled.div`
  width: 1px;
  background: #e0e0e0;
  align-self: stretch;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 1px;
  }
`;

const ListTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  background-color: rgba(26, 109, 255, 0.1);
  padding: 8px 12px;
  padding-left: 0px;
  border-radius: 6px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  position: relative;
  padding-left: 20px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.textLight};
  font-size: 1.05rem;
  line-height: 1.5;
  text-align: center;
  padding-right: 20px;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
  }

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PlusIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.primary};
  color: #1a6dff;
  border-radius: 50%;
  font-size: 0.8rem;
`;

const MinusIcon = styled(PlusIcon)`
  background: ${({ theme }) => theme.textLight};
`;

export default TimingSection;