import React from 'react';
import styled from 'styled-components';
import { FloorIcon, LeakIcon, SmoothIcon, DoorIcon, WarningIcon, WallIcon, DoorIcon2 } from './icons';

const defectCriteria  = [
  {
    id: '1',
    icon: LeakIcon,
    description: '천장, 벽, 바닥 등 구조체에서 발생한 **지속적 또는 반복적 누수**로, 실내 사용에 큰 제약이 있는 경우',
    note: '단순 결로, 배관 마감 부실 제외'
  },
  {
    id: '2',
    icon: FloorIcon,
    description: '거실, 침실 등 주요 거주공간에서 **바닥 수평차가 15mm 이상**이거나, 고정형 가구 설치가 어려운 수준',
    note: '10m 기준 수평차 13mm 이상은 국토부 기준에도 포함됨'
  },
  {
    id: '3',
    icon: DoorIcon,
    description: '**샤시나 방문이 완전히 닫히지 않거나** 바람/소음 유입이 심각하여 기능상 사용이 어려운 경우',
    note: '단순한 미세 유격, 외관 스크래치 제외'
  },
  {
    id: '4',
    icon: WallIcon,
    description: '**벽체 내부나 바닥 슬래브 아래에 매립된 급수·배수·난방 배관에서 발생하는 누수, 소음, 누설 등의 하자**',
    note: '매립 설비에서 발생하는 하자는 구조상 사전점검 당일 확인이 어려우며, 본 서비의 환불 기준에 해당되지 않음'
  },
  {
    id: '5',
    icon: WarningIcon,
    description: '벽, 바닥, 천장 등의 마감재가 **깨짐·탈락·파손 등으로 인해 실제 사용이 불가능하거나**, 보수가 불가피한 수준일 경우',
    note: '단순 스크래치, 경미한 오염 또는 미관상의 불만족은 제외'
  },
  {
    id: '6',
    icon: DoorIcon2,
    description: '**현관문의 틈, 고정 불량 등으로 인해 외부 소음, 바람, 냄새 등이 실내로 유입되는 등 차폐 성능이 현저히 부족한 경우**',
    note: '단순한 소음 민감도 또는 도어 클로저 미세 조정 문제는 제외'
  }
  
];


const GuaranteeSection = () => {
  return (
    <Container>
      <BackgroundOverlay />
      <Content>
        <Header>
          <Title>중대 하자 보증 제도</Title>
          <SubTitle>책임있는 점검을 약속합니다</SubTitle>
        </Header>

        <GuaranteeCard>
          <CardTitle>중대 하자 보증 제도</CardTitle>
          <CardDescription>
          <span className='card1'>"혹시 하방의 점검이 만족스럽지 못하셨나요?
          불편을 드린점 진심으로 사과드립니다."<br/></span>
          <span className='card2'>하방은 중대 하자에 대해 전담 인력을 통해 즉시 대응하며,
          <Highlight> 최대 100% 환불</Highlight>까지 보장합니다</span>
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
            하자의 유형과 심각도는 국토교통부 하자심사 기준 및 당사 전문가의 공식 판단을 기준으로 하며, 단순한 외관 스크래치나 <br/>주관적 불만족은 해당되지 않습니다.
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

  @media (max-width: 768px) {
    padding: 60px 20px 60px 20px;
  }
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
  word-break: keep-all;
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
  .card1{
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 2;
   
    color:#676767;
  } 
  .card2{
    font-size: 1.1rem;
    margin-bottom: 12px;
   
  } 
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
  word-break: keep-all;
  word-wrap: break-word;
`;

const SubText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textLight};
  opacity: 0.8;
`;

const NoticeCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  word-break: keep-all;

  @media (max-width: 768px) {
    padding: 30px 25px;
  }
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
  line-height: 1.8;
  word-break: keep-all;
  word-wrap: break-word;

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