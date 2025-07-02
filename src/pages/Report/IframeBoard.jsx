import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const IframeBoard = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [displayYear, setDisplayYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMonthDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const reports = {
    '2025': 'https://vink2.imweb.me/report2025',
    '2024': {
      1: 'https://vink2.imweb.me/202401',
      2: 'https://vink2.imweb.me/202402',
      3: 'https://vink2.imweb.me/202403',
      4: 'https://vink2.imweb.me/202404',
      5: 'https://vink2.imweb.me/202405',
      6: 'https://vink2.imweb.me/202406',
      7: 'https://vink2.imweb.me/202407',
      8: 'https://vink2.imweb.me/202408',
      9: 'https://vink2.imweb.me/202409',
      10: 'https://vink2.imweb.me/202410',
      11: 'https://vink2.imweb.me/202411',
      12: 'https://vink2.imweb.me/202412'
    }
  };

  const handleYearClick = (year) => {
    if (year === '2024') {
      setSelectedYear(year);
      setIsMonthDropdownOpen(true);
    } else {
      setSelectedYear(year);
      setDisplayYear(year);
      setSelectedMonth(null);
      setIsMonthDropdownOpen(false);
    }
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setDisplayYear('2024');
    setIsMonthDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsMonthDropdownOpen(!isMonthDropdownOpen);
  };

  const getIframeSrc = () => {
    if (displayYear === '2024' && selectedMonth) {
      return reports['2024'][selectedMonth];
    }
    return reports[displayYear];
  };

  return (
    <BoardContainer>
      <ButtonContainer>
        {['2025', '2024'].map((year) => (
          <ButtonWrapper key={year}>
            <YearButton
              onClick={() => handleYearClick(year)}
              isActive={selectedYear === year}
            >
              {year}년 보고서
            </YearButton>
            {year === '2024' && selectedYear === '2024' && (
              <MonthDropdown ref={dropdownRef} isOpen={isMonthDropdownOpen}>
                <MonthToggle onClick={toggleDropdown}>
                  {selectedMonth ? `${selectedMonth}월` : '월 선택'}
                  <span>{isMonthDropdownOpen ? '▲' : '▼'}</span>
                </MonthToggle>
                <MonthList isOpen={isMonthDropdownOpen}>
                  {months.map((month) => (
                    <MonthItem
                      key={month}
                      onClick={() => handleMonthClick(month)}
                      isActive={selectedMonth === month}
                    >
                      {month}월
                    </MonthItem>
                  ))}
                </MonthList>
              </MonthDropdown>
            )}
          </ButtonWrapper>
        ))}
      </ButtonContainer>
      {getIframeSrc() && (
        <BoardIframe
          src={getIframeSrc()}
          title={`${displayYear} Report Board`}
          frameBorder="0"
          scrolling="no"
        />
      )}
    </BoardContainer>
  );
};

const BoardContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  background-color: #ffffff;
  padding-top: 100px;

  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    gap: 8px;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const YearButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.isActive ? '#1a1a1a' : '#f5f5f5'};
  color: ${props => props.isActive ? '#ffffff' : '#1a1a1a'};

  &:hover {
    background-color: ${props => props.isActive ? '#1a1a1a' : '#e5e5e5'};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px;
  }
`;

const MonthDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: all 0.2s ease;
`;

const MonthToggle = styled.button`
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const MonthList = styled.div`
  max-height: ${props => props.isOpen ? '200px' : '0'};
  overflow-y: auto;
  border: 1px solid #e5e5e5;
  border-top: none;
  border-radius: 0 0 8px 8px;
  transition: all 0.2s ease;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
`;

const MonthItem = styled.button`
  width: 100%;
  padding: 10px 12px;
  text-align: left;
  background-color: ${props => props.isActive ? '#f5f5f5' : 'white'};
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const BoardIframe = styled.iframe`
  width: 90%;
  height: 750px;
  border: none;
  background: white;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Firefox */
  scrollbar-width: none;
  
  /* IE and Edge */
  -ms-overflow-style: none;

  @media (max-width: 1024px) {
    height: 650px;
  }

  @media (max-width: 768px) {
    height: 800px;
    width: 100%;
  }
`;

export default IframeBoard; 