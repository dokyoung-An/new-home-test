import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../styles/animations';
import { 
  getAllVrContents, 
  addVrContent, 
  updateVrContent, 
  deleteVrContent,
  generateVrTitle
} from '../../../lib/vrApi';

const VrAdmin = () => {
  const [vrContents, setVrContents] = useState([]);
  const [newVrContent, setNewVrContent] = useState({
    customerName: '',
    apartmentName: '',
    buildingNumber: '',
    roomNumber: '',
    phoneFirst: '010',
    phoneMiddle: '',
    phoneLast: '',
    password: '',
    vrUrl: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const CONTENTS_PER_PAGE = 10;

  // 데이터 로드
  useEffect(() => {
    loadVrContents();
  }, [currentPage]);

  const loadVrContents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllVrContents();
      
      // 데이터 형식 변환
      const formattedData = data.map(content => ({
        id: content.id,
        customerName: content.customer_name,
        apartmentName: content.apartment_name,
        buildingNumber: content.building_number,
        roomNumber: content.room_number,
        phoneFirst: content.phone_first,
        phoneMiddle: content.phone_middle,
        phoneLast: content.phone_last,
        password: content.password,
        vrUrl: content.vr_url,
        title: generateVrTitle(content.apartment_name, content.building_number, content.phone_last),
        createdAt: new Date(content.created_at).toISOString().split('T')[0].replace(/-/g, '.')
      }));
      
      // 페이지네이션 계산
      const totalContents = formattedData.length;
      const totalPagesCount = Math.ceil(totalContents / CONTENTS_PER_PAGE);
      setTotalPages(totalPagesCount);
      
      // 현재 페이지에 해당하는 데이터만 가져오기
      const startIndex = (currentPage - 1) * CONTENTS_PER_PAGE;
      const endIndex = startIndex + CONTENTS_PER_PAGE;
      const paginatedData = formattedData.slice(startIndex, endIndex);
      
      setVrContents(paginatedData);
    } catch (err) {
      setError(`VR 콘텐츠를 불러오는데 실패했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVrContent = async () => {
    if (!newVrContent.customerName.trim()) {
      alert('고객 이름을 입력해주세요.');
      return;
    }
    if (!newVrContent.apartmentName.trim()) {
      alert('아파트명을 입력해주세요.');
      return;
    }
    if (!newVrContent.buildingNumber.trim()) {
      alert('동을 입력해주세요.');
      return;
    }
    if (!newVrContent.roomNumber.trim()) {
      alert('호수를 입력해주세요.');
      return;
    }
    if (!newVrContent.phoneMiddle.trim() || newVrContent.phoneMiddle.length !== 4) {
      alert('휴대폰 중간번호 4자리를 입력해주세요.');
      return;
    }
    if (!newVrContent.phoneLast.trim() || newVrContent.phoneLast.length !== 4) {
      alert('휴대폰 뒷번호 4자리를 입력해주세요.');
      return;
    }
    if (!newVrContent.password.trim()) {
      alert('비밀번호를 설정해주세요.');
      return;
    }
    if (!newVrContent.vrUrl.trim()) {
      alert('VR URL을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await addVrContent(newVrContent);
      
      setNewVrContent({
        customerName: '',
        apartmentName: '',
        buildingNumber: '',
        roomNumber: '',
        phoneFirst: '010',
        phoneMiddle: '',
        phoneLast: '',
        password: '',
        vrUrl: ''
      });
      await loadVrContents();
      alert('VR 콘텐츠가 추가되었습니다.');
    } catch (err) {
      const errorMessage = err.message || '알 수 없는 오류가 발생했습니다.';
      setError(`VR 콘텐츠 추가 실패: ${errorMessage}`);
      alert(`VR 콘텐츠 추가에 실패했습니다: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const content = vrContents.find(c => c.id === id);
    setEditingId(id);
    setEditData({
      customerName: content.customerName,
      apartmentName: content.apartmentName,
      buildingNumber: content.buildingNumber,
      roomNumber: content.roomNumber,
      phoneFirst: content.phoneFirst,
      phoneMiddle: content.phoneMiddle,
      phoneLast: content.phoneLast,
      password: content.password,
      vrUrl: content.vrUrl
    });
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      await updateVrContent(editingId, editData);
      setEditingId(null);
      setEditData({});
      await loadVrContents();
      alert('VR 콘텐츠가 수정되었습니다.');
    } catch (err) {
      alert('VR 콘텐츠 수정에 실패했습니다.');
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
        await deleteVrContent(id);
        await loadVrContents();
        alert('VR 콘텐츠가 삭제되었습니다.');
      } catch (err) {
        alert('VR 콘텐츠 삭제에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAutoPasswordGenerate = () => {
    const fullPhone = `${newVrContent.phoneFirst}${newVrContent.phoneMiddle}${newVrContent.phoneLast}`;
    setNewVrContent({...newVrContent, password: fullPhone});
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

        {/* 새 VR 콘텐츠 추가 */}
        <AddSection>
          <SectionTitle>새 VR 콘텐츠 추가</SectionTitle>
          <AddForm>
            <InputRow>
              <InputGroup>
                <Label>고객 이름 *</Label>
                <Input
                  type="text"
                  placeholder="고객 이름을 입력하세요"
                  value={newVrContent.customerName}
                  onChange={(e) => setNewVrContent({...newVrContent, customerName: e.target.value})}
                />
              </InputGroup>
              <InputGroup>
                <Label>아파트명 *</Label>
                <Input
                  type="text"
                  placeholder="아파트명을 입력하세요"
                  value={newVrContent.apartmentName}
                  onChange={(e) => setNewVrContent({...newVrContent, apartmentName: e.target.value})}
                />
              </InputGroup>
            </InputRow>
            
            <InputRow>
              <InputGroup>
                <Label>동 *</Label>
                <Input
                  type="text"
                  placeholder="동"
                  value={newVrContent.buildingNumber}
                  onChange={(e) => setNewVrContent({...newVrContent, buildingNumber: e.target.value})}
                />
              </InputGroup>
              <InputGroup>
                <Label>호수 *</Label>
                <Input
                  type="text"
                  placeholder="호수"
                  value={newVrContent.roomNumber}
                  onChange={(e) => setNewVrContent({...newVrContent, roomNumber: e.target.value})}
                />
              </InputGroup>
            </InputRow>
            
            <InputGroup>
              <Label>연락처 (휴대폰 번호) *</Label>
              <PhoneInputRow>
                <PhoneInput
                  type="text"
                  value={newVrContent.phoneFirst}
                  onChange={(e) => setNewVrContent({...newVrContent, phoneFirst: e.target.value})}
                  maxLength="3"
                />
                <span>-</span>
                <PhoneInput
                  type="text"
                  placeholder="1234"
                  value={newVrContent.phoneMiddle}
                  onChange={(e) => setNewVrContent({...newVrContent, phoneMiddle: e.target.value})}
                  maxLength="4"
                />
                <span>-</span>
                <PhoneInput
                  type="text"
                  placeholder="5678"
                  value={newVrContent.phoneLast}
                  onChange={(e) => setNewVrContent({...newVrContent, phoneLast: e.target.value})}
                  maxLength="4"
                />
              </PhoneInputRow>
            </InputGroup>
            
            <InputGroup>
              <Label>VR URL *</Label>
              <Input
                type="url"
                placeholder="https://example.com/vr"
                value={newVrContent.vrUrl}
                onChange={(e) => setNewVrContent({...newVrContent, vrUrl: e.target.value})}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>비밀번호 설정 *</Label>
              <PasswordRow>
                <Input
                  type="text"
                  placeholder="비밀번호를 입력하세요"
                  value={newVrContent.password}
                  onChange={(e) => setNewVrContent({...newVrContent, password: e.target.value})}
                />
                <AutoButton onClick={handleAutoPasswordGenerate}>
                  휴대폰 번호로 자동 설정
                </AutoButton>
              </PasswordRow>
            </InputGroup>
            
            <AddButton onClick={handleAddVrContent} disabled={loading}>
              {loading ? '추가 중...' : 'VR 콘텐츠 추가'}
            </AddButton>
          </AddForm>
        </AddSection>

        {/* VR 콘텐츠 목록 */}
        <ListSection>
          <SectionTitle>VR 콘텐츠 목록</SectionTitle>
          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>번호</HeaderCell>
                <HeaderCell>생성일</HeaderCell>
                <HeaderCell>제목</HeaderCell>
                <HeaderCell>고객명</HeaderCell>
                <HeaderCell>연락처</HeaderCell>
                <HeaderCell>VR URL</HeaderCell>
                <HeaderCell>관리</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <TableBody>
              {vrContents.map((content, index) => (
                <TableRow key={content.id}>
                  <TableCell>{vrContents.length - index}</TableCell>
                  <TableCell>{content.createdAt}</TableCell>
                  <TableCell>
                    {editingId === content.id ? (
                      <div>
                        <EditInput
                          value={editData.apartmentName}
                          onChange={(e) => setEditData({...editData, apartmentName: e.target.value})}
                          placeholder="아파트명"
                        />
                        <EditInput
                          value={editData.buildingNumber}
                          onChange={(e) => setEditData({...editData, buildingNumber: e.target.value})}
                          placeholder="동"
                        />
                      </div>
                    ) : (
                      <TitleText>{content.title}</TitleText>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === content.id ? (
                      <EditInput
                        value={editData.customerName}
                        onChange={(e) => setEditData({...editData, customerName: e.target.value})}
                      />
                    ) : (
                      content.customerName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === content.id ? (
                      <PhoneEditContainer>
                        <EditInput
                          value={editData.phoneFirst}
                          onChange={(e) => setEditData({...editData, phoneFirst: e.target.value})}
                          maxLength="3"
                        />
                        <EditInput
                          value={editData.phoneMiddle}
                          onChange={(e) => setEditData({...editData, phoneMiddle: e.target.value})}
                          maxLength="4"
                        />
                        <EditInput
                          value={editData.phoneLast}
                          onChange={(e) => setEditData({...editData, phoneLast: e.target.value})}
                          maxLength="4"
                        />
                      </PhoneEditContainer>
                    ) : (
                      `${content.phoneFirst}-${content.phoneMiddle}-${content.phoneLast}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === content.id ? (
                      <EditInput
                        value={editData.vrUrl}
                        onChange={(e) => setEditData({...editData, vrUrl: e.target.value})}
                        placeholder="VR URL"
                      />
                    ) : (
                      <UrlLink href={content.vrUrl} target="_blank" rel="noopener noreferrer">
                        VR 보기
                      </UrlLink>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === content.id ? (
                      <ButtonGroup>
                        <SaveButton onClick={handleSaveEdit}>저장</SaveButton>
                        <CancelButton onClick={handleCancelEdit}>취소</CancelButton>
                      </ButtonGroup>
                    ) : (
                      <ButtonGroup>
                        <EditButton onClick={() => handleEdit(content.id)}>수정</EditButton>
                        <DeleteButton onClick={() => handleDelete(content.id)}>삭제</DeleteButton>
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

const PhoneInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PhoneInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryMiddle};
  }
`;

const PasswordRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const AutoButton = styled.button`
  background: #f0f0f0;
  color: #666;
  border: 1px solid #ddd;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
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

const EditInput = styled.input`
  width: 100%;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 4px;
`;

const PhoneEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UrlLink = styled.a`
  color: ${({ theme }) => theme.primaryColor};
  text-decoration: none;
  font-size: 0.8rem;

  &:hover {
    text-decoration: underline;
  }
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

export default VrAdmin;

