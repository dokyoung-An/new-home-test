import React, { useEffect, useRef, useState } from 'react';
import {
  BannerWrapper,
  BannerContent,
  TypingLine,
  FixedLine,
  ButtonCircle,
  VideoBackground,
  VideoOverlay
} from './style';

const BannerSection = () => {
  const videoRef = useRef(null);

  const firstText = '점검하세요!';
  const secondText = ' 하자는 줄이고, 입주는 편해집니다.'; // 앞에 공백 포함
  const [displayedText, setDisplayedText] = useState('');
  const [firstDone, setFirstDone] = useState(false);
  const [index, setIndex] = useState(0);
  const [showFixedLine, setShowFixedLine] = useState(false);
  const [buttonHighlight, setButtonHighlight] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  useEffect(() => {
    let timeout;

    if (!firstDone) {
      if (index < firstText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + firstText.charAt(index));
          setIndex(index + 1);
        }, 100);
      } else {
        setFirstDone(true);
        setIndex(0);
        timeout = setTimeout(() => {}, 1000); // 1초 쉬기
      }
    } else {
      if (index < secondText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + secondText.charAt(index));
          setIndex(index + 1);
        }, 100);
      } else if (!showFixedLine) {
        timeout = setTimeout(() => {
          setShowFixedLine(true);
          setTimeout(() => setButtonHighlight(true), 600);
        }, 500);
      } else {
        timeout = setTimeout(() => {
          // 초기화
          setDisplayedText('');
          setIndex(0);
          setFirstDone(false);
          setShowFixedLine(false);
          setButtonHighlight(false);
        }, 3000);
      }
    }

    return () => clearTimeout(timeout);
  }, [index, firstDone, showFixedLine]);

  return (
    <BannerWrapper>
      <VideoBackground ref={videoRef} autoPlay muted loop playsInline>
        <source src="/img/banner.mp4" type="video/mp4" />
      </VideoBackground>
      <VideoOverlay />

      <BannerContent>
        <TypingLine>
          {displayedText}
          <span className="cursor">|</span>
        </TypingLine>

        <FixedLine className={showFixedLine ? 'fade-in' : ''}>
          하방, 지금 바로 시작하세요.
        </FixedLine>

        <ButtonCircle
          href="#ContactFormSection"
          className={buttonHighlight ? 'highlight' : ''}
        >
          →
        </ButtonCircle>
      </BannerContent>
    </BannerWrapper>
  );
};

export default BannerSection;
