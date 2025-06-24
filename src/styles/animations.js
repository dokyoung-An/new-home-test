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
    color: #EB6227;
  }
  50% {
    color: #F4A32A;
  }
  100% {
    color: #EB6227;
  }
`; 