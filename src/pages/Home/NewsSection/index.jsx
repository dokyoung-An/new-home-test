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
      categoryName: '공지사항',
      title: '랜하우스 신규 지점 오픈 준비중',
      description: '경기도 하남시 랜하우스 지사 오픈을 준비합니다. 더욱 빠르고 원활한 서비스로 고객 여러분께 만족을 드리겠습니다',
      date: '2025.05.27',
      image: '/img/office.jpg',
      content: `랜하우스가 경기도 하남시에 새로운 지점을 오픈합니다.

• 위치: 서울 강남구 신사동 123-45
• 오픈일: 2025년 6월 1일
• 규모: 총 5개층, 1,000평 규모
• 주요 시설: 
  - 1층: 라운지 & 카페
  - 2-3층: 코워킹 스페이스
  - 4층: 미팅룸 & 컨퍼런스룸
  - 5층: 프라이빗 오피스

사전 예약 및 문의: 02-1234-5678`
    },
    {
      id: 2,
      category: 'event',
      categoryName: '이벤트',
      title: '홈페이지 개편 프로모션',
      description: '랜하우스 홈페이지 오픈 기념, 이벤트를 준비했습니다. 넉넉한 호스팅 기간, 특화된 서비스를 마음껏 누르보세요',
      date: '2025.05.28',
      image: '/img/present.jpg',
      content: `신규 고객님을을 위한 특별한 혜택을 준비했습니다!

[프로모션 혜택]
1. 호스팅 기간 연장 2개월 -> 2년
2. 커스텀 인터페이스 마케팅 지원
3. 임대차 계약서 첨부 기능

[적용 기간]
• 2025년 5월 28일 ~ 

* 프로모션은 조기 종료될 수 있습니다.`
    },
    {
      id: 3,
      category: 'news',
      categoryName: '뉴스',
      title: '랜하우스, 입주박람회 플랫폼 우집사와 MOU 예정',
      description: '랜하우스가 입주박람회 플랫폼 우집사와 MOU를 체결했습니다. 랜하우스 이용하고 포인트로 우집사에서 원하는 시공 자유롭게 받아보세요요',
      date: '2025.06.18',
      image: '/img/mou.jpg',
      content: `랜하우스가 입주박람회 플랫폼 우집사와 MOU를 체결했습니다.`
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
          <NewsTitle>언론과 함께 하는<br /><span style={{ color:'#E65C30' }}>랜하우스</span></NewsTitle>
          <NewsSubTitle>랜하우스의 새로운 소식과 유용한 정보를 확인해 보세요.</NewsSubTitle>
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

      {selectedNews && (
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
      )}
    </NewsSection>
  );
};

export default NewsComponent; 