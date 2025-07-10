import React from 'react';
import styled from 'styled-components';
import { Container } from '../../../../styles/common';

const VRAdvantagesSection = () => {
  const advantages = [
    {
      title: "시공 전 공간 체험",
      description: "입주 전에 실제 공간감을 체험하여 고객의 결정을 돕습니다",
      icon: "🏗️"
    },
    {
      title: "24/7 언제든 방문",
      description: "시간과 장소에 구애받지 않는 자유로운 공간 투어가 가능합니다",
      icon: "🕒"
    },
    {
      title: "효율적인 마케팅",
      description: "한번의 촬영으로 무제한 방문객 응대가 가능합니다",
      icon: "📈"
    },
    {
      title: "차별화된 경쟁력",
      description: "혁신적인 VR 기술로 경쟁사와의 차별점을 만듭니다",
      icon: "🎯"
    }
  ];

  return (
    <Section>
      <Container>
        <Content>
          <TextBlock>
            <Title>
              임대주택에 <br />
              VR을 활용한다면?
            </Title>
            <Description>
              시간과 비용을 절약하면서도 <br />
              더 효과적인 마케팅이 가능합니다
            </Description>
          </TextBlock>
          <AdvantagesGrid>
            {advantages.map((advantage, index) => (
              <AdvantageCard key={index}>
                <IconWrapper>{advantage.icon}</IconWrapper>
                <CardTitle>{advantage.title}</CardTitle>
                <CardDescription>{advantage.description}</CardDescription>
              </AdvantageCard>
            ))}
          </AdvantagesGrid>
        </Content>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
  
  @media (max-width: 1200px) {
    gap: 60px;
  }
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 50px;
    text-align: center;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  
  @media (max-width: 1200px) {
    flex: 1.2;
  }
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.secondary};
  word-break: keep-all;
  word-wrap: break-word;
  
  @media (max-width: 1200px) {
    font-size: 3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 20px;
   
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  word-break: keep-all;
  word-wrap: break-word;
  
  @media (max-width: 1200px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
 
    
  }
`;

const AdvantagesGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media (max-width: 1200px) {
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 280px;
    margin: 0 auto;
  }
`;

const AdvantageCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 1200px) {
    padding: 28px;
  }
  
  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
  
  @media (max-width: 1200px) {
    font-size: 2.2rem;
    margin-bottom: 18px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 15px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.secondary};
  
  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.textLight};
  word-break: keep-all;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 auto;
  }
`;

export default VRAdvantagesSection; 