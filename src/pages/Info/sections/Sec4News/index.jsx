import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';



const cards = [
  {
    title: '국토교통부',
    desc: '건설 정책과 하자 민원 정보 확인',
    icon: '/img/info/logo.png',
    link: 'https://www.molit.go.kr',
  },
  {
    title: '하자 분쟁조정 위원회',
    desc: '공동주택 하자 분쟁 조정 신청',
    icon: '/img/info/logo.png',
    link: 'https://www.adc.go.kr',
  },
  {
    title: '경기도 하자 규정집',
    desc: '입주 전 꼭 알아야 할 주요 사례 정리',
    icon: '/img/info/logo2.png',
    link: 'https://buly.kr/4Fsi1Aq',
  },
  {
    title: '사전점검 가이드',
    desc: '하방이 직접 제작한 하자점검 가이드',
    icon: '/img/info/logo3.png',
    link: '',
    iconSize: 'small'
  },
];

const Sec4News = () => {
  return (
    <Section>
      <Title>하자 관련 <br />유용한 사이트 소개</Title>
      <SubText>하자와 관련된 유용한 사이트를 소개합니다.</SubText>

      <CardGrid>
      {cards.map(({ title, desc, icon, link, iconSize }) => (
  <Card key={title} href={link} target="_blank" rel="noopener noreferrer">
    <Icon src={icon} alt={`${title} 아이콘`} $variant={iconSize} />
    <CardTitle>{title}</CardTitle>
    <CardDesc>{desc}</CardDesc>
  </Card>
))}
      </CardGrid>
    </Section>
  );
};



const Section = styled.section`
  padding: 100px 20px;
  background: #f9f9f9;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    padding: 50px 20px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
  word-break: keep-all;
  word-wrap: break-word;

  br{
    display: none;
  }

  @media (max-width: 768px) {
    br{
      display: block;
    }
  }
`;

const SubText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 50px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);  // 기본은 4열
  gap: 30px;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
  

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;
    padding: 0 20px;
    
  }
  
  

`;

const Card = styled.a`
  width: 100%;
  max-width: 400px;
  padding: 24px 16px;
  background: #fff;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    max-width: 300px;
    padding: 16px 12px;
  }
`;

const Icon = styled.img`
width: ${({ $variant }) => ($variant === 'small' ? '36px' : '80px')};
aspect-ratio: ${({ $variant }) => ($variant === 'small' ? '1 / 1' : '16 / 7')};
margin-bottom: 16px;

@media (max-width: 768px) {
  width: ${({ $variant }) => ($variant === 'small' ? '30px' : '60px')};
  margin-bottom: 12px;
}
`;

const CardTitle = styled.h3`
font-size: 1.1rem;
font-weight: 600;
margin-bottom: 8px;
word-break: keep-all;

@media (max-width: 768px) {
  font-size: 0.95rem;
}
`;

const CardDesc = styled.p`
font-size: 0.85rem;
color: #777;
word-break: keep-all;
text-align: center;

@media (max-width: 768px) {
  font-size: 0.75rem;
}
`;


export default Sec4News;
