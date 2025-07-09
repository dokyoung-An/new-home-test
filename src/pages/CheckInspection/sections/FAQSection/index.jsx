import React, { useState } from 'react';
import { Container } from '../../../../styles/common';
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
  FAQTitleWrapper
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
      question: '장비점검 항목에는 어떤 것이 있나요?',
      answer: `장비점검 항목은 총 4가지입니다.

      ■ 장비점검 목록
      1. 1급 발암물질인 라돈을 측정하는 라돈 점검
      2. 아토피 유발 물질인 포름알데히드를 점검하는 포름알데히드 점검
      3. 바닥의 기울어짐 여부를 확인하는 레이저 수평 단차 점검
      4. 단열재 유뮤를 확인하는 열화상 카메라 점검
      
      --> 보일러 배관 점검의 경우, 사전점검 현장에서 보일러 가동여부를 확인한 뒤
      점검이 가능할 경우 확인해 드리고 있습니다. 
      * 보일러 배관 점검은 사후점검 서비스 신청 시, 사후 점검 당일 진행되는 서비스입니다.`
    },
    {
      question: '모바일 하자 접수는 무엇인가요?',
      answer: `하자보수를 건설사에 요청하는 방법은 2가지가 있습니다.

      ■ 하자점검 체크리스트
      서면으로 하자 접수를 받는 아파트의 경우, 제공되는 체크리스트에 하자의 위치와
      하자 내용을 기입해 제출해야 합니다. 제출된 내용을 바탕으로 하자 접수는 이뤄지기에
      상세히 기록해야 합니다. 
      또한, 기록만으로 하자의 위치를 확인하기 어렵기에 제공된 스티커를 부착해
      하자 위치를 확인할 수 있도록 해야 합니다.
      
      ■ 모바일 하자 접수
      건설사 하자 접수 어플을 통해 하자를 접수하는 방식으로 어플에 하자사진2장(원거리, 근거리 각1장)을
      등록하고, 하자의 위치와 하자의 종류에 해당하는 카테고리를 선택, 하자의 내용을 입력해야
      한 건의 하자 접수를 등록할 수 있습니다. 
      
      어플을 통해서 향후 하자 보수 상태를 확인할 수 있어, 최근 많은 건설사에서 선호하고 있는 방식입니다. 
      
      *어떤 방식이든 하방에서 모두 진행해 드리니 걱정하지 마세요`
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="FAQSection">
      <FAQWrapper>
       
        <Container>
          <FAQContainer>
            <div>
              <FAQTitleWrapper>
                <FAQTitle>
                  <h2>하방</h2>
                  <h3>F&A</h3>
                </FAQTitle>
              </FAQTitleWrapper>
              <FAQDescription>
                하방에게 궁금하신 점이 있으신가요?<br/>
                자주 묻는 질문과 답변을 확인해 보세요.
              </FAQDescription>
              <MoreFAQLink href="/contact">상담 신청하기→</MoreFAQLink>
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