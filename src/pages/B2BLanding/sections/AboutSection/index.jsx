import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled.section`
  padding: 100px 0;
  background: white;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 60px;
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const TextContent = styled(motion.div)`
  flex: 1;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 2rem;
`;

const ImageWrapper = styled(motion.div)`
  flex: 1;
  position: relative;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AboutSection = () => {
  return (
    <SectionWrapper>
      <Container>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Heading>하방 임대사업 솔루션</Heading>
          <Description>
            하방은 임대사업자에게 입주 전 세대 상태를 정밀하게<br/> 기록해 분쟁을 예방하고, 
            원상복구 대비 자료로 활용할 수 있는 <br/>솔루션을 제공합니다.
          </Description>
        </TextContent>
        <ImageWrapper
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image src="/img/b2b/3.png" alt="VR 촬영 현장" />
        </ImageWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default AboutSection; 