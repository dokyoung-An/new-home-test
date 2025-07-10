import React from 'react';
import { Container } from '../../../../styles/common';
import { MdEngineering } from 'react-icons/md';
import {
  ServiceDetailWrapper,
  SectionTitle,
  SectionSubtitle,
  CardGrid,
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription,
  SectionDivider,
  DividerIcon,
  ContainerWrapper
} from './style';

const services = [
  {
    title: "육안 점검",
    subtitle: "국토부 기준 기반 점검",
    description: "국토부 하자 기준과 하방만의 하자 DB를 바탕으로 정밀하게 확인합니다.",
    image: "/img/service/1.jpg"
  },
  {
    title: "장비 점검",
    subtitle: "정밀 측정 장비 활용",
    description: "바닥 수평, 벽 단열, 라돈, 포름알데히드 등을 전문 장비로 정밀 측정합니다.",
    image: "/img/service/8.jpg"
  },
  {
    title: "보일러 배관 점검",
    subtitle: "배관 설치 상태 확인",
    description: "보일러를 가동한 뒤 열화상 카메라로 배관의 설치 상태를 확인 합니다",
    image: "/img/video/11.gif"
  },
  {
    title: "하자 접수",
    subtitle: "완벽한 접수 지원",
    description: "하자 체크리스트 작성부터 건설사 앱 등록까지 모두 대행해드립니다.",
    image: "/img/service/submmit3.jpg"
  },
  {
    title: "하자점검 보고서",
    subtitle: "하자 위치 한눈에",
    description: "촬영된 하자의 위치와 내용을 정리해 홈페이지에서 보고서로 제공합니다.",
    image: "/img/service/report.png"
  },
  {
    title: "하자컨설팅",
    subtitle: "궁금증 바로 해결",
    description: "하자와 관련된 모든 궁금증을 지속적으로 안내해드립니다.",
    image: "/img/service/qna2.png"
  }
];

const ServiceDetailSection = () => {
  return (
    <ContainerWrapper >
      <Container>
        <ServiceDetailWrapper>
          <SectionDivider>
            <DividerIcon>
              <MdEngineering />
            </DividerIcon>
          </SectionDivider>
          <SectionTitle>전문적인 사전점검 서비스</SectionTitle>
          <SectionSubtitle>
            7년 이상의 경험을 바탕으로 한 전문가들이 제공하는 체계적인 점검 서비스
          </SectionSubtitle>
          <CardGrid>
            {services.map((service, index) => (
              <Card key={index}>
                <CardImage src={service.image} alt={service.title} />
                <CardContent>
                  <CardTitle>{service.title}</CardTitle>
                  <p className="subtitle">{service.subtitle}</p>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </CardGrid>
        </ServiceDetailWrapper>
      </Container>
    </ContainerWrapper>
  );
};

export default ServiceDetailSection; 