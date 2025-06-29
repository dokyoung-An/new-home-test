import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import PricingSection from '../PricingSection';
import {
  ContactSection,
  ContactContainer,
  ContentSection,
  SectionTitle,
  SectionDescription,
 
  FormSection,
  FormTitle,
  FormSubtitle,
  Form,
  FormRow,
  FormGroup,
  Label,
  RequiredMark,
  Input,
 
  SubmitButton,

  DesignElement1,
  DesignElement2,
  DesignElement3,
  Sections,
  InquiryBoard,

  TableContainer,
  TableHeader,
  Table,
  Th,
  Td,
  StatusButton,
  Title as TableTitle,
  MobileTable,
  MobileRow,
  FormInner,
  CloseButton,
  
  StatsContainer,
  StatBox,
  StatContent,
  StatLabel,
  StatNumber,
  StatIcon,
  LoadMoreButton,
  Pagination,
  PageButton
} from './style';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { BsFillChatDotsFill, BsFillCheckCircleFill, BsCalendarCheckFill } from 'react-icons/bs';


const TitleBoxContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TitleContainer = styled.div`
  background-color: #F8F9FA;
  padding: 60px 0;
`;

const TitleBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`

  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 50px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#4285F4' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#3367D6' : '#f5f5f5'};
  }
`;

const ContactFormSection = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    apartment: ''
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    total: 150,
    completed: 80,
    reserved: 40
  });

  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    completed: 0,
    reserved: 0
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const hasAnimated = useRef(false);

  const { ref: statsRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const formRef = useRef(null);

  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 실시간 데이터 업데이트를 위한 interval 설정
  useEffect(() => {
    fetchInquiries(); // 초기 데이터 로드

    // 5초마다 데이터 새로고침
    const interval = setInterval(() => {
      fetchInquiries();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('habang')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      
      const baseId = data[0]?.id || 0;
      setStats({
        total: baseId + 9480,
        completed: baseId + 9470,
        reserved: baseId + 9270
      });
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  // 최근 문의 내역 가져오기 함수
  const fetchRecentInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('habang')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);  // 최근 10개로 수정

      if (error) {
        console.error('Supabase 쿼리 에러:', error);
        return;
      }

      if (Array.isArray(data)) {
        const formattedData = data.map(item => ({
          id: item.id,
          date: new Date(item.created_at).toLocaleDateString('ko-KR', {
            month: '2-digit',
            day: '2-digit'
          }).replace(/\. /g, '.').slice(0, -1),
          name: item.name || '',
          region: item.region || '',
          apartment: item.apartment || '',
          status: item.inquiry_status || 'new'
        }));
      
        setRecentInquiries(formattedData);
      }
    } catch (error) {
      console.error('최근 문의 내역 로드 실패:', error);
    }
  };

  // 상태에 따른 스타일 객체
  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return { backgroundColor: '#FFD600' };
      case 'in-progress':
        return { backgroundColor: '#00C4B4' };
      default:
        return { backgroundColor: '#1a6dff' };
    }
  };

  // 상태에 따른 텍스트
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '예약완료';
      case 'in-progress':
        return '상담완료';
      default:
        return '상담문의';
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rotateDirection, setRotateDirection] = useState('right');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('habang')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          region: formData.region,
          apartment: formData.apartment,
          inquiry_status: 'new',
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      setFormData({
        name: '',
        phone: '',
        region: '',
        apartment: ''
      });
      
      // 폼 제출 후 즉시 목록 업데이트
      fetchRecentInquiries();
    } catch (error) {
      console.error('문의 제출 오류:', error);
      alert('문의 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    handleCloseForm();
  };

  const handleCloseForm = () => {
    const formSection = document.querySelector('.form-section');
    if (formSection) {
      formSection.classList.remove('active');
    }
  };

  const maskName = (name) => {
    if (!name) return '';
    return name.slice(0, 1) + '*'.repeat(name.length - 1);
  };

  useEffect(() => {
    if (hasAnimated.current) return; // 이미 애니메이션이 실행됐다면 리턴

    const duration = 2000; // 애니메이션 지속 시간 (2초)
    const steps = 60;
    const interval = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        const progress = currentStep / steps;
        setAnimatedStats({
          total: Math.floor(stats.total * progress),
          completed: Math.floor(stats.completed * progress),
          reserved: Math.floor(stats.reserved * progress)
        });
      } else {
        clearInterval(timer);
        setAnimatedStats(stats);
        hasAnimated.current = true; // 애니메이션 완료 표시
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [stats]);

  // 페이지네이션 관련 함수들
  const totalPages = Math.ceil(inquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInquiries = inquiries.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // 이전 페이지 버튼
    buttons.push(
      <PageButton 
        key="prev" 
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        {'<'}
      </PageButton>
    );

    // 페이지 번호 버튼
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PageButton
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    // 다음 페이지 버튼
    buttons.push(
      <PageButton
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </PageButton>
    );

    return buttons;
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'new' : 'in-progress';
      
      const { data, error } = await supabase
        .from('habang')
        .update({ inquiry_status: newStatus })
        .eq('id', id)
        .select();

      if (error) throw error;
      
      // 상태 변경 후 목록 새로고침
      fetchInquiries();
    } catch (error) {
      console.error('상태 변경 오류:', error);
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  };

  const handleConformClick = () => {
    const formSection = document.querySelector('.form-section');
    if (formSection) {
      formSection.classList.add('active');
    }
  };

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + itemsPerPage);
  };

  return (
    <ContactSection id="ContactFormSection" ref={ref}>
        <Sections style={{padding: '100px 0'}}>
       
          <TitleBoxContainer>
        <Title>상담 현황</Title>
          <Subtitle>서비스 현황과 시 하자 100% 완벽관리입니다.</Subtitle>
          </TitleBoxContainer>
          <TitleContainer>
          <TitleBox>
          <StatsContainer ref={statsRef}>
            <StatBox>
              <StatIcon>
                <BsFillChatDotsFill />
              </StatIcon>
              <StatContent>
                <StatLabel>상담신청</StatLabel>
                <StatNumber>{animatedStats.total}</StatNumber>
              </StatContent>
            </StatBox>
            
            <StatBox>
              <StatIcon>
                <BsFillCheckCircleFill />
              </StatIcon>
              <StatContent>
                <StatLabel>상담완료</StatLabel>
                <StatNumber>{animatedStats.completed}</StatNumber>
              </StatContent>
            </StatBox>
            
            <StatBox>
              <StatIcon>
                <BsCalendarCheckFill />
              </StatIcon>
              <StatContent>
                <StatLabel>예약완료</StatLabel>
                <StatNumber>{animatedStats.reserved}</StatNumber>
              </StatContent>
            </StatBox>
          </StatsContainer>
          </TitleBox>
        </TitleContainer>
        <Container>
          <TableContainer>
            <TableHeader>
              <TableTitle style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', color: '#333'}}>상담 현황 목록</TableTitle>
              <ButtonGroup>
                <Button active className="conform" onClick={handleConformClick}>상담신청</Button>
                <Button>조회수</Button>
              </ButtonGroup>
            </TableHeader>
            
            <Table>
              <thead>
                <tr>
                  <Th>번호</Th>
                  <Th>아파트명</Th>
                  <Th>이름</Th>
                  <Th>날짜</Th>
                  <Th>상태</Th>
                </tr>
              </thead>
              <tbody>
                {currentInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <Td>{inquiry.id + 9480}</Td>
                    <Td>{inquiry.apartment}</Td>
                    <Td>{maskName(inquiry.name)}</Td>
                    <Td>{new Date(inquiry.created_at).toLocaleDateString()}</Td>
                    <Td>
                      <StatusButton status={inquiry.inquiry_status}>
                        {inquiry.inquiry_status === 'completed' ? '예약완료' :
                         inquiry.inquiry_status === 'in-progress' ? '상담완료' :
                         '상담문의'}
                      </StatusButton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <MobileTable>
              {currentInquiries.map((inquiry) => (
                <MobileRow key={inquiry.id}>
                  <div className="apartment">{inquiry.apartment}</div>
                  <div className="info-row">
                    <div className="info-left">
                      <span className="name">{maskName(inquiry.name)}</span>
                      <span className="date">{new Date(inquiry.created_at).toLocaleDateString()}</span>
                    </div>
                    <StatusButton status={inquiry.inquiry_status}>
                      {inquiry.inquiry_status === 'completed' ? '예약완료' :
                       inquiry.inquiry_status === 'in-progress' ? '상담완료' :
                       '상담문의'}
                    </StatusButton>
                  </div>
                </MobileRow>
              ))}
            </MobileTable>

            {isMobile ? (
              visibleItems < inquiries.length && (
                <LoadMoreButton onClick={handleLoadMore}>
                  더보기 ({visibleItems}/{inquiries.length})
                </LoadMoreButton>
              )
            ) : (
              <Pagination>
                {renderPaginationButtons()}
              </Pagination>
            )}
          </TableContainer>
        </Container>
      </Sections>
      <ContactContainer>
        <ContentSection>
         
     
         
       
        </ContentSection>
        <FormSection className="form-section">
          <FormInner>
            <CloseButton onClick={handleCloseForm}>×</CloseButton>
            <FormTitle>사전점검 문의하기</FormTitle>
            <FormSubtitle>
              문의하신 내용은 담당자 검토 후 순차적으로 답변드리겠습니다.
            </FormSubtitle>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                
              </FormRow>

              <FormRow columns="1fr 1fr">
              <FormGroup>
                  <Label>이름<RequiredMark>*</RequiredMark></Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력해주세요"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>연락처<RequiredMark>*</RequiredMark></Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="연락처를 입력해주세요"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow columns="1fr 1fr">
                <FormGroup>
                  <Label>지역<RequiredMark>*</RequiredMark></Label>
                  <Input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="예: 서울시 강남구"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>아파트명<RequiredMark>*</RequiredMark></Label>
                  <Input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="아파트명을 입력해주세요"
                    required
                  />
                </FormGroup>
              </FormRow>


              <SubmitButton type="submit">문의하기</SubmitButton>
            </Form>
          </FormInner>
        </FormSection>
      </ContactContainer>

  

    
    </ContactSection>
  );
});

export default ContactFormSection; 