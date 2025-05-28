import styled from 'styled-components';
import { ctaColorChange, partnerSlide } from '../../../styles/animations';
import { sectionSpacing } from '../../../styles/common';

export const CTABanner = styled.section`
  ${sectionSpacing}
  background-color: #f8f8f8;
  text-align: center;
  overflow: hidden;
  background-image: url('/img/partnersbg.png'), linear-gradient(to right, #fcfcfc, #f6f6f6, #fcfcfc);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-bottom: 200px; /* 카메라 이미지를 위한 추가 패딩 */
  position: relative;
  max-height: 836px;
  
  @media (max-width: 480px) {
    max-height: 500px;
  }
`;

export const CTASubtitle = styled.div`
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 20px;
  font-weight: 400;
  word-break: keep-all;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const CTATitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const CTAHighlight = styled.div`
  color: #EB6227;
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 5rem;
  animation: ${ctaColorChange} 0.8s ease-in-out infinite;
  
  @media (max-width: 480px) {
    font-size: 2.2rem;
    word-break: keep-all;
    line-height: 1.3;
    margin-bottom: 6rem;
  }
`;

export const CameraContainer = styled.div`
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 550px;
  margin: 0;
  z-index: 10;
  
  @media (max-width: 768px) {
    width: 425px;
  }
  
  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

export const CameraImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const PartnersSlider = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  padding: 15px 0;
  overflow: hidden;
  white-space: nowrap;
  z-index: 5;
`;

export const PartnersTrack = styled.div`
  display: flex;
  animation: ${partnerSlide} 25s linear infinite;
  width: max-content;
`;

export const PartnerLogo = styled.img`
  height: ${props => props.$isSvg ? '40px' : '60px'};
  margin: 0 40px;
  flex-shrink: 0;
  object-fit: ${props => props.$isSvg ? 'contain' : 'cover'};
  filter: ${props => props.$isSvg ? 'brightness(0.95)' : 'none'};
  
  @media (max-width: 768px) {
    height: ${props => props.$isSvg ? '35px' : '50px'};
    margin: 0 20px;
  }
  
  @media (max-width: 480px) {
    height: ${props => props.$isSvg ? '30px' : '45px'};
    margin: 0 15px;
  }
`; 