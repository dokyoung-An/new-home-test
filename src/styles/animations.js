import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const colorChange = keyframes`
  0% {
    color: #1a6dff;
  }
  50% {
    color: #bfdcff;
  }
  100% {
      color: #1a6dff;
  }
`;

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const slideUp = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(calc(-100% + 7 * (100% / 10)));
  }
`;

export const testimonialSlide = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(calc(-100% / 2));
  }
`;

export const partnerSlide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50%));
  }
`;

export const ctaColorChange = keyframes`
  0% {
    color: #bbdcff;
  }
  50% {
    color: #1a6dff;
  }
  100% {
    color: #A259FF;
  }
`;

export const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

export const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(26, 109, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(26, 109, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(26, 109, 255, 0);
  }
`; 