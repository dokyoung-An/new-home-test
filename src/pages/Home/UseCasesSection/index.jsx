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
      title: '원상복구 분쟁 예방',
      description: '임대차 계약 종료 시 원상복구에 대한 분쟁이 빈번하게 발생합니다. 랜하우스의 360° VR 기록은 입주 전후의 상태를 명확히 비교할 수 있어, 분쟁 발생 시 결정적인 증거로 활용됩니다',
      image: '/img/usecases/dispute-prevention.jpg',
      category: 'residential',
      detail: '임대차 계약이 종료될 때 가장 많은 분쟁이 발생하는 원상복구 문제를 해결합니다. 랜하우스의 정밀한 360° VR 기록은 입주 시점의 공간 상태를 모든 각도에서 기록하여, 퇴거 시 발생할 수 있는 불필요한 분쟁을 예방합니다. 변색된 벽지, 마모된 바닥재, 기존에 있던 흠집 등을 모두 기록하여 명확한 비교 기준을 제시합니다.',
      stats: [
        { value: '93%', label: '분쟁 감소율' },
        { value: '2시간', label: '문제 해결 시간 단축' },
        { value: '100%', label: '증거 효력' }
      ]
    },
    {
      id: 2,
      title: '비대면 임장 경험 제공',
      description: '시간이나 거리의 제약으로 직접 방문이 어려운 경우, 랜하우스의 VR 투어를 통해 집의 구조와 상태를 상세히 확인할 수 있어, 효율적인 의사결정을 지원합니다',
      image: '/img/bidaemeon.jpg',
      category: 'commercial',
      detail: '원거리에 있거나 시간적 제약이 있는 고객에게 완벽한 비대면 임장 경험을 제공합니다. 랜하우스의 VR 투어는 실제 방문과 같은 몰입감을 제공하여 공간의 규모, 채광, 구조를 정확히 파악할 수 있습니다. 특히 해외 투자자나 바쁜 전문직 종사자들에게 시간과 비용을 크게 절약해 주는 솔루션입니다.',
      stats: [
        { value: '75%', label: '방문 횟수 감소' },
        { value: '4배', label: '매물 탐색 효율성 증가' },
        { value: '68%', label: '고객 만족도 상승' }
      ]
    },
    {
      id: 3,
      title: '상업용 부동산 관리 효율화',
      description: '상업용 부동산의 경우, 공실 관리와 시설 점검이 중요합니다. 랜하우스의 VR 기록을 통해 원격으로 공간을 확인하고, 필요한 조치를 신속하게 취할 수 있습니다',
      image: '/img/usecases/commercial-management.jpg',
      category: 'commercial',
      detail: '상업용 부동산 관리자는 여러 공간을 효율적으로 관리해야 합니다. 랜하우스의 VR 솔루션을 활용하면 원격으로 각 공간의 상태를 정기적으로 점검하고, 문제 발생 시 즉각적인 대응이 가능합니다. 임대 전후 상태 기록, 시설물 상태 확인, 안전 점검 등 다양한 관리 업무에 활용할 수 있습니다.',
      stats: [
        { value: '45%', label: '관리 비용 절감' },
        { value: '3배', label: '관리 효율성 증가' },
        { value: '70%', label: '임차인 분쟁 감소' }
      ]
    },
    {
      id: 4,
      title: '건축 및 리모델링 전후 비교',
      description: '건축이나 리모델링 후, 공사 품질에 대한 검증이 필요합니다. 랜하우스의 VR 기록은 공사 전후의 상태를 비교할 수 있어, 품질 검증과 문제 해결에 효과적입니다.',
      image: '/img/usecases/remodeling-comparison.jpg',
      category: 'management',
      detail: '건축이나 리모델링 공사의 품질을 객관적으로 평가하기 위해서는 공사 전후 상태의 정확한 비교가 필수적입니다. 랜하우스의 VR 기록은 공사 전 상태를 상세히 기록하고, 공사 후 동일한 관점에서 비교할 수 있어 공사 완성도와 계약 이행 여부를 명확히 확인할 수 있습니다.',
      stats: [
        { value: '82%', label: '고객 신뢰도 상승' },
        { value: '65%', label: '하자 보수 요청 감소' },
        { value: '5배', label: '문제 해결 속도 향상' }
      ]
    },
    {
      id: 5,
      title: '퇴거 전 정산 자료로 활용',
      description: '퇴거 시 청소, 벽면 손상, 가구 손실 등 다양한 항목에서 불필요한 공제 요구가 있습니다. 랜하우스 VR 기록은 퇴거 직전 상태를 정밀하게 보여줘 불필요한 감정싸움을 없애줍니다.',
      image: '/img/usecases/deposit-settlement.jpg',
      category: 'management',
      detail: '퇴거 시 보증금 정산은 임대인과 임차인 모두에게 민감한 문제입니다. 랜하우스의 VR 기록은 퇴거 직전 공간의 상태를 입주 시점과 비교하여 정확한 손상 정도를 평가할 수 있게 합니다. 이는 공정한 보증금 정산의 근거가 되어 양측 모두에게 투명하고 신뢰할 수 있는 정산 과정을 제공합니다.',
      stats: [
        { value: '95%', label: '정산 분쟁 감소' },
        { value: '2일', label: '평균 정산 기간 단축' },
        { value: '89%', label: '고객 만족도' }
      ]
    },
    {
      id: 6,
      title: '선별 임장을 통한 중개 효율 증가',
      description: '고객에게 먼저 VR로 매물을 보여준 뒤, 진짜 관심 있는 매물만 현장에서 임장을 진행할 수 있어 중개인의 시간과 에너지를 절약할 수 있습니다.',
      image: '/img/usecases/efficient-brokerage.jpg',
      category: 'commercial',
      detail: '부동산 중개 과정에서 가장 많은 시간과 에너지가 소요되는 것은 고객과의 현장 방문입니다. 랜하우스의 VR 투어를 통해 고객은 사전에 다양한 매물을 상세히 둘러볼 수 있으며, 실제로 관심 있는 물건만 선별하여 방문할 수 있습니다. 이는 중개인의 업무 효율성을 크게 높이고, 고객에게도 더 많은 선택지를 제공합니다.',
      stats: [
        { value: '60%', label: '불필요한 방문 감소' },
        { value: '3배', label: '일일 상담 가능 고객 증가' },
        { value: '78%', label: '계약 성사율 향상' }
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
        <SectionSubtitle>활용 사례</SectionSubtitle>
        <SectionTitle>랜하우스 VR! 이렇게 사용하세요</SectionTitle>
        
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
            임대차
          </TabButton>
          <TabButton 
            isActive={activeTab === 'commercial'} 
            onClick={() => setActiveTab('commercial')}
          >
            중개업
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
                  {caseItem.category === 'residential' && '임대차'}
                  {caseItem.category === 'commercial' && '중개용'}
                  {caseItem.category === 'management' && '관리용'}
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