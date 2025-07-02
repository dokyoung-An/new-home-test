import React, { useState } from 'react';
import { FiArrowRight, FiX, FiDownload } from 'react-icons/fi';
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
      content:`하방과 함께하는 창원힐스테이트 더퍼스트 \n입주민 대상 공동구매가 진행 중입니다. 
     
      입주 전 하자를 잡아 보수 받을 수 있는 절호의 기회! 
      품질은 높이고 가격 부담은 낮춘
      하방의 공동구매 혜택을 지금 확인해보세요. 
     
      마감 전 서둘러 신청하세요!
`,
      
    },
    {
      id: 2,
      category: 'event',
      categoryName: '이벤트',
      title: '홈페이지 개편 프로모션',
      description: '하방 홈페이지 오픈 기념, 하방의 프리미엄 서비스를 마음껏 누려보세요',
      date: '2025.07.10~',
      image: '/img/news/2.png',
      content:`하방 홈페이지 리뉴얼을 기념해 
      특별한 프로모션을 준비했습니다. 
      
      지금 상담을 신청하시면 고급 VR 촬영, 입주 전 하자 점검, 
      기록관리 서비스 등을 더 좋은 조건으로 이용하실 수 있습니다. 
      한정된 기간 동안만 제공되는 혜택이니, 
      
      이번 기회를 놓치지 마세요!`,
     
    },
    {
      id: 3,
      category: 'news',
      categoryName: '하자정보',
      title: '2024 경기도 공동주택 품질점검 사례집 ',
      description: '2024 경기도 공동주택 품질점검 사례집 ☆. 2024 경기도 공동주택 품질점검 사례집.',
      date: '2024.11.5',
      image: '/img/news/1.png',
      content: '2024 경기도 공동주택 품질점검 사례집\n\n경기도는 입주민의 쾌적한 주거환경 조성과 공동주택의 품질향상을 위해 공동주택 품질점검을 실시하고 있습니다. 본 사례집은 2024년도 경기도 공동주택 품질점검 결과를 정리한 것으로, 주요 하자 사례와 개선 방안을 담고 있습니다.\n\n이 사례집을 통해 공동주택의 품질관리에 대한 이해를 높이고, 향후 발생할 수 있는 하자를 예방하는데 도움이 되시길 바랍니다.',
      pdfUrl: '/files/2024_경기도_공동주택_품질점검_사례집.pdf'
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
                <NewsLink as="span">
                  자세히 보기 <FiArrowRight />
                </NewsLink>
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
              <div className='content'>
                {selectedNews.content}
              </div>
              {selectedNews.pdfUrl && (
                <a 
                  href={selectedNews.pdfUrl} 
                  download="2024_경기도_공동주택_품질점검_사례집.pdf"
                  className="download-button"
                >
                  <FiDownload /> PDF 다운로드
                </a>
              )}
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