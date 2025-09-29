import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../styles/animations';
import { 
  getGroupBuyPosts, 
  addGroupBuyPost, 
  updateGroupBuyPost, 
  deleteGroupBuyPost
} from '../../../lib/groupBuyApi';

const GroupBuyAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    complexName: '',
    reviewUrl: '',
    status: '모집중',
    date: new Date().toISOString().split('T')[0] // 오늘 날짜로 기본값 설정
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 데이터 로드
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGroupBuyPosts();
      
      // 데이터 형식 변환
      const formattedData = data.map(post => ({
        id: post.id,
        date: new Date(post.created_at).toISOString().split('T')[0],
        displayDate: new Date(post.created_at).toISOString().split('T')[0].replace(/-/g, '.'),
        complexName: post.complex_name,
        status: post.status,
        reviewUrl: post.review_url || ''
      }));
      
      setPosts(formattedData);
    } catch (err) {
      setError(`게시글을 불러오는데 실패했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async () => {
    if (!newPost.complexName.trim()) {
      alert('단지명을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await addGroupBuyPost(newPost);
      
      setNewPost({ 
        complexName: '', 
        reviewUrl: '', 
        status: '모집중',
        date: new Date().toISOString().split('T')[0]
      });
      await loadPosts();
      alert('게시글이 추가되었습니다.');
    } catch (err) {
      const errorMessage = err.message || '알 수 없는 오류가 발생했습니다.';
      setError(`게시글 추가 실패: ${errorMessage}`);
      alert(`게시글 추가에 실패했습니다: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const post = posts.find(p => p.id === id);
    setEditingId(id);
    setEditData({
      complexName: post.complexName,
      reviewUrl: post.reviewUrl || '',
      status: post.status,
      date: post.date
    });
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      await updateGroupBuyPost(editingId, editData);
      setEditingId(null);
      setEditData({});
      await loadPosts();
      alert('게시글이 수정되었습니다.');
    } catch (err) {
      alert('게시글 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        setLoading(true);
        await deleteGroupBuyPost(id);
        await loadPosts();
        alert('게시글이 삭제되었습니다.');
      } catch (err) {
        alert('게시글 삭제에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Content>
        <Header>
          <Title>공동구매 관리</Title>
          <Subtitle>공동구매 게시글을 관리하고 리뷰를 등록할 수 있습니다.</Subtitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {loading && <LoadingMessage>처리 중...</LoadingMessage>}
        </Header>

        {/* 새 게시글 추가 */}
        <AddSection>
          <SectionTitle>새 게시글 추가</SectionTitle>
          <AddForm>
            <InputGroup>
              <Label>단지명</Label>
              <Input
                type="text"
                placeholder="단지명을 입력하세요"
                value={newPost.complexName}
                onChange={(e) => setNewPost({...newPost, complexName: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <Label>모집시작일</Label>
              <Input
                type="date"
                value={newPost.date}
                onChange={(e) => setNewPost({...newPost, date: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <Label>리뷰 URL (선택사항)</Label>
              <Input
                type="url"
                placeholder="https://example.com/review"
                value={newPost.reviewUrl}
                onChange={(e) => setNewPost({...newPost, reviewUrl: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <Label>상태</Label>
              <Select
                value={newPost.status}
                onChange={(e) => setNewPost({...newPost, status: e.target.value})}
              >
                <option value="모집중">모집중</option>
                <option value="예약 마감">예약마감</option>
              </Select>
            </InputGroup>
            <AddButton onClick={handleAddPost} disabled={loading}>
              {loading ? '추가 중...' : '게시글 추가'}
            </AddButton>
          </AddForm>
        </AddSection>

        {/* 게시글 목록 */}
        <ListSection>
          <SectionTitle>게시글 목록</SectionTitle>
          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>번호</HeaderCell>
                <HeaderCell>날짜</HeaderCell>
                <HeaderCell>단지명</HeaderCell>
                <HeaderCell>리뷰 URL</HeaderCell>
                <HeaderCell>상태</HeaderCell>
                <HeaderCell>관리</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <TableBody>
              {posts.map((post, index) => (
                <TableRow key={post.id}>
                  <TableCell>{posts.length - index}</TableCell>
                  <TableCell>
                    {editingId === post.id ? (
                      <EditInput
                        type="date"
                        value={editData.date}
                        onChange={(e) => setEditData({...editData, date: e.target.value})}
                      />
                    ) : (
                      post.displayDate || post.date
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === post.id ? (
                      <EditInput
                        value={editData.complexName}
                        onChange={(e) => setEditData({...editData, complexName: e.target.value})}
                      />
                    ) : (
                      post.complexName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === post.id ? (
                      <EditInput
                        value={editData.reviewUrl}
                        onChange={(e) => setEditData({...editData, reviewUrl: e.target.value})}
                        placeholder="https://example.com/review"
                      />
                    ) : (
                      post.reviewUrl ? (
                        <UrlLink href={post.reviewUrl} target="_blank">
                          {post.reviewUrl.length > 30 
                            ? `${post.reviewUrl.substring(0, 30)}...` 
                            : post.reviewUrl
                          }
                        </UrlLink>
                      ) : (
                        <NoUrl>-</NoUrl>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === post.id ? (
                      <EditSelect
                        value={editData.status}
                        onChange={(e) => setEditData({...editData, status: e.target.value})}
                      >
                        <option value="모집중">모집중</option>
                        <option value="예약 마감">예약 마감</option>
                      </EditSelect>
                    ) : (
                      <StatusBadge status={post.status}>
                        {post.status}
                      </StatusBadge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === post.id ? (
                      <ButtonGroup>
                        <SaveButton onClick={handleSaveEdit}>저장</SaveButton>
                        <CancelButton onClick={handleCancelEdit}>취소</CancelButton>
                      </ButtonGroup>
                    ) : (
                      <ButtonGroup>
                        <EditButton onClick={() => handleEdit(post.id)}>수정</EditButton>
                        <DeleteButton onClick={() => handleDelete(post.id)}>삭제</DeleteButton>
                      </ButtonGroup>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ListSection>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0;
  animation: ${fadeIn} 1s ease-out;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textLight};
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 20px;
  border-radius: 8px;
  margin-top: 15px;
  border-left: 4px solid #c62828;
  white-space: pre-line;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  max-height: 400px;
  overflow-y: auto;
`;

const LoadingMessage = styled.div`
  background: #e3f2fd;
  color: #1976d2;
  padding: 12px 20px;
  border-radius: 8px;
  margin-top: 15px;
  border-left: 4px solid #1976d2;
`;

const AddSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ListSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

const AddForm = styled.div`
  display: flex;
  gap: 20px;
  align-items: end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputGroup = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryMiddle};
  }
`;

const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryMiddle};
  }
`;

const EditSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
`;

const AddButton = styled.button`
  background: ${({ theme, disabled }) => disabled ? '#ccc' : theme.primaryMiddle};
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme, disabled }) => disabled ? '#ccc' : theme.primaryDark};
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-1px)'};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.primaryMiddle};
`;

const HeaderRow = styled.tr``;

const HeaderCell = styled.th`
  padding: 15px 10px;
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 1rem;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8f9fa;
  }

  &:hover {
    background: rgba(26, 109, 255, 0.05);
  }
`;

const TableCell = styled.td`
  padding: 15px 10px;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
  font-size: 0.95rem;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${({ status }) => {
    switch(status) {
      case '예약 마감': return '#ffebee';
      case '모집중': return '#fff3e0';
      default: return '#e3f2fd';
    }
  }};
  color: ${({ status }) => {
    switch(status) {
      case '예약 마감': return '#c62828';
      case '모집중': return '#f57c00';
      default: return '#1976d2';
    }
  }};
`;

const UrlLink = styled.a`
  color: ${({ theme }) => theme.primaryMiddle};
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const NoUrl = styled.span`
  color: ${({ theme }) => theme.textLight};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const EditButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #45a049;
  }
`;

const DeleteButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #da190b;
  }
`;

const SaveButton = styled.button`
  background: #2196f3;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1976d2;
  }
`;

const CancelButton = styled.button`
  background: #9e9e9e;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #757575;
  }
`;

export default GroupBuyAdmin;
