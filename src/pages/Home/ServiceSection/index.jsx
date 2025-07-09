import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ServiceSection = () => {
  const services = [
    {
      title: "사전점검",
      subtitle: "PRE-INSPECTION",
      description: "전문가의 꼼꼼한 하자 점검으로 완벽한 입주를 준비하세요",
      image: "/img/service/001.png",
      link: "/inspection",
      number: "01"
    },
    {
      title: "준공 후 사전점검",
      subtitle: "COMPLETION INSPECTION",
      description: "사전점검을 놓쳐 점검하지 못하셨던 하자를 꼼꼼히 체크합니다",
      image: "/img/service/002.png",
      link: "/afterInspection",
      number: "02"
    },
    {
      title: "후점검",
      subtitle: "POST-INSPECTION",
      description: "사전점검 때 확인한 하자의 보수 정도를 확인합니다",
      image: "/img/service/003.png",
      link: "/afterInspection",
      number: "03"
    },
    {
      title: "B2B 비즈니스",
      subtitle: "BUSINESS SOLUTION",
      description: "VR 세대기록서비스를 제공해 임대사업 효율성을 높입니다",
      image: "/img/service/vr.png",
      link: "/b2b",
      number: "04"
    }
  ];

  return (
    <Container>
      <SectionHeader>
        <SectionTitle>서비스 소개</SectionTitle>
        <SectionSubtitle>하방의 전문적인 서비스를 소개합니다</SectionSubtitle>
      </SectionHeader>
      <CardContainer>
        {services.map((service, index) => (
          <Card key={index} to={service.link}>
            <CardInner>
              <ImageWrapper>
                <CardImage src={service.image} alt={service.title} />
                <ImageOverlay />
              </ImageWrapper>
              <CardContent>
                <ServiceNumber>{service.number}</ServiceNumber>
                <CardTitle>{service.title}</CardTitle>
                <CardSubtitle>{service.subtitle}</CardSubtitle>
                <CardDescription>{service.description}</CardDescription>
                <ViewMore>
                  View More
                  <Arrow>→</Arrow>
                </ViewMore>
              </CardContent>
            </CardInner>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

const Container = styled.section`
  max-width: 1400px;
  margin: 120px auto;
  padding: 0 20px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.secondary || '#1A1F36'};
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight || '#666'};
  font-weight: 300;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 32px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const Card = styled(Link)`
  text-decoration: none;
  color: inherit;
  perspective: 1000px;
`;

const CardInner = styled.div`
  position: relative;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  border: 1px solid rgba(26, 109, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  background: white;

  ${Card}:hover & {
    transform: translateY(-16px);
    border-color: #1a6dff;
    box-shadow: 0 10px 30px rgba(26, 109, 255, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    border: 1px solid #1a6dff;
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ${Card}:hover &::after {
    opacity: 1;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
  
  @media (max-width: 1200px) {
    height: 280px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 0.8;
  }
`;

const CardContent = styled.div`
  position: relative;
  padding: 32px 24px;
  border-top: none;
`;

const ServiceNumber = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1a6dff;
  margin-bottom: 16px;
  display: block;
  letter-spacing: 0.1em;
`;

const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.secondary || '#1A1F36'};
  word-break: keep-all;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: #1a6dff;
  }
`;

const CardSubtitle = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 16px;
  color: #1a6dff;
  letter-spacing: 0.1em;
  opacity: 0.8;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight || '#666'};
  margin-bottom: 24px;
  word-break: keep-all;
  min-height: 3.2em;
`;

const ViewMore = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1a6dff;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.05em;
  opacity: 0.9;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Arrow = styled.span`
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: translateX(8px);
  }
`;

export default ServiceSection; 