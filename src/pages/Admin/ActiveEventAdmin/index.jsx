import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../styles/animations';
import { 
  getAllActiveEvents, 
  addActiveEvent, 
  updateActiveEvent, 
  deleteActiveEvent,
  uploadImage,
  uploadMultipleImages,
  deleteImage
} from '../../../lib/activeEventApi';
import { compressImage, compressMultipleImages, formatFileSize } from '../../../utils/imageUtils';

const ActiveEventAdmin = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    eventType: 'general',
    maxParticipants: '',
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
  const EVENTS_PER_PAGE = 10;

  // 데이터 로드
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllActiveEvents();
      
      // 데이터 형식 변환
      const formattedData = data.map(event => {
        let contentUrls = [];
        
        // content_urls 파싱
        if (event.content_urls) {
          try {
            contentUrls = JSON.parse(event.content_urls);
          } catch (e) {
            console.error('content_urls 파싱 오류:', e);
            contentUrls = [];
          }
        }
        
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          startDate: new Date(event.start_date).toISOString().split('T')[0],
          endDate: new Date(event.end_date).toISOString().split('T')[0],
          eventType: event.event_type,
          maxParticipants: event.max_participants,
          currentParticipants: event.current_participants,
          isActive: event.is_active,
          contentUrls: contentUrls,
          thumbnailUrl: event.thumbnail_url || '',
          createdAt: new Date(event.created_at).toISOString().split('T')[0].replace(/-/g, '.')
        };
      });
      
      setEvents(formattedData);
    } catch (err) {
      setError(`이벤트를 불러오는데 실패했습니다: ${err.message}`);
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

  const handleAddEvent = async () => {
    if (!newEvent.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!newEvent.description.trim()) {
      alert('설명을 입력해주세요.');
      return;
    }
    if (!newEvent.startDate) {
      alert('시작일을 선택해주세요.');
      return;
    }
    if (!newEvent.endDate) {
      alert('종료일을 선택해주세요.');
      return;
    }
    if (new Date(newEvent.startDate) >= new Date(newEvent.endDate)) {
      alert('종료일은 시작일보다 늦어야 합니다.');
      return;
    }
    if (contentFiles.length === 0) {
      alert('이벤트 내용 이미지를 선택해주세요.');
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

      // 이벤트 내용 이미지들 업로드
      if (contentFiles.length > 0) {
        contentUrls = await uploadMultipleImages(contentFiles);
      }

      const eventData = {
        title: newEvent.title,
        description: newEvent.description,
        startDate: new Date(newEvent.startDate).toISOString(),
        endDate: new Date(newEvent.endDate).toISOString(),
        eventType: newEvent.eventType,
        maxParticipants: newEvent.maxParticipants ? parseInt(newEvent.maxParticipants) : null,
        thumbnailUrl,
        contentUrls
      };

      await addActiveEvent(eventData);
      
      setNewEvent({ 
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        eventType: 'general',
        maxParticipants: '',
        contentUrls: [], 
        thumbnailUrl: ''
      });
      setThumbnailFile(null);
      setContentFiles([]);
      setThumbnailPreview('');
      setContentPreviews([]);
      await loadEvents();
      alert('이벤트가 추가되었습니다.');
    } catch (err) {
      const errorMessage = err.message || '알 수 없는 오류가 발생했습니다.';
      setError(`이벤트 추가 실패: ${errorMessage}`);
      alert(`이벤트 추가에 실패했습니다: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const event = events.find(e => e.id === id);
    setEditingId(id);
    setEditData({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      eventType: event.eventType,
      maxParticipants: event.maxParticipants || '',
      contentUrls: event.contentUrls || [],
      thumbnailUrl: event.thumbnailUrl || ''
    });
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      
      const eventData = {
        title: editData.title,
        description: editData.description,
        startDate: new Date(editData.startDate).toISOString(),
        endDate: new Date(editData.endDate).toISOString(),
        eventType: editData.eventType,
        maxParticipants: editData.maxParticipants ? parseInt(editData.maxParticipants) : null,
        contentUrls: editData.contentUrls,
        thumbnailUrl: editData.thumbnailUrl
      };
      
      await updateActiveEvent(editingId, eventData);
      setEditingId(null);
      setEditData({});
      await loadEvents();
      alert('이벤트가 수정되었습니다.');
    } catch (err) {
      alert('이벤트 수정에 실패했습니다.');
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
        await deleteActiveEvent(id);
        await loadEvents();
        alert('이벤트가 삭제되었습니다.');
      } catch (err) {
        alert('이벤트 삭제에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AdminContent>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <LoadingMessage>처리 중...</LoadingMessage>}

        {/* 새 이벤트 추가 */}
        <AddSection>
          <SectionTitle>새 이벤트 추가</SectionTitle>
          <AddForm>
            <InputRow>
              <InputGroup>
                <Label>제목 *</Label>
                <Input
                  type="text"
                  placeholder="이벤트 제목을 입력하세요"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </InputGroup>
              <InputGroup>
                <Label>이벤트 타입</Label>
                <Select
                  value={newEvent.eventType}
                  onChange={(e) => setNewEvent({...newEvent, eventType: e.target.value})}
                >
                  <option value="general">일반</option>
                  <option value="promotion">프로모션</option>
                  <option value="contest">경진대회</option>
                  <option value="announcement">공지사항</option>
                </Select>
              </InputGroup>
            </InputRow>
            
            <InputGroup>
              <Label>설명 *</Label>
              <TextArea
                placeholder="이벤트 설명을 입력하세요"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
            </InputGroup>
            
            <InputRow>
              <InputGroup>
                <Label>시작일 *</Label>
                <Input
                  type="date"
                  value={newEvent.startDate}
                  onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                />
              </InputGroup>
              <InputGroup>
                <Label>종료일 *</Label>
                <Input
                  type="date"
                  value={newEvent.endDate}
                  onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                />
              </InputGroup>
              <InputGroup>
                <Label>최대 참가자 수</Label>
                <Input
                  type="number"
                  placeholder="제한 없음"
                  value={newEvent.maxParticipants}
                  onChange={(e) => setNewEvent({...newEvent, maxParticipants: e.target.value})}
                />
              </InputGroup>
            </InputRow>
            
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
              <Label>이벤트 내용 이미지 * (여러 장 선택 가능)</Label>
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
            
            <AddButton onClick={handleAddEvent} disabled={loading}>
              {loading ? '추가 중...' : '이벤트 추가'}
            </AddButton>
          </AddForm>
        </AddSection>

        {/* 이벤트 목록 */}
        <ListSection>
          <SectionTitle>이벤트 목록</SectionTitle>
          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>번호</HeaderCell>
                <HeaderCell>생성일</HeaderCell>
                <HeaderCell>제목</HeaderCell>
                <HeaderCell>기간</HeaderCell>
                <HeaderCell>타입</HeaderCell>
                <HeaderCell>참가자</HeaderCell>
                <HeaderCell>상태</HeaderCell>
                <HeaderCell>썸네일</HeaderCell>
                <HeaderCell>내용이미지</HeaderCell>
                <HeaderCell>관리</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <TableBody>
              {events.map((event, index) => (
                <TableRow key={event.id}>
                  <TableCell>{events.length - index}</TableCell>
                  <TableCell>{event.createdAt}</TableCell>
                  <TableCell>
                    {editingId === event.id ? (
                      <EditInput
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                      />
                    ) : (
                      <TitleText>{event.title}</TitleText>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === event.id ? (
                      <DateContainer>
                        <EditInput
                          type="date"
                          value={editData.startDate}
                          onChange={(e) => setEditData({...editData, startDate: e.target.value})}
                        />
                        <EditInput
                          type="date"
                          value={editData.endDate}
                          onChange={(e) => setEditData({...editData, endDate: e.target.value})}
                        />
                      </DateContainer>
                    ) : (
                      <DateText>
                        {event.startDate} <br />~ {event.endDate}
                      </DateText>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === event.id ? (
                      <EditSelect
                        value={editData.eventType}
                        onChange={(e) => setEditData({...editData, eventType: e.target.value})}
                      >
                        <option value="general">일반</option>
                        <option value="promotion">프로모션</option>
                        <option value="contest">경진대회</option>
                        <option value="announcement">공지사항</option>
                      </EditSelect>
                    ) : (
                      <TypeBadge type={event.eventType}>
                        {event.eventType === 'general' && '일반'}
                        {event.eventType === 'promotion' && '프로모션'}
                        {event.eventType === 'contest' && '경진대회'}
                        {event.eventType === 'announcement' && '공지사항'}
                      </TypeBadge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === event.id ? (
                      <EditInput
                        type="number"
                        value={editData.maxParticipants}
                        onChange={(e) => setEditData({...editData, maxParticipants: e.target.value})}
                      />
                    ) : (
                      <ParticipantText>
                        {event.currentParticipants}/{event.maxParticipants || '∞'}
                      </ParticipantText>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge active={event.isActive}>
                      {event.isActive ? '진행중' : '종료'}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    {event.thumbnailUrl ? (
                      <ThumbnailImage src={event.thumbnailUrl} alt="썸네일" />
                    ) : (
                      <NoImage>이미지 없음</NoImage>
                    )}
                  </TableCell>
                  <TableCell>
                    {event.contentUrls && event.contentUrls.length > 0 ? (
                      <ImageGrid>
                        {event.contentUrls.slice(0, 3).map((url, index) => (
                          <SmallThumbnail key={index} src={url} alt={`내용 이미지 ${index + 1}`} />
                        ))}
                        {event.contentUrls.length > 3 && (
                          <ImageCount>+{event.contentUrls.length - 3}</ImageCount>
                        )}
                      </ImageGrid>
                    ) : (
                      <NoImage>이미지 없음</NoImage>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === event.id ? (
                      <ButtonGroup>
                        <SaveButton onClick={handleSaveEdit}>저장</SaveButton>
                        <CancelButton onClick={handleCancelEdit}>취소</CancelButton>
                      </ButtonGroup>
                    ) : (
                      <ButtonGroup>
                        <EditButton onClick={() => handleEdit(event.id)}>수정</EditButton>
                        <DeleteButton onClick={() => handleDelete(event.id)}>삭제</DeleteButton>
                      </ButtonGroup>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const Select = styled.select`
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
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
  padding: 15px 8px;
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 0.9rem;
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
  padding: 12px 8px;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
  font-size: 0.85rem;
  vertical-align: middle;
`;

const TitleText = styled.div`
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
`;

const DateText = styled.div`
  font-size: 0.8rem;
  line-height: 1.3;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TypeBadge = styled.span`
  background: ${({ type }) => {
    switch (type) {
      case 'promotion': return '#e8f5e8';
      case 'contest': return '#fff3e0';
      case 'announcement': return '#e3f2fd';
      default: return '#f5f5f5';
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case 'promotion': return '#2e7d32';
      case 'contest': return '#f57c00';
      case 'announcement': return '#1976d2';
      default: return '#666';
    }
  }};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const StatusBadge = styled.span`
  background: ${({ active }) => active ? '#e8f5e8' : '#ffebee'};
  color: ${({ active }) => active ? '#2e7d32' : '#c62828'};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ParticipantText = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
`;

const ThumbnailImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
`;

const NoImage = styled.span`
  color: ${({ theme }) => theme.textLight};
  font-size: 0.8rem;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  align-items: center;
  justify-content: center;
`;

const SmallThumbnail = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
`;

const ImageCount = styled.div`
  background: #f0f0f0;
  color: #666;
  font-size: 0.6rem;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const EditSelect = styled.select`
  width: 100%;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  flex-wrap: wrap;
`;

const EditButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
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
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
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
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
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
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #757575;
  }
`;

export default ActiveEventAdmin;


