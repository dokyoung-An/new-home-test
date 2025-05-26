import React, { useState } from 'react';
import { Container } from '../../../styles/common';
import {
  FAQWrapper,
  FAQContainer,
  FAQTitle,
  FAQDescription,
  FAQList,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
  MoreFAQLink,
  DesignElement1,
  DesignElement2,
  DesignElement3
} from './style';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: 'VR 촬영 시 꼭 동행해야 하나요?',
      answer: `■ 사전점검 행사 시 : 아파트 출입을 위해 계약자 확인 절차가 필요하므로,
      촬영 팀과 아파트 외부에서 만나 함께 입장해 주셔야 합니다.
      부득이하게 동행이 어려우신 경우, 위임장을 미리 전달해주시면 촬영팀 단독 방문이 가능합니다
      (위임서류는 해당 시공사에 문의하시면 발급 받으실 수 있습니다.)
      
      ■ 준공 이후 : 잔금이 완납된 세대는 비밀번호 공유 또는 대리인 참석을 통해 촬영 진행이 가능합니다. 
      임시 출입키로 세대 출입이 가능한 경우, 위임장을 사전 전달해 주시면 촬영 팀이 단독으로 방문할 수 있습니다.`,
   
    },
    {
      question: '촬영 시 준비해야 할 사항이 있나요?',
      answer: `보다 만족스러운 VR 결과물을 위해, 촬영 시 세대 내부에 짐이나 사람이 없는 상태가
              가장 좋습니다. 촬영 전에는 미리 정돈해 주시면 감사하겠습니다.`
    },
    {
      question: '결제는 선불로 진행되나요?',
      answer: `렌하우스는 원활한 일정 운영과 안정적인 서비스 제공을 위해 별도의 예약금 없이
      서비스 금액 전체 결제로 예약을 진행하고 있습니다. 전액 결제 시 예약은 확정되며, 이후
      촬영 일정과 관련된 자세한 안내를 도와드립니다.`
    },
    {
      question: '현금영수증 발행이 가능한가요?',
      answer: `네. 렌하우스는 모든 현금 결제 건에 대해 현금영수증을 자동 발급해드리고 있습니다. 
      예약 시 기재해주신 발급 정보(개인/사업자 여부 및 연락처)로 1주일 이내 발행해드립니다.`
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="FAQSection">
      <FAQWrapper>
        <DesignElement1 />
        <DesignElement2 />
        <DesignElement3 />
        <Container>
          <FAQContainer>
            <div>
              <FAQTitle>
                <h2>렌하우스</h2>
                <h3>F&A</h3>
              </FAQTitle>
              <FAQDescription>
                VR 촬영부터 웹사이트 업로드까지, 모든 과정을 무료로 진행해 드립니다. 
                전문가의 섬세한 기술로 여러분의 공간을 가장 아름답게 담아내겠습니다.
              </FAQDescription>
              <MoreFAQLink href="/faq">더 많은 질문 보기 →</MoreFAQLink>
            </div>
            <FAQList>
              {faqData.map((faq, index) => (
                <FAQItem key={index} isOpen={openIndex === index}>
                  <FAQQuestion onClick={() => handleToggle(index)}>
                    {faq.question}
                    <span className="icon">{openIndex === index ? '-' : '+'}</span>
                  </FAQQuestion>
                  <FAQAnswer isOpen={openIndex === index}>
                    {faq.answer}
                  </FAQAnswer>
                </FAQItem>
              ))}
            </FAQList>
          </FAQContainer>
        </Container>
      </FAQWrapper>
    </section>
  );
};

export default FAQSection; 