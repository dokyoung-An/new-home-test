import styled, { keyframes } from 'styled-components';
import { sectionSpacing } from '../../../styles/common';

// 애니메이션 효과
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shine = keyframes`
  from { background-position: -200% center; }
  to { background-position: 200% center; }
`;

const floatUp = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

// 메인 래퍼


export const UseCasesWrapper = styled.section`
  background-color: #f8f9fa;
  ${sectionSpacing}

  
  @media (max-width: 768px) {
    padding: 70px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 50px 20px;
  }
`;

// 제목 스타일
export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 50px;
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
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const SectionSubtitle = styled.h4`
  display: block;
  width: fit-content;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, ${props => props.theme.primaryDark}, ${props => props.theme.primaryColor});
  color: #fff;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 0 20px rgba(180, 58, 27, 0.3);
  animation: ${fadeIn} 1s ease-in-out 0.2s backwards;
  letter-spacing: 0.5px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

// 탭 스타일
export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 30px;
  }
`;

export const TabButton = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  background-color: ${props => props.isActive ? ({ theme }) => theme.primaryMiddle : '#fff'};
  color: ${props => props.isActive ? '#fff' : '#666'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(230, 92, 48, 0.1), rgba(255, 160, 122, 0.1));
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(230, 92, 48, 0.15);
    
    &::before {
      transform: translateX(0);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 15px;
    font-size: 12px;
  }
`;

// 카드 컨테이너
export const CaseCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
`;

// 카드 스타일
export const CaseCard = styled.div`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    
    &::after {
      opacity: 1;
    }
  }
  
  /* &::after {
    content: '자세히 보기';
    position: absolute;
    bottom: 15px;
    right: 15px;
    background-color: ${({ theme }) => theme.primaryMiddle};
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    opacity: 0;
    transition: opacity 0.3s ease;
  } */
`;

export const CardImage = styled.div`
  height: 200px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  
  ${CaseCard}:hover & {
    transform: scale(1.05);
  }
`;

export const CardContent = styled.div`
  padding: 20px;
  position: relative;
`;

export const CardBadge = styled.span`
  position: absolute;
  top: -15px;
  left: 20px;
  background-color: ${({ theme }) => theme.primaryMiddle};
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 5px 10px rgba(26, 109, 255, 0.3);
`;

export const CardTitle = styled.h3`
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  transition: color 0.3s ease;
  
  ${CaseCard}:hover & {
    color: ${({ theme }) => theme.primaryMiddle};
  }
`;

export const CardDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 상세보기 모달 스타일
export const DetailContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  overflow-y: auto;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 30px;
  
  h3 {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
    
    h3 {
      font-size: 1.6rem;
    }
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: rgba(230, 92, 48, 0.8);
    transform: rotate(90deg);
  }
  
  &:focus {
    outline: none;
  }
`;

export const DetailContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  padding: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

export const DetailImage = styled.div`
  width: 50%;
  height: 400px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
  }
`;

export const DetailDescription = styled.div`
  width: 45%;
  padding: 0 20px;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

export const DetailStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.primaryMiddle};
  margin-bottom: 8px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
`; 