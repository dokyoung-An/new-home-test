import styled from 'styled-components';
import { slideUp, scroll } from '../../../styles/animations';

export const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
  padding: 0;
  
    
  @media (max-width: 768px) {
    overflow: hidden;
    padding: 0;
    width: 100%;
  
    
  }
`;

export const SliderTrack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: ${slideUp} 30s linear infinite;
  
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  
  &:hover {
    animation-play-state: paused;
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    animation: ${scroll} 50s linear infinite;
    width: fit-content;
    padding: 10px 0;
   
    
    
    & > div:nth-child(${props => props.children?.length / 2}):after {
      content: '';
      display: block;
      width: 20px;
    }
  }
`;

export const SlideContent = styled.div.attrs({
  className: 'slide-content'
})`
  padding: 35px;
  color: #fff;
  width: 100%;
  height: 100%;
  background-image: url(${props => `/img/${props.bgImage}`});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  will-change: transform;
  background-color: #222;
  
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(0, 0, 0, 0.2) 0%, 
      rgba(0, 0, 0, 0.3) 70%, 
      rgba(0, 0, 0, 0.5) 100%);
    z-index: 1;
    transition: background 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background: linear-gradient(to top, 
      rgba(0, 0, 0, 0.5) 0%, 
      rgba(0, 0, 0, 0.2) 40%, 
      rgba(0, 0, 0, 0) 100%);
    z-index: 1;
  }
  
  &.loading {
    &::before {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
  
  h3, p {
    position: relative;
    z-index: 2;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  
  }
  
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.primaryColor};
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }
    
    p {
      font-size: 0.9rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
     
    }
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    border: 2px solid red;
    
    h3 {
      font-size: 1.1rem;
    }
    
    p {
      font-size: 0.8rem;
      -webkit-line-clamp: 2;
      background-color: rgba(255,0,0,0.2);
    }
  }

 

`;

export const SlideItem = styled.div`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 16/9;
  padding: 0px;
  margin: 0 auto 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  overflow: visible;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background-image: url('/img/vr-icon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
    transition: opacity 1s ease;
    z-index: 10;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(180, 58, 27, 0.2);
    z-index: 10;
    
    &::before {
      opacity: 1;
    }
    
    .slide-content::before {
      background: linear-gradient(to bottom, 
        rgba(0, 0, 0, 0.1) 0%, 
        rgba(0, 0, 0, 0.2) 70%, 
        rgba(0, 0, 0, 0.4) 100%);
    }
  }
  
  @media (max-width: 768px) {
    height: 200px;
    margin: 0 10px;
    min-width: 280px;
    max-width: 280px;
    
    &:hover, &:active {
      transform: translateY(-5px) scale(1.03);
      box-shadow: 0 8px 15px rgba(180, 58, 27, 0.25);
      
      .slide-content::before {
        background: linear-gradient(to bottom, 
          rgba(0, 0, 0, 0.1) 0%, 
          rgba(0, 0, 0, 0.2) 70%, 
          rgba(0, 0, 0, 0.4) 100%);
      }
    }
    
    &:first-child {
      margin-left: 20px;
    }
    
    &:last-child {
      margin-right: 20px;
    }
  }
  
  @media (max-width: 480px) {
    height: 150px;
    margin: 0 8px;
    min-width: 220px;
    max-width: 220px;
  }
`;

export const ExperienceSlider = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 20px;
  position: relative;
  backdrop-filter: blur(5px);
  max-width: 600px;
  transition: height 0.3s ease, margin-top 0.3s ease;
  overflow: visible;
  z-index: 5;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  
  @media (max-width: 768px) {
    height: 300px;
    margin-top: 15px;
    max-width: 100%;
    width: 100vw;
    overflow: hidden;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    border-radius: 0;
  }
  
  @media (max-width: 480px) {
    border-radius: 0;
    height: 250px;
  }
`; 



