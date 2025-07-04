import React from 'react';

export const FloorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 14H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LeakIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L5.5 8.5C4.83696 9.16304 4.31214 9.95865 3.95542 10.8329C3.59869 11.7072 3.41797 12.6437 3.41797 13.59C3.41797 14.5363 3.59869 15.4728 3.95542 16.3471C4.31214 17.2214 4.83696 18.017 5.5 18.68C6.16304 19.343 6.95865 19.8679 7.8329 20.2246C8.70715 20.5813 9.64371 20.762 10.59 20.762C11.5363 20.762 12.4728 20.5813 13.3471 20.2246C14.2214 19.8679 15.017 19.343 15.68 18.68L19 15.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SmoothIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 6H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DoorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 21V3H17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="14" cy="12" r="1" fill="currentColor"/>
  </svg>
);

export const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64149 19.6871 1.81442 19.9905C1.98736 20.2939 2.23673 20.5467 2.53771 20.7239C2.83869 20.901 3.18079 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
); 


export const WallIcon = ({ size = 24, color = '#555', strokeWidth = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 전체 테두리 */}
    <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth={strokeWidth} />

    {/* 가로 선 */}
    <line x1="2" y1="8" x2="22" y2="8" stroke={color} strokeWidth={strokeWidth} />
    <line x1="2" y1="14" x2="22" y2="14" stroke={color} strokeWidth={strokeWidth} />

    {/* 세로 선 */}
    <line x1="8" y1="2" x2="8" y2="8" stroke={color} strokeWidth={strokeWidth} />
    <line x1="16" y1="2" x2="16" y2="8" stroke={color} strokeWidth={strokeWidth} />

    <line x1="6" y1="8" x2="6" y2="14" stroke={color} strokeWidth={strokeWidth} />
    <line x1="12" y1="8" x2="12" y2="14" stroke={color} strokeWidth={strokeWidth} />
    <line x1="18" y1="8" x2="18" y2="14" stroke={color} strokeWidth={strokeWidth} />

    <line x1="8" y1="14" x2="8" y2="22" stroke={color} strokeWidth={strokeWidth} />
    <line x1="16" y1="14" x2="16" y2="22" stroke={color} strokeWidth={strokeWidth} />
  </svg>
);

export const DoorIcon2 = ({ size = 24, color = '#555', strokeWidth = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 외곽 문틀 */}
    <rect x="5" y="2" width="14" height="20" rx="1" stroke={color} strokeWidth={strokeWidth} />

    {/* 손잡이 */}
    <circle cx="16" cy="12" r="0.8" fill={color} />

    {/* 아래 경첩선 표현 */}
    <line x1="5" y1="2" x2="5" y2="22" stroke={color} strokeWidth={strokeWidth} />
  </svg>
);