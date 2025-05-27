import styled from 'styled-components';
import { sectionSpacing, SectionTitle as CommonSectionTitle, SectionSubtitle as CommonSectionSubtitle } from '../../../styles/common';

export const Benefits = styled.section`
  ${sectionSpacing}
  background-color: #ffffff;
  text-align: center;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 40px 0;
  }
`;

export const SectionContainer = styled.div`
  position: relative;
  z-index: 2;
`;

export const SectionTitle = styled(CommonSectionTitle)`
  color: ${({ theme }) => theme.secondaryColor};
  position: relative;
  display: inline-block;
  font-size: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const SectionSubtitle = styled(CommonSectionSubtitle)`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const BenefitsMent = styled.div`
  padding: 20px 40px;
  background-color: white;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  max-width: 800px;
  word-break: keep-all;
  
  p {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
    font-weight: 500;
    padding-left: 10px;
    line-height: 1.6;
    word-break: keep-all;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
      line-height: 1.8;
    }
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 50px;
  gap: 20px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-top: 40px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    margin-top: 30px;
    padding: 0 10px;
  }
`;

export const StatBox = styled.div`
  padding: 25px 20px;
  flex: 1;
  min-width: 220px;
  max-width: 280px;
  background-color: white;
  border-radius: 15px;
  transition: all 0.3s ease;
  position: relative;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    min-width: unset;
    max-width: unset;
    width: 100%;
    padding: 20px 15px;
    margin: 0;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const StatTitle = styled.div`
  font-size: 1.1rem;
  color: #555;
  font-weight: 600;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
`;

export const StatBoxContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  
  @media (max-width: 480px) {
    align-items: center;
  }
`;

export const PlusSign = styled.div`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 3rem;
  font-weight: bold;
  margin-right: 5px;
  line-height: 1;
  margin-top: 2px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    margin-top: 0;
    font-size: 1.8rem;
  }
`;

export const StatNumber = styled.h3`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const Unit = styled.span`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 5px;
  display: inline-block;
  align-self: flex-start;
  padding-top: 30px;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding-top: 20px;
  }
  
  @media (max-width: 480px) {
    padding-top: 0;
    font-size: 1rem;
  }
  
  &.per {
    font-size: 3.5rem;
    margin-top: -30px;
    
    @media (max-width: 768px) {
      font-size: 2.8rem;
      margin-top: -25px;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
      margin-top: 0;
    }
  }
`;

export const StatIcon = styled.div`
  margin-bottom: 15px;
  background-color: rgba(255, 102, 0, 0.1);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  transition: all 0.3s ease;
  
  ${StatBox}:hover & {
    transform: scale(1.1);
    background-color: rgba(255, 102, 0, 0.15);
  }
`; 