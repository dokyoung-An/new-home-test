import React from 'react';
import styled from 'styled-components';

const ArrowSvg = styled.svg`
  width: 20px;
  height: 16px;
  margin-left: 10px;
  transition: transform 0.3s ease;
`;

const ArrowIcon = ({ color = 'currentColor' }) => {
  return (
    <ArrowSvg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="arrow-icon"
    >
      <path 
        d="M13.5 4.5L21 12L13.5 19.5" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M21 12H3" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </ArrowSvg>
  );
};

export default ArrowIcon; 