import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer scrolled={scrolled} isHome={isHome}>
      <HeaderContent>
        <Logo><a href="/">HABANG</a></Logo>
        <NavLinks>
          <li><a href="#VRExperience">하방</a></li>
          <li><a href="#BenefitsSection">아파트 사전점검</a></li>
          <li><a href="#FeaturesSection">하자정보</a></li>
          <li><a href="#FeaturesSection">보고서</a></li>
          <li><a href="#PricingSection">우리집VR</a></li>
        </NavLinks>
         <InquiryButton><a href="/contact">문의하기</a></InquiryButton>
        <HamburgerButton onClick={toggleMenu}>
          <FaBars />
        </HamburgerButton>
        <MobileNav isOpen={isMenuOpen}>
          <MobileNavLinks>
            <li><a href="#VRExperience" onClick={closeMenu}>하방</a></li>
            <li><a href="#BenefitsSection" onClick={closeMenu}>아파트 사전점검</a></li>
            <li><a href="#FeaturesSection" onClick={closeMenu}>하자정보</a></li>
            <li><a href="#PricingSection" onClick={closeMenu}>보고서</a></li>
            <li><a href="#PricingSection" onClick={closeMenu}>우리집VR</a></li>
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
  background-color: ${({ scrolled, isHome, theme }) => {
    if (!isHome) return 'black';
    return scrolled ? theme.secondaryColor : 'rgba(0, 0, 0, 0.05)';
  }};
  transition: all 0.3s ease;
  box-shadow: ${({ scrolled, isHome }) => (isHome && scrolled) ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  height: ${({ scrolled, isHome }) => (isHome && !scrolled) ? '76px' : '76px'};
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
  font-weight: 400;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.05em;

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;
    
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-left: -15px;
    margin-top: -5px;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  transition: all 0.3s ease;
  margin:0 auto;

  li {
    margin-left: 40px;
    list-style: none;

  }

  a {
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.primaryMiddle};
      text-decoration: none;
    }

  
  }

  @media (max-width: 768px) {
    display: none;
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
  transition: all 0.3s ease;

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
  padding: 10px 0;
  z-index: 101;
  margin-top: 2px;

  @media (max-width: 768px) {
    display: block;
  }
  @media (max-width: 480px) {
    margin-right: -15px;
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
  box-shadow: ${({ isOpen }) => (isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.1)' : 'none')};
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 0;
    padding: 15px 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    display: block;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.primaryMiddle};
    }
  }
`;

export default Header;
