import React, { useState } from 'react';
import { FiArrowRight, FiX } from 'react-icons/fi';
import { IoArrowForward } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import {
  NewsSection,
  NewsContainer,
  NewsSectionHeader,
  NewsTitle,
  NewsSubTitle,
  NewsGrid,
  NewsCard,
  NewsCardImage,
  NewsCardHeader,
  NewsCategory,
  NewsCardContent,
  NewsCardTitle,
  NewsCardDescription,
  NewsCardFooter,
  NewsDate,
  NewsLink,
  PopupOverlay,
  PopupContent,
  PopupHeader,
  PopupBody,
  PopupFooter,
  CloseButton,
  DesignElement1,
  DesignElement2,
  DesignElement3
} from './style';

const NewsComponent = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  const newsItems = [
    {
      id: 1,
      category: 'notice',
      categoryName: '공구중',
      title: '창원힐스테이트 더퍼스트 공동구매',
      description: '창원힐스테이트 더퍼스트 공동구매 중입니다. 혜택을 받으세요',
      date: '2025.07.05',
      image: '/img/news/3.png',
      
    },
    {
      id: 2,
      category: 'event',
      categoryName: '이벤트',
      title: '홈페이지 개편 프로모션',
      description: '하방 홈페이지 오픈 기념, 이벤트를 준비했습니다. 하방의 프리미엄 서비스를 마음껏 누려보세요',
      date: '2025.07.10~',
      image: '/img/news/2.png',
     
    },
    {
      id: 3,
      category: 'news',
      categoryName: '하자정보',
      title: '2024 경기도 공동주택 품질점검 사례집 ',
      description: '2024 경기도 공동주택 품질점검 사례집 ☆. 2024 경기도 공동주택 품질점검 사례집.',
      date: '2024.11.5',
      image: '/img/news/1.png',
    }
  ];

  const handleCardClick = (news) => {
    setSelectedNews(news);
  };

  const handleClosePopup = () => {
    setSelectedNews(null);
  };

  return (
    <NewsSection>
      <DesignElement1 />
      <DesignElement2 />
      <DesignElement3 />
      <NewsContainer>
        <NewsSectionHeader>
          <NewsTitle>최신 뉴스 & 정보<br /><span style={{ color:'#1a6dff' }}>하방 INFO</span></NewsTitle>
          <NewsSubTitle>하방의 새로운 소식과 유용한 정보를 확인해 보세요.</NewsSubTitle>
        </NewsSectionHeader>
        
        <NewsGrid>
          {newsItems.map((item) => (
            <NewsCard key={item.id} onClick={() => handleCardClick(item)}>
              <NewsCardImage src={item.image} />
              <NewsCardHeader>
                <NewsCategory type={item.category}>{item.categoryName}</NewsCategory>
              </NewsCardHeader>
              <NewsCardContent>
                <NewsCardTitle>{item.title}</NewsCardTitle>
                <NewsCardDescription>{item.description}</NewsCardDescription>
              </NewsCardContent>
              <NewsCardFooter>
                <NewsDate>{item.date}</NewsDate>
                {/* <NewsLink as="span">
                  자세히 보기 <FiArrowRight />
                </NewsLink> */}
              </NewsCardFooter>
            </NewsCard>
          ))}
        </NewsGrid>
      </NewsContainer>

      {/* {selectedNews && (
        <PopupOverlay onClick={handleClosePopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupHeader>
              <NewsCategory type={selectedNews.category}>
                {selectedNews.categoryName}
              </NewsCategory>
              <NewsCardTitle>{selectedNews.title}</NewsCardTitle>
              <NewsDate>{selectedNews.date}</NewsDate>
              <CloseButton onClick={handleClosePopup}>
                <FiX />
              </CloseButton>
            </PopupHeader>
            <PopupBody>
              <NewsCardImage src={selectedNews.image} style={{ height: '300px', marginBottom: '24px' }} />
              <div style={{ whiteSpace: 'pre-line' }}>
                {selectedNews.content}
              </div>
            </PopupBody>
            <PopupFooter>
              <NewsLink as="button" onClick={handleClosePopup}>
                닫기
              </NewsLink>
            </PopupFooter>
          </PopupContent>
        </PopupOverlay>
      )} */}
    </NewsSection>
  );
};

export default NewsComponent; 