import React, { useState, useEffect } from 'react';
import { Container } from '../../../styles/common';
import {
  UseCasesWrapper,
  SectionTitle,
  SectionSubtitle,
  CaseCardsContainer,
  CaseCard,
  CardImage,
  CardContent,
  CardBadge,
  CardTitle,
  CardDescription,
  TabsContainer,
  TabButton,
  DetailContainer,
  DetailHeader,
  DetailContent,
  DetailDescription,
  DetailImage,
  DetailStats,
  StatItem,
  StatValue,
  StatLabel,
  CloseButton
} from './style';

const UseCasesSection = () => {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState('all');
  // 상세 정보 상태 관리
  const [activeCase, setActiveCase] = useState(null);
  // body 스크롤 관리
  useEffect(() => {
    if (activeCase) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeCase]);
  
  // 활용 사례 데이터
  const useCases = [
    {
      id: 1,
      title: '실입주자 사전점검 필수',
      description: '입주 전 사전점검으로 하자 발생을 사전에 확인하여 보수를 요청할 수 있습니다. 입주 후 하자 처리보다 훨씬 빠르고 간편합니다.',
      image: '/img/haja/35.jpeg',
      category: 'residential',
      detail: '신축 아파트 입주 전 사전점검은 하자를 조기에 발견하고 시공사에 무상 수리를 요청할 수 있는 절호의 기회입니다. 벽지의 기포, 바닥 긁힘, 단열 불량 등 입주 후 발견하면 처리 지연되는 문제를 미리 예방할 수 있습니다.',
      stats: [
        { value: '90%', label: '하자 감소율' },
        { value: '80%', label: '입주자 만족도 증가' },
        { value: '3일', label: '평균 보수 기간 단축' }
      ]
    },
    {
      id: 2,
      title: '임대차 분쟁 예방',
      description: '임대차 계약 시 임대인과 임차인 모두 사전점검을 통해 책임 범위를 명확히 할 수 있어 원상복구 시 분쟁을 줄입니다.',
      image: '/img/service/report.png',
      category: 'commercial',
      detail: '입주 전 상태를 명확히 기록하면 퇴거 시 원상복구 책임 여부가 명확해집니다. 벽면 손상, 누수 흔적, 가구 상태 등을 객관적으로 증명할 수 있어 임대차 분쟁을 크게 줄일 수 있습니다.',
      stats: [
        { value: '93%', label: '분쟁 감소율' },
        { value: '100%', label: '증거 효력 확보' },
        { value: '2시간', label: '평균 처리 시간 단축' }
      ]
    },
    {
      id: 3,
      title: '관리자 시설 점검 활용',
      description: '관리자가 정기 점검 시 VR 사전점검 기록을 활용하면 동일 장소의 변화와 손상 여부를 쉽게 파악할 수 있습니다.',
      image: '/img/haja/36.jpg',
      category: 'management',
      detail: '시설물 관리자는 반복 점검이 필요합니다. VR 사전점검 결과는 기록성과 정확성을 보장해 반복 관리 효율을 높입니다. 전등 파손, 타일 들뜸 등 육안으로 쉽게 지나치는 문제를 확인하고 즉시 조치가 가능합니다.',
      stats: [
        { value: '45%', label: '관리 시간 절약' },
        { value: '3배', label: '점검 정확도 향상' },
        { value: '70%', label: '긴급 이슈 조치율 상승' }
      ]
    },
    {
      id: 4,
      title: '공사 후 품질 검증',
      description: '공사나 인테리어 후 사전점검을 진행하면 마감 상태나 누락 공정 등을 빠르게 검토할 수 있어 품질 보증에 효과적입니다.',
      image: '/img/service/vr2.png',
      category: 'residential',
      detail: '리모델링, 인테리어 이후에는 사전점검을 통해 마감 상태, 도장 균열, 실리콘 마감 등을 꼼꼼히 확인해야 합니다. 사전점검 리포트는 하자보수 요청 시 명확한 근거가 되어 시공 품질을 객관적으로 판단할 수 있게 해줍니다.',
      stats: [
        { value: '65%', label: '하자 보수 요청 감소' },
        { value: '5배', label: '검수 효율 향상' },
        { value: '82%', label: '고객 신뢰도 상승' }
      ]
    },
    {
      id: 5,
      title: '퇴거 전 상태 기록 보존',
      description: '임차인의 퇴거 전 상태를 정밀히 기록해두면 보증금 정산에 대한 객관적인 기준이 됩니다.',
      image: '/img/haja/20.jpg',
      category: 'commercial',
      detail: '퇴거 전 공간 상태를 정밀히 촬영하고 기록하면, 이후 원상복구나 정산 시 불필요한 갈등을 줄일 수 있습니다. 입주 시점과 퇴거 시점의 비교가 가능하므로 정당한 공제 여부를 판단할 수 있습니다.',
      stats: [
        { value: '95%', label: '정산 분쟁 감소' },
        { value: '2일', label: '평균 정산 기간 단축' },
        { value: '89%', label: '고객 만족도' }
      ]
    },
    {
      id: 6,
      title: '관리 이력 확보를 통한 신뢰도 증대',
      description: '정기적인 사전점검 기록은 부동산 거래 시 신뢰 요소로 작용하며, 임차인·구매자의 판단을 돕습니다.',
      image: '/img/haja/38.jpg',
      category: 'management',
      detail: '관리 이력은 자산의 가치를 높이는 중요한 자료입니다. 과거에 어떤 하자가 있었고 어떻게 조치되었는지를 보여줄 수 있는 정기 사전점검 기록은 거래 시 신뢰도를 높여줍니다.',
      stats: [
        { value: '60%', label: '설명 시간 단축' },
        { value: '78%', label: '계약 성사율 향상' },
        { value: '3배', label: '보고서 활용도 상승' }
      ]
    }
  ];
  
  
  // 활성화된 탭에 따라 사례 필터링
  const filteredCases = activeTab === 'all' 
    ? useCases 
    : useCases.filter(item => item.category === activeTab);
  
  // 상세 정보 열기
  const openCaseDetail = (caseItem) => {
    setActiveCase(caseItem);
  };
  
  // 상세 정보 닫기
  const closeCaseDetail = () => {
    setActiveCase(null);
  };
  
  // ESC 키로 상세 정보 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeCase) {
        closeCaseDetail();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCase]);
  
  return (
    <UseCasesWrapper id="UseCasesSection">
      <Container>
        <SectionSubtitle>HOW TO USE</SectionSubtitle>
        <SectionTitle>하방 이렇게 활용하세요</SectionTitle>
        
        <TabsContainer>
          <TabButton 
            isActive={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            전체
          </TabButton>
          <TabButton 
            isActive={activeTab === 'residential'} 
            onClick={() => setActiveTab('residential')}
          >
            실입주자
          </TabButton>
          <TabButton 
            isActive={activeTab === 'commercial'} 
            onClick={() => setActiveTab('commercial')}
          >
            임대차
          </TabButton>
          <TabButton 
            isActive={activeTab === 'management'} 
            onClick={() => setActiveTab('management')}
          >
            관리업
          </TabButton>
        </TabsContainer>
        
        <CaseCardsContainer>
          {filteredCases.map(caseItem => (
            <CaseCard key={caseItem.id} onClick={() => openCaseDetail(caseItem)}>
              <CardImage bgImage={caseItem.image} />
              <CardContent>
                <CardBadge>
                  {caseItem.category === 'residential' && '실입주자'}
                  {caseItem.category === 'commercial' && '임대차'}
                  {caseItem.category === 'management' && '관리업'}
                </CardBadge>
                <CardTitle>{caseItem.title}</CardTitle>
                <CardDescription>{caseItem.description}</CardDescription>
              </CardContent>
            </CaseCard>
          ))}
        </CaseCardsContainer>
        
        {activeCase && (
          <DetailContainer onClick={(e) => e.target === e.currentTarget && closeCaseDetail()}>
            <DetailHeader>
              <h3>{activeCase.title}</h3>
              <CloseButton onClick={closeCaseDetail} aria-label="닫기">&times;</CloseButton>
            </DetailHeader>
            
            <DetailContent>
              <DetailImage bgImage={activeCase.image} />
              <DetailDescription>
                {activeCase.detail}
                
                <DetailStats>
                  {activeCase.stats && activeCase.stats.map((stat, index) => (
                    <StatItem key={index}>
                      <StatValue>{stat.value}</StatValue>
                      <StatLabel>{stat.label}</StatLabel>
                    </StatItem>
                  ))}
                </DetailStats>
              </DetailDescription>
            </DetailContent>
          </DetailContainer>
        )}
      </Container>
    </UseCasesWrapper>
  );
};

export default UseCasesSection; 