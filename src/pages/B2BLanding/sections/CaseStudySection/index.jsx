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
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const IframeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    height: 700px;
    padding: 0 20px;
  }
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const CaseStudySection = () => {
  return (
    <SectionWrapper>
      <Container>
        <Header>
          <Title>실제 사례로 확인하세요</Title>
          <Description>
            퇴거 시, 입주 전 VR 기록으로 수리비 분쟁 없이 마무리한 고객 사례입니다.
          </Description>
        </Header>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <IframeContainer>
            <StyledIframe
              src="https://lanhouse-ad.vercel.app/"
              title="임대사업자 서비스"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </IframeContainer>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
};

export default CaseStudySection; 