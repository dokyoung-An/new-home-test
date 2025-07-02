import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionWrapper = styled.section`
  padding: 100px 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/img/earth-view.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  color: white;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  text-align: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const StatItem = styled(motion.div)`
  padding: 20px;
`;

const StatValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a6dff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const statsData = [
  {
    value: '100세대 이상',
    label: '누적 촬영 세대 수'
  },
  {
    value: '전국 15개 지역',
    label: '촬영 지역'
  },
  {
    value: '98.2%',
    label: '고객 만족도'
  }
];

const StatisticsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <SectionWrapper>
      <Container>
        <StatsGrid ref={ref}>
          {statsData.map((stat, index) => (
            <StatItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsGrid>
      </Container>
    </SectionWrapper>
  );
};

export default StatisticsSection; 