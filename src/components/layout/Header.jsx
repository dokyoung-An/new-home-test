import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

const menuItems = [
  {
    label: '하방',
    subItems: [
      { label: '하방 소개', href: '#VRExperience' },
      { label: '주요 실적', href: '#BenefitsSection' },
      { label: '정비 현황', href: '#Features' },
      { label: '파트너사', href: '#Partners' }
    ]
  },
  {
    label: '아파트 사전점검',
    subItems: [
      { label: '아파트 사전점검', href: '#Inspection' },
      { label: '주택 종합 점검', href: '#HomeInspection' }
    ]
  },
  {
    label: '안전진단',
    subItems: [
      { label: '시설물 안전점검', href: '#Safety' },
      { label: '내진성능평가', href: '#Earthquake' },
      { label: '구조 안전진단', href: '#Structure' },
      { label: '건설공사 정기안전점검', href: '#Construction' },
      { label: '안전점검을 현장조사', href: '#Investigation' },
      { label: '교량 및 터널 (토목)', href: '#Bridge' }
    ]
  },
  {
    label: '하자진단·소송',
    subItems: [
      { label: '하자진단·소송', href: '#DefectDiagnosis' }
    ]
  },
  {
    label: 'B2B 비즈니스',
    subItems: [
      { label: '비즈니스 솔루션', href: '#Business' },
      { label: '세이프체크', href: '#SafeCheck' }
    ]
  },
  {
    label: '고객지원',
    subItems: [
      { label: '상담 현황', href: '#Support' },
      { label: '자주 묻는 질문', href: '#FAQ' }
    ]
  }
];

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    if (isHome) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (isHome) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHome]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileSubMenu = (label) => {
    setActiveMobileMenu(prev => (prev === label ? null : label));
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveMobileMenu(null);
  };

  return (
    <HeaderContainer scrolled={scrolled} isHome={isHome}>
      <HeaderContent>
        <Logo><a href="/">HABANG</a></Logo>

        {/* Desktop */}
        <NavLinks>
          {menuItems.map((item) => (
            <NavItem key={item.label}>
              <a href={item.href}>{item.label}</a>
              {item.subItems && (
                <DropdownMenu>
                  {item.subItems.map((sub) => (
                    <li key={sub.label}>
                      <a href={sub.href}>{sub.label}</a>
                    </li>
                  ))}
                </DropdownMenu>
              )}
            </NavItem>
          ))}
        </NavLinks>

        <InquiryButton><a href="/contact">문의하기</a></InquiryButton>

        <HamburgerButton onClick={toggleMenu}>
          <FaBars />
        </HamburgerButton>

        {/* Mobile */}
        <MobileNav isOpen={isMenuOpen}>
          <MobileNavLinks>
            {menuItems.map((item) => (
              <li key={item.label}>
                <div onClick={() => toggleMobileSubMenu(item.label)}>
                  {item.label}
                </div>
                {item.subItems && activeMobileMenu === item.label && (
                  <MobileDropdown>
                    {item.subItems.map((sub) => (
                      <li key={sub.label}>
                        <a href={sub.href} onClick={closeMenu}>
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </MobileDropdown>
                )}
              </li>
            ))}
          </MobileNavLinks>
        </MobileNav>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: ${({ scrolled, isHome, theme }) =>
    !isHome ? 'black' : scrolled ? theme.secondaryColor : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  box-shadow: ${({ scrolled, isHome }) =>
    isHome && scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  height: 76px;
  display: flex;
  align-items: center;
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.05em;

  a {
    color: #fff;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-left: -15px;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0 auto;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
  padding: 28px 0;
  display: inline-block;
  text-align: center;
  transition: all 0.3s ease;
  
  > a {
    font-size: 1.1rem;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    padding: 8px 16px;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.primaryMiddle};
    }
  }

  &:hover {
    min-width: 180px;
    margin: 0 -10px;
    
    > ul {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  transform: translateY(10px);
  background: rgba(255, 255, 255, 0.95);
  min-width: 100%;
  padding: 16px 0;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transition: all 0.25s ease;
  z-index: 200;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  li {
    margin: 0;
    padding: 0;
    text-align: left;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      left: 20px;
      right: 20px;
      bottom: 0;
      height: 1px;
      background: rgba(0, 0, 0, 0.06);
    }
    
    &:last-child:after {
      display: none;
    }
    
    a {
      display: block;
      padding: 12px 24px;
      color: #333;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.2s ease;
      white-space: nowrap;
      position: relative;
      text-align: center;
      
      &:hover {
        color: ${({ theme }) => theme.primaryMiddle};
        background-color: rgba(26, 109, 255, 0.05);
        
        &:before {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      &:before {
        content: '•';
        position: absolute;
        left: 12px;
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.2s ease;
      }
    }
  }
`;

const InquiryButton = styled.button`
  background-color: #1a6dff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #1a6dff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 101;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 70%;
  max-width: 300px;
  height: 100vh;
  background-color: ${({ theme }) => theme.secondaryColor};
  transition: right 0.3s ease;
  z-index: 100;
  padding-top: 80px;
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 15px 30px;
    border-bottom: 1px solid rgba(255,255,255,0.1);

    div {
      color: white;
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    a {
      color: white;
      font-size: 1rem;
      text-decoration: none;
      display: block;
      padding: 8px 0;

      &:hover {
        color: ${({ theme }) => theme.primaryMiddle};
      }
    }
  }
`;

const MobileDropdown = styled.ul`
  list-style: none;
  padding: 10px 0 0 15px;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.05);

  li {
    padding: 8px 0;
    border-bottom: none;

    a {
      padding: 4px 0;
    }
  }
`;

export default Header;
