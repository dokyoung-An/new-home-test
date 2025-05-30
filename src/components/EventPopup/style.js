import styled from 'styled-components';

/* 1) 오버레이: 화면 전체를 막지 않도록 최소 범위만 차지 */
export const PopupOverlay = styled.div`
  position: fixed;
  top: 50px;          /* ← 원하는 오프셋 그대로 */
  left: 20px;
  z-index: 1000;
  /* overlay 자체는 투명, 클릭 방해 X */
  pointer-events: none;
`;

/* 2) 컨테이너: 예쁜 카드 디자인 + 진짜 클릭 영역 */
export const PopupContainer = styled.div`
  /* pointer-events 복원: 팝업 자체만 클릭 가능 */
  pointer-events: auto;

  width: min(92vw, 480px);
  background: #fff;
  border-radius: 16px;
  padding: 32px 28px 36px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.18);
  overflow-y: auto;
  max-height: calc(100vh - 120px);

  /* 등장 애니메이션 (살짝 위→아래) */
  animation: fadeSlide 0.4s ease;

  /* 모바일에서 살짝 더 좁게 */
  @media (max-width: 480px) {
    width: calc(100vw - 40px);
    padding: 24px 20px 32px;
  }

  /* 스크롤바 숨김 */
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;


export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: #333;
    transform: rotate(90deg);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.primaryColor}40;
  }
`;

export const PopupHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const MainTitle = styled.h1`
  font-size: 28px;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size:20px;
  }
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  color: ${props => props.theme.secondaryColor};
  margin-bottom: 15px;
  @media (max-width: 480px) {
    font-size:16px;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size:14px;
    word-break: keep-all;
  }
`;

export const GuideSection = styled.div`
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
`;

export const GuideTitle = styled.h3`
  font-size: 18px;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 15px;

  @media (max-width: 480px) {
    font-size:14px;
  }
`;

export const GuideList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const GuideItem = styled.li`
  margin-bottom: 12px;
  font-size: 14px;
  color: #444;
  line-height: 1.6;
  word-break: keep-all;
  
  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    font-size:12px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: 500;


`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primaryColor};
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  margin-top: -10px;
`;

export const SuccessMessage = styled.div`
  color: #2ecc71;
  font-size: 14px;
  text-align: center;
  margin-top: -10px;
`;

export const SubmitButton = styled.button`
  background-color: ${props => props.theme.primaryColor};
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.primaryDark};
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`; 