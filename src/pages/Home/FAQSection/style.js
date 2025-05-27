import styled from 'styled-components';
import { sectionSpacing } from '../../../styles/common';

export const FAQWrapper = styled.div`
  ${sectionSpacing}
  background-color: #fff;
  padding: 100px 0;
  background-image: url('/img/formbg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

export const DesignElement1 = styled.div`
  position: absolute;
  top: 85px;
  left: calc((100% - 1200px) / 2 - 20px);
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #E65C30, #FF7F50);
  border-radius: 6px;
  opacity: 0.9;
  transform: rotate(-15deg);
  
  @media (max-width: 1240px) {
    left: 10px;
  }
  
  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
    top: 65px;
  }
`;

export const DesignElement2 = styled.div`
  position: absolute;
  top: 65px;
  left: calc((100% - 1200px) / 2 + 10px);
  width: 25px;
  height: 25px;
  background: linear-gradient(135deg, #FF9F45, #FFB067);
  border-radius: 8px;
  opacity: 0.85;
  transform: rotate(10deg);
  
  @media (max-width: 1240px) {
    left: 40px;
  }
  
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
    top: 45px;
  }
`;

export const DesignElement3 = styled.div`
  position: absolute;
  top: 105px;
  left: calc((100% - 1200px) / 2 - 5px);
  width: 15px;
  height: 15px;
  background: linear-gradient(135deg, #FF6B3D, #FF8960);
  border-radius: 5px;
  opacity: 0.95;
  transform: rotate(30deg);
  
  @media (max-width: 1240px) {
    left: 25px;
  }
  
  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
    top: 80px;
  }
`;

export const FAQContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 80px;
  align-items: flex-start;
  position: relative;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 0 20px;
  }
`;

// ... existing code ...

export const FAQTitle = styled.div`
  h2, h3 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
    
    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.75rem;
    }
  }
  
  h2 {
    color: ${props => props.theme.secondaryColor};
  }
  
  h3 {
    color: ${props => props.theme.primaryColor};
  }
`;

export const FAQDescription = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.darkGray};
  margin-top: 24px;
  line-height: 1.6;
  max-width: 400px;
  
  @media (max-width: 1024px) {
    font-size: 1rem;
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9375rem;
    margin-top: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.875rem;
    margin-top: 16px;
  }
`;

export const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    gap: 4px;
  }
`;

export const FAQItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.grayColor};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${props => props.theme.secondaryColor};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primaryColor};
  }
  
  .icon {
    font-size: 1.5rem;
    color: ${props => props.theme.primaryColor};
    font-weight: 300;
  }
  
  @media (max-width: 1024px) {
    font-size: 1.125rem;
    padding: 20px 0;
    
    .icon {
      font-size: 1.375rem;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 16px 0;
    
    .icon {
      font-size: 1.25rem;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 0.9375rem;
    padding: 14px 0;
    
    .icon {
      font-size: 1.125rem;
    }
  }
`;

export const FAQAnswer = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.darkGray};
  line-height: 1.8;
  padding-bottom: ${props => props.isOpen ? '24px' : '0'};
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  white-space: pre-line;
  
  @media (max-width: 1024px) {
    font-size: 0.9375rem;
    line-height: 1.7;
    padding-bottom: ${props => props.isOpen ? '20px' : '0'};
  }
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
    line-height: 1.6;
    padding-bottom: ${props => props.isOpen ? '16px' : '0'};
  }
  
  @media (max-width: 480px) {
    font-size: 0.8125rem;
    line-height: 1.5;
    padding-bottom: ${props => props.isOpen ? '14px' : '0'};
  }
`;

export const MoreFAQLink = styled.a`
  display: inline-block;
  margin-top: 40px;
  color: ${props => props.theme.primaryColor};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primaryDark};
  }
  
  @media (max-width: 1024px) {
    font-size: 0.9375rem;
    margin-top: 32px;
  }
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-top: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8125rem;
    margin-top: 24px;
  }
`;

// ... existing code ...