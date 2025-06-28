import styled, { keyframes } from 'styled-components';

export const PricingWrapper = styled.section` 
  background-color: #fff;
  background: url('/img/bg4.png') no-repeat center center;
  background-size: cover;
  transform: translateZ(0);
  will-change: transform;
  padding: 0px 0 40px 0;

  @media (max-width: 480px) {
    padding: 0px 0;
  }
`;

export const PricingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const SectionHeader = styled.div`
  text-align: left;
  margin-bottom: 0;
  flex: 0 0 35%;
  
  @media (max-width: 1024px) {
    margin-bottom: 40px;
    flex: 0 0 100%;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const SectionSubtitle = styled.h3`
  display: block;
  width: fit-content;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, ${props => props.theme.primaryDark}, ${props => props.theme.primaryColor});
  color: #fff;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 0 20px rgba(26, 109, 255, 0.3);
  animation: ${fadeIn} 1s ease-in-out 0.2s backwards;
  letter-spacing: 0.5px;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  position: relative;
  word-break: keep-all;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primaryColor}, ${({ theme }) => theme.primaryLight});
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

export const HighlightText = styled.div`
  color: ${({ theme }) => theme.primaryMiddle};
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: -10px;
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin: 0;
    margin-top: 0.5rem;
  }
`;

export const DescriptionText = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 30px auto 60px;
  line-height: 1.6;
  font-size: 17px;
  color: #555;
  word-break: keep-all;
  
  br {
    display: inline-block;
    content: '';
    margin: 8px 0;
  }
  
  @media (max-width: 768px) {
    margin: 25px auto 40px;
    font-size: 16px;
    padding: 0 5px;
  }
  
  @media (max-width: 480px) {
    margin: 20px auto 0px;
    font-size: 0.9rem;
    line-height: 1.5;
    br {
      margin: 5px 0;
    }
  }
`;

export const PricingPlans = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 0;
  flex: 0 0 65%;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
    flex: 0 0 100%;
  }
`;

export const PricingCard = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(26, 109, 255, 0.15);
  }
  
  &:nth-child(2) {
    border: 2px solid ${({ theme }) => theme.primaryMiddle};
    
    &::after {
      content: '추천';
      position: absolute;
      top: 15px;
      right: -35px;
      background-color: ${({ theme }) => theme.primaryMiddle};
      color: white;
      padding: 5px 40px;
      font-size: 12px;
      font-weight: 600;
      transform: rotate(45deg);
    }
  }

  &:nth-child(1), &:nth-child(3) {
    height: 70%;
    align-self: flex-start;
  }
  
  @media (max-width: 1024px) {
    margin-bottom: 20px;
    
    &:nth-child(1), &:nth-child(3) {
      height: 100%;
    }
  }
`;

export const CardNumber = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: rgba(26, 109, 255, 0.1);
  margin-bottom: -32px;
  margin-left: -8px;
  z-index: 0;
`;

export const CardTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #222;
  position: relative;
  z-index: 1;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const HighlightTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primaryMiddle};
  position: relative;
  z-index: 1;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgba(26, 109, 255, 0.1);
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const CardDescription = styled.div`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
  flex-grow: 1;
  
  ul {
    list-style: none;
    padding: 0 20px;
    margin: 24px 0 15px 0;
  }

  li {
    position: relative;
    padding-left: 28px;
    margin-bottom: 12px;
    line-height: 1.5;
    
    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 6px;
      width: 18px;
      height: 18px;
      background-color: ${({ theme }) => `${theme.primaryMiddle}15`};
      border-radius: 50%;
    }

    &::after {
      content: '✓';
      position: absolute;
      left: 4px;
      top: 2px;
      font-size: 12px;
      color: ${({ theme }) => theme.primaryMiddle};
    }
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    
    li {
      padding-left: 24px;
      margin-bottom: 10px;
      
      &::before {
        width: 16px;
        height: 16px;
        top: 5px;
      }
      
      &::after {
        font-size: 10px;
        left: 3px;
        top: 2px;
      }
    }
  }
`;

export const PricingBox = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.primaryDark}, ${({ theme }) => theme.primaryMiddle});
  border-radius: 12px;
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  box-shadow: 0 8px 20px rgba(26, 109, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SizeBadge = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  opacity: 0.9;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const VAT = styled.span`
  font-size: 12px;
  color: #fff;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const LastSection = styled.div`
  width: 100%;
  margin: 60px 0 0 0;
  padding: 80px 0;
  background: #fff;
  
  @media (max-width: 768px) {
    padding: 60px 0;
    margin-top: 40px;
  }
  
  @media (max-width: 480px) {
    padding: 40px 0;
    margin-top: 30px;
  }
`;

export const ServiceSectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  color: #333;
  margin-bottom: 50px;
  position: relative;
  display: inline-block;
  padding: 0 20px;
  
  &::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: ${({ theme }) => `${theme.primaryColor}08`};
    border-radius: 16px;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
  }
  
  .title-icon {
    position: absolute;
    left: -7px;
    top: 27%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    color: ${({ theme }) => `${theme.primaryColor}20`};
    stroke-width: 3;
    z-index: 1;
    rotate: -10deg;
  }
  
  .title-text {
    position: relative;
    z-index: 3;
    
    .highlight {
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 2px;
        width: 100%;
        height: 6px;
        background: linear-gradient(90deg, ${({ theme }) => theme.primaryColor}, #FFB74D);
        z-index: -1;
        opacity: 0.3;
      }
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 40px;
    
    &::before {
      width: 48px;
      height: 48px;
      left: -12px;
    }
    
    .title-icon {
      width: 40px;
      height: 40px;
      left: -8px;
    }
    
    .title-text .highlight::after {
      height: 2px;
      bottom: 1px;
    }
  }
`;

export const ServiceCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ServiceCard = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #f0f0f0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const ServiceIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ bgColor }) => bgColor || '#FFE8E2'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 16px;
    height: 16px;
    background-color: ${({ theme }) => theme.primaryMiddle};
    border-radius: 50%;
    border: 2px solid #fff;
  }
`;

export const ServiceTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 12px 0 8px;
  word-break: keep-all;
`;

export const ServiceDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  word-break: keep-all;
  margin: 0;
`;

export const CautionTitle = styled.h3`
  color: #333;
  font-size: 18px;
  font-weight: 700;
  position: relative;
  margin-left: 25px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: ${({ theme }) => theme.primaryMiddle};
    flex-shrink: 0;
  }
  
  &::before {
    content: "";
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${({ theme }) => theme.primaryColor}, ${({ theme }) => theme.primaryLight});
    position: absolute;
    left: -25px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0 2px 5px rgba(26, 109, 255, 0.3);
  }
  
  &.caution-title {
    margin-bottom: 15px;
    
    &::before {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const CautionBox = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
  margin-bottom: 30px;
  border-left: 5px solid ${({ theme }) => theme.primaryMiddle};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  
  p {
    font-size: 16px;
    color: #555;
    line-height: 1.7;
    padding:0 60px;
    word-break: keep-all;
    
    @media (max-width: 768px) {
      font-size: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 25px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const CautionNote = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 30px;
  margin-top: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid ${({ theme }) => theme.primaryMiddle};
  transition: transform 0.3s ease, box-shadow 0.3s ease;


  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, transparent 70%, rgba(26, 109, 255, 0.1));
    border-radius: 0 0 0 100%;
  }
  
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  
  p {
    font-size: 16px;
    color: #555;
    line-height: 1.7;
    padding:0 60px;
    word-break: keep-all;
    
    @media (max-width: 768px) {
      font-size: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 25px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;


export const Wrapper = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: #f9f9f9;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const PriceBox = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: #e6f0ff;
  color: #1557cc;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  text-align: center;
  word-break: keep-all;
  white-space: pre-line;

  .description {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color:${({ theme }) => theme.primaryMiddle};
    word-break: keep-all;
    white-space: pre-line;
    word-wrap: nowrap;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  .price {
    margin-top: 1rem;
    font-size: 2.3rem;
    span {
      font-size: 1rem;
      color: #555;
      font-weight: 400;
    }
  }
  .price-description {
    ul {
      list-style: disc;
      padding: 0;
      margin: 0;
      padding-left: 20px;
      width:73%;
      margin: 0 auto;
      margin-top: 1.5rem;
      li {
        font-size: 0.9rem;
        color: #555;
        font-weight: 400;
        margin-bottom: 0.2rem;
      }
     
      }
      @media (max-width: 480px) {
        ul {
          width: 100%;
          li {
            font-size: 0.8rem;
            text-align: left;
          }
        }
    }

  }
`;