import styled from 'styled-components';

export const ContactContainer = styled.section`
  padding: 100px 0;
  background: #f8f9fb;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const ContactTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  text-align: left;
  margin-bottom: 16px;
  word-break: keep-all;
  
  span {
    color: #4285f4;
  }
  img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
`;

export const ContactSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  text-align: left;
  margin-bottom: 30px;
  line-height: 1.6;
  word-break: keep-all;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 40px;
    padding: 0px;
    br {
      display: none;
    }
  }
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const LeftSection = styled.div`
  width: 100%;
`;

export const FormContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    border-radius: 15px;
  }
`;

export const FormTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

export const FormDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
  word-break: keep-all;
  
  br {
    display: none;
  }
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 25px;
    br {
      display: block;
    }
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  word-break: keep-all;
  
  span {
    color: #ff4444;
    margin-left: 2px;
  }
`;

export const FormInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4285f4;
    box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
  
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 16px; /* iOS zoom 방지 */
  }
`;

export const FormTextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4285f4;
    box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
  
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 16px; /* iOS zoom 방지 */
    min-height: 70px;
  }
`;

export const FormSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4285f4;
    box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 16px; /* iOS zoom 방지 */
  }
`;

export const SubmitButton = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover:not(:disabled) {
    background: #3367d6;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(66, 133, 244, 0.3);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 768px) {
    padding: 14px 20px;
    font-size: 15px;
  }
`;

export const RightSection = styled.div`
  width: 100%;
`;

export const RecentInquiries = styled.div`

  border-radius: 20px;
  padding: 20px;
  
  
  @media (max-width: 768px) {
    padding: 0px;
    border-radius: 15px;
  }
`;

export const InquiryTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

export const InquiryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

export const InquiryTableHeader = styled.thead`
  background: #f8f9fb;
`;

export const InquiryHeaderRow = styled.tr``;

export const InquiryHeaderCell = styled.th`
  padding: 16px 12px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  
  &:nth-child(1) { width: 60px; }  /* 날짜 */
  &:nth-child(2) { width: auto; }  /* 아파트명 */
  &:nth-child(3) { width: 80px; }  /* 문의자 */
  &:nth-child(4) { 
    width: 90px; 
    text-align: center; 
  }  /* 상태 */
  
  @media (max-width: 768px) {
    padding: 12px 6px;
    font-size: 11px;
    
    &:nth-child(1) { width: 40px; }
    &:nth-child(2) { width: 40px; }
    &:nth-child(3) { width: 60px; }
    &:nth-child(4) { width: 80px; }
  }
`;

export const InquiryTableBody = styled.tbody``;

export const InquiryTableRow = styled.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f8f9fb;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const InquiryTableCell = styled.td`
  padding: 14px 12px;
  vertical-align: middle;
  
  &:nth-child(7) {
    text-align: center;
  }
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 11px;
  }
`;

export const DateText = styled.span`
  font-size: 12px;
  color: #666;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const ApartmentText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 2px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const RegionText = styled.div`
  font-size: 12px;
  color: #999;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const NameText = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


export const StatusBadge = styled.span`
  font-size: 11px;
  padding: 6px 8px;
  border-radius: 12px;
  background: ${props => props.color || '#FF9800'};
  color: white;
  font-weight: 500;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 8px;
  }
`;

export const NoInquiries = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
  
  @media (max-width: 768px) {
    padding: 30px 15px;
    font-size: 13px;
  }
`;
