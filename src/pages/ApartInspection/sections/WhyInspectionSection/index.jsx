import React, { useState, useEffect } from 'react';
import { Container } from '../../../../styles/common';
import {
  WhyInspectionWrapper,
  ContentContainer,
  TextContent,
  Slogan,
  Title,
  Subtitle,
  Description,
  ImageSlideContainer,
  SlideImage,
  PointList,
  PointItem,
  CheckIcon,  
  ContainerWrapper
} from './style';

const WhyInspectionSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({});

  const images = [
    {
      url: "/img/service/s2.png",
      caption: "입주 후 하자를 고쳐야 한다면?"
    },
    {
      url: "/img/haja/29.jpg",
      caption: "물이 빠지지 않아요"
    },
    {
      url: "/img/haja/31.jpg",
      caption: "천장 누수가 있을수도"
    },
    {
      url: "/img/haja/24.jpg",
      caption: "문이 잠기지 않을수도"
    },
    {
      url: "/img/haja/17.jpg",
      caption: "서랍을 못 열게 될 수도"
    }
  ];

  // 이미지 프리로드
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((image) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => {
          setImagesLoaded(prev => ({
            ...prev,
            [image.url]: true
          }));
        };
      });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ContainerWrapper >
      <Container>
        <WhyInspectionWrapper>
          <ContentContainer>
            <TextContent>
              <Slogan>PROFESSIONAL INSPECTION</Slogan>
              <Title>
                사전점검의 중요성,
                <span>지금 확인하세요</span>
              </Title>
              <Subtitle>
                입주 후에 발견되는 하자는 해결이 어렵습니다
              </Subtitle>
              <Description>
                입주 전 사전점검은 새 아파트의 품질을 확인할 수 있는 유일한 기회입니다.
                전문가의 꼼꼼한 점검으로 입주 후 발생할 수 있는 문제를 미리 예방하세요.
              </Description>
              <PointList>
                <PointItem>
                  <CheckIcon />
                  <span className='de1'>비용 증가</span> <span className='de2'>입주 후 하자 발견 시 보수 비용 부담</span>
                </PointItem>
                <PointItem>
                  <CheckIcon />
                  <span className='de1'>생활 불편</span> <span className='de2'>입주 중 하자 처리로 인한 일상 방해</span>
                </PointItem>
                <PointItem>
                  <CheckIcon />
                  <span className='de1'>책임 회피</span> <span className='de2'>시간 경과에 따른 시공사 책임감 저하</span>
                </PointItem>
                <PointItem>
                  <CheckIcon />
                  <span className='de1'>가치 하락</span> <span className='de2'>누적된 하자로 인한 자산 가치 감소</span>
                </PointItem>
              </PointList>
            </TextContent>
            <ImageSlideContainer>
              {images.map((image, index) => (
                <SlideImage
                  key={index}
                  src={image.url}
                  $isActive={currentImage === index && imagesLoaded[image.url]}
                  $caption={image.caption}
                />
              ))}
            </ImageSlideContainer>
          </ContentContainer>
        </WhyInspectionWrapper>
      </Container>
    </ContainerWrapper>
  );
};

export default WhyInspectionSection; 