import React from 'react';
import { Container } from '../../../styles/common';
import {
  GalleryContainer,
  GalleryContent,
  GalleryTitle,
  GallerySubtitle,
  GalleryGrid,
  GalleryItem,
  GalleryImage,
  ImageTitle,
  GalleryOverlay,
  OverlayContent,
  OverlayIcon,
  OverlayTitle,
  OverlayDescription
} from './style';

const GallerySection = () => {
  const galleryItems = [
    {
      id: 1,
      icon:'/img/icons/5.png',
      image: '/img/haja/1.jpg',
      title: '전문적인 판단',
      description: '20년 이상의 경험을 가진 전문가들이 정확하고 공정한 하자 판단을 제공합니다.',
      overlayTitle: '전문적인 판단',
      overlayDescription: '20년 이상의 경험을 가진 전문가들이 정확하고 공정한 하자 판단을 제공합니다.'
    },
    {
      id: 2,
      icon:'/img/icons/6.png',
      image: '/img/service/7.jpeg',
      title: '정밀한 기록',
      description: 'VR 촬영과 전문 장비를 활용한 정밀한 하자 기록으로 누락없는 점검을 진행합니다.',
      overlayTitle: '정밀한 기록',
      overlayDescription: 'VR 촬영과 전문 장비를 활용한 정밀한 하자 기록으로 누락없는 점검을 진행합니다.'
    },
    {
      id: 3,
      icon:'/img/icons/7.png',
      image: '/img/service/report.png',
      title: '체계적인 보고서',
      description: '사진을 포함한 종합적인 보고서로 하자 현황을 한눈에 파악할 수 있습니다.',
      overlayTitle: '체계적인 보고서',    
      overlayDescription: '사진을 포함한 종합적인 보고서로 하자 현황을 한눈에 파악할 수 있습니다.'
    },
    {
      id: 4,
      icon:'/img/icons/8.png',
      image: '/img/service/price.png',
      title: '투명한 가격 정찰제',
      description: '경상권 전역 투명한 가격 정찰제로 믿을 수 있는 점검의 기준이 됩니다.',
      overlayTitle: '투명한 가격 정찰제',
      overlayDescription: '경상권 전역 투명한 가격 정찰제로 믿을 수 있는 점검의 기준이 됩니다.'
    },
    {
      id: 5,
      icon:'/img/icons/9.png',
      image: '/img/service/004.png',
      title: '경상권 출장비 NO',
      description: '가까이 있기에, 더 빠르고 부담없는 하방의 프리미엄 사전점검 서비스를 제공합니다.',
      overlayTitle: '경상권 출장비 NO', 
      overlayDescription: '가까이 있기에, 더 빠르고 부담없는 하방의 프리미엄 사전점검 서비스를 제공합니다.'
    },
    {
      id: 6,
      icon:'/img/icons/10.png',
      image: '/img/service/2.png',
      title: '단지별 단톡방 관리',
      description: '공동구매 단지별 단톡방을 개설하여, 하자 궁금증 보수 관련 어려움에 체계적으로 대응합니다.',
      overlayTitle: '단지별 단톡방 관리',
      overlayDescription: '공동구매 단지별 단톡방을 개설하여, 하자 궁금증 보수 관련 어려움에 체계적으로 대응합니다.'
    }
  ];

  return (
    <GalleryContainer>
      <Container>
        <GalleryContent>
          <GalleryTitle><span>왜?</span> 하방이어야 할까요?</GalleryTitle>
          <GallerySubtitle>7년 노하우의 전문가, <br/>하방은 경험으로 증명합니다.</GallerySubtitle>
          
          <GalleryGrid>
             {galleryItems.map((item) => (
               <GalleryItem key={item.id}>
                 {/* 기본 상태: 아이콘과 설명 */}
                 <OverlayContent>
                   <OverlayIcon>
                     <img src={item.icon} alt={item.title} />
                   </OverlayIcon>
                   <OverlayTitle>{item.title}</OverlayTitle>
                   <OverlayDescription>
                     {item.overlayDescription.split('\n').map((line, idx) => (
                       <React.Fragment key={idx}>
                         {line}
                         {idx < item.overlayDescription.split('\n').length - 1 && <br />}
                       </React.Fragment>
                     ))}
                   </OverlayDescription>
                 </OverlayContent>
               
                 {/* hover 시: 실제 이미지 */}
                 <GalleryOverlay>
                   <GalleryImage src={item.image} alt={item.title} />
                   <ImageTitle>{item.title}</ImageTitle>
                 </GalleryOverlay>
               </GalleryItem>
             ))}
          </GalleryGrid>
        </GalleryContent>
      </Container>
    </GalleryContainer>
  );
};

export default GallerySection;
