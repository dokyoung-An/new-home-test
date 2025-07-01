import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const newsData = [
  {
    image: '/public/img/news/1.png',
    title: '하방, VR 기술 도입으로 하자점검 혁신',
    date: '2024.01'
  },
  {
    image: '/public/img/news/2.png',
    title: '하방, 연간 점검 세대수 5만 돌파',
    date: '2023.12'
  },
  {
    image: '/public/img/news/3.png',
    title: '하방, 업계 최초 AI 하자 분석 시스템 도입',
    date: '2023.11'
  }
];

const Sec6News = () => {
  return (
    <Container>
      <Content>
        <Title>하방 점검 현장</Title>
        <SubTitle>하방의 점검 현장을 소개합니다다 </SubTitle>
        
        <NewsGrid>
          {newsData.map((news, index) => (
            <NewsCard key={index}>
              <ImageWrapper>
                <img src={news.image} alt={news.title} />
              </ImageWrapper>
              <NewsInfo>
                <NewsTitle>{news.title}</NewsTitle>
                <NewsDate>{news.date}</NewsDate>
              </NewsInfo>
            </NewsCard>
          ))}
        </NewsGrid>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background-color: ${({ theme }) => theme.secondaryLight};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const NewsCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${NewsCard}:hover & img {
    transform: scale(1.1);
  }
`;

const NewsInfo = styled.div`
  padding: 20px;
`;

const NewsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const NewsDate = styled.p`
  font-size: 0.9rem;
  color: #999;
`;

export default Sec6News; 