import styled, { keyframes } from 'styled-components';
import { scroll } from '../../../styles/animations';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const highlightAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const Hero = styled.section`
  color: ${({ theme }) => theme.lightColor};
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8));
    z-index: 1;
  }
`;

export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

export const MainNav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const HeaderWrapper = styled.div`
  width: 1200px;
  max-width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  position: absolute;
  left: 40px;
  top: 40px;
  z-index: 10;
`;

export const NavLinks = styled.ul`
  display: flex;
  position: absolute;
  right: 40px;
  top: 40px;
  z-index: 10;

  li {
    margin-left: 40px;
  }

  a {
    font-size: 0.9rem;
    font-weight: 500;
    color: white;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeroContent = styled.div`
  text-align: left;
  margin-top: 18vh;
  margin-left: 0;
  padding-left: 40px;
  max-width: 1000px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    margin-top: 20vh;
    padding-left: 30px;
  }
`;

export const HeroTagline = styled.h4`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: inline-block;
  position: relative;
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.2s;
  color: rgba(255, 255, 255, 0.8);
  
  span {
    position: relative;
    padding-bottom: 8px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent, 
        ${props => props.theme.primaryMiddle}, 
        transparent
      );
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 84px;
  font-weight: 800;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  line-height: 1.1;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.4s;

  @media (max-width: 768px) {
    font-size: 60px;
    line-height: 1.2;
  
  }

  @media (max-width: 480px) {
    font-size: 42px;
  }
`;

export const HeroTitleHighlight = styled.span`
  font-size: 140px;
  font-weight: 900;
  margin-bottom: -10px;
  background: linear-gradient(90deg, #fff, #ffb74d, #fff);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  display: block;
  text-shadow: 0 0 20px rgba(255, 183, 77, 0.3);
  animation: ${highlightAnimation} 6s ease infinite;
  
  @media (max-width: 768px) {
    font-size: 90px;
  }

  @media (max-width: 480px) {
    font-size: 70px;
    margin-bottom: -10px;
  }
`;

export const HeroSubTitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  line-height: 1.7;
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.6s;
  position: relative;
  padding-left: 20px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.theme.primaryMiddle};
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding-left: 15px;
  }
`;

export const ArrowIcon = styled.span`
  margin-left: 10px;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
`;

export const CTAButton = styled.button`
  background: linear-gradient(to right, ${props => props.theme.primaryColor}, ${props => props.theme.primaryMiddle});
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 24px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  position: relative;
  overflow: hidden;
  max-width: 200px;
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.8s;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0)
    );
    transition: all 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    
    .arrow-icon {
      transform: translateX(5px);
    }
    
    &::after {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
    max-width: 180px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 12px 16px;
    max-width: 143px;
  }
`;

export const LogoSliderContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  overflow: hidden;
  padding: 30px 0 15px 0;
  z-index: 2;
`;

export const LogoSlider = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const SlideTrack = styled.div`
  display: flex;
  width: fit-content;
  animation: ${scroll} 10s linear infinite;
`;

export const SliderLogo = styled.img`
  height: 120px;
  margin: 0 30px;
  opacity: 0.7;
  
  @media (max-width: 768px) {
    height: 80px;
    margin: 0 20px;
  }
  
  @media (max-width: 480px) {
    height: 60px;
    margin: 0 15px;
  }
`; 
