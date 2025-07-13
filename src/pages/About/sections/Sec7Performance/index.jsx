import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';

const Sec7Performance = () => {
  const performanceData = {
    2025: [
      { 
        name: '대공원한신더휴',
        location: '울산시',
        image: '/img/product/ul_han.png',
        description: '공동주택 품질점검'
      },
      { 
        name: '남영역롯데캐슬헤리티지',
        location: '용인시',
        image: '/img/product/yong_heri.JPG',
        description: '사전점검 컨설팅'
      },
      { 
        name: '에코델타시티푸르지오센터파크',
        location: '부산',
        image: '/img/product/bu_echo.JPG',
        description: '아파트 전수점검'
      },
      { 
        name: '원호자이더포레',
        location: '구미시',
        image: '/img/product/gu_one.JPG',
        description: '공동주택 품질점검'
      },
      { 
        name: '자이시그니처',
        location: '창원시',
        image: '/img/product/chang_zai.JPG',
        description: '사전점검 컨설팅'
      },
      { 
        name: '힐스테이트마크로엔',
        location: '창원시',
        image: '/img/product/chang_hil.JPG',
        description: '아파트 전수점검'
      }
    ],
    2024: [
      { 
        name: '구의역롯데캐슬이스트폴',
        location: '서울시',
        image: '/img/product/seo_east.JPG',
        description: '공동주택 품질점검'
      },
      { 
        name: '롯데캐슬하버팰리스',
        location: '창원시',
        image: '/img/product/chang_lotte.JPG',
        description: '사전점검 컨설팅'
      },
      { 
        name: '한화포레나노태',
        location: '천안시',
        image: '/img/product/cheon_no.JPG',
        description: '아파트 전수점검'
      },
      { 
        name: '오천아이파크',
        location: '포항시',
        image: '/img/product/po_o.JPG',
        description: '공동주택 품질점검'
      },
      { 
        name: '죽전역에일린의뜰',
        location: '대구시',
        image: '/img/product/dae_juk.JPG',
        description: '사전점검 컨설팅'
      },
      { 
        name: '강동중흥밀레니얼S클래스',
        location: '서울시',
        image: '/img/product/seo_mil.JPG',
        description: '아파트 전수점검'
      }
    ],
    2023: [
      { 
        name: '디에이치퍼스티어아이파크',
        location: '서울시',
        image: '/img/product/seo_the.JPG',
        description: '공동주택 품질점검'
      },
      { 
        name: '부평그랑힐스',
        location: '인천시',
        image: '/img/product/in_bu.JPG',
        description: '사전점검 컨설팅'
      },
      { 
        name: '래미안원베일리',
        location: '서울',
        image: '/img/product/seo_re.JPG',
        description: '아파트 전수점검'
      },
      { 
        name: '서대구역반도유보라센텀',
        location: '대구',
        image: '/img/product/dae_ban.JPG',
        description: '공동주택 품질점검'
      },
      { 
        name: '지웰시티자이',
        location: '울산',
        image: '/img/product/ul_ge.JPG',
        description: '사전점검 컨설팅'
      },
      { 
        name: '수성더팰리스푸르지오더샵',
        location: '대구',
        image: '/img/product/dae_su.JPG',
        description: '아파트 전수점검'
      }
    ]
  };

  return (
    <Section>
      <Container>
        <Title>공동구매 실적</Title>
        <Subtitle>하방과 함께한 대표 단지를 소개합니다</Subtitle>
        
        <TimelineContainer>
          {Object.entries(performanceData).reverse().map(([year, projects]) => (
            <YearSection key={year}>
              <YearLabel>{year}</YearLabel>
              <ProjectsContainer>
                {projects.map((project, index) => (
                  <ProjectCard key={index}>
                    <ImageContainer>
                      <ProjectImage src={project.image} alt={project.name} />
                      <Overlay>
                        <Description>{project.description}</Description>
                      </Overlay>
                    </ImageContainer>
                    <ProjectInfo>
                      <ProjectName>{project.name}</ProjectName>
                      <Location>{project.location}</Location>
                    </ProjectInfo>
                  </ProjectCard>
                ))}
              </ProjectsContainer>
            </YearSection>
          ))}
        </TimelineContainer>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  width: 100%;
  padding: 100px 0;
  background-color: ${({ theme }) => theme.white};

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.gray700};
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const YearSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const YearLabel = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  min-width: 120px;
  padding: 1rem;
  background: ${({ theme }) => `${theme.primaryLight}15`};
  border-radius: 12px;
  text-align: center;
  position: sticky;
  top: 100px;

  @media (max-width: 768px) {
    width: 100%;
    position: static;
  }
`;

const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
`;


const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    
    img {
      transform: scale(1.05);
    }
    
    /* ${Overlay} {
      opacity: 1;
    } */
  }
`;


const Description = styled.span`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 2px solid white;
  border-radius: 20px;
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const Location = styled.span`
  color: ${({ theme }) => theme.gray600};
  font-size: 0.9rem;
`;

export default Sec7Performance; 