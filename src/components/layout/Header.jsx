import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);

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

  return (
    <HeaderContainer scrolled={scrolled} isHome={isHome}>
      <HeaderContent>
        <Logo><a href="/">LANHOUSE</a></Logo>
        <NavLinks>
          <li><a href="#VRExperience">Portfolio</a></li>
          <li><a href="#BenefitsSection">서비스 장점</a></li>
          <li><a href="#FeaturesSection">기능</a></li>
          <li><a href="#PricingSection">가격안내</a></li>
          <li><a href="#ContactFormSection">문의하기</a></li>
        </NavLinks>
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
    return scrolled ? theme.secondaryColor : 'transparent';
  }};
  transition: all 0.3s ease;
  box-shadow: ${({ scrolled, isHome }) => (isHome && scrolled) ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  height: ${({ scrolled, isHome }) => (isHome && !scrolled) ? '100px' : '56px'};
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
  font-size: 1.4rem;
  font-weight: 700;
  transition: all 0.3s ease;

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  transition: all 0.3s ease;

  li {
    margin-left: 40px;
    list-style: none;
  }

  a {
    font-size: 0.9rem;
    font-weight: 500;
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

export default Header;
