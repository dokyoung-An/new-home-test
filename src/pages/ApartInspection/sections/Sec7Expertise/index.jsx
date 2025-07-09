import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations'
import { Container } from '../../../../styles/common';
import { MdBuildCircle } from 'react-icons/md';

const equipmentData = [
  {
    id: 1,
    image: '/img/apartment/fire.png',
    name: '열화상 카메라',
   
    description: '고화질 센서 벽면 단열재 측정'
  },
  {
    id: 2,
    image: '/img/apartment/radon.png',
    name: '라돈 아이',
  
    description: '1급 발암물질 라돈 측정'
  },
  {
    id: 3,
    image: '/img/apartment/forem.png',
    name: '포름알데히드 측정기',
    description: '아토피 원인 물질 포름알데히드 측정'
  },
  {
    id: 4,
    image: '/img/apartment/rayser.png',
    name: '레이저 측정기',
    description: '바닥, 샤시 수평 수직 확인'
  },
  {
    id: 5,
    image: '/img/apartment/electic.png',
    name: '전기 측정기',
    description: '전기 측정 및 오류 확인'
  }
];

const IconDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  
  &::before,
  &::after {
    content: '';
    height: 1px;
    width: 80px;
    background: #E0E0E0;
  }
  
  @media (max-width: 768px) {
    gap: 15px;
    margin-bottom: 25px;
    
    &::before,
    &::after {
      width: 50px;
    }
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: rotate(15deg);
  }
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const Sec7Expertise = () => {
  const firstRowItems = equipmentData.slice(0, 3);
  const secondRowItems = equipmentData.slice(3);

  return (
    <Container style={{ padding: '100px 0px' }}>
      <IconDivider>
        <IconWrapper>
          <MdBuildCircle />
        </IconWrapper>
      </IconDivider>
      <TitleSection>
        <Title>하방의 전문 장비</Title>
        <Subtitle>
          하자 점검의 정확도를 높이는 전문 장비들을 소개합니다
        </Subtitle>
      </TitleSection>
      <GridContainer>
        <Row>
          {firstRowItems.map((item) => (
            <EquipmentCard key={item.id}>
              <ImageContainer>
                <EquipmentImage src={item.image} alt={item.name} />
              </ImageContainer>
              <TextContainer>
                <EquipmentName>{item.name}</EquipmentName>
                <Description>{item.description}</Description>
              </TextContainer>
            </EquipmentCard>
          ))}
        </Row>
        <Row $isSecondRow>
          {secondRowItems.map((item) => (
            <EquipmentCard key={item.id}>
              <ImageContainer>
                <EquipmentImage src={item.image} alt={item.name} />
              </ImageContainer>
              <TextContainer>
                <EquipmentName>{item.name}</EquipmentName>
                <Description>{item.description}</Description>
              </TextContainer>
            </EquipmentCard>
          ))}
        </Row>
      </GridContainer>
    </Container>
  );
};

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Row = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: ${props => props.$isSecondRow ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'};
  width: 100%;

  ${props => props.$isSecondRow && `
    width: 66.67%;
    margin: 0 auto;
  `}

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    ${props => props.$isSecondRow && `
      width: 100%;
    `}
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    ${props => props.$isSecondRow && `
      width: 100%;
    `}
  }
`;

const EquipmentCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const EquipmentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  padding:15px 24px;
`;

const EquipmentName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.5;
  word-break: keep-all;
  margin-bottom: 0;
`;

export default Sec7Expertise;