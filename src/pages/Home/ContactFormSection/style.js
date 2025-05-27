import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

export const ContactSection = styled.section`
  padding: 140px 0;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 80px 0;
  }
`;

export const ContactContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 60px;
    padding: 0 20px;
  }
`;

export const ContentSection = styled.div`
  position: relative;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
  line-height: 1.2;

  span {
    color: ${({ theme }) => theme.primaryMiddle};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-left: 20px;
  }
`;

export const SectionDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 40px;
  max-width: 500px;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 40px;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const FeatureIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: ${({ theme }) => `${theme.primaryLight}15`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primaryMiddle};
  font-size: 17px;
  flex-shrink: 0;
`;

export const FeatureContent = styled.div``;

export const FeatureTitle = styled.h4`
  font-size: 0.84rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 6px;
  
  @media (max-width: 480px) {
    font-size: 0.77rem;
  }
`;

export const FeatureDescription = styled.p`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 0.63rem;
  }
`;

export const FormSection = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 30px;
  padding: 50px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: ${fadeIn} 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    right: -10px;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background: ${({ theme }) => theme.primaryGradient};
    z-index: -1;
    opacity: 0.1;
  }

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

export const DesignElement1 = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 15px;
  height: 15px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primaryMiddle}, ${({ theme }) => theme.primaryLight});
  border-radius: 4px;
  opacity: 0.9;
  transform: rotate(-15deg);
  z-index: 1;

  @media (max-width: 480px) {
    top: 10px;
    left: 0px;
  }
`;

export const DesignElement2 = styled.div`
  position: absolute;
  top: -30px;
  left: -35px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #E65C30, #FF7F50);
  border-radius: 5px;
  opacity: 0.85;
  transform: rotate(10deg);
  z-index: 0;
 
  @media (max-width: 480px) {
    top: -25px;
    left: 18px;
  }
`;

export const DesignElement3 = styled.div`
  position: absolute;
  top: 0px;
  left: -40px;
  width: 25px;
  height: 25px;
  background: linear-gradient(135deg, #FF6B3D, #FF8960);
  border-radius: 6px;
  opacity: 0.95;
  transform: rotate(25deg);
  z-index: 2;

  @media (max-width: 480px) {
    top: -20px;
    left: -15px;
  }
`;

export const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 2px;
    width: 100%;
    height: 6px;
    background: linear-gradient(135deg, rgb(245, 190, 90),rgb(248, 201, 201),rgb(245, 190, 90));
    transform: scaleX(0);
    transform-origin: bottom right;
    animation: underlineAnimation 0.6s ease-out forwards;
    z-index: -1;
  }

  @keyframes underlineAnimation {
    to {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.error || '#ff4d4f'};
  margin-left: 4px;
`;

export const FormSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 40px;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr'};
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export const Input = styled.input`
  padding: 16px;
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryMiddle};
    background: ${({ theme }) => theme.inputBackgroundFocus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textLight};
  }
`;

export const TextArea = styled.textarea`
  padding: 16px;
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryMiddle};
    background: ${({ theme }) => theme.inputBackgroundFocus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textLight};
  }
`;

export const SubmitButton = styled.button`
  padding: 18px;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 107, 107, 0.2);
    background: linear-gradient(135deg, #FF8E53, #FF6B6B);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const VRPreviewSection = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 24px;
  overflow: hidden;
  margin-top: 60px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${floatAnimation} 6s ease-in-out infinite;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      transparent 60%,
      ${({ theme }) => theme.primaryMiddle}40
    );
  }
`;

export const VRPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const VRPopupContent = styled.div`
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  background-color: #000;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  padding: 20px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  @media (max-width: 480px) {
    width: 98%;
    padding: 10px;
    max-height: 85vh;
  }
  
  /* 모바일 가로 모드 대응 */
  @media (max-height: 500px) and (orientation: landscape) {
    max-height: 95vh;
    padding: 10px;
  }
`;

export const VRPopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
    padding-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
    padding-bottom: 6px;
  }
`;

export const VRPopupTitle = styled.h3`
  color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

export const IframeContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 비율 */
  overflow: hidden;
`;

export const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  
  @media (max-width: 768px) {
    border-radius: 6px;
  }
`;

export const SlideSection = styled.div`
  flex: 1;
  position: relative;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  transform: perspective(1000px) rotateY(${props => props.rotateDirection === 'right' ? '5deg' : '-5deg'});
  transition: all 1.5s linear;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 80px;
  cursor: pointer;

  &:hover {
    transform: perspective(1000px) rotateY(0deg);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 400px;
    transform: none;
    margin-top: 60px;

    &:hover {
      transform: none;
    }
  }
`;

export const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.4), transparent);
  }
`;

export const SlideOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: #fff;
  z-index: 2;
`;

export const SlideTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 20px;
    height: 2px;
    background: ${({ theme }) => theme.primaryMiddle};
    border-radius: 1px;
  }
`;

export const SlideDescription = styled.p`
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`; 

// ... 기존 imports 및 스타일 ...

export const InquiryBoard = styled.div`
  margin-top: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

export const InquiryBoardTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.secondaryColor};
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const InquiryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primaryColor};
    border-radius: 3px;
  }
  @media (max-width: 768px) {
    max-height: 200px;
    
  }
`;

export const InquiryItem = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 80px;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  background: white;
  transition: all 0.2s ease;
  border-bottom: 1px solid #e0e0e0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const InquiryId = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

export const InquiryContent = styled.div`
  display: grid;
  grid-template-columns: 1fr  0.33fr;
  gap: 10px;
  font-size: 0.9rem;
  color: #333;
  vertical-align: middle;
  
  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
  }

  .region {
    font-size: 0.7rem;
    padding-top: 5px;
    color: #666;
    
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 5px;
  }
`;

export const InquiryStatus = styled.div`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  min-width: 80px;
  
  ${props => {
    switch (props.status) {
      case 'completed':
        return `
          background-color: #e8f5e9;
          color: #2e7d32;
        `;
      case 'in-progress':
        return `
          background-color: #fff3e0;
          color: #ef6c00;
        `;
      default:
        return `
          background-color: #e3f2fd;
          color: #1976d2;
        `;
    }
  }}
`;

// ... 기존 스타일 컴포넌트들 ...