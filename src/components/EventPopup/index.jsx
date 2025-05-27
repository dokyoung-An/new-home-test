import React, { useState } from 'react';
import * as S from './style';
import { supabase } from '../../lib/supabase';

const EventPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    apartment: '',
    agreement: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      setSubmitError('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('폼 데이터 제출 시작:', formData);

      // 테이블 구조에 맞는 데이터만 전송
      const submissionData = {
        name: formData.name,
        phone: formData.phone,
        region: formData.region,
        apartment: formData.apartment
        // status와 verified는 기본값 사용
      };

      console.log('Supabase로 전송할 데이터:', submissionData);

      const { data, error } = await supabase
        .from('ambassador_applications')
        .insert([submissionData])
        .select();

      if (error) {
        console.error('Supabase 에러:', error);
        throw error;
      }

      console.log('제출 성공:', data);
      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('폼 제출 에러:', error);
      setSubmitError(
        error.message || '신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.PopupOverlay>
      <S.PopupContainer>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        
        <S.PopupHeader>
          <S.MainTitle>홈페이지 오픈 기념 이벤트</S.MainTitle>
          <S.SubTitle>랜하우스 엠버서더 모집</S.SubTitle>
          <S.Description>
            랜하우스를 소개해 주세요, VR 컨텐츠가 무상 제공됩니다
          </S.Description>
        </S.PopupHeader>

        <S.GuideSection>
          <S.GuideTitle>참여방법 안내</S.GuideTitle>
          <S.GuideList>
            <S.GuideItem>
              첫째. 블로그, 인스타, 유튜브, 트위터 등 2개 이상의 sns에 렌하우스의 서비스를 홍보해 주세요
            </S.GuideItem>
            <S.GuideItem>
              둘째. 렌하우스의 관리자에게 링크를 전달해 인증해 주세요
            </S.GuideItem>
          </S.GuideList>
        </S.GuideSection>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label htmlFor="name">이름</S.Label>
            <S.Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="이름을 입력해주세요"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="phone">연락처</S.Label>
            <S.Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="010-0000-0000"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="region">지역</S.Label>
            <S.Input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="예: 서울시 강남구"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="apartment">아파트</S.Label>
            <S.Input
              type="text"
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="예: 렌하우스아파트"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.CheckboxLabel>
              <S.Checkbox
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              개인정보 수집 및 이용에 동의합니다
            </S.CheckboxLabel>
          </S.FormGroup>

          {submitError && <S.ErrorMessage>{submitError}</S.ErrorMessage>}
          {submitSuccess && <S.SuccessMessage>신청이 완료되었습니다!</S.SuccessMessage>}

          <S.SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? '신청 중...' : '신청하기'}
          </S.SubmitButton>
        </S.Form>
      </S.PopupContainer>
    </S.PopupOverlay>
  );
};

export default EventPopup; 