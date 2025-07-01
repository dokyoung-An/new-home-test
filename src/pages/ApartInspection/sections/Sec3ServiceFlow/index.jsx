import React, { useState } from 'react';
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
  {
    title: 'VR 세대 기록',
    description: 'VR 촬영으로 세대 전체를 기록하고 보관합니다.',
    image: '/img/service/vr.png'
  }
];

const Sec3ServiceFlow = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Container>
      <Content>
        <TitleBlock>
          <SubTitle>SERVICE FLOW</SubTitle>
          <Title>하방 사전점검 서비스</Title>
          <Description>
            체계적이고 전문적인 프로세스로 <br/>
            완벽한 하자 점검을 수행합니다
          </Description>
        </TitleBlock>
        
        <SlideSection>
          <CardList style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {serviceSteps.map((step, index) => (
              <Card key={index} $isActive={index === activeIndex}>
                <CardImage src={step.image} alt={step.title} />
                <CardContent>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </CardList>
          
          <Navigation>
            <NavButton 
              onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
            >
              이전
            </NavButton>
            <Indicators>
              {serviceSteps.map((_, index) => (
                <Indicator
                  key={index}
                  $isActive={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </Indicators>
            <NavButton 
              onClick={() => setActiveIndex(Math.min(serviceSteps.length - 1, activeIndex + 1))}
              disabled={activeIndex === serviceSteps.length - 1}
            >
              다음
            </NavButton>
          </Navigation>
        </SlideSection>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background: linear-gradient(to right, rgba(191, 220, 255, 0.5), rgba(227, 239, 255, 0.5));
  
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

const SlideSection = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const CardList = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const Card = styled.div`
  min-width: 100%;
  padding: 0 20px;
  opacity: ${props => props.$isActive ? 1 : 0.5};
  transition: opacity 0.5s ease;
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 9/4;
  object-fit: cover;
  object-position: center;
  
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const CardContent = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.text};
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
`;

const NavButton = styled.button`
  background: none;
  border: 2px solid ${({ theme }) => theme.primaryDark};
  color: ${({ theme }) => theme.primaryDark};
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primaryLight};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Indicators = styled.div`
  display: flex;
  gap: 10px;
`;

const Indicator = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$isActive ? props.theme.primaryDark : props.theme.primaryLight};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: ${({ theme }) => theme.primary};
  }
`;

export default Sec3ServiceFlow; 