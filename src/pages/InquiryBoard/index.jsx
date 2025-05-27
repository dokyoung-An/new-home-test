import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import styled from 'styled-components';

// Supabase 클라이언트 설정 - 새 API 키로 업데이트
// Supabase 클라이언트 설정 - 환경변수에서 불러오기
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// 최소한의 옵션으로 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// 테이블 이름 - 복수형과 단수형 모두 시도
const TABLE_NAME = 'inquiries';

// 임시 데이터 (연결 문제가 있을 때 표시할 데이터)
const TEMP_DATA = [
  {
    id: 1,
    date: '2023-05-15',
    name: '홍길동',
    email: 'test@example.com',
    phone: '010-1234-5678',
    region: '서울시',
    apartment: '샘플 아파트',
    interest: 'vr',
    message: '문의 내용입니다. 연락 부탁드립니다.',
    newsletter: '동의',
    status: 'new',
    createdAt: '2023-05-15T09:30:00Z',
    response: null,
    respondedAt: null
  }
];

const InquiryBoard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [useTestData, setUseTestData] = useState(false);
  const itemsPerPage = 10;

  // 문의 목록 가져오기
  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null); // 에러 상태 초기화
      console.log('문의 목록 로딩 시작...');
      
      // 간소화된 테이블 접근 방식
      console.log(`${TABLE_NAME} 테이블에서 데이터 로드 시도...`);
      
      // 타임아웃 없이 단순 접근 시도
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('쿼리 응답:', { 데이터건수: data?.length, 오류: error });
      
      if (error) {
        console.error('Supabase 쿼리 에러:', error);
        
        // API 키 오류인 경우
        if (error.message && error.message.includes('Invalid API key')) {
          throw new Error('Supabase API 키가 유효하지 않습니다. API 키를 확인해주세요.');
        }
        
        throw new Error('문의 목록을 불러오는 데 실패했습니다: ' + error.message);
      }
      
      console.log('문의 데이터 로드 완료:', data ? data.length : 0, '건');
      
      // 데이터가 없는 경우 처리
      if (!data || data.length === 0) {
        console.log('문의 내역이 없습니다.');
        setUseTestData(true);
        setInquiries(TEMP_DATA);
        setTotalPages(1);
        setLoading(false);
        return;
      }
      
      // 데이터의 첫 번째 항목 구조 로깅 (디버깅용)
      console.log('데이터 샘플 구조:', JSON.stringify(data[0]));
      
      // 데이터 형식 변환
      const formattedData = data.map(item => ({
        id: item.id,
        date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : '날짜 없음',
        name: item.name || '이름 없음',       
        phone: item.phone || '',
        region: item.region || '',
        apartment: item.apartment || '',
        inquiry_status: item.inquiry_status || 'new',
        createdAt: item.created_at,
        response: item.response || null,
        respondedAt: item.responded_at || null
      }));
      
      console.log('데이터 변환 완료:', formattedData.length, '건');
      setUseTestData(false); // 테스트 데이터 사용 안 함을 명시
      setInquiries(formattedData);
      setTotalPages(Math.ceil(formattedData.length / itemsPerPage));
    } catch (error) {
      console.error('문의 목록 로드 오류:', error);
      setError(error.message || '문의 목록을 불러오는 데 실패했습니다.');
      
      // 오류 발생 시 임시 데이터로 UI 복구
      setUseTestData(true);
      setInquiries(TEMP_DATA);
      setTotalPages(1);
    } finally {
      // 로딩 상태 종료 - 타임아웃 없이 즉시 로딩 상태 해제
      setLoading(false);
    }
  };

  // 페이지 초기 로드 시 한 번만 문의 목록 가져오기
  useEffect(() => {
    // 타임아웃 설정 - 5초 후에도 로딩이 계속되면 강제로 로딩 상태 해제
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log('로딩 타임아웃 발생');
        setLoading(false);
        setError('데이터 로딩 시간이 초과되었습니다. 테스트 데이터를 표시합니다.');
        setUseTestData(true);
        setInquiries(TEMP_DATA);
        setTotalPages(1);
      }
    }, 5000);
    
    // 별도의 테스트 없이 직접 데이터 로드 시도
    const loadData = async () => {
      try {
        console.log('직접 데이터 로드 시작...');
        
        // 단순 API 호출로 데이터 가져오기 시도
        const { data, error } = await supabase
          .from(TABLE_NAME)
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (error) {
          console.error('데이터 로드 실패:', error);
          setError('데이터 로드 실패: ' + error.message);
          setUseTestData(true);
          setInquiries(TEMP_DATA);
        } else if (!data || data.length === 0) {
          console.log('데이터가 없습니다.');
          setUseTestData(true);
          setInquiries(TEMP_DATA);
        } else {
          console.log('데이터 로드 성공:', data.length, '건');
          
          // 타임아웃 취소 - 데이터를 성공적으로 불러왔기 때문에
          clearTimeout(timeoutId);
          
          // 데이터 형식 변환
          const formattedData = data.map(item => ({
            id: item.id,
            date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : '날짜 없음',
            name: item.name || '이름 없음',
          
            phone: item.phone || '',
            region: item.region || '',
            apartment: item.apartment || '',
           
            message: item.message || '',
         
            inquiry_status: item.inquiry_status || 'new',
            createdAt: item.created_at,
            response: item.response || null,
            respondedAt: item.responded_at || null
          }));
          
          setInquiries(formattedData);
          setTotalPages(Math.ceil(formattedData.length / itemsPerPage));
          setUseTestData(false); // 확실하게 테스트 데이터 사용 안 함을 명시
        }
      } catch (e) {
        console.error('예외 발생:', e);
        setError('예외 발생: ' + e.message);
        setUseTestData(true);
        setInquiries(TEMP_DATA);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
    
    // 클린업 함수
    return () => {
      clearTimeout(timeoutId);
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 필터 변경시 데이터 다시 로드
  useEffect(() => {
    if (!loading) { // 초기 로딩이 아닌 경우에만 필터 변경 시 데이터 다시 로드
      fetchInquiries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, dateFilter]);

  // 문의 상세 정보 가져오기
  const fetchInquiryDetails = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      // 테스트 데이터를 사용 중일 경우
      if (useTestData) {
        const testData = TEMP_DATA.find(item => item.id === id);
        if (testData) {
          setSelectedInquiry(testData);
          setResponseText(testData.response || '');
          setLoading(false);
          return;
        }
      }
      
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('상세 정보 로드 에러:', error);
        throw error;
      }
      
      if (!data) {
        throw new Error('데이터를 찾을 수 없습니다.');
      }
      
      setSelectedInquiry({
        id: data.id,
        date: new Date(data.created_at).toISOString().split('T')[0],
        name: data.name || '이름 없음',
       
        phone: data.phone || '',
        region: data.region || '',
        apartment: data.apartment || '',
      
      
        inquiry_status: data.inquiry_status || 'new',
        createdAt: data.created_at,
        response: data.response || null,
        respondedAt: data.responded_at || null
      });
      
      // 기존 답변이 있으면 불러오기
      if (data.response) {
        setResponseText(data.response);
      } else {
        setResponseText('');
      }
      
    } catch (error) {
      console.error('문의 상세 정보 로드 오류:', error);
      setError('문의 상세 정보를 불러오는 데 실패했습니다: ' + (error.message || ''));
    } finally {
      setLoading(false);
    }
  };

  // 답변 제출 처리
  const handleResponseSubmit = async () => {
    if (!responseText.trim()) {
      alert('답변 내용을 입력해주세요.');
      return;
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('inquiries')
        .update({
          response: responseText,
          responded_at: new Date().toISOString(),
          inquiry_status: 'completed'
        })
        .eq('id', selectedInquiry.id)
        .select();
      
      if (error) {
        throw error;
      }
      
      alert('답변이 성공적으로 제출되었습니다.');
      setSelectedInquiry(null);
      
      // 변경 후 목록 새로고침
      const { data: refreshData, error: refreshError } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!refreshError && refreshData) {
        const formattedData = refreshData.map(item => ({
          id: item.id,
          date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : '날짜 없음',
          name: item.name || '이름 없음',
        
          phone: item.phone || '',
          region: item.region || '',
          apartment: item.apartment || '',
         
          inquiry_status: item.inquiry_status || 'new',
          createdAt: item.created_at,
          response: item.response || null,
          respondedAt: item.responded_at || null
        }));
        
        setInquiries(formattedData);
        setTotalPages(Math.ceil(formattedData.length / itemsPerPage));
      }
    } catch (error) {
      console.error('답변 제출 오류:', error);
      setError('답변 제출 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 상태 변경 처리
  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('inquiries')
        .update({ 
          inquiry_status: newStatus
        })
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('상태 변경 오류:', error);
        throw new Error(error.message);
      }
      
      if (!data || data.length === 0) {
        throw new Error('데이터를 찾을 수 없습니다.');
      }
      
      // 상태 변경 성공 메시지
      const statusMessages = {
        'new': '신규문의',
        'in-progress': '상담중',
        'completed': '예약완료'
      };
      alert(`상태가 "${statusMessages[newStatus]}"로 변경되었습니다.`);

      // 목록 새로고침
      fetchInquiries();
    } catch (error) {
      console.error('상태 변경 오류:', error);
      alert(`상태 변경 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 현재 페이지의 문의 목록
  const getCurrentPageInquiries = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return inquiries.slice(startIndex, endIndex);
  };

  return (
    <PageWrapper>
      <Header>
        <h1>문의 게시판 관리</h1>
        <p>고객 문의사항 관리 페이지입니다</p>
      </Header>
      
      {loading ? (
        <LoadingMessage>
          <LoadingSpinner />
          데이터를 불러오는 중입니다...
        </LoadingMessage>
      ) : error ? (
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
          <RefreshButton onClick={() => {
            setLoading(true);
            setError(null);
            fetchInquiries();
          }}>
            다시 시도
          </RefreshButton>
        </ErrorContainer>
      ) : inquiries.length === 0 ? (
        <EmptyMessage>문의 내역이 없습니다.</EmptyMessage>
      ) : (
        <ContentWrapper>
          <Dashboard>
            <DashboardTitle>
              <h2>문의 내역 관리</h2>
              <FilterControls>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">전체 상태</option>
                  <option value="new">새 문의</option>
                  <option value="in-progress">처리중</option>
                  <option value="completed">답변완료</option>
                </select>
                <input 
                  type="date" 
                  value={dateFilter} 
                  onChange={(e) => setDateFilter(e.target.value)}
                />
                <FilterButton onClick={() => {
                  setLoading(true);
                  fetchInquiries();
                }}>필터 적용</FilterButton>
              </FilterControls>
            </DashboardTitle>

            <InquiryTable>
              <table>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>날짜</th>
                    <th>이름</th>
                    <th>지역</th>
                    <th>연락처</th>
                    <th>관심분야</th>
                    <th>상태</th>
                    <th>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentPageInquiries().map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td>{inquiry.id}</td>
                      <td>{inquiry.date}</td>
                      <td>{inquiry.name}</td>
                      <td>{inquiry.region || '-'}</td>
                      <td>{inquiry.phone || '-'}</td>
                      <td>{inquiry.interest}</td>
                      <td>
                        <StatusCell>
                          <StatusBadge status={inquiry.inquiry_status}>
                            {inquiry.inquiry_status === 'new' ? '신규문의' : 
                             inquiry.inquiry_status === 'in-progress' ? '상담중' : 
                             '예약완료'}
                          </StatusBadge>
                          <StatusButtonGroup>
                            <StatusButton
                              active={inquiry.inquiry_status === 'new'}
                              onClick={() => handleStatusChange(inquiry.id, 'new')}
                            >
                              신규문의
                            </StatusButton>
                            <StatusButton
                              active={inquiry.inquiry_status === 'in-progress'}
                              onClick={() => handleStatusChange(inquiry.id, 'in-progress')}
                            >
                              상담중
                            </StatusButton>
                            <StatusButton
                              active={inquiry.inquiry_status === 'completed'}
                              onClick={() => handleStatusChange(inquiry.id, 'completed')}
                            >
                              예약완료
                            </StatusButton>
                          </StatusButtonGroup>
                        </StatusCell>
                      </td>
                      <td>
                        <ActionButton onClick={() => fetchInquiryDetails(inquiry.id)}>
                          상세보기
                        </ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InquiryTable>

            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationLink 
                  key={page} 
                  active={page === currentPage} 
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              ))}
            </Pagination>
          </Dashboard>
        </ContentWrapper>
      )}
      
      {selectedInquiry && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h2>문의 상세 정보</h2>
              <CloseButton onClick={() => setSelectedInquiry(null)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              {useTestData && (
                <TestDataNote>
                  테스트 모드: 변경사항이 저장되지 않습니다.
                </TestDataNote>
              )}
              <FormSection>
                <h3>기본 정보</h3>
                <FormGroup>
                  <label>이름</label>
                  <p>{selectedInquiry.name}</p>
                </FormGroup>
                <FormGroup>
                  <label>이메일</label>
                  <p>{selectedInquiry.email}</p>
                </FormGroup>
                <FormGroup>
                  <label>연락처</label>
                  <p>{selectedInquiry.phone || '-'}</p>
                </FormGroup>
              </FormSection>
              
              <FormSection>
                <h3>아파트 정보</h3>
                <FormGroup>
                  <label>지역</label>
                  <p>{selectedInquiry.region || '-'}</p>
                </FormGroup>
                <FormGroup>
                  <label>아파트명</label>
                  <p>{selectedInquiry.apartment}</p>
                </FormGroup>
              </FormSection>
              
              <FormSection>
                <h3>문의 정보</h3>
                <FormGroup>
                  <label>상태 변경</label>
                  <StatusButtonsContainer>
                    <StatusButton 
                      active={selectedInquiry.inquiry_status === 'new'}
                      onClick={() => handleStatusChange(selectedInquiry.id, 'new')}
                      disabled={useTestData}
                    >
                      새 문의
                    </StatusButton>
                    <StatusButton 
                      active={selectedInquiry.inquiry_status === 'in-progress'}
                      onClick={() => handleStatusChange(selectedInquiry.id, 'in-progress')}
                      disabled={useTestData}
                    >
                      처리중
                    </StatusButton>
                    <StatusButton 
                      active={selectedInquiry.inquiry_status === 'completed'}
                      onClick={() => handleStatusChange(selectedInquiry.id, 'completed')}
                      disabled={useTestData}
                    >
                      답변완료
                    </StatusButton>
                  </StatusButtonsContainer>
                </FormGroup>
              </FormSection>
              
              <FormSection>
                <h3>답변 작성</h3>
                <FormGroup>
                  <label>답변 내용</label>
                  <textarea 
                    rows="5" 
                    placeholder="답변 내용을 입력하세요"
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    disabled={useTestData}
                  ></textarea>
                </FormGroup>
                <SubmitButton 
                  onClick={handleResponseSubmit}
                  disabled={useTestData || !responseText.trim()}
                >
                  답변 제출
                </SubmitButton>
                {useTestData && (
                  <DisabledMessage>
                    테스트 모드에서는 답변을 제출할 수 없습니다.
                  </DisabledMessage>
                )}
              </FormSection>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </PageWrapper>
  );
};

// 새로 추가한 스타일 컴포넌트
const PageWrapper = styled.div`
  padding: 120px 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 40px;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  p {
    color: #666;
    font-size: 1rem;
  }
`;

const ContentWrapper = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
`;

// 스타일 컴포넌트
const Dashboard = styled.div`
  margin-bottom: 40px;
`;

const DashboardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h2 {
    font-size: 1.8rem;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterControls = styled.div`
  display: flex;
  gap: 15px;
  
  select, input {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
  }
`;

const FilterButton = styled.button`
  background-color: #ff5331;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #cc5200;
  }
`;

const InquiryTable = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead {
    background-color: #333;
    color: white;
  }
  
  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  tbody tr:hover {
    background-color: #f9f9f9;
  }
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const StatusCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const StatusButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  ${StatusCell}:hover & {
    opacity: 1;
  }
`;

const StatusButton = styled.button`
  padding: 2px 6px;
  border: 1px solid ${props => props.active ? '#333' : '#ddd'};
  border-radius: 4px;
  background-color: ${props => props.active ? '#333' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#666'};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? '#222' : '#f5f5f5'};
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 13px;
  
  ${({ status }) => {
    switch (status) {
      case 'new':
        return `
          background-color: #e3f2fd;
          color: #1976d2;
        `;
      case 'in-progress':
        return `
          background-color: #fff3e0;
          color: #f57c00;
        `;
      case 'completed':
        return `
          background-color: #e8f5e9;
          color: #388e3c;
        `;
      default:
        return `
          background-color: #f5f5f5;
          color: #666;
        `;
    }
  }}
`;

const ActionButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #666;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const PaginationLink = styled.a`
  display: inline-block;
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 4px;
  background-color: ${({ active }) => active ? '#ff5331' : 'white'};
  color: ${({ active }) => active ? 'white' : '#333'};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ active }) => active ? '#ff5331' : '#ff8533'};
    color: white;
  }
`;

const Modal = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #ff6600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 5px;
  line-height: 1;
  transition: color 0.3s;
  
  &:hover {
    color: #ff6600;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  
  h3 {
    margin: 0 0 15px 0;
    font-size: 1.2rem;
    color: #ff6600;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #666;
  }
  
  p {
    margin: 0;
    padding: 8px 12px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 20px;
  }
  
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
  }
`;

const StatusButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  background: #ff6600;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background: #cc5200;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #e74c3c;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
`;

const TestDataNote = styled.div`
  margin-bottom: 20px;
  color: #666;
`;

const DisabledMessage = styled.div`
  margin-top: 10px;
  color: #666;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #ff6600;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 50px;
  background-color: #fff9f9;
  border-radius: 8px;
  margin-bottom: 20px;
  
  button {
    margin-top: 20px;
  }
`;

const RefreshButton = styled.button`
  background-color: #ff5331;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #cc5200;
  }
`;

export default InquiryBoard;