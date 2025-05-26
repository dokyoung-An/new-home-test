import React from 'react';
import styled from 'styled-components';

const RefundPolicyPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={e => e.stopPropagation()}>
        <PopupHeader>
          <h2>환불 규정 안내</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </PopupHeader>
        <PopupBody>
          <Section>
            <h3>1. 환불 신청 기준</h3>
            <p>- VR 촬영 전: 계약금 100% 환불</p>
            <p>- VR 촬영 후, 편집 전: 계약금 50% 환불</p>
            <p>- VR 편집 완료 후: 환불 불가</p>
          </Section>
          
          <Section>
            <h3>2. 환불 처리 기간</h3>
            <p>- 환불 신청일로부터 영업일 기준 5일 이내 처리</p>
            <p>- 카드 결제 취소의 경우 카드사 사정에 따라 처리 기간이 추가될 수 있음</p>
          </Section>
          
          <Section>
            <h3>3. 특수한 경우</h3>
            <p>- 천재지변, 기상 악화 등으로 인한 촬영 불가 시: 100% 환불</p>
            <p>- 고객 사유로 인한 일정 변경: 1회 무료, 2회부터 추가 비용 발생</p>
          </Section>
          
          <Section>
            <h3>4. 문의 안내</h3>
            <p>- 환불 관련 문의: 1566-2539</p>
            <p>- 이메일 문의: lhs@lanhouse.kr</p>
            <p>- 운영 시간: 평일 09:00 ~ 17:30</p>
          </Section>
        </PopupBody>
      </PopupContent>
    </PopupOverlay>
  );
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #222;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }
`;

const PopupHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #1a1a1a;
  z-index: 1;
  
  h2 {
    margin: 0;
    color: #fff;
    font-size: 1.2rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`;

const PopupBody = styled.div`
  padding: 20px;
  color: #ccc;
`;

const Section = styled.div`
  margin-bottom: 24px;
  
  h3 {
    color: ${props => props.theme.primaryColor};
    font-size: 1rem;
    margin-bottom: 12px;
  }
  
  p {
    margin: 8px 0;
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

export default RefundPolicyPopup; 