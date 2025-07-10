import styled from 'styled-components';
import { ctaColorChange } from '../../../styles/animations';
import { sectionSpacing } from '../../../styles/common';

export const CTABanner = styled.section`
  ${sectionSpacing}
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('/img/bg2.jpg');
  text-align: center;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: relative;
  max-height: 836px;
  z-index: 1;

  @media (max-width: 480px) {
    max-height: 500px;
    padding: 0px 20px 40px 20px;
  }
`;

export const CTASubtitle = styled.div`
  font-size: 1.2rem;
  margin-bottom: 24px;
  font-weight: 700;
  word-break: keep-all;
  color: #FFD600;
  letter-spacing: 0.05em;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-top: 50px;
    margin-bottom: 16px;
  }
`;

export const CTATitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
  line-height: 1.3;

  br{
    display: none;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 12px;

    br{
      display: block;
    }
  }
`;

export const CTAHighlight = styled.div`
  color: #EB6227;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 6rem;
  animation: ${ctaColorChange} 2s ease-in-out infinite;
  text-shadow: 0 0 15px rgba(235, 98, 39, 0.3);
  
  @media (max-width: 480px) {
    font-size: 2rem;
    word-break: keep-all;
    line-height: 1.3;
    margin-bottom: 2rem;
  }
`;

export const PartnersSlider = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  
`;

export const PartnersTrack = styled.div`
  display: flex;
  width: max-content;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const PartnerLogo = styled.img`
  height: ${props => props.$isSvg ? '45px' : '55px'};
  margin: 0 40px;
  flex-shrink: 0;
  object-fit: contain;
  filter: brightness(1) contrast(0);
  opacity: 0.9;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    opacity: 1;
    filter: brightness(1) contrast(1.2);
  }
  
  @media (max-width: 768px) {
    height: ${props => props.$isSvg ? '40px' : '45px'};
    margin: 0 25px;
  }
  
  @media (max-width: 480px) {
    height: ${props => props.$isSvg ? '35px' : '35px'};
    margin: 0 20px;
  }
`; 