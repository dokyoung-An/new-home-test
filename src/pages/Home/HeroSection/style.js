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
  z-index: 1;
  background: url('/img/bg-poster.png') center center/cover no-repeat;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:rgb(7, 16, 42);
    opacity: 0.5;
    z-index: 2;
  }
`;

export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease-in;
  
  &.loaded {
    opacity: 1;
  }
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
  padding-left: 0px;
  max-width: 1000px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    margin-top: 20vh;
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    align-items: center;
  }
`;

export const HeroTagline = styled.h4`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: inline-block;
  position: relative;
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.2s;
  color: rgba(255, 255, 255, 0.8);
  padding-left: 0;
  
  span {
    position: relative;
    padding-bottom: 8px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, 
        transparent, 
rgba(162, 89, 255,0.4), 
rgba(0, 191, 166,0.5), 
rgba(21, 87, 204,0.4),
transparent
      );
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
    align-self: center;
    margin-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 84px;
  font-weight: 800;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  line-height: 1.1;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.4s;
  padding-left: 0;
  margin-top: -5px;

  @media (max-width: 768px) {
    font-size: 60px;
    line-height: 1.2;
    align-items: center;
    margin-top: 0;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 42px;
  }
`;

export const HeroTitleHighlight = styled.span`
  font-size: 135px;
  font-weight: 900;
  display: inline-block;

  background: linear-gradient(180deg, #e3efff,#1a6dff, #1557cc);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  font-family: "Noto Sans", sans-serif;
  background-clip: text;
  transform: scale(0.98,1.01);
  letter-spacing: -2px;
  display: block;
  margin-left: -15px;
  /* transform:scale(0.95,1.01); */
  text-shadow: 0 0 20px rgba(26, 109, 255, 0.3);
  animation: ${highlightAnimation} 6s ease infinite;

  span{
    font-weight: 800;
  }
  
  @media (max-width: 768px) {
    font-size: 90px;
    margin-left: 0;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 70px;
    margin-bottom:0px;
  }
`;

export const HeroSubTitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  line-height: 1.5;
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.6s;
  position: relative;
  padding-left: 0;
  word-break: keep-all;
  
br{
  display: none;
}

  @media (max-width: 768px) {
    font-size: 16px;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: auto;
    margin-right: auto;
    br{
      display: block;
    }
  }
`;



export const CTAButton = styled.button`
  background-color:rgba(250,250,250,0.9);
  color: #1a6dff;
  box-shadow: 0 0 10px rgba(26, 109, 255, 1);
  font-size: 16px;
  font-weight: 600;
  padding: 14px 20px;
  
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  position: relative;
  overflow: hidden;
  max-width: 180px;
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.8s;
  margin-top: 40px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  letter-spacing: 0px;

  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(26, 109, 255, 0),
      rgba(26, 109, 255, 0.2),
      rgba(26, 109, 255, 0)
    );
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    
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
    font-size: 1rem;
    padding: 15px 30px;
    width: auto;
    min-width: 180px;
    margin: 40px auto 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 15px 30px;
   
  }
`;

export const LogoSliderContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  overflow: hidden;
  padding: 30px 0 15px 0;
  z-index: 3;
`;

export const LogoSlider = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const SlideTrack = styled.div`
  display: flex;
  width: fit-content;
  animation: ${scroll} 12s ease-in-out infinite;
`;

export const SliderLogo = styled.img`
  height: 80px;
  margin: 0 20px;
  opacity: 0.25;
  
  @media (max-width: 768px) {
    height: 80px;
    margin: 0 20px;
  }
  
  @media (max-width: 480px) {
    height: 60px;
    margin: 0 15px;
  }
`;




