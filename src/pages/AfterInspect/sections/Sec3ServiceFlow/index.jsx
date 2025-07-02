import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const serviceSteps = [
  {
    title: '육안 점검',
    description: '전문가의 세밀한 육안 점검으로 표면적 하자를 발견합니다.',
    image: '/img/haja/31.jpg'
  },
  {
    title: '장비 점검',
    description: '전문 장비를 활용하여 숨겨진 하자를 찾아냅니다.',
    image: '/img/haja/39.jpg'
  },
  {
    title: '하자 접수',
    description: '발견된 하자를 체계적으로 기록하고 분류합니다.',
    image: '/img/service/submmit1.jpg'
  },
  {
    title: '하자 보고서',
    description: '전문적인 하자 보고서를 작성하여 제공합니다.',
    image: '/img/service/report.png'
  },
];

const Sec3ServiceFlow = () => {
  return (
    <Container>
      <Content>
        <TitleBlock>
          <SubTitle>SERVICE FLOW</SubTitle>
          <Title>입주 전 사전점검 서비스</Title>
          <Description>
            체계적이고 전문적인 프로세스로 <br/>
            완벽한 하자 점검을 수행합니다
          </Description>
        </TitleBlock>
        
        <GridContainer>
          {serviceSteps.map((step, index) => (
            <Card key={index}>
              <ImageWrapper>
                <CardImage src={step.image} alt={step.title} />
              </ImageWrapper>
              <CardContent>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </GridContainer>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background: linear-gradient(to bottom right,#bfdcff 40%, ${({ theme }) => `${theme.primaryLight}15`});
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  animation: ${fadeIn} 1s ease-out;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const TitleBlock = styled.div`
  text-align: center;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryDark};
  margin-bottom: 20px;
  letter-spacing: 2px;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 30px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
  
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  word-break: keep-all;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%; // 16:9 비율
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 10px 30px;
  max-height: 120px;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default Sec3ServiceFlow; 