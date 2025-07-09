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
      question: "VR 촬영은 얼마나 걸리나요?",
      answer: "일반적으로 30평 기준 1시간 이내로 촬영이 완료됩니다. 공간의 크기와 복잡도에 따라 소요 시간이 달라질 수 있습니다."
    },
    {
      question: "VR 콘텐츠는 어디서 확인할 수 있나요?",
      answer: "PC, 모바일, 태블릿 등 모든 디바이스에서 웹브라우저를 통해 확인 가능합니다. 별도의 앱 설치가 필요하지 않습니다."
    },
    {
      question: "수정이나 업데이트는 가능한가요?",
      answer: "네, 인테리어나 구조 변경 시 재촬영을 통해 업데이트가 가능합니다. 또한 기존 콘텐츠의 하이라이트 포인트나 설명 등의 수정도 가능합니다."
    },
    {
      question: "다른 마케팅 채널과 연동이 가능한가요?",
      answer: "네, 홈페이지, 블로그, SNS 등 다양한 채널에 임베드하여 사용 가능합니다. QR코드 생성을 통한 오프라인 마케팅 자료 연동도 가능합니다."
    },
    {
      question: "저작권은 어떻게 되나요?",
      answer: "촬영된 VR 콘텐츠의 저작권은 계약된 기간 동안 고객사에 귀속됩니다. 계약 기간 내 자유로운 활용이 가능합니다."
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