import React from 'react';
import { Container } from '../../../styles/common';
import { RiInstagramLine, RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver, SiYoutube } from 'react-icons/si';
import {
  FooterWrapper,
  FooterContent,
  FooterTop,
  FooterInfo,
  FooterNotice,
  FooterTel,
  FooterBottom,
  FooterSelectGroup,
  FooterNav,
  SocialButtons,
  SocialButton
} from './style';

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <FooterTop>
            <FooterNav>
            <a href="#VRExperience">Portfolio</a>
            <a href="#BenefitsSection">서비스 장점</a>
            <a href="#FeaturesSection">기능</a>          
            <a href="#PricingSection">가격안내</a>       
            <a href="#ContactFormSection">문의하기</a>
            </FooterNav>
          </FooterTop>

          <FooterInfo>
            <div>
              <FooterNotice>
                회사명 : 에이치엔비테크 | 브랜드 : 랜하우스 | 대표자: 안도경 <br/>
                사업자번호: 602-88-02651 ｜ E. lhs@lanhouse.kr | F. 070-4773-2028 
                <br />
                A. 경기도 하남시 미사대로 현대지식산업센터한강미사2차 B동 (12925) 
                <br />
                Copyright ⓒ lanhouse. all rights reserved
              </FooterNotice>
              <SocialButtons>
                <SocialButton 
                  href="https://www.instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  $bgColor="#E4405F"
                >
                  <RiInstagramLine />
                </SocialButton>
                <SocialButton 
                  href="https://blog.naver.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  $bgColor="#03C75A"
                >
                  <SiNaver />
                </SocialButton>
                <SocialButton 
                  href="https://www.youtube.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  $bgColor="#FF0000"
                >
                  <SiYoutube />
                </SocialButton>
                <SocialButton 
                  href="https://pf.kakao.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  $bgColor="#FAE100"
                >
                  <RiKakaoTalkFill />
                </SocialButton>
              </SocialButtons>
            </div>
            <FooterTel>
              <p>VR제작문의</p>
              <strong>평일 09:00 ~ 17:30</strong>
              <h2>1566-2539</h2>
            </FooterTel>
          </FooterInfo>

          <FooterBottom>
            <FooterSelectGroup>
              <select>
                <option>패밀리사이트</option>
                <option value="https://unfiction.kr">언픽션</option>
                <option value="https://habang.kr">하방</option>
              </select>
              <select>
                <option>부동산정보</option>
              </select>
            </FooterSelectGroup>
            <p className="copyright">© 2025 LanHouse Co., Ltd.</p>
          </FooterBottom>
        </FooterContent>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
