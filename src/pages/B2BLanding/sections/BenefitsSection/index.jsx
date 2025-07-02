import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled.section`
  padding: 100px 0;
  background: #f8f9fa;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
`;

const benefitsData = [
  {
    title: '입주 전 상태 기록',
    description: '퇴거 시 원상복구 비교가 가능해 분쟁을 줄입니다.'
  },
  {
    title: '공실 감소',
    description: '외부에서도 세대 상태를 확인할 수 있어 빠른 계약이 가능합니다.'
  },
  {
    title: '분쟁 예방',
    description: '임대인-임차인 간 갈등을 최소화해 신뢰를 쌓습니다.'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const BenefitsSection = () => {
  return (
    <SectionWrapper>
      <Container>
        <CardGrid>
          {benefitsData.map((benefit, index) => (
            <Card
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <CardTitle>{benefit.title}</CardTitle>
              <CardDescription>{benefit.description}</CardDescription>
            </Card>
          ))}
        </CardGrid>
      </Container>
    </SectionWrapper>
  );
};

export default BenefitsSection; 