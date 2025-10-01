import styled from 'styled-components';

export const ProjectContainer = styled.section`
  padding: 100px 0;
 
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const ProjectContent = styled.div`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 30px;
  }
`;

export const ProjectLayout = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 60px;
  }
`;

export const YearBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #333333;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 28px;
  font-weight: 800;
  min-width: 80px;
  height: fit-content;
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 6px 16px;
    align-self: flex-start;
  }
`;

export const ProjectTitle = styled.h2`
  font-size: 32px;
  font-weight: 400;
  line-height: 1.5;
  color: #333;
  margin-bottom: 50px;
  word-break: keep-all;
  
  span {
    color: #007bff;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 40px;
    
    br {
      display: none;
    }
  }
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${props => props.active ? '#007bff' : '#ddd'};
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#0056b3' : '#f8f9fa'};
    border-color: ${props => props.active ? '#0056b3' : '#007bff'};
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const MoreButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #28a745;
  background: white;
  color: #28a745;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #28a745;
    color: white;
    text-decoration: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  margin-top: 5px;
  overflow: hidden;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: white;
  border: none;
  text-align: left;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
  flex: 1;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
    gap: 20px;
    width: 100%;
    justify-items: center;
  }
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

export const ProjectCard = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

export const ProjectInfo = styled.div`
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const ProjectName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ProjectLocation = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const BenefitSection = styled.div`
  margin-top: 60px;
  margin-left: 120px;
 padding: 0px 30px;
 
  
  
  @media (max-width: 768px) {
    margin-top: 40px;
    margin-left: 0px;
    padding: 0px 30px;
  }
`;

export const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 10px;
 
  
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    
  }
`;

export const BenefitCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  text-align:left;

  width: 100%;
  margin: 0 auto;
 
 
 
  
  @media (max-width: 768px) {
    padding: 20px 15px;
    text-align: left;
  }
`;

export const BenefitIcon = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  
  img {
    width: 43px;
    height: 43px;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
    
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

export const BenefitTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

export const BenefitDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
  color: #666;
  background: #f8f9fa;
  border-radius: 10px;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
    font-size: 1rem;
  }
`;