import React from 'react';
import Button from '../../../components/common/Button';
import {
  Promotion,
  PromotionTitle,
  PromotionText,
  PromotionGrid,
  PromotionCard,
  PromotionContainer,
  PromotionContent,
  TitleDecoration,
  VideoBackground
} from './style';

const PromotionSection = () => {
  const handleClick = () => {
    const contactSection = document.getElementById('ContactFormSection');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Promotion id="PromotionSection">
       <VideoBackground autoPlay muted loop playsInline>
        <source src="/img/event2.mp4" type="video/mp4" />
      </VideoBackground>
      <PromotionContainer>
        <PromotionContent>
          <TitleDecoration />
          <PromotionTitle>지금! 신청하고<br />혜택 받으세요</PromotionTitle>
          <PromotionText>
            서비스 런칭 기념 프로모션! 호스팅 연장, 무료 기술 지원, 마케팅 기술 지원 등
            다양한 혜택을 제공합니다.
          </PromotionText>
          <Button 
            primary 
            large 
            onClick={handleClick}
            style={{
              background: 'linear-gradient(135deg, #E65C30 0%, #FF7F50 100%)',
              border: 'none',
              boxShadow: '0 4px 20px rgba(230, 92, 48, 0.3)',
              transition: 'all 0.3s ease',
              color: '#FFFFFF',
              fontWeight: '600',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(230, 92, 48, 0.5)',
                background: 'linear-gradient(135deg, #FF7F50 0%, #E65C30 100%)',
              }
            }}
          >
            서비스 문의하기
          </Button>
        </PromotionContent>
        
        <PromotionGrid>
          <PromotionCard index={0}>
            <div className="header">
              <div className="card-icon">🎁</div>
              <h3>2년간 링크 유지</h3>
            </div>
            <ul>
              <li>임대차 기간과 동일한 24개월 링크 보존</li>
              <li>소송 대비 자료로도 활용 가능</li>
              <li>기존 월 과금형 &rarr; 프로모션 기간 신청 시 2년 무료 제공</li>
            </ul>
          </PromotionCard>
          
          <PromotionCard index={1}>
            <div className="header">
              <div className="card-icon">🚀</div>
              <h3>커스텀 인터페이스로 마케팅 지원</h3>
            </div>
            <ul>
              <li>VR에 원하는 로고 삽입</li>
              <li>전화번호 & 홈페이지 링크 & 채널 링크 삽입</li>
              <li>기존 옵션 선택 사항 &rarr; 프로모션 기간 중 무료 제공</li>
            </ul>
          </PromotionCard>
          
          <PromotionCard index={2}>
            <div className="header">
              <div className="card-icon">🔗</div>
              <h3>임대계약서 첨부 기능</h3>
            </div>
            <ul>
              <li>임대차 기간 동안 계약사항 상시 보관</li>
              <li>보관 중인 계약서에 변경 이력 기록 가능(예: 중도 해지, 연장 조건 등)</li>
              <li>기존 월 과금형 &rarr; 프로모션 기간 신청 시 2년 무료 제공</li>
            </ul>
          </PromotionCard>
          
          <PromotionCard index={3}>
            <div className="header">
              <div className="card-icon">🛠️</div>
              <h3>무료 기술 지원</h3>
            </div>
            <ul>
              <li>VR 링크 오류 발생 시 24시간 내 문제 해결</li>
              <li>홈페이지 삽입이 어려울 경우 직접 코드 전달</li>
              <li>문의 시 담당자가 직접 1:1로 응대해 드립니다</li>
            </ul>
          </PromotionCard>
        </PromotionGrid>
      </PromotionContainer>
    </Promotion>
  );
};

export default PromotionSection; 