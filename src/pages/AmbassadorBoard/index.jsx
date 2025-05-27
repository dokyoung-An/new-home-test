import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { api } from '../../lib/app'; 



// Supabase 클라이언트 설정
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// 테이블 이름 변경
const TABLE_NAME = 'ambassador_applications';

// 임시 데이터
const TEMP_DATA = [
  {
    id: 1,
    date: '2023-05-15',
    name: '홍길동',
    phone: '010-1234-5678',
    region: '서울시',
    apartment: '샘플 아파트',
    status: 'new',
    createdAt: '2023-05-15T09:30:00Z',
    verified: false
  }
];

const AmbassadorBoard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [useTestData, setUseTestData] = useState(false);
  const itemsPerPage = 10;

  
  // 신청 목록 가져오기
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('엠버서더 신청 목록 로딩 시작...');
      
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase 쿼리 에러:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log('신청 내역이 없습니다.');
        setUseTestData(true);
        setApplications(TEMP_DATA);
        setTotalPages(1);
        return;
      }
      
      const formattedData = data.map(item => ({
        id: item.id,
        date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : '날짜 없음',
        name: item.name || '이름 없음',
        phone: item.phone || '',
        region: item.region || '',
        apartment: item.apartment || '',
        status: item.status || 'new',
        verified: item.verified || false,
        createdAt: item.created_at
      }));
      
      setUseTestData(false);
      setApplications(formattedData);
      setTotalPages(Math.ceil(formattedData.length / itemsPerPage));
    } catch (error) {
      console.error('신청 목록 로드 오류:', error);
      setError(error.message || '신청 목록을 불러오는 데 실패했습니다.');
      setUseTestData(true);
      setApplications(TEMP_DATA);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError('데이터 로딩 시간이 초과되었습니다. 테스트 데이터를 표시합니다.');
        setUseTestData(true);
        setApplications(TEMP_DATA);
        setTotalPages(1);
      }
    }, 5000);
    
    fetchApplications();
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchApplications();
    }
  }, [statusFilter, dateFilter]);

  // 상태 변경 처리
  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({ 
          status: newStatus
        })
        .eq('id', id)
        .select();
      
      if (error) {
        throw new Error(error.message);
      }
      
      const statusMessages = {
        'new': '신규신청',
        'in-progress': '검토중',
        'completed': '승인완료'
      };
      alert(`상태가 "${statusMessages[newStatus]}"로 변경되었습니다.`);

      fetchApplications();
    } catch (error) {
      console.error('상태 변경 오류:', error);
      alert(`상태 변경 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 현재 페이지의 신청 목록
  const getCurrentPageApplications = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return applications.slice(startIndex, endIndex);
  };

  return (
    <PageWrapper>
      <Header>
        <h1>엠버서더 신청 관리</h1>
        <p>엠버서더 신청 관리 페이지입니다</p>
      </Header>
      
      {loading ? (
        <LoadingMessage>
          <LoadingSpinner />
          데이터를 불러오는 중입니다...
        </LoadingMessage>
      ) : error ? (
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
          <RefreshButton onClick={fetchApplications}>
            다시 시도
          </RefreshButton>
        </ErrorContainer>
      ) : applications.length === 0 ? (
        <EmptyMessage>신청 내역이 없습니다.</EmptyMessage>
      ) : (
        <ContentWrapper>
          <Dashboard>
            <DashboardTitle>
              <h2>엠버서더 신청 내역</h2>
              <FilterControls>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">전체 상태</option>
                  <option value="new">새 신청</option>
                  <option value="in-progress">검토중</option>
                  <option value="completed">승인완료</option>
                </select>
                <input 
                  type="date" 
                  value={dateFilter} 
                  onChange={(e) => setDateFilter(e.target.value)}
                />
                <FilterButton onClick={fetchApplications}>필터 적용</FilterButton>
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
                    <th>아파트</th>
                    <th>상태</th>
                    <th>인증여부</th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentPageApplications().map((application) => (
                    <tr key={application.id}>
                      <td>{application.id}</td>
                      <td>{application.date}</td>
                      <td>{application.name}</td>
                      <td>{application.region || '-'}</td>
                      <td>{application.phone || '-'}</td>
                      <td>{application.apartment || '-'}</td>
                      <td>
                        <StatusCell>
                          <StatusBadge status={application.status}>
                            {application.status === 'new' ? '신규신청' : 
                             application.status === 'in-progress' ? '검토중' : 
                             '승인완료'}
                          </StatusBadge>
                          <StatusButtonGroup>
                            <StatusButton
                              active={application.status === 'new'}
                              onClick={() => handleStatusChange(application.id, 'new')}
                            >
                              신규신청
                            </StatusButton>
                            <StatusButton
                              active={application.status === 'in-progress'}
                              onClick={() => handleStatusChange(application.id, 'in-progress')}
                            >
                              검토중
                            </StatusButton>
                            <StatusButton
                              active={application.status === 'completed'}
                              onClick={() => handleStatusChange(application.id, 'completed')}
                            >
                              승인완료
                            </StatusButton>
                          </StatusButtonGroup>
                        </StatusCell>
                      </td>
                      <td>
                        <StatusBadge status={application.verified ? 'completed' : 'new'}>
                          {application.verified ? '인증완료' : '미인증'}
                        </StatusBadge>
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
    </PageWrapper>
  );
};

// 스타일 컴포넌트는 InquiryBoard와 동일하게 유지
const PageWrapper = styled.div`
  padding: 120px 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  min-height: 100vh;
`;



const ContentWrapper = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
`;

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

export default AmbassadorBoard;