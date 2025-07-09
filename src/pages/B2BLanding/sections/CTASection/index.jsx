import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SectionWrapper = styled.section`
  padding: 100px 0;
  background-image: url('/img/b2b/2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: center;
  z-index: 1;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  word-break: keep-all;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(motion(Link))`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  ${props => props.primary ? `
    background-color: #1a6dff;
    color: white;
    
    &:hover {
      background-color: #0056e0;
    }
  ` : `
    background-color: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `}
`;

const CTASection = () => {
  return (
    <SectionWrapper>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title>하방 VR 서비스, <br />지금 상담해보세요.</Title>
          <ButtonGroup>
            <Button 
              to="/contact"
              primary
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              상담 신청
            </Button>
            {/* <Button 
              to="/demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              데모 요청하기
            </Button> */}
          </ButtonGroup>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
};

export default CTASection; 