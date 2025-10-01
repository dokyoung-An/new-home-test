import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';
import { getGroupBuyPostsPaginated } from '../../../../lib/groupBuyApi';

const GroupBuyBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedPopupImages, setSelectedPopupImages] = useState([]); // 배열로 변경

  // 실제 데이터 로드
  useEffect(() => {
    loadPosts(currentPage, searchKeyword);
  }, [currentPage, searchKeyword]);

  const loadPosts = async (page, keyword = '') => {
    try {
      setLoading(true);
      setError(null);
      const result = await getGroupBuyPostsPaginated(page, 10, keyword);
      
      // 데이터 형식 변환
      const formattedData = result.data.map(post => ({
        id: post.id,
        date: new Date(post.created_at).toISOString().split('T')[0].replace(/-/g, '.'),
        complexName: post.complex_name,
        status: post.status,
        reviewUrl: post.review_url || null,
        popupImageUrls: post.popup_image_urls ? JSON.parse(post.popup_image_urls) : []
      }));
      
      setPosts(formattedData);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchKeyword(searchInput);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    // 실시간 검색 (500ms 디바운스)
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      setSearchKeyword(value);
      setCurrentPage(1);
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchKeyword('');
    setCurrentPage(1);
  };

  const handleComplexNameClick = (popupImageUrls) => {
    if (popupImageUrls && popupImageUrls.length > 0) {
      setSelectedPopupImages(popupImageUrls);
    }
  };

  const handleClosePopup = () => {
    setSelectedPopupImages([]);
  };

  return (
    <Container>
      <Content>
        <Header>
          <Title>하방 사전점검 공동구매 현황</Title>
          <ContactInfo>
            궁금한 점이 있으시면 언제든지 문의하세요.<br />
            고객센터: <PhoneLink href="tel:1566-2384">1566-2384</PhoneLink>
          </ContactInfo>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Header>

        <BoardContainer>
          <SearchSection>
            <SearchForm onSubmit={handleSearch}>
              <SearchInputContainer>
                <SearchInput
                  type="text"
                  placeholder="단지명 검색 (예: 대구, 래미안, 힐스테이트...)"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                {searchKeyword && (
                  <ClearButton type="button" onClick={handleClearSearch}>
                    ✕
                  </ClearButton>
                )}
              </SearchInputContainer>
              <SearchButton type="submit" disabled={loading}>
                🔍 검색
              </SearchButton>
            </SearchForm>
            {searchKeyword && (
              <SearchResult>
                "{searchKeyword}" 검색 결과 {posts.length}개
              </SearchResult>
            )}
          </SearchSection>

          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>번호</HeaderCell>
                <HeaderCell className='start-date'>모집시작일</HeaderCell>
                <HeaderCell>단지명</HeaderCell>
                <HeaderCell>상태</HeaderCell>
                <HeaderCell>리뷰 확인</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                    로딩 중...
                  </TableCell>
                </TableRow>
              ) : posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                    {searchKeyword 
                      ? `"${searchKeyword}" 검색 결과가 없습니다.` 
                      : '등록된 게시글이 없습니다.'
                    }
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post, index) => (
                  <TableRow key={post.id}>
                    <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                    <TableCell className="start-date">{post.date}</TableCell>
                    <TableCell>
                      {post.popupImageUrls && post.popupImageUrls.length > 0 ? (
                        <ComplexNameButton onClick={() => handleComplexNameClick(post.popupImageUrls)}>
                          {post.complexName}
                        </ComplexNameButton>
                      ) : (
                        post.complexName
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={post.status}>
                        {post.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      {post.reviewUrl ? (
                        <ReviewButton onClick={() => handleReviewClick(post.reviewUrl)}>
                          리뷰
                        </ReviewButton>
                      ) : (
                        <NoButton></NoButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationButton
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationButton>
              ))}
            </Pagination>
          )}
        </BoardContainer>

        {/* 팝업 모달 */}
        {selectedPopupImages.length > 0 && (
          <PopupModal onClick={handleClosePopup}>
            <PopupContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={handleClosePopup}>✕</CloseButton>
              
              <PopupImageContainer>
                {selectedPopupImages.map((imageUrl, index) => (
                  <PopupImage 
                    key={index}
                    src={imageUrl} 
                    alt={`공동구매 상세 정보 ${index + 1}`} 
                  />
                ))}
              </PopupImageContainer>
            </PopupContent>
          </PopupModal>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 80px 0;
  background: #fff;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    padding: 60px 0px;
  }
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
  margin-bottom: 50px;
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

const ContactInfo = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
`;

const PhoneLink = styled.a`
  color: ${({ theme }) => theme.primaryMiddle};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 12px 20px;
  border-radius: 8px;
  margin-top: 15px;
  border-left: 4px solid #c62828;
  text-align: center;
`;

const BoardContainer = styled.div`

  padding: 40px;
  

  @media (max-width: 768px) {
    padding: 20px;
   
  }
`;

const SearchSection = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

`;

const SearchForm = styled.form`
  display: flex;
  gap: 12px;
  align-items: stretch;
  margin-bottom: 15px;
  max-width: 500px;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
    max-width: 100%;
    margin-bottom: 0;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primaryMiddle};
    box-shadow: 0 0 0 3px rgba(26, 109, 255, 0.1);
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    padding: 10px 35px 10px 14px;
    font-size: 0.9rem;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
    color: #666;
  }
`;

const SearchButton = styled.button`
  background: ${({ theme, disabled }) => disabled ? '#ccc' : theme.primaryMiddle};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 100px;

  &:hover {
    background: ${({ theme, disabled }) => disabled ? '#ccc' : theme.primaryDark};
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-1px)'};
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

const SearchResult = styled.div`
  color: ${({ theme }) => theme.primaryMiddle};
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 12px;
  background: rgba(26, 109, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid ${({ theme }) => theme.primaryMiddle};
  align-self: flex-end;
  max-width: 500px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    align-self: stretch;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const TableHeader = styled.thead`
  background: #f8f8f8;

`;

const HeaderRow = styled.tr``;

const HeaderCell = styled.th`
  padding: 15px 10px;
  color: #333;
  font-weight: 600;
  text-align: center;
  font-size: 1rem;
  border-top: 2px solid #333;
  border-bottom: 1px solid #333;
  word-break: keep-all;

  @media (max-width: 768px) {
    padding: 8px 4px;
    font-size: 0.9rem;

    &.start-date {
      display: none;
    }
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  /* &:nth-child(even) {
    background: #f8f9fa;
  } */

  &:hover {
    background: rgba(26, 109, 255, 0.05);
  }
`;

const TableCell = styled.td`
  padding: 15px 10px;
  text-align: center;
  border-bottom: 1px solid #cedae7;
  font-size: 1rem;
  word-break: keep-all;

  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 0.9rem;
    text-align: left;

    &.start-date {
      display: none;
    }
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  word-break: keep-all;
  text-align: center;
  background: ${({ status }) => {
    switch(status) {
      case '예약 마감': return '#ffebee';
      case '모집중': return '#fff3e0';
      case '리뷰 등록됨': return '#e3f2fd';
      default: return '#f5f5f5';
    }
  }};
  color: ${({ status }) => {
    switch(status) {
      case '예약 마감': return '#c62828';
      case '모집중': return '#f57c00';
      case '리뷰 등록됨': return '#1976d2';
      default: return '#666';
    }
  }};

  @media (max-width: 768px) {   
    padding: 4px 6px;
    font-size: 0.8rem;
  }
`;

const ReviewButton = styled.button`
  background: ${({ theme }) => theme.primaryMiddle};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const NoButton = styled.span`
  color: ${({ theme }) => theme.textLight};
  font-size: 1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

const PaginationButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #e0e0e0;
  background: ${({ active }) => active ? '#1a6dff' : 'white'};
  color: ${({ active }) => active ? 'white' : '#666'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) => active ? '#1a6dff' : '#f5f5f5'};
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
`;

const ComplexNameButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primaryMiddle};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const PopupModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const PopupContent = styled.div`
  position: relative;
  background: white;
  border-radius: 16px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 20px;
    top: 10px;
    right: 10px;
  }
`;

const PopupImageContainer = styled.div`
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const PopupImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  
  /* 이미지 사이 구분선 추가 */
  &:not(:last-child) {
    border-bottom: 2px solid #e0e0e0;
  }
`;

export default GroupBuyBoard;
