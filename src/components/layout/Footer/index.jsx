import React, { useState } from 'react';
import { Container } from '../../../styles/common';
import { RiInstagramLine, RiKakaoTalkFill } from 'react-icons/ri';
import { SiYoutube } from 'react-icons/si';
import RefundPolicyPopup from './RefundPolicyPopup';
import {
  FooterWrapper,
  FooterContent,
  FooterInfo,
  FooterLeft,
  FooterCenter,
  FooterRight,
  FooterNotice,
  FooterBottom,
  FooterNav,
  SocialButtons,
  SocialButton,
} from './style';

const addressList = [
  '경기도 수원시 영통구 매영로 159번길 19',
  '울산광역시 중구 동천1길 40',
];
const companyInfo = [
  'Tel : 1566-2384',
  '대표이사 : 안도경',
  '사업자번호 : 260-52-00727',
];

const navLinks1 = [
  { text: '하방', href: '/habang' },
  { text: '서비스', href: '/service' },
  { text: '자료실', href: '/resources' },
  { text: '고객문의', href: '/contact' },
  { text: '보고서다운', href: '/report' },
  { text: 'VR', href: '/vr' },
];
const navLinks2 = [
  { text: '회사소개', href: '/about' },
  { text: '인재채용', href: '/recruit' },
  { text: '공지사항', href: '/notice' },
  { text: '사전점검', href: '/precheck' },
  { text: '보수확인점검', href: '/repair' },
  { text: '360도 VR촬영', href: '/vr360' },
  { text: '사전임대점검', href: '/rental' },
  { text: '하자판정기준', href: '/criteria' },
  { text: '하자영상자료', href: '/video' },
  { text: '하방정보', href: '/info' },
  { text: '상담/예약', href: '/reservation' },
  { text: '사전점검 FAQ', href: '/faq' },
  { text: '하자 Q&A', href: '/qna' },
  { text: '고객후기', href: '/review' },
  { text: '현장후기', href: '/fieldreview' },
  { text: '2024', href: '/2024' },
  { text: '2023', href: '/2023' },
  { text: '~2023.03', href: '/2023-03' },
  { text: '아파트 VR', href: '/apt-vr' },
  { text: '우리집 VR', href: '/myhome-vr' },
];

const socialLinks = [
  {
    icon: <SiYoutube />,
    href: 'https://youtube.com/',
    label: '유튜브',
  },
  {
    icon: <RiInstagramLine />,
    href: 'https://instagram.com/',
    label: '인스타그램',
  },
  {
    icon: <RiKakaoTalkFill />,
    href: 'https://pf.kakao.com/',
    label: '카카오톡',
  },
];

const Footer = () => {
  const [isRefundPolicyOpen, setIsRefundPolicyOpen] = useState(false);

  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <FooterInfo>
            <FooterLeft>
              <FooterNotice>
                {addressList.map((addr, idx) => (
                  <div key={idx}>Adress : {addr}</div>
                ))}
                {companyInfo.map((info, idx) => (
                  <div key={idx}>{info}</div>
                ))}
              </FooterNotice>
            </FooterLeft>

            <FooterCenter>
              <FooterNav>
                {navLinks1.map(({ text, href }, idx) => (
                  <a href={href} key={idx}>{text}</a>
                ))}
              </FooterNav>
              <FooterNav>
                {navLinks2.map(({ text, href }, idx) => (
                  <a href={href} key={idx}>{text}</a>
                ))}
              </FooterNav>
            </FooterCenter>

            <FooterRight>
              <img src="/img/habang4.png" alt="하방 로고" width="100" />
              <h2>1566-2384</h2>
              <p>평일 10:00 - 18:00</p>
              <p>점심시간 12:00 - 13:00</p>
              <p>주말·공휴일 휴무</p>
              <SocialButtons>
                {socialLinks.map(({ icon, href, label }, idx) => (
                  <SocialButton
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    key={idx}
                  >
                    {icon}
                  </SocialButton>
                ))}
              </SocialButtons>
            </FooterRight>
          </FooterInfo>

          <FooterBottom>
            <p className="copyright">
              서비스 이용약관 ｜ 개인정보 수립방침<br />
              Copyright ⓒ 2022 Habang All rights reserved.<br />
              (주)에이치엔비테크
            </p>
          </FooterBottom>
        </FooterContent>
      </Container>

      <RefundPolicyPopup
        isOpen={isRefundPolicyOpen}
        onClose={() => setIsRefundPolicyOpen(false)}
      />
    </FooterWrapper>
  );
};

export default Footer;
