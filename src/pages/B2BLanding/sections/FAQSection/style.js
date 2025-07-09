import styled from 'styled-components';
import { sectionSpacing } from '../../../../styles/common';

export const FAQWrapper = styled.div`
  ${sectionSpacing}
  background-color: #fff;
  background-image: url('/img/bg4.png');
  transform: translateZ(0);
  will-change: transform;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding-top: 50px;
 padding-bottom: 0px;

  @media (max-width: 480px) {
    padding: 0px 0;
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

export const FAQTitleWrapper = styled.div`
  position: relative;
  padding-left: 20px;
  margin-bottom: 40px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 80%;
    background: ${props => props.theme.primaryColor};
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    padding-left: 15px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    padding-left: 12px;
    margin-bottom: 20px;
  }
`;

export const FAQTitle = styled.div`
  position: relative;
  z-index: 1;

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
    font-size: 1.1rem;
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-top: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
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
    font-size: 1.2rem;
    padding: 20px 0;
    
    .icon {
      font-size: 1.375rem;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 16px 0;
    
    .icon {
      font-size: 1.25rem;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 14px 0;
    
    .icon {
      font-size: 1.125rem;
    }
  }
`;

export const FAQAnswer = styled.div`
  font-size: 1.1rem;
  color: ${props => props.theme.darkGray};
  line-height: 1.8;
  padding-bottom: ${props => props.isOpen ? '24px' : '0'};
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  white-space: pre-line;
  
  @media (max-width: 1024px) {
    font-size: 1rem;
    line-height: 1.7;
    padding-bottom: ${props => props.isOpen ? '20px' : '0'};
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.6;
    padding-bottom: ${props => props.isOpen ? '16px' : '0'};
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.6;
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