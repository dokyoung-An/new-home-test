import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFileContract, FaClipboardCheck, FaPhoneAlt, FaCommentDots, FaImage } from 'react-icons/fa';

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

const Detail = styled.div`
  margin-top: 60px;
  width: 100%;
  padding: 0 20px;
  max-width: 1200px;


  p {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 32px;
    text-align: center;

    span {
      display: block;
      font-size: 16px;
      font-weight: 700;
      color: #1a6dff;
      margin-left: 10px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    padding: 0;
    margin: 0;
    list-style: none;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(5, 1fr);
      
    }



    @media (max-width: 480px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
  }
`;

const FeatureCard = styled.li`
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  aspect-ratio: 1/1;
  width: 100%;
  max-width: 160px;
  margin: 0 auto;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .icon-wrapper {
    width: 44px;
    height: 44px;
    background: #f5f8ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    color: #007AFF;
    font-size: 20px;
  }

  .feature-title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin: 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: keep-all;
    height: 36px;
    white-space: pre-line;
  }

  @media (max-width: 1024px) {
    max-width: 140px;
  }

  @media (max-width: 768px) {
    max-width: 130px;
    padding: 12px;

    .icon-wrapper {
      width: 40px;
      height: 40px;
      font-size: 18px;
      margin-bottom: 8px;
    }

    .feature-title {
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    max-width: 120px;
    padding: 10px;

    .icon-wrapper {
      width: 36px;
      height: 36px;
      font-size: 16px;
    }

    .feature-title {
      font-size: 12px;
      height: 32px;
    }
  }
`;

const features = [
  {
    icon: <FaFileContract />,
    title: '임대계약서 \n첨부'
  },
  {
    icon: <FaClipboardCheck />,
    title: '세대 점검 \n보고서 첨부'
  },
  {
    icon: <FaPhoneAlt />,
    title: '임대사업자 \n연락처 연결'
  },
  {
    icon: <FaCommentDots />,
    title: '카카오톡 \n 채널 연동'
  },
  {
    icon: <FaImage />,
    title: '자체 로고 \n 삽입'
  }
];

const CaseStudySection = () => {
  return (
    <SectionWrapper>
      <Container>
        <Header>
          <Title>직접 체험해 확인하세요</Title>
          <Description>
            퇴거 시, 입주 전 VR 기록으로 수리비 분쟁 없이 마무리할 수 있습니다.
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
              src="https://inhompage.vercel.app/"
              title="임대사업자 서비스"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </IframeContainer>
        </motion.div>
        <Detail>
          <p>VR 추가 기능<span>(+유상 옵션)</span></p>
          <ul>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <div className="icon-wrapper">
                  {feature.icon}
                </div>
                <p className="feature-title">{feature.title}</p>
              </FeatureCard>
            ))}
          </ul>
        </Detail>
      </Container>
    </SectionWrapper>
  );
};

export default CaseStudySection; 