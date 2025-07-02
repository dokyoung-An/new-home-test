import React from 'react';
import { Container } from '../../../styles/common';
import { RiInstagramLine } from 'react-icons/ri';
import { SiYoutube, SiKakaotalk } from 'react-icons/si';
import { FaCheck } from 'react-icons/fa';
import {
  FooterWrapper,
  FooterContent,
  FooterLeft,
  FooterRight,
  Logo,
  CompanyInfo,
  ContactInfo,
  SocialLinks,
  SocialLink,
  CopyrightText,
  Divider
} from './style';

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <FooterLeft>
            <Logo>
              <img src="/img/logo.png" alt="Brandnew" />
              <div>
                <p>신축아파트</p>
                <p>사전점검대행 서비스</p>
              </div>
            </Logo>
            <CompanyInfo>
              <p>업체명: (주)에이치엔비테크</p>
              <p>대표자: 이제현</p>
              <p>주소: 울산광역시 중구 동천 1길 40, 세영이노세븐지식산업센터</p>
              <p>사업자등록번호: 602-88-02651</p>
              <p>대표번호: 1566-2384</p>
              <p>FAX: 070-4773-2028</p>
            </CompanyInfo>
            <CopyrightText>
              COPYRIGHT © 2025 HNB TECH ALL RIGHT RESERVED.
            </CopyrightText>
          </FooterLeft>

          <FooterRight>
            <ContactInfo>
              <h2>Contact Us</h2>
              <p>상담문의 1566-2384</p>
              <p>카카오채널 @habang-kr</p>
            </ContactInfo>
            <SocialLinks>
              <SocialLink href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <RiInstagramLine />
                <span>Instagram</span>
              </SocialLink>
              <SocialLink href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <SiYoutube />
                <span>YouTube</span>
              </SocialLink>
              <SocialLink href="http://pf.kakao.com/_hIxdss/chat" target="_blank" rel="noopener noreferrer">
                <SiKakaotalk />
                <span>KakaoTalk</span>
              </SocialLink>
              <SocialLink href="http://naver.me/FZ9XPclF" target="_blank" rel="noopener noreferrer">
                <FaCheck />
                <span>샘플보고서</span>
              </SocialLink>
            </SocialLinks>
          </FooterRight>
        </FooterContent>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
