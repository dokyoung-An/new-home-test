import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../lib/supabaseClient';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 28px;
  font-weight: 600;
`;

const AddButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #0056b3;
  }
`;

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const ProjectItem = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 15px;
`;

const ProjectName = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
`;

const ProjectDetails = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #218838;
  }
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #c82333;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  
  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;


const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background: #0056b3;
  }
`;

const ProjectBoard = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    year: '2025',
    image_url: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('프로젝트 로드 오류:', error);
        setProjects([]);
        return;
      }

      setProjects(data || []);
    } catch (err) {
      console.error('프로젝트 로드 중 예외:', err);
      setProjects([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingProject) {
        // 수정
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingProject.id);

        if (error) throw error;
      } else {
        // 추가
        const { error } = await supabase
          .from('projects')
          .insert([{
            ...formData,
            is_active: true,
            display_order: projects.length
          }]);

        if (error) throw error;
      }

      // 데이터 새로고침
      fetchProjects();
      
      setShowModal(false);
      setEditingProject(null);
      setFormData({
        name: '',
        location: '',
        year: '2025',
        image_url: ''
      });
    } catch (err) {
      console.error('프로젝트 저장 오류:', err);
      alert('프로젝트 저장에 실패했습니다: ' + err.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        fetchProjects(); // 데이터 새로고침
      } catch (err) {
        console.error('프로젝트 삭제 오류:', err);
        alert('프로젝트 삭제에 실패했습니다: ' + err.message);
      }
    }
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({ name: '', location: '', year: '2025', image_url: '' });
    setShowModal(true);
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <Title>프로젝트 관리</Title>
        <AddButton onClick={handleAdd}>프로젝트 추가</AddButton>
      </AdminHeader>

      <ProjectList>
        {projects.map((project) => (
          <ProjectItem key={project.id}>
            {project.image_url && (
              <ProjectImage src={project.image_url} alt={project.name} />
            )}
            <ProjectName>{project.name}</ProjectName>
            <ProjectDetails>
              <div>위치: {project.location}</div>
              <div>연도: {project.year}</div>
            </ProjectDetails>
            <ButtonGroup>
              <EditButton onClick={() => handleEdit(project)}>수정</EditButton>
              <DeleteButton onClick={() => handleDelete(project.id)}>삭제</DeleteButton>
            </ButtonGroup>
          </ProjectItem>
        ))}
      </ProjectList>

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {editingProject ? '프로젝트 수정' : '프로젝트 추가'}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>프로젝트명</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>위치</Label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </FormGroup>
              
              
              <FormGroup>
                <Label>연도</Label>
                <Input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>이미지 URL</Label>
                <Input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </FormGroup>
              
              <SubmitButton type="submit">
                {editingProject ? '수정' : '추가'}
              </SubmitButton>
            </form>
          </ModalContent>
        </Modal>
      )}
    </AdminContainer>
  );
};

export default ProjectBoard;
