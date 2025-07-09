import React, { useEffect, useRef } from 'react';
import { Container } from '../../../styles/common';
import {
  Slogan,
  SloganTitle,
  SloganSubtitle,
  HighlightText,
  ChatBubbles,
  ChatBubble,
  Emoji,
  VerticalLine
} from './style';

const SloganSection = () => {
  const chatBubblesRef = useRef(null);

  useEffect(() => {
    const chatBubbles = chatBubblesRef.current.querySelectorAll('.chat-bubble');
    
    const animateChatBubbles = () => {
      const sectionPosition = chatBubblesRef.current.getBoundingClientRect().top;
      const sectionBottom = chatBubblesRef.current.getBoundingClientRect().bottom;
      const screenPosition = window.innerHeight / 1.3;
      
      if (sectionPosition < screenPosition && sectionBottom > 0) {
        chatBubbles.forEach((bubble, index) => {
          setTimeout(() => {
            bubble.classList.add('animate');
          }, index * 200);
        });
      } else if (sectionPosition > window.innerHeight || sectionBottom < 0) {
        chatBubbles.forEach(bubble => {
          bubble.classList.remove('animate');
        });
      }
    };
    
    window.addEventListener('scroll', animateChatBubbles);
    animateChatBubbles(); // 초기 로드 시 한번 실행
    
    return () => {
      window.removeEventListener('scroll', animateChatBubbles);
    };
  }, []);

  return (
    <Slogan>
      <Container>
        <ChatBubbles ref={chatBubblesRef}>
          <ChatBubble className="chat-bubble">
            <p>사전점검 때 찾지 못한 하자는 입주 전 보수가 안된다고?</p>
            <Emoji>⁉️</Emoji>
          </ChatBubble>
          <ChatBubble className="chat-bubble">
            <p>건축에 대해 하나도 모르는데 하자를 어떻게 찾지?</p>
            <Emoji>😨</Emoji>
          </ChatBubble>
          <ChatBubble className="chat-bubble">
            <p>아.. 여행가서 참석할 수 없는데 어쩌지...;;</p>
            <Emoji>✈️</Emoji>
          </ChatBubble>
        </ChatBubbles>
        
        <VerticalLine />
        <SloganTitle>입주민 여러분의 고민</SloganTitle>
        <SloganSubtitle>신축아파트 하자<br/> 저희가가 해결 해드릴께요.</SloganSubtitle>
        <HighlightText>사전점검대행 하방</HighlightText>
      </Container>
    </Slogan>
  );
};

export default SloganSection; 