import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoArrowForward } from 'react-icons/io5';
import { RiQuestionMark } from 'react-icons/ri';

const Section = styled.section`
  padding: 100px 0;
  background: #f0f0f0;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  background-position: center;

  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 40px;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primaryMiddle}, transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 20px;
    right: 40px;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.primaryMiddle});
  }

  @media (max-width: 768px) {
    padding: 30px;
    
    &::before, &::after {
      width: 40px;
    }
  }

  @media (max-width: 480px) {
    padding: 25px;
    
    &::before, &::after {
      width: 30px;
    }
  }
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
    gap: 10px;
  }
`;

const CircleIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.primaryMiddle}, #4A90E2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 6px 15px rgba(26, 109, 255, 0.3);
  transform: rotate(-10deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;

const Decoration = styled.div`
  width: 80px;
  height: 2px;
  background: ${({ theme }) => theme.primaryMiddle};
  position: relative;
  opacity: 0.5;

  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: -4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryMiddle};
  }

  @media (max-width: 768px) {
    width: 60px;
    
    &::before {
      width: 6px;
      height: 6px;
      top: -3px;
    }
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.secondaryColor};
  text-align: left;
  margin-bottom: 20px;
  line-height: 1.2;
  
  span {
    &:first-child {
      font-size: 3.5rem;
      display: block;
      margin-bottom: 12px;
      font-weight: 800;
      background: linear-gradient(135deg, ${({ theme }) => theme.primaryMiddle}, #4A90E2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      letter-spacing: 1px;
      position: relative;
      
      &::after {
        content: 'WHY';
        position: absolute;
        left: 2px;
        top: 2px;
        opacity: 0.1;
        z-index: -1;
        color: ${({ theme }) => theme.primaryDark};
        -webkit-text-fill-color: ${({ theme }) => theme.primaryDark};
      }
    }
    
    &:last-child {
      font-size: 2.5rem;
      color: ${({ theme }) => theme.secondaryColor};
      position: relative;
      display: inline-block;
      
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, ${({ theme }) => theme.primaryMiddle}, transparent);
        border-radius: 2px;
      }
    }
  }
  
  @media (max-width: 1024px) {
    font-size: 2.2rem;
    span:first-child {
      font-size: 3rem;
    }
    span:last-child {
      font-size: 2.2rem;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 15px;
    span:first-child {
      font-size: 2.8rem;
      margin-bottom: 10px;
    }
    span:last-child {
      font-size: 2rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    span:first-child {
      font-size: 2.4rem;
    }
    span:last-child {
      font-size: 1.8rem;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.secondaryColor};
  opacity: 0.8;
  position: relative;
  padding-left: 15px;
  margin-top: 10px;
  font-weight: 500;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryMiddle};
    box-shadow: 0 0 0 4px rgba(26, 109, 255, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding-left: 12px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding-left: 10px;
  }
`;

const Card = styled.div`
  background: ${props => props.background || '#1a237e'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  padding: 40px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.overlay || 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9))'};
    z-index: 1;
    transition: all 0.3s ease;
  }

  & > div, & > svg {
    position: relative;
    z-index: 2;
    transition: opacity 0.3s ease;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-10px);

      &::before {
        background: ${props => props.hoverOverlay || 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))'};
      }

      .card-title {
        transform: translateY(-5px);
      }

      .card-description {
        transform: translateY(-5px);
      }
    }
  }

  @media (hover: none) {
    .card-description, .arrow-icon {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &::after {
      content: '👆 Touch!!';
      white-space: pre-line;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -40%);
      font-size: 1.2rem;
      font-weight: 500;
      color: white;
      text-align: center;
      z-index: 3;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      opacity: 0.9;
      animation: pulse 2s infinite;
    }

    &.active {
      &::before {
        background: ${props => props.hoverOverlay || 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))'};
      }

      &::after {
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .card-description, .arrow-icon {
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    min-height: 240px;
    padding: 30px;
  }

  @media (max-width: 480px) {
    min-height: 200px;
    padding: 25px;

    &::after {
      font-size: 1rem;
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  gap: 10px;

  @media (hover: none) {
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  ${Card}.active & {
    opacity: 1;
  }
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 1;
  margin-bottom: 2rem;
  word-break: keep-all;
  word-wrap: break-word;
  transition: all 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const ArrowIcon = styled(IoArrowForward)`
  font-size: 1.5rem;
  margin-top: auto;
  transition: all 0.3s ease;
`;

const BestPoint = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [timer, setTimer] = useState(null);

  const handleCardClick = (index) => {
    if (window.matchMedia('(hover: hover)').matches) return;

    if (timer) clearTimeout(timer);

    if (activeCard === index) {
      setActiveCard(null);
      return;
    }

    setActiveCard(index);

    const newTimer = setTimeout(() => {
      setActiveCard(null);
    }, 30000);

    setTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const cards = [
    {
      title: '검증된 전문가 팀',
      description: `하방은 검증된 전문가 팀으로 구성되어 있습니다. 여기에 더해 공신력 있는 안전진단 전문업체 
      (주)영남이엔지와 협력하여 고급 하자점검 기술을 확보하였습니다.`,
      background: 'url(/img/bestpoint/1.png)',
      overlay: 'linear-gradient(to bottom, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 0.9))',
      hoverOverlay: 'linear-gradient(to bottom, rgba(25, 118, 210, 0.3), rgba(25, 118, 210, 0.6))'
    },
    {
      title: '경상권 전문 사전점검업체',
      description: `하방은 7년간 경상권 아파트 사전점검에 집중해온 전문업체입니다.
풍부한 현장 경험과 지역 맞춤형 점검 시스템으로, 하자의 원인을 정확히 짚어내고 신속하게 대응합니다.`,
      background: 'url(/img/bestpoint/7.jpeg)',
     overlay: 'linear-gradient(to bottom, rgba(0, 191, 166, 0.8), rgba(0, 191, 166, 0.9))',
    hoverOverlay: 'linear-gradient(to bottom, rgba(0, 191, 166, 0.2), rgba(0, 191, 166, 0.4))'
    },
    {
      title: '하자점검 정기교육',
      description: `하방은 하자점검 전문성을 유지하기 위해 정기적인 내부 교육과 실무 워크숍을 실시하고 있습니다.
전문가들의 최신 트렌드와 사례를 지속적으로 공유하며, 점검 품질의 균일성과 정확성을 높이고 있습니다.
`,
      background: 'url(/img/bestpoint/4.jpg)',
      overlay: 'linear-gradient(to bottom, rgba(162, 89, 255, 0.8), rgba(162, 89, 255, 0.9))',
hoverOverlay: 'linear-gradient(to bottom, rgba(162, 89, 255, 0.3), rgba(162, 89, 255, 0.6))'

    },
    {
        title: '공동구매 진행',
        description: `하방은 주관사의 초청과 입주민들의 적극적인 참여로 형성된 공동구매 형태의 점검을 다수 진행해왔습니다.
풍부한 진행 경험을 바탕으로, 단지별 특성과 일정에 맞춘 효율적인 사전점검 서비스를 제공합니다.`,
        background: 'url(/img/bestpoint/4.jpg)',
        overlay: 'linear-gradient(to bottom, rgba(21, 87, 204, 0.8), rgba(21, 87, 204, 0.9))',
hoverOverlay: 'linear-gradient(to bottom, rgba(21, 87, 204, 0.3), rgba(21, 87, 204, 0.6))'

      },
    {
      title: '국내최초! 세대기록 서비스',
      description: `하방은 국내 최초로 360도 VR을 활용한 세대 기록 서비스를 랜하우스와의 협업을 통해 제공하고 있습니다.
눈으로 직접 보는 듯한 입체적인 기록은, 하자 발생 시 증빙 자료로 활용되며 입주 후 분쟁 예방에도 강력한 효과를 발휘합니다.`,
      background: 'url(/img/bestpoint/vr2.png)',
      overlay: 'linear-gradient(to bottom, rgba(204, 171, 0, 0.85), rgba(153, 128, 0, 0.95))',
      hoverOverlay: 'linear-gradient(to bottom, rgba(204, 171, 0, 0.3), rgba(153, 128, 0, 0.5))'
      

    }
  ];

  return (
    <Section>
      <Container>
        <GridContainer>
          <TopGrid>
            <TitleContainer>
              <IconContainer>
                <CircleIcon>
                  <RiQuestionMark />
                </CircleIcon>
                <Decoration />
              </IconContainer>
              <Title>
                <span>WHY</span>
                <span>하방인가요?</span>
              </Title>
              <Subtitle>하방의 특별한 점검 서비스를 제공합니다</Subtitle>
            </TitleContainer>
            {cards.slice(0, 2).map((card, index) => (
              <Card 
                key={index} 
                background={card.background}
                overlay={card.overlay}
                hoverOverlay={card.hoverOverlay}
                onClick={() => handleCardClick(index)}
                className={activeCard === index ? 'active' : ''}
              >
                <div>
                  <CardTitle className="card-title">{card.title}</CardTitle>
                  <CardDescription className="card-description">{card.description}</CardDescription>
                </div>
                <ArrowIcon className="arrow-icon" />
              </Card>
            ))}
          </TopGrid>
          <BottomGrid>
            {cards.slice(2).map((card, index) => (
              <Card 
                key={index + 2} 
                background={card.background}
                overlay={card.overlay}
                hoverOverlay={card.hoverOverlay}
                onClick={() => handleCardClick(index + 2)}
                className={activeCard === (index + 2) ? 'active' : ''}
              >
                <div>
                  <CardTitle className="card-title">{card.title}</CardTitle>
                  <CardDescription className="card-description">{card.description}</CardDescription>
                </div>
                <ArrowIcon className="arrow-icon" />
              </Card>
            ))}
          </BottomGrid>
        </GridContainer>
      </Container>
    </Section>
  );
};

export default BestPoint; 