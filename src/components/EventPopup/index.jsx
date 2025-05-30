import React, { useState } from 'react';
import * as S from './style';
import { api } from '../../lib/app'; // supabase 대신 api import

const EventPopup = ({ onClose }) => {
  /* ───── 상태 ───── */
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    apartment: '',
    agreement: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitError('이름을 입력해주세요.');
      return false;
    }
    if (!formData.phone.trim()) {
      setSubmitError('연락처를 입력해주세요.');
      return false;
    }
    // 전화번호 형식 검증
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setSubmitError('올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)');
      return false;
    }
    if (!formData.region.trim()) {
      setSubmitError('지역을 입력해주세요.');
      return false;
    }
    if (!formData.agreement) {
      setSubmitError('개인정보 수집 및 이용에 동의해주세요.');
      return false;
    }
    return true;
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^0-9]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return numbers.slice(0, 3) + '-' + numbers.slice(3);
    return numbers.slice(0, 3) + '-' + numbers.slice(3, 7) + '-' + numbers.slice(7, 11);
  };

  /* ───── 입력 변화 ───── */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === 'phone') {
      newValue = formatPhoneNumber(value);
    } else if (name === 'name') {
      newValue = value.slice(0, 10); // 이름 10자 제한
    } else if (name === 'region') {
      newValue = value.slice(0, 20); // 지역 20자 제한
    } else if (name === 'apartment') {
      newValue = value.slice(0, 30); // 아파트 30자 제한
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue,
    }));
  };

  /* ───── 제출 ───── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const cleanedData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        region: formData.region.trim(),
        apartment: formData.apartment.trim() || undefined // 빈 문자열이면 제외
      };

      await api.submitAmbassadorApplication(cleanedData);
      setSubmitSuccess(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      setSubmitError(
        '신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      );
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ───── 화면(Render) ───── */
  return (
    <S.PopupOverlay>
      <S.PopupContainer>
        <S.CloseButton type="button" onClick={onClose}>
          ×
        </S.CloseButton>

        <S.PopupHeader>
          <S.MainTitle>랜하우스 앰버서더 모집</S.MainTitle>
          <S.Description>
            랜하우스를 홍보해 주세요.<br />
            360° VR 촬영을 <strong>무상 제공</strong>해 드립니다.
          </S.Description>
        </S.PopupHeader>

        <S.GuideSection>
          <S.GuideTitle>참여방법</S.GuideTitle>
          <S.GuideList>
            <S.GuideItem>1. 랜하우스 앰버서더 모집 신청서 제출</S.GuideItem>
            <S.GuideItem>2. 랜하우스와 일정 조율 후 VR 링크 수령</S.GuideItem>
            <S.GuideItem>
              3. 1주일 이내 SNS 2군데 업로드 후 인증
              <br />
              <em>(인스타·블로그·유튜브 등)</em>
            </S.GuideItem>
            <S.GuideItem>✔️ 촬영된 VR은 랜하우스의 마케팅에 활용됩니다.</S.GuideItem>
          </S.GuideList>
        </S.GuideSection>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label htmlFor="name">이름</S.Label>
            <S.Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={10}
              placeholder="홍길동"
              required
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="phone">연락처</S.Label>
            <S.Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
              maxLength={13}
              required
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="region">지역</S.Label>
            <S.Input
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="예) 서울시 강남구"
              maxLength={20}
              required
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="apartment">아파트</S.Label>
            <S.Input
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              placeholder="예) 랜하우스자이 102동"
              maxLength={30}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.CheckboxLabel>
              <S.Checkbox
                id="agreement"
                name="agreement"
                type="checkbox"
                checked={formData.agreement}
                onChange={handleChange}
              />
              (필수) 개인정보 수집·이용에 동의합니다.
            </S.CheckboxLabel>
          </S.FormGroup>

          {submitError && <S.ErrorMessage>{submitError}</S.ErrorMessage>}
          {submitSuccess && (
            <S.SuccessMessage>신청이 완료되었습니다!</S.SuccessMessage>
          )}

          <S.SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? '제출 중...' : '신청하기'}
          </S.SubmitButton>
        </S.Form>
      </S.PopupContainer>
    </S.PopupOverlay>
  );
};

export default EventPopup;
