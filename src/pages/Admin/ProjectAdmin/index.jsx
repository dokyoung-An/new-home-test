import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../../lib/supabaseClient';
import { canWrite, canDelete } from '../../../utils/adminPermissions';
import { compressImage } from '../../../utils/imageUtils';

const ProjectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    year: '2025',
    image_url: '',
    is_active: true,
    display_order: 0
  });

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Supabase 연결 테스트
    const testConnection = async () => {
      try {
        const { error } = await supabase
          .from('projects')
          .select('count')
          .limit(1);
        
        if (error) {
          console.error('Supabase 연결 실패:', error);
          setError(`데이터베이스 연결 실패: ${error.message}`);
        } else {
          fetchProjects();
        }
      } catch (err) {
        console.error('연결 테스트 중 오류:', err);
        setError(`연결 테스트 실패: ${err.message}`);
      }
    };
    
    testConnection();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Supabase 오류:', error);
        throw error;
      }

      setProjects(data || []);
      setTotalPages(Math.ceil((data || []).length / itemsPerPage));
    } catch (err) {
      console.error('프로젝트 목록 로드 오류:', err);
      setError(`프로젝트 목록을 불러오는 데 실패했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPageProjects = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return projects.slice(startIndex, endIndex);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    try {
      setUploadingImage(true);
      setError(null);

      // 이미지 압축
      const compressedFile = await compressImage(file, {
        maxWidth: 1200,
        maxHeight: 800,
        quality: 0.8
      });

      // 고유한 파일명 생성
      const fileExt = file.name.split('.').pop();
      const fileName = `project_${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      // Supabase Storage에 업로드
      const { error } = await supabase.storage
        .from('project-images')
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Storage 업로드 오류:', error);
        throw error;
      }

      // 공개 URL 생성
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);


      // 폼 데이터에 이미지 URL 설정
      setFormData(prev => ({
        ...prev,
        image_url: publicUrl
      }));

      // 미리보기 설정
      setImagePreview(publicUrl);

      setSuccess('이미지가 성공적으로 업로드되었습니다.');

    } catch (err) {
      console.error('이미지 업로드 오류:', err);
      setError(`이미지 업로드에 실패했습니다: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageDelete = async () => {
    if (!formData.image_url) return;

    try {
      setUploadingImage(true);
      
      // Storage에서 파일명 추출
      const urlParts = formData.image_url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `projects/${fileName}`;

      // Storage에서 파일 삭제
      const { error } = await supabase.storage
        .from('project-images')
        .remove([filePath]);

      if (error) {
        console.error('Storage 삭제 오류:', error);
        // Storage 삭제 실패해도 폼에서는 제거
      }

      // 폼 데이터에서 이미지 URL 제거
      setFormData(prev => ({
        ...prev,
        image_url: ''
      }));

      setImagePreview(null);
      setSuccess('이미지가 삭제되었습니다.');

    } catch (err) {
      console.error('이미지 삭제 오류:', err);
      setError(`이미지 삭제에 실패했습니다: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!canWrite()) {
      alert('프로젝트를 추가/수정할 권한이 없습니다.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess('');

      if (editingId) {
        // 수정
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingId)
          .select();
        if (error) throw error;
        setSuccess('프로젝트가 수정되었습니다.');
      } else {
        // 추가
        const { error } = await supabase
          .from('projects')
          .insert([formData])
          .select();
        if (error) throw error;
        setSuccess('프로젝트가 추가되었습니다.');
      }

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error('프로젝트 저장 오류:', err);
      setError(`프로젝트 저장에 실패했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      name: project.name,
      location: project.location,
      year: project.year,
      image_url: project.image_url,
      is_active: project.is_active,
      display_order: project.display_order
    });
    setImagePreview(project.image_url);
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    
    if (!canDelete()) {
      alert('프로젝트를 삭제할 권한이 없습니다.');
      return;
    }

    if (!window.confirm('이 프로젝트를 삭제하시겠습니까?')) {
      return;
    }

    try {
      setLoading(true);
      
      
      const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        console.error('Supabase 삭제 오류:', error);
        throw error;
      }
      
      // 삭제된 데이터가 실제로 있는지 확인
      if (data && data.length > 0) {
        setSuccess(`프로젝트가 삭제되었습니다. (삭제된 항목: ${data.length}개)`);
      } else {
        setError('삭제 요청은 성공했지만 실제로 삭제되지 않았습니다. 권한을 확인해주세요.');
      }
      
      fetchProjects();
    } catch (err) {
      console.error('프로젝트 삭제 오류:', err);
      setError(`프로젝트 삭제에 실패했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      year: '2025',
      image_url: '',
      is_active: true,
      display_order: 0
    });
    setImagePreview(null);
    setEditingId(null);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <PaginationContainer>
        <PaginationInfo>
          {currentPage} / {totalPages} 페이지
        </PaginationInfo>
        <PaginationButtons>
          <PaginationButton 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            이전
          </PaginationButton>
          <PaginationButton 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </PaginationButton>
        </PaginationButtons>
      </PaginationContainer>
    );
  };

  if (loading && projects.length === 0) {
    return <LoadingMessage>프로젝트 목록을 불러오는 중...</LoadingMessage>;
  }

  return (
    <Container>
      <Header>
        <Title>프로젝트 관리</Title>
        <Description>홈페이지 ProjectSection에 표시될 프로젝트를 관리합니다.</Description>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label>프로젝트명 *</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="예: 대구롯데캐슬골드파크"
            />
          </FormGroup>
          <FormGroup>
            <Label>위치 *</Label>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="예: 대구"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label>연도 *</Label>
            <Input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              placeholder="예: 2025"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label>프로젝트 이미지 *</Label>
            <ImageUploadContainer>
              <ImageUploadInput
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
              />
              <ImageUploadButton htmlFor="image-upload" disabled={uploadingImage}>
                {uploadingImage ? '업로드 중...' : '이미지 선택'}
              </ImageUploadButton>
              {formData.image_url && (
                <ImageDeleteButton type="button" onClick={handleImageDelete} disabled={uploadingImage}>
                  삭제
                </ImageDeleteButton>
              )}
            </ImageUploadContainer>
            {imagePreview && (
              <ImagePreview src={imagePreview} alt="미리보기" />
            )}
            <ImageInfo>
              • 최대 5MB, JPG/PNG/WEBP/GIF 지원<br/>
              • 권장 크기: 1200x800px
            </ImageInfo>
          </FormGroup>
          <FormGroup>
            <Label>표시 순서</Label>
            <Input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleInputChange}
              placeholder="0"
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
            />
            <CheckboxLabel>활성화</CheckboxLabel>
          </CheckboxContainer>
        </FormGroup>

        <ButtonContainer>
          <SubmitButton type="submit" disabled={loading}>
            {editingId ? '수정' : '추가'}
          </SubmitButton>
          {editingId && (
            <CancelButton type="button" onClick={resetForm}>
              취소
            </CancelButton>
          )}
        </ButtonContainer>
      </Form>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>순서</th>
              <th>프로젝트명</th>
              <th>위치</th>
              <th>연도</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageProjects().map((project) => (
              <tr key={project.id}>
                <td>{project.display_order}</td>
                <td>{project.name}</td>
                <td>{project.location}</td>
                <td>{project.year}</td>
                <td>
                  <StatusBadge active={project.is_active}>
                    {project.is_active ? '활성' : '비활성'}
                  </StatusBadge>
                </td>
                <td>
                  <ActionButton onClick={() => handleEdit(project)}>
                    수정
                  </ActionButton>
                  <DeleteButton onClick={() => handleDelete(project.id)}>
                    삭제
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {renderPagination()}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #666;
  font-size: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c33;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #fcc;
`;

const SuccessMessage = styled.div`
  background-color: #efe;
  color: #363;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #cfc;
`;

const Form = styled.form`
  background: #f9f9f9;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

const CheckboxLabel = styled.label`
  font-weight: 600;
  color: #333;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #545b62;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 20px;

`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);


  td {
    padding: 12px 8px;
    text-align: center;
    border-bottom: 1px solid #eee;
    font-size: 0.85rem;
  }
  
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${props => props.active ? '#d4edda' : '#f8d7da'};
  color: ${props => props.active ? '#155724' : '#721c24'};
`;

const ActionButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 5px;
  
  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    background-color: #c82333;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaginationInfo = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: #f8f9fa;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 이미지 업로드 관련 스타일드 컴포넌트
const ImageUploadContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImageUploadButton = styled.label`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-block;
  
  &:hover:not(:disabled) {
    background-color: #218838;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const ImageDeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: #c82333;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 150px;
  border-radius: 8px;
  border: 2px solid #ddd;
  margin-top: 10px;
  object-fit: cover;
`;

const ImageInfo = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
  line-height: 1.4;
`;

export default ProjectAdmin;
