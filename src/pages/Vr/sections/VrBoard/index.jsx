import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fadeIn } from '../../../../styles/animations';
import { getVrContents, generateVrTitle } from '../../../../lib/vrApi';

const VrBoard = () => {
  const [vrContents, setVrContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setTotalContents] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  
  const CONTENTS_PER_PAGE = 10;

  useEffect(() => {
    loadVrContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const loadVrContents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getVrContents(currentPage, CONTENTS_PER_PAGE, searchTerm);
      setTotalContents(response.total);
      setTotalPages(response.totalPages);
      
      // 데이터 형식 변환
      const formattedData = response.data.map((content, index) => ({
        id: content.id,
        number: response.total - ((currentPage - 1) * CONTENTS_PER_PAGE) - index,
        title: generateVrTitle(content.apartment_name, content.building_number, content.phone_last),
        date: new Date(content.created_at).toLocaleDateString('ko-KR'),
        apartmentName: content.apartment_name,
        buildingNumber: content.building_number,
        phoneLast: content.phone_last
      }));
      
      setVrContents(formattedData);
    } catch (err) {
      setError('VR 콘텐츠를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleContentClick = (contentId) => {
    navigate(`/vr/${contentId}`);
  };

  const handleSearch = () => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 이전 페이지 버튼
    if (currentPage > 1) {
      pages.push(
        <PageButton key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          ‹
        </PageButton>
      );
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    // 다음 페이지 버튼
    if (currentPage < totalPages) {
      pages.push(
        <PageButton key="next" onClick={() => handlePageChange(currentPage + 1)}>
          ›
        </PageButton>
      );
    }

    return <Pagination>{pages}</Pagination>;
  };

  if (loading) {
    return (
      <Container>
        <Content>
          <LoadingMessage>VR 콘텐츠를 불러오는 중...</LoadingMessage>
        </Content>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Content>
          <ErrorMessage>{error}</ErrorMessage>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>VR 콘텐츠 목록</Title>
          <Subtitle>고객님 전화번호 뒤 4자리를 검색창에 입력하여 VR를 확인해보세요.<br/>
          <span className='password'>※ 비밀번호는 고객님 전화번호 <br/>010부터 끝까지 숫자로 되어 있습니다. </span><br/>
          <span>보고서가 열리지 않는다면 고객센터로 문의주시기 바랍니다. </span></Subtitle>
        </Header>
         <ReportButton>
           <Button onClick={() => window.open('https://vink2.imweb.me/vr2', '_blank')}>
             2025년 9월 이전 VR 확인
           </Button>
         </ReportButton>
        
        <SearchSection>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="휴대폰 뒷 4자리를 입력하세요"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
          </SearchContainer>
        </SearchSection>

        {vrContents.length === 0 ? (
          <EmptyMessage>등록된 VR 콘텐츠가 없습니다.</EmptyMessage>
        ) : (
          <>
            <BoardTable>
               <TableHeader>
                 <HeaderRow>
                   <HeaderCell width="10%" mobileWidth="15%">번호</HeaderCell>
                   <HeaderCell width="15%" mobileWidth="25%">날짜</HeaderCell>
                   <HeaderCell width="75%" mobileWidth="60%">제목</HeaderCell>
                 </HeaderRow>
               </TableHeader>
              <TableBody>
                {vrContents.map((content) => (
                  <TableRow key={content.id} onClick={() => handleContentClick(content.id)}>
                    <TableCell>{content.number}</TableCell>
                    <TableCell>{content.date}</TableCell>
                    <TableCell className="title">{content.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </BoardTable>
            
            {renderPagination()}
          </>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 80px 0;
  background: #ffffff;
  animation: ${fadeIn} 1s ease-out;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const ReportButton = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.primaryMiddle};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
    transform: translateY(-1px);
  }
`;


const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 20px;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
  word-break: keep-all;

  span {
    font-size: 1rem;
    color: #666;
    font-weight: 400;
    display: block;
    margin-top: 10px;
    &.password {
        br {
            display: none;
        }
    }
   
  }
   

  @media (max-width: 768px) {
    font-size: 1rem;
    span {
      font-size: 0.8rem;
      &.password {
        br {
            display: block;
        }
      }
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
  color: #c62828;
  background: #ffebee;
  border-radius: 12px;
  border-left: 4px solid #c62828;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 80px 20px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
`;

const SearchSection = styled.div`
  margin-bottom: 40px;
`;

const SearchContainer = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryMiddle};
  }

  &::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.primaryMiddle};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
    transform: translateY(-1px);
  }
`;

const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  overflow: hidden;
  margin-bottom: 40px;
`;

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.primaryMiddle};
`;

const HeaderRow = styled.tr``;

const HeaderCell = styled.th`
  padding: 12px 15px;
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 1rem;
  width: ${({ width }) => width};

  @media (max-width: 768px) {
    padding: 15px 10px;
    font-size: 0.9rem;
    width: ${({ mobileWidth, width }) => mobileWidth || width};
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.3s ease;


  &:nth-child(even) {
    background: #f8f9fa;
  }

  &:hover {
    background: rgba(67, 56, 202, 0.05);
  }
`;

const TableCell = styled.td`
  padding: 16px 15px;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
  font-size: 0.95rem;
  vertical-align: middle;

  &.title {
    text-align: left;
    font-weight: 500;
    color: ${({ theme }) => theme.textDark};
  }

  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 0.85rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
`;

const PageButton = styled.button`
  padding: 10px 14px;
  border: 1px solid ${({ active, theme }) => active ? theme.primaryColor : '#e9ecef'};
  background: ${({ active, theme }) => active ? theme.primaryColor : 'white'};
  color: ${({ active, theme }) => active ? 'white' : theme.textDark};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 40px;

  &:hover {
    background: ${({ active, theme }) => active ? theme.primaryColor : '#f8f9fa'};
    border-color: ${({ theme }) => theme.primaryColor};
    color: ${({ active, theme }) => active ? 'white' : theme.primaryColor};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default VrBoard;

