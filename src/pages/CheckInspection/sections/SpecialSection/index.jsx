import React from 'react';
import styled from 'styled-components';
import { Container } from '../../../../styles/common';
import { fadeIn } from '../../../../styles/animations';

const SpecialSection = () => {
  const specialPoints = [
    {
      title: "전문가의 점검",
      description: "한 명의 전문가가 처음부터 끝까지 책임지고 점검합니다",
      icon: "/img/service/11.jpg"
    },
    {
      title: "1~2시간 집중 점검",
      description: "사전점검과 동일한 방식으로 보수 확인을 진행합니다",
      icon: "/img/haja/38.jpg"
    },
    {
      title: "추가 하자 체크",
      description: "보수 과정에서 발생할 수 있는 2차 하자까지 확인합니다",
      icon: "/img/haja/43.jpg"
    },
    {
      title: "보일러 배관 상태",
      description: "난방과 온수 시스템의 정상 작동 여부를 확인합니다",
      icon: "/img/haja/25.jpg"
    }
  ];

  return (
    <section style={{ background: '#fff', padding: '120px 0' }}>
      <Container>
        <Content>
          <TextBlock>
            <Slogan>남다른 하방의 후점검</Slogan>
            <Title>
              끝까지 철저하게<br/>
              <Highlight>확인하겠습니다</Highlight>
            </Title>
            <Description>
              하자 없는 우리집을 바라는 입주민 여러분의 마음으로<br/>
              끝까지 철저하게 확인하겠습니다
            </Description>
          </TextBlock>
          <CardGrid>
            {specialPoints.map((point, index) => (
              <Card key={index}>
                <CardImage src={point.icon} alt={point.title} />
                <CardContent>
                  <CardTitle>{point.title}</CardTitle>
                  <CardDescription>{point.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </CardGrid>
        </Content>
      </Container>
    </section>
  );
};

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 80px;
  animation: ${fadeIn} 1s ease-out;
  
  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 60px;
  }
`;

const TextBlock = styled.div`
  text-align: left;
  max-width: 800px;
`;

const Slogan = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a6dff;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.secondary};
  
  @media (max-width: 1200px) {
    font-size: 3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    br {
      display: none;
    }
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    br {
      display: none;
    }
  }
`;

const CardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 30px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.secondary};
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.textLight};
  word-break: keep-all;
`;

export default SpecialSection; 