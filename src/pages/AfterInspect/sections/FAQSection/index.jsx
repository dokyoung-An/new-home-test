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
  DesignElement1,
  DesignElement2,
  DesignElement3
} from './style';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: '입주 전 사전점검 진행 시 꼭 동행해야 하나요?',
      answer: `입주 전 사전점검 진행 시에 직접 오시지 못하는 경우엔 잔금을 치르신 다음이라면
      세대 비밀번호를 고객센터에 전달해 주시면 하자 보수 상태 체크가 가능합니다. 
      
      만약, 아직 잔금을 치르지 않으셨다면 입주지원센터에 키불출 받을 수 있도록 위임장이나
      필요서류를 미리 작성해 전달해 놓아 주시면 됩니다.`,
   
    },
    {
      question: '1인으로 점검해도 무리가 없나요?',
      answer: `준공 전 진행되는 사전점검 때에는 시간 제약이 있고, 많은 고객님들께 서비스를 해야하다보니
      시간이 부족하여 2인 점검을 진행하고 있습니다. 
      하지만, 준공 이후 점검에는 시간 제약도 없고, 출입 제한도 없기 때문에 1인 점검으로도 꼼꼼한 서비스가 가능합니다. 
      1인이 점검하지만 사전점검과 동일한 서비스가 진행되고 있으니 걱정하지 않으셔도 됩니다.  `
    },
    {
      question: '결제는 선불로 진행되나요?',
      answer: `하방은 예약금 10만 원을 요청드리고 있고, 점검 후 잔금을 요청드리는 방식으로 진행됩니다.`
    },
    {
      question: '하자 접수도 해주나요?',
      answer: `네. 하방은 하자 접수를 해드리고 있습니다. 
      서면으로 접수를 해야 하면, 점검 후 서면 리스트를 제작해 고객님께 전달 드리고 있습니다. 
      (해당 자료를 고객센터에 접수해주시기만 하시면 됩니다.)
      
      하자 접수는 하자 접수 어플을 통해 하자를 접수하는 방식으로 어플에 하자사진2장(원거리, 근거리 각1장)을
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