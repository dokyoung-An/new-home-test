import React from 'react';
import styled from 'styled-components';
import { BsQuestionCircle } from 'react-icons/bs';

const Section = styled.section`
  padding: 80px 0;
  background:rgba(191, 220, 255, 0.2) ;
  overflow: hidden;
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const TitleSection = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 40px 0;

  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 1;
    padding: 20px 0;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: #4285F4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
    font-size: 30px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const WhyTitle = styled.h3`
  font-size: 3.5rem;
  font-weight: 700;
  color: #4285F4;
  margin: 0;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 0;
  position: relative;
  padding-left: 15px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4285F4;
    transform: translateY(-50%);
  }
`;

const Card = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 280px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  }
`;

const CardContent = styled.div`
  flex-grow: 1; /* 핵심 */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 하단 정렬 */
  padding: 15px;
  background: white;
  gap: 8px;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  word-break: keep-all;
  line-height: 1.3;
`;

const cards = [
  {
    image: '/img/bestpoint/1.png',
    title: '검증된 전문가 팀',
    description: '공신력 있는 전문가와 협업'
  },
  {
    image: '/img/bestpoint/7.jpeg',
    title: '경상권 전문 사전점검업체',
    description: '7년 경력, 지역 맞춤 점검'
  },
  {
    image: '/img/bestpoint/2.jpeg',
    title: '하자점검 정기교육',
    description: '정기교육으로 품질 유지'
  },
  {
    image: '/img/bestpoint/4.jpg',
    title: '공동구매 진행',
    description: '입주민 참여형 공동 점검'
  },
  {
    image: '/img/bestpoint/vr2.png',
    title: '국내최초! 세대기록 서비스',
    description: '360도 VR로 세대 기록'
  }
];

const BestPoint = () => {
  return (
    <Section>
      <Container>
        <Grid>
          <TitleSection>
            <IconWrapper>
              <BsQuestionCircle />
            </IconWrapper>
            <TitleWrapper>
              <WhyTitle>WHY</WhyTitle>
              <Title>하방인가요?</Title>
            </TitleWrapper>
            <Description>하방의 특별한 점검 서비스를 제공합니다</Description>
          </TitleSection>
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage image={card.image} />
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default BestPoint; 