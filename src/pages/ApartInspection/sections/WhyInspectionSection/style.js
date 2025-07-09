import styled, { keyframes } from 'styled-components';
import { fadeIn } from '../../../../styles/animations';
import { IoCheckmarkSharp } from 'react-icons/io5';

const fadeInOut = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.02);
  }
  20% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.02);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const WhyInspectionWrapper = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  width: 100%;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, #f8f9ff);
    pointer-events: none;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 80px;
  align-items: center;
  width: 100%;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 60px;
  }
`;

export const TextContent = styled.div`
  flex: 1;
  padding-right: 20px;
  max-width: 600px;

  @media (max-width: 1024px) {
    padding-right: 0;
    max-width: 100%;
    text-align: center;
  }
`;

export const Slogan = styled.p`
  color: #2D5BFF;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  animation: ${slideUp} 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  animation: ${slideUp} 0.8s ease-out;
  
  span {
    display: block;
    color: #2D5BFF;
  }
  
  @media (max-width: 1200px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 300;
  color: #333;
  margin-bottom: 2rem;
  line-height: 1.4;
  animation: ${slideUp} 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 3rem;
  animation: ${slideUp} 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`;

export const PointList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  animation: ${slideUp} 0.8s ease-out;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    text-align: left;
    gap: 12px;
  }
`;

export const PointItem = styled.li`
  position: relative;
  padding-left: 35px;
  font-size: 1.05rem;
  color: #555;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  line-height: 1.6;
  
  strong {
    font-weight: 600;
    color: #2D5BFF;
    margin-right: 4px;
  }
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    background-color: rgba(45, 91, 255, 0.08);
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  svg {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: #2D5BFF;
    font-size: 12px;
    opacity: 0.9;
  }
  
  &:hover {
    transform: translateX(5px);
    
    &:before {
      background-color: rgba(45, 91, 255, 0.12);
    }
    
    svg {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding-left: 30px;
    
    
    &:before {
      width: 18px;
      height: 18px;
    }
    
    svg {
      left: 4px;
      font-size: 10px;
    }
  }
`;

export const CheckIcon = styled(IoCheckmarkSharp)`
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: #2D5BFF;
  font-size: 12px;
 
`;

export const ImageSlideContainer = styled.div`
  flex: 1;
  position: relative;
  min-width: 300px;
  height: 600px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid rgba(45, 91, 255, 0.1);
    border-radius: 30px;
    pointer-events: none;
    z-index: 1;
  }
  
  @media (max-width: 1200px) {
    height: 500px;
  }
  
  @media (max-width: 1024px) {
    width: 100%;
    height: 400px;
    min-height: 400px;
  }
  
  @media (max-width: 768px) {
    height: 300px;
    min-height: 300px;
    border-radius: 20px;
    
    &:before {
      border-radius: 20px;
    }
  }
`;

export const SlideImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.$isActive ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  animation: ${props => props.$isActive ? fadeInOut : 'none'} 4s ease-in-out;

  &:after {
    content: '${props => props.$caption}';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: white;
    font-size: 1rem;
    font-weight: 500;
    
    @media (max-width: 768px) {
      padding: 15px;
      font-size: 0.9rem;
    }
  }
`; 