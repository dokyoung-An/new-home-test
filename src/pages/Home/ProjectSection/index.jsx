import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../styles/common';
import { supabase } from '../../../lib/supabaseClient';
import {
  ProjectContainer,
  ProjectContent,
  ProjectTitle,
  FilterSection,
  FilterButton,
  ProjectLayout,
  YearBadge,
  ProjectGrid,
  ProjectCard,
  ProjectImage,
  ProjectInfo,
  ProjectName,
  ProjectLocation,
  MoreButton,
  BenefitSection,
  BenefitGrid,
  BenefitCard,
  BenefitIcon,
  BenefitTitle,
  BenefitDescription,
  LoadingMessage
} from './style';

// 더미 데이터 (실제로는 API에서 가져올 데이터)


const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestYear, setLatestYear] = useState('2025');
  const [selectedLocation, setSelectedLocation] = useState('전체');


  const benefits = [
    {
      icon: '/img/icons/1.png',
      title: '경상도 전지역 완벽 커버',
      description: '가까운 지역 네트워크 기반 경상권 전역 출장비 없이 프리미엄 서비스 제공'
    },
    {
      icon: '/img/icons/2.png',
      title: '신속한 대응 관리',
      description: '현장 문제 발생 시 즉시 대응할 수 있는 체계로 입주민 불편 최소화'
    },
    {
      icon: '/img/icons/3.png',
      title: '밀착 하자 컨설팅',
      description: '점검 이후에도 보수 요청 및 하자 처리 과정을 온라인으로 완벽 케어어'
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Supabase에서 활성화된 프로젝트 가져오기
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('프로젝트 로드 오류:', error);
          // 오류 시 빈 배열 사용
          setProjects([]);
          setLatestYear('2025');
          return;
        }

        if (data && data.length > 0) {
          // 최신 연도 찾기
          const years = [...new Set(data.map(project => project.year))].sort((a, b) => b - a);
          const latestYearFound = years.length > 0 ? years[0] : '2025';
          setLatestYear(latestYearFound);
          
          // 최신 연도의 프로젝트만 필터링
          const latestYearProjects = data.filter(project => project.year === latestYearFound);
          setProjects(latestYearProjects);
        } else {
          // 데이터가 없으면 빈 배열 사용
          setProjects([]);
          setLatestYear('2025');
        }
      } catch (err) {
        console.error('프로젝트 로드 중 예외:', err);
        // 예외 시 빈 배열 사용
        setProjects([]);
        setLatestYear('2025');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 지역별로 프로젝트 필터링
  const filteredProjects = selectedLocation === '전체' 
    ? projects 
    : projects.filter(project => project.location === selectedLocation);
  
  // 지역 목록 (경상권)
  const locations = ['전체', '울산', '부산', '대구', '창원', '포항', '김해'];

  // 모바일 체크
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일에서는 3개, PC에서는 6개
  const displayProjects = isMobile ? filteredProjects.slice(0, 3) : filteredProjects.slice(0, 6);

 

  return (
    <ProjectContainer>
      <Container>
        <ProjectContent>
          <ProjectTitle>
            사전점검 하방은 <span>경상권 1위 업체</span>로서<br />
            <span>지역 밀착형 고객 서비스</span>를 기본으로 제공 합니다
          </ProjectTitle>
          
          <FilterSection>
            {locations.map((location) => (
              <FilterButton
                key={location}
                active={selectedLocation === location}
                onClick={() => setSelectedLocation(location)}
              >
                {location}
              </FilterButton>
            ))}
            <MoreButton as={Link} to="/about">
              더보기 ›
            </MoreButton>
          </FilterSection>

          <ProjectLayout>
            <YearBadge>{latestYear}</YearBadge>
            {loading ? (
              <LoadingMessage>프로젝트를 불러오는 중...</LoadingMessage>
            ) : (
              <ProjectGrid>
                {displayProjects.map((project) => (
                  <ProjectCard key={project.id}>
                    <ProjectImage src={project.image_url || project.image} alt={project.name} />
                    <ProjectInfo>
                      <ProjectName>{project.name}</ProjectName>
                      <ProjectLocation>{project.location}</ProjectLocation>
                    </ProjectInfo>
                  </ProjectCard>
                ))}
              </ProjectGrid>
            )}
          </ProjectLayout>

          <BenefitSection>
            <BenefitGrid>
              {benefits.map((benefit, index) => (
                <BenefitCard key={index}>
                  <BenefitIcon>
                    <img src={benefit.icon} alt={benefit.title} />
                  </BenefitIcon>
                  <BenefitTitle>{benefit.title}</BenefitTitle>
                  <BenefitDescription>
                    {benefit.description.split('\n').map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx < benefit.description.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </BenefitDescription>
                </BenefitCard>
              ))}
            </BenefitGrid>
          </BenefitSection>
        </ProjectContent>
      </Container>
    </ProjectContainer>
  );
};

export default ProjectSection;
