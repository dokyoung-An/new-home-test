import styled from 'styled-components';
import { colorChange, fadeInUp } from '../../../styles/animations';
import { sectionSpacing } from '../../../styles/common';

export const Slogan = styled.section`
  ${sectionSpacing}
  text-align: center;
  background-color: #fff;
  position: relative;
`;

export const SloganTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
  margin-top: 60px;
  color: #555;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const SloganSubtitle = styled.h3`
  font-size: 2.5rem;
  margin: 20px 0;
  font-weight: 700;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 2rem;
    word-break: keep-all;
  }
`;

export const HighlightText = styled.div`
  color: #1a6dff;
  font-size: 3.5rem;
  font-weight: 700;
  margin: 20px 0 60px;
  line-height: 1.2;
  animation: ${colorChange} 0.8s ease-in-out infinite;

  @media (max-width: 480px) {
    font-size: 3rem;
    word-break: keep-all;
  }
`;

export const ChatBubbles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 900px;
  margin: 0 auto 60px;
  position: relative;
`;

export const ChatBubble = styled.div`
  background-color: #000;
  color: ${({ theme }) => theme.lightColor};
  padding: 18px 25px;
  border-radius: 25px;
  position: relative;
  max-width: 500px;
  font-size: 1rem;
  line-height: 1.4;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;

  &.animate {
    animation: ${fadeInUp} 0.6s ease forwards;
  }

  &:nth-child(1) {
    margin-left: 50px;
    align-self: flex-start;
    border-bottom-left-radius: 5px;
    animation-delay: 0.2s;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -10px;
      width: 20px;
      height: 20px;
      background-color: #000;
      clip-path: polygon(100% 0, 100% 100%, 0 100%);
    }
  }

  &:nth-child(2) {
    margin-right: 50px;
    align-self: flex-end;
    border-bottom-right-radius: 5px;
    animation-delay: 0.4s;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -10px;
      width: 20px;
      height: 20px;
      background-color: #000;
      clip-path: polygon(0 0, 100% 100%, 0 100%);
    }
  }

  &:nth-child(3) {
    margin-left: 80px;
    align-self: flex-start;
    border-bottom-left-radius: 5px;
    animation-delay: 0.6s;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -10px;
      width: 20px;
      height: 20px;
      background-color: #000;
      clip-path: polygon(100% 0, 100% 100%, 0 100%);
    }
  }

  p {
    margin-right: 40px;
    margin-bottom: 0;
  }
`;

export const Emoji = styled.span`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.6rem;
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 8rem;
  background-color: #606060;
  margin: 0 auto 60px;
`; 