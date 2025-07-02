import styled, { keyframes } from 'styled-components';
import { sectionSpacing } from '../../../styles/common';


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
  background: ${({ theme }) => `linear-gradient(to bottom, ${theme.background}, ${theme.cardBackground})`};
  position: relative;
  overflow: hidden;
  ${sectionSpacing}

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
  font-size: 32px;
  font-weight: bold;
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

export const SectionSubtitle = styled.h3`
  font-size: 18px;
  color: #1a6dff;
  margin-bottom: 16px;
`;

export const DescriptionText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.6;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

export const RequiredMark = styled.span`
  color: #ff4d4f;
  margin-left: 4px;
`;

export const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #1a6dff;
  }
`;

export const PriceBox = styled.div`
  background-color: #f8f9fa;
  padding: 24px;
  border-radius: 12px;
  margin-top: 20px;

  .description {
    font-size: 16px;
    color: #333;
    margin-bottom: 16px;
    white-space: pre-line;
  }

  .price {
    font-size: 24px;
    font-weight: bold;
    color: #1a6dff;
    margin-bottom: 16px;

    span {
      font-size: 14px;
      color: #666;
      margin-left: 8px;
    }
  }

  .price-description {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        font-size: 14px;
        color: #666;
        margin-bottom: 8px;
        position: relative;
        padding-left: 20px;

        &:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #1a6dff;
        }
      }
    }
  }
`;

export const SectionDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 40px;
  max-width: 500px;
  padding-left: 10px;
  
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
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  
  &.active {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const FormInner = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  position: relative;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    width: 95%;
    padding: 30px 20px;
  }
`;

export const FormTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: left;
  color: #000;
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
  text-align: left;
`;

export const Form = styled.form`
  width: 100%;
`;

export const FormRow = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }

  &::placeholder {
    color: #999;
  }
`;

export const TextArea = styled.textarea`
  padding: 16px;
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  min-height: 200px;
  height: 200px;
  resize: none;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryMiddle};
    background: ${({ theme }) => theme.inputBackgroundFocus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textLight};
  }

  @media (max-width: 480px) {
    min-height: 100px;
    height: 100px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primaryDarkColor};
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
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #000;
  padding: 5px;
  
  &:hover {
    opacity: 0.7;
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
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  height: auto;
  
  @media (max-width: 768px) {
    padding: 20px;
    height: auto;
  }
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
  margin-top: 20px;
  height: auto;
  overflow-y: visible;
  
  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

export const InquiryItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 100px;
  align-items: center;
  gap: 20px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(26, 109, 255, 0.05);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr 80px;
    gap: 10px;
    padding: 10px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 50px 1fr 70px;
    gap: 8px;
    padding: 8px;
    font-size: 0.85rem;
  }
`;

export const InquiryId = styled.div`
  color: ${({ theme }) => theme.primaryDark};
  font-weight: 600;
`;

export const InquiryContent = styled.div`
  display: grid;
  gap: 4px;
  
  .region {
    font-size: 0.9em;
    color: ${({ theme }) => theme.textColor};
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    .region {
      font-size: 0.85em;
    }
  }
`;

export const InquiryStatus = styled.div`
  padding: 6px 8px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 500;
  text-align: center;
  min-width: 80px;
  
 

  ${props => {
    switch (props.status) {
      case 'completed':
        return `
          background-color: #1a6dff;
          color: #fff;
        `;
      case 'in-progress':
        return `
         background-color: #FFD600;
          color: #fff;
        `;
      default:
        return `
          background-color:#00BFA6;
          color: #fff;
        `;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'completed':
        return '#15803d';
      case 'in_progress':
        return theme.primaryDark;
      default:
        return theme.textColor;
    }
  }};
  
  @media (max-width: 768px) {
    padding: 4px 6px;
    font-size: 0.85em;
  }
`;

export const StatusButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;

  ${props => {
    switch (props.status) {
      case 'completed':
        return 'background-color: #FFD600;';
      case 'in-progress':
        return 'background-color: #00C4B4;';
      default:
        return 'background-color: #1a6dff;';
    }
  }}

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

// ... 기존 스타일 컴포넌트들 ...

export const Sections = styled.div`
 
`;

export const TableContainer = styled.div`
  width: 100%;
  margin-top: 100px;
 
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

 

  @media (max-width: 768px) {
    display: none;
  }
`;



export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
 
  margin-bottom: 20px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding-bottom: 20px;
    border-bottom: 2px solid #222;
  }
`;

export const MobileTable = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileRow = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  background: white;

  .apartment {
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 8px;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info-left {
    display: flex;
    gap: 12px;
    color: #666;
    font-size: 14px;
  }

  .name {
    position: relative;
    padding-right: 12px;
    
    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 12px;
      background-color: #ddd;
    }
  }

  .date {
    color: #666;
  }
`;

export const Th = styled.th`
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  color: #333;
  background-color: #f8f9fa;
`;

export const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #eee;
  color: #666;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;

 
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

   
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:0px;
    
  }
`;

export const StatBox = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 20px;
  flex: 1;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const StatIcon = styled.div`
  width: 78px;
  height: 78px;
  background-color: #E8F1FF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  
  svg {
    width: 34px;
    height: 34px;
    color: #0066FF;
  }
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 0px;
  }
`;

export const StatLabel = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const StatNumber = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  line-height: 1;
  
  &::after {
    content: '건';
    font-size: 1rem;
    margin-left: 4px;
    color: #666;
  }
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const LoadMoreButton = styled.button`
  display: none;
  width: 100%;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 20px;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PageButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#4285F4' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#3367D6' : '#f5f5f5'};
  }
`;

export const TableTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
`;

export const TitleBoxContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Titles = styled.h2`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const TitleContainer = styled.div`
  background-color: #F8F9FA;
  padding: 30px 0;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

export const TitleBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin-top: -50px;
  }
`;



export const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 50px;
`;

export const ButtonGroup = styled.div`
  
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
     width: 100%;
     justify-content: center;
     align-items: center;
  
  }

`;

export const Button = styled.button`
  padding: 15px 30px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#4285F4' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 1.2rem;

  &:hover {
    background: ${props => props.active ? '#3367D6' : '#f5f5f5'};
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 400;
    width: 50%;
    
  }
`;

export const LookupModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const LookupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
`;

export const LookupInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}20`};
  }
`;

export const LookupButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
  }
`;

export const InquiryDetails = styled.div`
  margin-top: 32px;
  padding: 24px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  animation: ${fadeIn} 0.3s ease-out;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.text};
  }

  p {
    margin-bottom: 12px;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.textLight};
    line-height: 1.6;

    strong {
      color: ${({ theme }) => theme.text};
      margin-right: 8px;
    }
  }
`;

export const DeleteButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: #ff7875;
  }
`;

export const NoDataMessage = styled.p`
  text-align: center;
  color: #ff4d4f;
  margin-top: 16px;
  font-size: 0.95rem;
`;