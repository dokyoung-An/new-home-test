import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../styles/animations';
import { canWrite, canDelete } from '../../../utils/adminPermissions';
import { 
  getEventPosts, 
  addEventPost, 
  updateEventPost, 
  deleteEventPost,
  uploadImage,
  uploadMultipleImages,
  deleteImage
} from '../../../lib/eventApi';
import { compressImage, compressMultipleImages, formatFileSize } from '../../../utils/imageUtils';

const EventAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    contentUrls: [],
    thumbnailUrl: ''
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [contentFiles, setContentFiles] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [contentPreviews, setContentPreviews] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const POSTS_PER_PAGE = 10;

  // 데이터 로드
  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEventPosts();
      
      // 데이터 형식 변환
      const formattedData = data.map(post => {
        let contentUrls = [];
        
        // content_urls 파싱
        if (post.content_urls) {
          try {
            contentUrls = JSON.parse(post.content_urls);
          } catch (e) {
            console.error('content_urls 파싱 오류:', e);
            contentUrls = [];
          }
        }
        
        return {
          id: post.id,
          date: new Date(post.created_at).toISOString().split('T')[0].replace(/-/g, '.'),
          title: post.title,
          contentUrls: contentUrls,
          thumbnailUrl: post.thumbnail_url || ''
        };
      });
      
      // 페이지네이션 계산
      const totalPosts = formattedData.length;
      const totalPagesCount = Math.ceil(totalPosts / POSTS_PER_PAGE);
      setTotalPages(totalPagesCount);
      
      // 현재 페이지에 해당하는 데이터만 가져오기
      const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      const paginatedData = formattedData.slice(startIndex, endIndex);
      
      setPosts(paginatedData);
    } catch (err) {
      setError(`게시글을 불러오는데 실패했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsCompressing(true);
      try {
        // 이미지 압축
        const compressedFile = await compressImage(file, 0.8, 800, 600);
        setThumbnailFile(compressedFile);
        
        const reader = new FileReader();
        reader.onload = () => setThumbnailPreview(reader.result);
        reader.readAsDataURL(compressedFile);
        
        console.log(`썸네일 압축: ${formatFileSize(file.size)} → ${formatFileSize(compressedFile.size)}`);
      } catch (error) {
        console.error('썸네일 압축 오류:', error);
        alert('썸네일 압축 중 오류가 발생했습니다.');
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleContentChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setIsCompressing(true);
      try {
        // 여러 이미지 압축
        const compressedFiles = await compressMultipleImages(files, 0.8, 1200, 1200);
        setContentFiles(compressedFiles);
        
        // 미리보기 생성
        const previews = [];
        for (const file of compressedFiles) {
          const reader = new FileReader();
          const preview = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
          previews.push(preview);
        }
        setContentPreviews(previews);
        
        const originalSize = files.reduce((sum, file) => sum + file.size, 0);
        const compressedSize = compressedFiles.reduce((sum, file) => sum + file.size, 0);
        console.log(`내용 이미지 압축: ${formatFileSize(originalSize)} → ${formatFileSize(compressedSize)}`);
      } catch (error) {
        console.error('내용 이미지 압축 오류:', error);
        alert('이미지 압축 중 오류가 발생했습니다.');
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleAddPost = async () => {
    if (!canWrite()) {
      alert('글쓰기 권한이 없습니다.');
      return;
    }
    
    if (!newPost.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (contentFiles.length === 0) {
      alert('서비스 내용 이미지를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      let thumbnailUrl = '';
      let contentUrls = [];

      // 썸네일 이미지 업로드
      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile);
      }

      // 서비스 내용 이미지들 업로드
      if (contentFiles.length > 0) {
        contentUrls = await uploadMultipleImages(contentFiles);
      }

      const postData = {
        ...newPost,
        thumbnailUrl,
        contentUrls
      };

      await addEventPost(postData);
      
      setNewPost({ 
        title: '', 
        contentUrls: [], 
        thumbnailUrl: ''
      });
      setThumbnailFile(null);
      setContentFiles([]);
      setThumbnailPreview('');
      setContentPreviews([]);
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
      title: post.title,
      contentUrls: post.contentUrls || [],
      thumbnailUrl: post.thumbnailUrl || ''
    });
  };

  const handleSaveEdit = async () => {
    if (!canWrite()) {
      alert('수정 권한이 없습니다.');
      return;
    }
    
    try {
      setLoading(true);
      await updateEventPost(editingId, editData);
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
    if (!canDelete()) {
      alert('삭제 권한이 없습니다.');
      return;
    }
    
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        setLoading(true);
        await deleteEventPost(id);
        await loadPosts();
        alert('게시글이 삭제되었습니다.');
      } catch (err) {
        alert('게시글 삭제에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  // 페이지네이션 함수들
  const handlePageChange = (page) => {
    setCurrentPage(page);
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

    // 이전 버튼
    if (currentPage > 1) {
      pages.push(
        <PaginationButton key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          이전
        </PaginationButton>
      );
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationButton
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    // 다음 버튼
    if (currentPage < totalPages) {
      pages.push(
        <PaginationButton key="next" onClick={() => handlePageChange(currentPage + 1)}>
          다음
        </PaginationButton>
      );
    }

    return (
      <PaginationContainer>
        <PaginationInfo>
          {currentPage} / {totalPages} 페이지
        </PaginationInfo>
        <PaginationButtons>{pages}</PaginationButtons>
      </PaginationContainer>
    );
  };

  return (
    <AdminContent>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <LoadingMessage>처리 중...</LoadingMessage>}

        {/* 새 게시글 추가 */}
        <AddSection>
          <SectionTitle>새 이벤트 추가</SectionTitle>
          <AddForm>
            <InputGroup>
              <Label>제목</Label>
              <Input
                type="text"
                placeholder="이벤트 제목을 입력하세요"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <Label>썸네일 이미지 (선택사항)</Label>
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
              {thumbnailPreview && (
                <ImagePreview>
                  <PreviewImage src={thumbnailPreview} alt="썸네일 미리보기" />
                </ImagePreview>
              )}
            </InputGroup>
            <InputGroup>
              <Label>서비스 내용 이미지 * (여러 장 선택 가능)</Label>
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleContentChange}
                multiple
                required
              />
              {isCompressing && <CompressionMessage>이미지 압축 중...</CompressionMessage>}
              {contentPreviews.length > 0 && (
                <ImagePreviewGrid>
                  {contentPreviews.map((preview, index) => (
                    <ImagePreview key={index}>
                      <PreviewImage src={preview} alt={`내용 이미지 ${index + 1}`} />
                      <PreviewIndex>{index + 1}</PreviewIndex>
                    </ImagePreview>
                  ))}
                </ImagePreviewGrid>
              )}
            </InputGroup>
            <AddButton onClick={handleAddPost} disabled={loading}>
              {loading ? '추가 중...' : '이벤트 추가'}
            </AddButton>
          </AddForm>
        </AddSection>

        {/* 게시글 목록 */}
        <ListSection>
          <SectionTitle>이벤트 목록</SectionTitle>
          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>번호</HeaderCell>
                <HeaderCell>날짜</HeaderCell>
                <HeaderCell>제목</HeaderCell>
                <HeaderCell>썸네일</HeaderCell>
                <HeaderCell>내용이미지</HeaderCell>
                <HeaderCell>관리</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <TableBody>
              {posts.map((post, index) => (
                <TableRow key={post.id}>
                  <TableCell>{posts.length - index}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    {editingId === post.id ? (
                      <EditInput
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                      />
                    ) : (
                      <TitleText>{post.title}</TitleText>
                    )}
                  </TableCell>
                  <TableCell>
                    {post.thumbnailUrl ? (
                      <ThumbnailImage src={post.thumbnailUrl} alt="썸네일" />
                    ) : (
                      <NoImage>이미지 없음</NoImage>
                    )}
                  </TableCell>
                  <TableCell>
                    {post.contentUrls && post.contentUrls.length > 0 ? (
                      <ImageGrid>
                        {post.contentUrls.slice(0, 3).map((url, index) => (
                          <SmallThumbnail key={index} src={url} alt={`내용 이미지 ${index + 1}`} />
                        ))}
                        {post.contentUrls.length > 3 && (
                          <ImageCount>+{post.contentUrls.length - 3}</ImageCount>
                        )}
                      </ImageGrid>
                    ) : (
                      <NoImage>이미지 없음</NoImage>
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
          
          {renderPagination()}
        </ListSection>
    </AdminContent>
  );
};

const AdminContent = styled.div`
  width: 100%;
  background: transparent;
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
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
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

const FileInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryMiddle};
  }
`;

const ImagePreview = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const CompressionMessage = styled.div`
  margin-top: 10px;
  padding: 8px 12px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 15px;
  max-height: 400px;
  overflow-y: auto;
`;

const PreviewIndex = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

const SmallThumbnail = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
`;

const ImageCount = styled.div`
  background: #f0f0f0;
  color: #666;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
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
  align-self: flex-start;

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
  vertical-align: middle;
`;

const TitleText = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
`;

const ThumbnailImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const NoImage = styled.span`
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
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

// 페이지네이션 스타일드 컴포넌트들
const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 15px 0;
  border-top: 1px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const PaginationInfo = styled.span`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;

  &:hover {
    background: ${props => props.active ? '#5a6fd8' : '#f5f5f5'};
    border-color: ${props => props.active ? '#5a6fd8' : '#ccc'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 0.8rem;
    min-width: 35px;
  }
`;

export default EventAdmin;
