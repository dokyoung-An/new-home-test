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
            <p>사전점검 때 봤던 우리집, 준공나기 전에 다시 볼 수 없을까?</p>
            <Emoji>⁉️</Emoji>
          </ChatBubble>
          <ChatBubble className="chat-bubble">
            <p>집은 내야 하는데.. 모르는 사람이 자꾸 오는 건 싫어!!</p>
            <Emoji>😨</Emoji>
          </ChatBubble>
          <ChatBubble className="chat-bubble">
            <p>임차인이 나갈 때 엉망으로 해놓으면 어쩌지?<p> 사진 찍어놔야 하나;;</p></p>
            <Emoji>💰</Emoji>
          </ChatBubble>
        </ChatBubbles>
        
        <VerticalLine />
        <SloganTitle>한 번의 촬영, 끝까지 남는 기록</SloganTitle>
        <SloganSubtitle>24시간, 언제든지<br/>360°VR로 만나는 우리집</SloganSubtitle>
        <HighlightText>랜하우스</HighlightText>
      </Container>
    </Slogan>
  );
};

export default SloganSection; 