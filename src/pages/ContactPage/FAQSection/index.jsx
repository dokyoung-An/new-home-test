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
      question: '사전점검 진행 시 꼭 동행해야 하나요?',
      answer: `■ 사전점검 행사 시 : 아파트 출입을 위해 계약자 확인 절차가 필요하므로,
      촬영 팀과 아파트 외부에서 만나 함께 입장해 주셔야 합니다.
      부득이하게 동행이 어려우신 경우, 위임장을 미리 전달해주시면 촬영팀 단독 방문이 가능합니다
      (위임서류는 해당 시공사에 문의하시면 발급 받으실 수 있습니다.)
      
      ■ 준공 이후 : 잔금이 완납된 세대는 비밀번호 공유 또는 대리인 참석을 통해 촬영 진행이 가능합니다. 
      임시 출입키로 세대 출입이 가능한 경우, 위임장을 사전 전달해 주시면 촬영 팀이 단독으로 방문할 수 있습니다.`,
   
    },
    {
      question: '사전점검 때 준비해야 할 사항이 있나요?',
      answer: `사전점검과 관련해 필요한 준비물은 하방이 모두 준비해 갑니다. 
              입주민 여러분께서는 입주민 여러분께 필요한 사항만 준비해 주시면 됩니다. `
    },
    {
      question: '결제는 선불로 진행되나요?',
      answer: `하방은 예약금 10만 원을 요청드리고 있고, 사전점검 후 잔금을 요청드리는 방식으로 진행됩니다.`
    },
    {
      question: '현금영수증 발행이 가능한가요?',
      answer: `네. 하방에 잔금을 입금해 준 뒤, 고객센터에 원하시는 번호를 말씀해 주세요. 
      해당 번호로 1~2일 사이 현금영수증을 발행해드립니다.`
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
                <h2>하방</h2>
                <h3>F&Q</h3>
              </FAQTitle>
              <FAQDescription>
                하방의 사전점검 서비스에 대해 궁금하신 점이 있으신가요?
                자주 묻는 질문과 답변을 확인해 보세요.
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