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
      title: '랜하우스 신규 지점 오픈 안내',
      description: '서울 강남구 신사동에 새롭게 문을 여는 랜하우스를 소개합니다. 더욱 넓어진 공간과 새로운 서비스로 찾아뵙겠습니다.',
      date: '2025.05.15',
      image: '/img/deone.jpg',
      content: `랜하우스가 신사동에 새로운 지점을 오픈합니다.

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
      description: '랜하우스의 새로운 가족이 되어주세요. 신규 회원 가입 시 첫 달 이용료 50% 할인 혜택을 드립니다.',
      date: '2025.05.10',
      image: '/img/deone.jpg',
      content: `신규 회원을 위한 특별한 혜택을 준비했습니다!

[프로모션 혜택]
1. 신규 가입 시 첫 달 50% 할인
2. 무료 미팅룸 10시간 제공
3. 웰컴 키트 증정

[적용 기간]
• 2025년 5월 1일 ~ 5월 31일

[참여 방법]
1. 랜하우스 홈페이지 회원가입
2. 프로모션 코드 'WELCOME2025' 입력
3. 원하는 멤버십 선택

* 프로모션은 조기 종료될 수 있습니다.`
    },
    {
      id: 3,
      category: 'news',
      categoryName: '뉴스',
      title: '랜하우스, 입주박람회 플랫폼 우집사와 MOU체결',
      description: '혁신적인 공간 솔루션과 서비스 품질을 인정받아 2025 워크플레이스 어워드에서 대상을 수상하였습니다.',
      date: '2025.05.01',
      image: '/img/deone.jpg',
      content: `랜하우스가 '2025 워크플레이스 어워드'에서 영예의 대상을 수상했습니다.

[수상 내역]
• 부문: 혁신적 워크플레이스 솔루션
• 평가 기준: 공간 활용성, 서비스 품질, 회원 만족도
• 주최: 한국 오피스 협회

[심사위원 평가]
"랜하우스는 단순한 공유 오피스를 넘어 새로운 업무 문화를 
창조하는 혁신적인 워크플레이스를 제공하고 있습니다."

앞으로도 더 나은 서비스로 보답하겠습니다.
감사합니다.`
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
          <NewsSubTitle>랜하우스의 새로운 소식과 유용한 정보를 확인하실 수 있습니다.</NewsSubTitle>
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