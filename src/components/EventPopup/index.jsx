import React, { useState } from 'react';
import * as S from './style';
import { api } from '../../lib/app';  // supabase 대신 api import

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

      const submissionData = {
        name: formData.name,
        phone: formData.phone,
        region: formData.region,
        apartment: formData.apartment
      };

      console.log('API로 전송할 데이터:', submissionData);

      await api.submitAmbassadorApplication(submissionData);

      console.log('제출 성공');
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

  // ... 나머지 코드는 동일 ...
};

export default EventPopup;