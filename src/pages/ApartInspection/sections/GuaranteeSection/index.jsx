import React from 'react';
import styled from 'styled-components';
import { FloorIcon, LeakIcon, SmoothIcon, DoorIcon, WarningIcon } from './icons';

const defectCriteria = [
  {
    id: 1,
    icon: FloorIcon,
    title: '바닥 수평',
    description: '10m 이내 13mm 이상 차이 나는 경우'
  },
  {
    id: 2,
    icon: LeakIcon,
    title: '천장/벽 누수',
    description: '눈에 띄는 누수 흔적이나 누수 사진이 있는 경우',
    subText: '· 결로 제외'
  },
  {
    id: 3,
    icon: SmoothIcon,
    title: '평활도',
    description: '물이 고이거나 빠지지 않는 경우',
    subText: '· 흠집 시공 제외'
  },
  {
    id: 4,
    icon: DoorIcon,
    title: '문/샤시 수직/수평',
    description: '문이 닫히지 않거나 좌우 5mm 이상 차이 난 경우'
  },
  {
    id: 5,
    icon: WarningIcon,
    title: '마감재 파손',
    description: '자재 교체가 필요한 정도의 하자가 발생한 경우'
  }
];

const GuaranteeSection = () => {
  return (
    <Container>
      <BackgroundOverlay />
      <Content>
        <Header>
          <Title>중대 하자 보증 제도</Title>
          <SubTitle>책임있는 점검를 약속합니다</SubTitle>
        </Header>

        <GuaranteeCard>
          <CardTitle>중대 하자 보증 제도</CardTitle>
          <CardDescription>
            하자 전달 인력 배치, 중대 하자 최대 <Highlight>100% 환불 보장</Highlight>
          </CardDescription>
        </GuaranteeCard>

        <DefectGrid>
          {defectCriteria.map((item) => (
            <DefectCard key={item.id}>
              <IconWrapper>
                <item.icon />
              </IconWrapper>
              <DefectTitle>{item.title}</DefectTitle>
              <DefectDescription>{item.description}</DefectDescription>
              {item.subText && <SubText>{item.subText}</SubText>}
            </DefectCard>
          ))}
        </DefectGrid>

        <NoticeCard>
          <NoticeTitle>보증제도 주의사항</NoticeTitle>
          <NoticeList>
            <NoticeItem>
              각 하자는 누적되어 해당 기준에 도달해야 100%까지 보장되며, 보수 과정이나 입주 후에 생긴 하자는 책임지지 않습니다.
            </NoticeItem>
            <NoticeItem>
              환불을 위해 사진 등 증빙 자료가 필요합니다.
            </NoticeItem>
            <NoticeItem>
              서비스 보장은 점검일 기준 2달 이내 가능합니다.
            </NoticeItem>
            <NoticeItem>
              VR 세대 기록은 보증 대상에 포함되지 않습니다.
            </NoticeItem>
          </NoticeList>
        </NoticeCard>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  width: 100%;
  background-image: url('/img/bg2.jpg');
  background-size: cover;
  background-position: center;
  padding: 100px 0;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 2;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 60px;
`;

const SubTitle = styled.h3`
  color: ${({ theme }) => theme.primaryLight};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const GuaranteeCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 60px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.primaryDark};
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
`;

const DefectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const DefectCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.primaryLight};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
`;

const DefectTitle = styled.h5`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text};
`;

const DefectDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
  margin-bottom: 8px;
`;

const SubText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textLight};
  opacity: 0.8;
`;

const NoticeCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const NoticeTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const NoticeList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NoticeItem = styled.li`
  position: relative;
  padding-left: 16px;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.primary};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default GuaranteeSection; 