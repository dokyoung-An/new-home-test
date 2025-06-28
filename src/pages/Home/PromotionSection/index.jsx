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
          <PromotionTitle>지금 신청하고<br />혜택 받으세요</PromotionTitle>
          <PromotionText>
          사전점검 전문 하방!<br />지금이 최고의 혜택을 누릴 기회입니다.
          </PromotionText>
          <Button 
            primary 
            large 
            onClick={handleClick}
            style={{
              background: 'linear-gradient(135deg, #1a6dff 0%, #00BFA6 100%)',
              border: 'none',
              boxShadow: '0 4px 20px rgba(26, 109, 255, 0.3)',
              transition: 'all 0.3s ease',
              color: '#FFFFFF',
              fontWeight: '600',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(26, 109, 255, 0.5)',
                background: 'linear-gradient(135deg, #1a6dff 0%, #bfdcff 100%)',
              }
            }}
          >
            서비스 문의하기
          </Button>
        </PromotionContent>
        
        <PromotionGrid>
  <PromotionCard index={0}>
    <div className="header">
      <div className="card-icon">📱</div>
      <h3>하자접수 앱 등록 무료</h3>
    </div>
    <ul>
      <li>현장 당일 접수 원칙 고수</li>
      <li>건설사 어플에 맞춰 꼼꼼히 작성</li>
      <li>접수 완료 후 입주민께 확인 요청</li>
    </ul>
  </PromotionCard>

  <PromotionCard index={1}>
    <div className="header">
      <div className="card-icon">🎁</div>
      <h3>2년간 VR 링크 무료 보관</h3>
    </div>
    <ul>
      <li>입주 후 2년 동안 VR 링크 유지</li>
      <li>분쟁 발생 시 증거 자료로 활용 가능</li>
      <li>월 과금 없이 프로모션 기간 신청 시 무료</li>
    </ul>
  </PromotionCard>

  <PromotionCard index={2}>
    <div className="header">
      <div className="card-icon">🛠️</div>
      <h3>무료 기술 지원</h3>
    </div>
    <ul>
      <li>VR 오류 발생 시 24시간 내 대응</li>
      <li>홈페이지 삽입용 코드 제공 가능</li>
      <li>1:1 전담 응대 서비스 제공</li>
    </ul>
  </PromotionCard>

  <PromotionCard index={3}>
    <div className="header">
      <div className="card-icon">📄</div>
      <h3>하자 리포트 PDF 제공</h3>
    </div>
    <ul>
      <li>점검 결과를 PDF 리포트로 제공</li>
      <li>분쟁 대응용 시각 자료로 활용 가능</li>
      <li>회원가입 없이 하방 홈페이지에서 자유롭게 다운로드</li>
    </ul>
  </PromotionCard>
</PromotionGrid>

      </PromotionContainer>
    </Promotion>
  );
};

export default PromotionSection; 