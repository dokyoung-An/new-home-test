import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'stt', 
    label: '사전점검이란?', 
    image: '/img/service/t1.png', 
    text: `사전점검이란 새 아파트에 입주하기 전에 집 안 곳곳의 하자를 미리 확인하고, 
    이를 시공사에 보수 요청할 수 있도록 하는 중요한 절차입니다. 
    벽지, 바닥, 창문, 천장, 설비 등 마감 상태나 작동 여부를 점검하며, 
    문제를 사전에 발견하면 입주 후 불편을 줄일 수 있습니다. 
    특히 처음 입주하는 세대일수록 사전점검은 필수이며, 하자에 대한 기록을 남겨 분쟁을 예방하는 역할도 합니다.` },
  { id: 'smartbot', 
    label: '신축아파트 하자', 
    image: '/img/service/t2.png', 
    text: `신축아파트에서는 주로 마감재 불량, 
    바닥 타일 들뜸, 문틀 뒤틀림, 창호 누수, 
    단열 미흡, 결로, 곰팡이, 전기·수도 설비 이상 같은 하자가 자주 발생합니다.
     국토부 자료에 따르면 입주자 10명 중 8명 이상이 하자를 경험하며, 
     평균 5건 이상의 하자가 접수됩니다. 겉보기엔 멀쩡해 보여도 전문 장비 없이는 발견이 어려운 경우가 많아 
     사전점검을 통해 꼼꼼히 확인하는 것이 중요합니다.` },
  { id: 'chatbot', 
    label: '사전점검 때 해야할 일', 
    image: '/img/service/t3.png', 
    text: `사전점검 때는 눈에 보이는 부분부터 보이지 않는 부분까지 꼼꼼하게 확인해야 합니다.
      바닥, 벽지, 몰딩, 창문, 문 등의 마감 상태를 살펴보고, 문이 잘 닫히는지, 수도와 전기, 보일러 작동 여부를 점검해야 합니다.
      욕실 누수, 환풍기 작동, 단열 상태, 결로 가능성도 체크 대상입니다.
      레이저 수평계 등 장비를 활용해 바닥 수평도 확인하고, 발견된 하자는 사진과 함께 체크리스트에 기록해 시공사에 보수
      요청해야 합니다.` },
  { id: 'dashboard', 
    label: '사전점검 후 해야할 일', 
    image: '/img/service/t4.png', 
    text: `사전점검 후에는 발견된 하자들을 정리해 시공사에 하자 보수 요청서를 제출해야 합니다.
    이후 정해진 기간 내에 시공사가 보수를 진행하는지 확인하며, 재점검 일정을 잡아 실제로 보수가 완료됐는지 직접 확인해야 합니다.
      보수가 미흡하거나 누락된 경우에는 추가로 요청하고, 필요시 관리사무소나 고객센터에 문의해 대응합니다.
      또한, 하자 상태와 보수 전후를 사진이나 영상으로 기록해 두면 향후 분쟁 시 중요한 증거가 됩니다.
      입주 후 문제가 발생하지 않도록 마무리 점검까지 철저히 진행하는 것이 좋습니다.` },
];

const Container = styled.section`
  display: flex;
  min-height: 600px;
  width: 100%;
  padding: 0; // 프로젝트 공통 패딩
  box-sizing: border-box;
  background: #fff;
  max-width: 1440px;
  margin: 0 auto;
`;

const Sidebar = styled.div`
  width: 220px;
  background: #fff;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  gap: 2px;
`;

const CategoryItem = styled.div`
  padding: 18px 24px;
  cursor: pointer;
  background: ${({ active }) => (active ? '#1557cc' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#262626')};
  font-weight: ${({ active }) => (active ? 'normal' : 'normal')};
  font-size: 1.1rem;
  border-left: 4px solid ${({ active }) => (active ? '#000' : 'transparent')};
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #bfdcff;
    color: #1a6dff;
    font-weight: bolder;
  }
`;

const Main = styled.div`
  flex: 1;
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  background: #f7f9fa;
`;

const ImageOverlay = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 60px;
  min-height: 600px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: contain;
  object-position: center;
  background-position: center;
  position: relative;
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(10, 30, 60, 0.7);
    z-index: 2;
  }
  .content {
    position: absolute;
    top: 13%;
    left: 3%;
    z-index: 3;
    color: #fff;
    max-width: 750px;
    font-size: 1.5rem;
    font-weight: lighter;
    line-height: 1.4;
    letter-spacing: -1px;
    margin-left: 40px;
    word-break: keep-all;
    text-align: justify;
    line-height: 1.7;
    break-word: keep-all;
    word-wrap: break-word;
  }
`;

const FixedButtons = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  gap: 18px;
  padding: 0 40px;
  z-index: 10;
`;

const FixedButton = styled.button`
  width: 120px;
  height: 80px;
  background: rgba(255,255,255,0.18);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: rgba(255,255,255,0.32);
    color: #222;
  }
`;

const CategorySection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { hash } = useLocation();
  // 5초마다 자동 active 변경
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const activeCategory = categories[activeIdx];

  return (
    <Container>
      <Sidebar>
        {categories.map((cat, idx) => (
          <CategoryItem
            key={cat.id}
            active={idx === activeIdx}
            onMouseEnter={() => setActiveIdx(idx)}
          >
            {cat.label}
          </CategoryItem>
        ))}
      </Sidebar>
      <Main>
        <ImageOverlay image={activeCategory.image}>
          <div className="content">{activeCategory.text}</div>
        </ImageOverlay>
        <FixedButtons>
          <FixedButton>서비스 안내</FixedButton>
          <FixedButton><Link to="#PricingSection">가격확인</Link></FixedButton>
          <FixedButton><Link to="#ContactFormSection">예약신청</Link></FixedButton>
        </FixedButtons>
      </Main>
    </Container>
  );
};

export default CategorySection;