import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Container } from '../../../styles/common';
import {
  ContactContainer,
  ContactContent,
  ContactTitle,
  ContactSubtitle,
  MainContent,
  LeftSection,
  FormContainer,
  FormTitle,
  FormDescription,
  ContactForm,
  FormRow,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  SubmitButton,
  RightSection,
  RecentInquiries,
  InquiryTitle,
  InquiryTable,
  InquiryTableHeader,
  InquiryHeaderRow,
  InquiryHeaderCell,
  InquiryTableBody,
  InquiryTableRow,
  InquiryTableCell,
  DateText,
  ApartmentText,
  NameText,
  StatusBadge,
  NoInquiries
} from './style';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    apartment_name: '',
    inspection_date: '',
    area_size: '',
    selected_service: ''
  });
  
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 서비스 옵션
  const serviceOptions = [
    '사전점검',
    '준공 후 사전점검', 
    '후점검',
    '360도 VR 서비스'
  ];

  // 서비스 옵션만 유지
  // 평형은 직접 입력으로 변경

  // 최근 문의 내역 불러오기
  useEffect(() => {
    fetchRecentInquiries();
    
    // 실시간 업데이트 (10초마다)
    const interval = setInterval(fetchRecentInquiries, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecentInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('habang')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6); // 최근 4개만

      if (error) throw error;
      setRecentInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const formattedPhone = formatPhoneNumber(value);
    if (formattedPhone.length <= 13) { // 010-1234-1234 형식의 최대 길이
      setFormData(prev => ({
        ...prev,
        phone: formattedPhone
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`필드 변경: ${name} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 폼 데이터 검증
    console.log('제출할 폼 데이터:', formData);
    
    // 필수 필드 검증
    if (!formData.name || !formData.phone || !formData.apartment_name || 
        !formData.inspection_date || !formData.area_size || !formData.selected_service) {
      alert('모든 필수 항목을 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      const submitData = {
        name: formData.name,
        phone: formData.phone,
        apartment_name: formData.apartment_name,
        inspection_date: formData.inspection_date,
        area_size: formData.area_size,
        selected_service: formData.selected_service,
        inquiry_status: 'new',
        created_at: new Date().toISOString()
      };
      
      console.log('Supabase에 제출할 데이터:', submitData);
      
      const { data, error } = await supabase
        .from('habang')
        .insert([submitData])
        .select();

      if (error) {
        console.error('Supabase insert 오류:', error);
        throw error;
      }
      
      console.log('성공적으로 저장된 데이터:', data);

      // 폼 초기화
      setFormData({
        name: '',
        phone: '',
        apartment_name: '',
        inspection_date: '',
        area_size: '',
        selected_service: ''
      });

      // 최근 문의 내역 새로고침
      fetchRecentInquiries();

      alert('문의가 성공적으로 접수되었습니다!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').slice(0, -1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#FFD600';
      case 'in-progress': return '#00C4B4';
      case 'new': return '#1a6dff';
      default: return '#1a6dff';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '예약완료';
      case 'in-progress': return '상담완료';
      case 'new': return '상담문의';
      default: return '상담문의';
    }
  };

  const maskName = (name) => {
    if (!name || name.length === 0) return '';
    if (name.length === 1) return name;
    
    const firstChar = name.charAt(0);
    const maskedChars = '*'.repeat(name.length - 1);
    return firstChar + maskedChars;
  };

  return (
    <ContactContainer>
      <Container>
        <ContactContent>
         

          <MainContent>
            <LeftSection>
            <ContactTitle>
            <img src="/img/service/qna1.png" alt="Contact" />
            <span>Contact</span> US
          </ContactTitle>
          <ContactSubtitle>
            <span>하방의 사전점검 서비스로</span>소중한 공간의 가치를 지킬 수 있습니다 .<br/>
            전문가와 맞춤 상담을 통해 가장 적합한 솔루션을 확인해 보세요.
        
          </ContactSubtitle>
              <RecentInquiries>
                <InquiryTitle>최근 문의내역</InquiryTitle>
                
                <InquiryTable>
                  <InquiryTableHeader>
                    <InquiryHeaderRow>
                      <InquiryHeaderCell>날짜</InquiryHeaderCell>
                      <InquiryHeaderCell>아파트명</InquiryHeaderCell>
                      <InquiryHeaderCell>문의자</InquiryHeaderCell>
                      <InquiryHeaderCell>상태</InquiryHeaderCell>
                    </InquiryHeaderRow>
                  </InquiryTableHeader>
                  <InquiryTableBody>
                    {recentInquiries.length > 0 ? (
                      recentInquiries.map((inquiry, index) => (
                        <InquiryTableRow key={inquiry.id || index}>
                          <InquiryTableCell>
                            <DateText>{formatDate(inquiry.created_at)}</DateText>
                          </InquiryTableCell>
                          <InquiryTableCell>
                            <ApartmentText>
                              {inquiry.apartment_name || inquiry.apartment || 'N/A'}
                            </ApartmentText>
                          </InquiryTableCell>
                       
                          <InquiryTableCell>
                            <NameText>{maskName(inquiry.name) || 'N/A'}</NameText>
                          </InquiryTableCell>
                          <InquiryTableCell>
                            <StatusBadge color={getStatusColor(inquiry.inquiry_status || 'new')}>
                              {getStatusText(inquiry.inquiry_status || 'new')}
                            </StatusBadge>
                          </InquiryTableCell>
                        </InquiryTableRow>
                      ))
                    ) : (
                      <InquiryTableRow>
                        <InquiryTableCell colSpan="7">
                          <NoInquiries>아직 문의 내역이 없습니다.</NoInquiries>
                        </InquiryTableCell>
                      </InquiryTableRow>
                    )}
                  </InquiryTableBody>
                </InquiryTable>
              </RecentInquiries>
            </LeftSection>

            <RightSection>
              <FormContainer>
                <FormTitle>하방 사전점검 문의하기</FormTitle>
                <FormDescription>
                  문의 하신 내용을 담당자 검토 후 <br/>순차적으로 답변 드리겠습니다.
                </FormDescription>

                <ContactForm onSubmit={handleSubmit}>
                  <FormRow>
                    <FormGroup>
                      <FormLabel>
                        이름<span>*</span>
                      </FormLabel>
                      <FormInput
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="김하방"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>
                        연락처<span>*</span>
                      </FormLabel>
                      <FormInput
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="010-1234-5678"
                        required
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <FormLabel>
                      아파트명<span>*</span>
                    </FormLabel>
                    <FormInput
                      type="text"
                      name="apartment_name"
                      value={formData.apartment_name}
                      onChange={handleInputChange}
                      placeholder="e편한세상 프리미엄"
                      required
                    />
                  </FormGroup>

                  <FormRow>
                    <FormGroup>
                      <FormLabel>
                        점검 희망일<span>*</span>
                      </FormLabel>
                      <FormInput
                        type="date"
                        name="inspection_date"
                        value={formData.inspection_date}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>
                        평형<span>*</span>
                      </FormLabel>
                      <FormInput
                        type="text"
                        name="area_size"
                        value={formData.area_size}
                        onChange={handleInputChange}
                        placeholder="예: 32평, 84㎡"
                        required
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <FormLabel>
                      선택 서비스<span>*</span>
                    </FormLabel>
                    <FormSelect
                      name="selected_service"
                      value={formData.selected_service}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">선택하세요</option>
                      {serviceOptions.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '접수중...' : '문의하기'}
                  </SubmitButton>
                </ContactForm>
              </FormContainer>
            </RightSection>
          </MainContent>
        </ContactContent>
      </Container>
    </ContactContainer>
  );
};

export default ContactSection;
