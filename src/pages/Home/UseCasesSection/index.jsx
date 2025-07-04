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
  CloseButton,
 
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
      title: '입주 전 하자 보수 요청',
      description: '신축 아파트 실입주자가 입주 전에 하자를 점검하면, 입주 후 발생할 불편과 비용을 줄일 수 있습니다.',
      image: '/img/haja/1.jpg',
      category: 'residential',
      detail: '입주 전 하자를 확인하면 시공사에 무상 보수를 요청할 수 있는 기회가 됩니다. 입주 후에 발견한 하자는 처리 지연이 잦고, 책임 소재도 불분명해지는 경우가 많습니다. 하방은 세대 내 벽지, 마감, 단열, 설비 등 주요 하자 항목을 입주 전 꼼꼼히 점검하여 입주자의 불편을 사전에 방지합니다.',
      stats: [
        { value: '90%', label: '입주 후 하자 불편 감소' },
        { value: '3일', label: '평균 보수 소요 기간' },
        { value: '85%', label: '입주 만족도 향상' }
      ]
    },
    {
      id: 2,
      title: '임대용 세대의 기록 보존',
      description: '임대 전 상태를 정확히 기록하면 원상복구 책임에 대한 분쟁을 줄일 수 있습니다.',
      image: '/img/haja/20.jpg',
      category: 'commercial',
      detail: '입주 전에 세대 상태를 VR과 사진으로 정밀하게 기록하면, 추후 임대인과 임차인 간 발생할 수 있는 원상복구 분쟁을 예방할 수 있습니다. 하방은 임대용 세대의 하자 여부를 중립적으로 기록하실 수 있습니다.',
      stats: [
        { value: '93%', label: '분쟁 감소율' },
        { value: '100%', label: '기록 신뢰도' },
        { value: '2시간', label: '기록 평균 소요 시간' }
      ]
    },
    {
      id: 3,
      title: '외주 시공 품질 점검',
      description: '전문 업체가 시공한 품목에 대해 독립적인 시점에서 품질을 검증합니다.',
      image: '/img/haja/36.jpg',
      category: 'project',
      detail: '하방은 과거 현대 L&C와 같은 대형 시공사의 창호 시공 상태를 점검한 실적을 보유하고 있습니다. 이처럼 외주 시공 후 품질 확인이 필요한 경우, 하방의 전문 점검 인력이 항목별로 시공 품질을 진단해드립니다. 창호 밀착 여부, 단차, 실리콘 마감 등 세부 항목까지 점검해 신뢰도 높은 결과를 제공합니다.',
      stats: [
        { value: '5배', label: '하자 발견 정확도 향상' },
        { value: '70%', label: '재시공 요구 감소율' },
        { value: '100%', label: '전문가 실측 비율' }
      ]
    },
    {
      id: 4,
      title: '준공 후 계약 세대의 마지막 점검 기회',
      description: '준공 후 계약된 세대도 입주 전 하자 점검을 통해 건설사의 책임 아래 무상 보수를 요청할 수 있습니다.',
      image: '/img/haja/44.jpg',
      category: 'residential',
      detail: '이미 준공이 완료된 신축 아파트라 하더라도, 아직 아무도 살지 않은 상태라면 입주 전에 확인된 하자는 건설사의 책임입니다. 이 시점은 무상 보수를 요청할 수 있는 마지막 기회로, 하방은 실입주 직전에 세대 내 하자를 정밀히 점검하여 고객이 불이익 없이 입주할 수 있도록 돕습니다.',
      stats: [
        { value: '100%', label: '보수 요청 가능 범위' },
        { value: '1회', label: '최종 점검 기회' },
        { value: '87%', label: '입주 스트레스 감소' }
      ]
    },
    {
      id: 5,
      title: '준공 전 일괄 세대 점검',
      description: '빌라, 소형 아파트, 호텔 등 준공 전 일괄 하자 점검 요청 시 체계적인 리포트 제공으로 전체 품질을 한눈에 확인할 수 있습니다.',
      image: '/img/haja/43.jpg',
      category: 'project',
      detail: '시행사나 시공사 요청으로 빌라, 소형 공동주택, 오피스텔 등의 준공 전 전 세대를 일괄 점검한 사례가 다수 있습니다. 하방은 전체 세대를 구조별로 나누어 점검 항목을 체계화하고, 사진과 수량을 기반으로 한 정리된 데이터 리포트를 제공합니다. 시공사 내부 품질 관리 및 준공 체크 자료로 효과적으로 활용됩니다.',
      stats: [
        { value: '100세대+', label: '동시 점검 가능 규모' },
        { value: '98%', label: '시행사 리포트 만족도' },
        { value: '1건', label: '세대별 정리된 리포트' }
      ]
    },
    {
      id: 6,
      title: '입주 후 하자 재확인 및 대응자료',
      description: '입주 후 발견된 하자를 입주 전 기록과 비교해 대응 근거로 활용할 수 있습니다.',
      image: '/img/haja/41.jpg',
      category: 'residential',
      detail: '입주 전 하방이 촬영한 하자 기록은, 입주 후 새로 발생한 손상인지 기존 문제인지 구분하는 기준이 됩니다. 시공사 또는 입주자 간 책임 논란을 줄이고, 하자 보수 요청 시 강력한 증빙이 될 수 있습니다.',
      stats: [
        { value: '88%', label: '책임소재 분쟁 감소율' },
        { value: '4배', label: '보수 요청 설득력 향상' },
        { value: '100%', label: '사전기록 활용 가능' }
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
        <SectionSubtitle>Use Cases</SectionSubtitle>
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
            isActive={activeTab === 'project'} 
            onClick={() => setActiveTab('project')}
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
                  {caseItem.category === 'project' && '기업형'}
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