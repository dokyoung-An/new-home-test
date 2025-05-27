import styled from 'styled-components';

export const PopupOverlay = styled.div`
  position: fixed;
  top: 50px;
  left: 20px;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  width: 480px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  @media (max-width: 480px) {
    width: calc(100vw - 40px);
    padding: 20px;
  }
`;


export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
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