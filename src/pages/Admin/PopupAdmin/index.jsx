import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../../lib/supabaseClient';

const PopupAdmin = () => {
  const [popupData, setPopupData] = useState({
    isActive: true,
    imageUrl: '/img/popup.png',
    title: '메인 팝업',
    description: '홈페이지 메인 팝업 설정',
    showTodayButton: true,
    showCloseButton: true,
    todayButtonText: '오늘만 보기',
    closeButtonText: '닫힘'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadPopupData();
  }, []);


  const loadPopupData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      
      const { data, error } = await supabase
        .from('popup_settings')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (error) {
        console.error('팝업 설정 로드 오류:', error);
        if (error.code === 'PGRST116') {
        } else if (error.message.includes('relation "popup_settings" does not exist')) {
          setError('popup_settings 테이블이 존재하지 않습니다. Supabase에서 테이블을 생성해주세요.');
          return;
        } else {
          setError('팝업 설정을 불러오는데 실패했습니다: ' + error.message);
          return;
        }
      }
      
      if (data) {
        setPopupData(data);
      } else {
      }
    } catch (err) {
      console.error('팝업 설정 로드 중 예외 발생:', err);
      setError('팝업 설정을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess('');
      
      
      const { data, error } = await supabase
        .from('popup_settings')
        .upsert({
          id: 1,
          ...popupData,
          updatedAt: new Date().toISOString()
        })
        .select();
      
      if (error) {
        console.error('팝업 설정 저장 오류:', error);
        if (error.message.includes('relation "popup_settings" does not exist')) {
          setError('popup_settings 테이블이 존재하지 않습니다. Supabase에서 테이블을 생성해주세요.');
        } else {
          setError('팝업 설정 저장에 실패했습니다: ' + error.message);
        }
        return;
      }
      
      setSuccess('팝업 설정이 저장되었습니다.');
    } catch (err) {
      console.error('팝업 설정 저장 중 예외 발생:', err);
      setError('팝업 설정 저장 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess('');
      
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('파일 크기는 5MB 이하여야 합니다.');
      }
      
      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        throw new Error('이미지 파일만 업로드 가능합니다.');
      }
      
      // 파일을 Supabase Storage에 업로드
      const fileExt = file.name.split('.').pop();
      const fileName = `popup-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('popup-images')
        .upload(fileName, file);

      if (error) {
        console.error('Storage 업로드 오류:', error);
        if (error.message.includes('Bucket not found')) {
          throw new Error('popup-images Storage 버킷이 존재하지 않습니다. Supabase에서 버킷을 생성해주세요.');
        }
        throw error;
      }

      // 공개 URL 생성
      const { data: { publicUrl } } = supabase.storage
        .from('popup-images')
        .getPublicUrl(fileName);

      setPopupData(prev => ({
        ...prev,
        imageUrl: publicUrl
      }));
      
      setSuccess('이미지가 성공적으로 업로드되었습니다.');
    } catch (err) {
      console.error('이미지 업로드 오류:', err);
      setError(err.message || '이미지 업로드에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    // 팝업 미리보기를 위한 임시 스토리지 설정
    localStorage.setItem('popupPreview', JSON.stringify(popupData));
    window.open('/popup-preview', '_blank');
  };

  const handleImageDelete = async () => {
    if (!popupData.imageUrl || popupData.imageUrl === '/img/popup.png') {
      alert('삭제할 이미지가 없습니다.');
      return;
    }

    if (window.confirm('현재 이미지를 삭제하고 기본 이미지로 되돌리시겠습니까?')) {
      try {
        setLoading(true);
        
        // Supabase Storage에서 이미지 삭제 (업로드된 이미지인 경우)
        if (popupData.imageUrl.includes('supabase')) {
          const fileName = popupData.imageUrl.split('/').pop();
          const { error } = await supabase.storage
            .from('popup-images')
            .remove([fileName]);
          
          if (error) {
            console.warn('Storage에서 이미지 삭제 실패:', error);
            // Storage 삭제 실패해도 계속 진행
          }
        }

        // 기본 이미지로 설정
        setPopupData(prev => ({
          ...prev,
          imageUrl: '/img/popup.png'
        }));

        setSuccess('이미지가 삭제되고 기본 이미지로 설정되었습니다.');
      } catch (err) {
        setError('이미지 삭제에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setPopupData({
      isActive: true,
      imageUrl: '/img/popup.png',
      title: '메인 팝업',
      description: '홈페이지 메인 팝업 설정',
      showTodayButton: true,
      showCloseButton: true,
      todayButtonText: '오늘만 보기',
      closeButtonText: '닫힘'
    });
  };

  return (
    <AdminContent>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      {loading && <LoadingMessage>처리 중...</LoadingMessage>}

      <FormSection>
        <SectionTitle>메인 팝업 설정</SectionTitle>
        
        <FormGroup>
          <Label>팝업 활성화</Label>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={popupData.isActive}
              onChange={(e) => setPopupData(prev => ({ ...prev, isActive: e.target.checked }))}
            />
            <CheckboxLabel>팝업 표시</CheckboxLabel>
          </CheckboxContainer>
        </FormGroup>

        <FormGroup>
          <Label>팝업 이미지</Label>
          <ImageUploadContainer>
            <ImagePreview src={popupData.imageUrl} alt="팝업 미리보기" />
            <ImageButtonGroup>
              <ImageUploadInput
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <ImageUploadButton htmlFor="image-upload">
                이미지 업로드
              </ImageUploadButton>
              {popupData.imageUrl && popupData.imageUrl !== '/img/popup.png' && (
                <ImageDeleteButton onClick={handleImageDelete}>
                  이미지 삭제
                </ImageDeleteButton>
              )}
            </ImageButtonGroup>
          </ImageUploadContainer>
        </FormGroup>

        <FormGroup>
          <Label>팝업 제목</Label>
          <Input
            type="text"
            value={popupData.title}
            onChange={(e) => setPopupData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="팝업 제목을 입력하세요"
          />
        </FormGroup>

        <FormGroup>
          <Label>팝업 설명</Label>
          <Textarea
            value={popupData.description}
            onChange={(e) => setPopupData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="팝업 설명을 입력하세요"
            rows={3}
          />
        </FormGroup>

        <FormGroup>
          <Label>버튼 설정</Label>
          <ButtonSettingsContainer>
            <ButtonSetting>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={popupData.showTodayButton}
                  onChange={(e) => setPopupData(prev => ({ ...prev, showTodayButton: e.target.checked }))}
                />
                <CheckboxLabel>"오늘만 보기" 버튼 표시</CheckboxLabel>
              </CheckboxContainer>
              <Input
                type="text"
                value={popupData.todayButtonText}
                onChange={(e) => setPopupData(prev => ({ ...prev, todayButtonText: e.target.value }))}
                placeholder="오늘만 보기"
                disabled={!popupData.showTodayButton}
              />
            </ButtonSetting>
            
            <ButtonSetting>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={popupData.showCloseButton}
                  onChange={(e) => setPopupData(prev => ({ ...prev, showCloseButton: e.target.checked }))}
                />
                <CheckboxLabel>"닫기" 버튼 표시</CheckboxLabel>
              </CheckboxContainer>
              <Input
                type="text"
                value={popupData.closeButtonText}
                onChange={(e) => setPopupData(prev => ({ ...prev, closeButtonText: e.target.value }))}
                placeholder="닫힘"
                disabled={!popupData.showCloseButton}
              />
            </ButtonSetting>
          </ButtonSettingsContainer>
        </FormGroup>

        <ButtonGroup>
          <SaveButton onClick={handleSave} disabled={loading}>
            {loading ? '저장 중...' : '설정 저장'}
          </SaveButton>
          <PreviewButton onClick={handlePreview}>
            미리보기
          </PreviewButton>
          <ResetButton onClick={handleReset}>
            초기화
          </ResetButton>
        </ButtonGroup>
      </FormSection>

      <InfoSection>
        <SectionTitle>팝업 관리 정보</SectionTitle>
        <InfoList>
          <InfoItem>
            <InfoLabel>팝업 표시 조건:</InfoLabel>
            <InfoValue>홈페이지 첫 방문 시 또는 localStorage에 저장된 날짜와 다른 날</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>팝업 비활성화:</InfoLabel>
            <InfoValue>팝업 활성화를 해제하면 모든 사용자에게 팝업이 표시되지 않습니다</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>이미지 권장사항:</InfoLabel>
            <InfoValue>가로 400px, 세로 600px 이하의 이미지를 권장합니다</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>이미지 삭제:</InfoLabel>
            <InfoValue>이미지 삭제 버튼을 클릭하면 기본 이미지(/img/popup.png)로 되돌아갑니다</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>미리보기:</InfoLabel>
            <InfoValue>미리보기 버튼을 클릭하면 새 창에서 팝업을 확인할 수 있습니다</InfoValue>
          </InfoItem>
        </InfoList>
      </InfoSection>
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
  margin-bottom: 20px;
  border-left: 4px solid #c62828;
`;

const SuccessMessage = styled.div`
  background: #e8f5e8;
  color: #2e7d32;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #2e7d32;
`;

const LoadingMessage = styled.div`
  background: #e3f2fd;
  color: #1976d2;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #1976d2;
  text-align: center;
`;

const FormSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const InfoSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
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

  &:disabled {
    background: #f5f5f5;
    color: #999;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryMiddle};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.textDark};
  cursor: pointer;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 300px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  object-fit: contain;
`;

const ImageButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImageUploadButton = styled.label`
  background: ${({ theme }) => theme.primaryMiddle};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
  }
`;

const ImageDeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #c82333;
  }
`;

const ButtonSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonSetting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const SaveButton = styled.button`
  background: ${({ theme, disabled }) => disabled ? '#ccc' : theme.primaryMiddle};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, disabled }) => disabled ? '#ccc' : theme.primaryDark};
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-1px)'};
  }
`;

const PreviewButton = styled.button`
  background: #17a2b8;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #138496;
    transform: translateY(-1px);
  }
`;

const ResetButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6268;
    transform: translateY(-1px);
  }
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.primary};
`;

const InfoLabel = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.textDark};
  font-size: 0.9rem;
`;

const InfoValue = styled.div`
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
  line-height: 1.4;
`;

export default PopupAdmin;
