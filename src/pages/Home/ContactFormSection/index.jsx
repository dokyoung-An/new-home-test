import React, { useState, useEffect, forwardRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { IoCamera, IoHome, IoCall, IoMail } from 'react-icons/io5';
import { MdOutline360, MdVrpano, MdPhotoCamera, MdEdit } from 'react-icons/md';
import {
  ContactSection,
  ContactContainer,
  ContentSection,
  SectionTitle,
  SectionDescription,
  FeatureList,
  FeatureItem,
  FeatureIcon,
  FeatureContent,
  FeatureTitle,
  FeatureDescription,
  FormSection,
  FormTitle,
  FormSubtitle,
  Form,
  FormRow,
  FormGroup,
  Label,
  RequiredMark,
  Input,
  TextArea,
  SubmitButton,
  SlideSection,
  Slide,
  SlideOverlay,
  SlideTitle,
  SlideDescription,
  VRPopupOverlay,
  VRPopupContent,
  VRPopupHeader,
  VRPopupTitle,
  CloseButton,
  IframeContainer,
  StyledIframe,
  VRPreviewGrid,
  VRPreviewCard,
  VRPopup,
  DesignElement1,
  DesignElement2,
  DesignElement3
} from './style';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const TABLE_NAME = 'inquiries';

const vrTours = [
  {
    image: '/img/eloi.jpg',
    title: '더샵 엘로이',
    url: 'https://ilsanloe.vercel.app/1026352/'
  },
  {
    image: '/img/dunsanzae.jpg',
    title: '대전 둔산자이',
    url: 'https://lanhouse051011.vercel.app/p2048234/'
  },
  {
    image: '/img/olim.jpg',
    title: '분당어울림',
    url: 'https://geumhoeulim.vercel.app/1026344/'
  },
  {
    image: '/img/deone.jpg',
    title: '운정경남아너스빌디원',
    url: 'https://lanhouse051011.vercel.app/h3028138/'
  }
];

const features = [
  {
    icon: <MdOutline360 />,
    title: '360° 파노라마 촬영',
    description: '인스타360 프로 카메라로 완벽한 공간 구현'
  },
  {
    icon: <MdVrpano />,
    title: 'VR 투어 제작',
    description: '몰입감 있는 가상 투어 경험 제공'
  },
  {
    icon: <MdPhotoCamera />,
    title: '전문 사진 촬영',
    description: '고품질 사진으로 공간의 가치 극대화'
  },
  {
    icon: <MdEdit />,
    title: '편집 및 호스팅',
    description: '맞춤형 편집과 안정적인 호스팅 서비스'
  }
];

const ContactFormSection = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    apartment: '',
    interest: '',
    message: '',
    newsletter: false
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rotateDirection, setRotateDirection] = useState('right');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % vrTours.length);
      setRotateDirection(prev => prev === 'right' ? 'left' : 'right');
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .insert([{
          ...formData,
          status: 'new',
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
      
      alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        region: '',
        apartment: '',
        interest: '',
        message: '',
        newsletter: false
      });
    } catch (error) {
      console.error('문의 제출 오류:', error);
      alert('문의 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const openPopup = () => {
    setSelectedTour(vrTours[currentImageIndex]);
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedTour(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <ContactSection id="ContactFormSection" ref={ref}>
      <ContactContainer>
        <ContentSection>
          <DesignElement1 />
          <DesignElement2 />
          <DesignElement3 />
          <SectionTitle>
            Contact <span>US</span>
          </SectionTitle>
          <SectionDescription>
            랜하우스의 VR 투어 서비스로 부동산의 가치를 극대화하세요.
            전문가의 맞춤 상담을 통해 최적의 솔루션을 제공해드립니다.
          </SectionDescription>
          <FeatureList>
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            ))}
          </FeatureList>
          <SlideSection 
            rotateDirection={rotateDirection}
            onClick={openPopup}
          >
            {vrTours.map((tour, index) => (
              <Slide
                key={index}
                image={tour.image}
                active={index === currentImageIndex}
              />
            ))}
            <SlideOverlay>
              <SlideTitle>VR 투어 미리보기</SlideTitle>
              <SlideDescription>
                실제 VR 투어 예시를 확인해보세요
              </SlideDescription>
            </SlideOverlay>
          </SlideSection>
        </ContentSection>
        <FormSection>
          <FormTitle>VR 투어 문의하기</FormTitle>
          <FormSubtitle>
            문의하신 내용은 담당자 검토 후 순차적으로 답변드리겠습니다.
          </FormSubtitle>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label>이름<RequiredMark>*</RequiredMark></Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력해주세요"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow columns="1fr 1fr">
              <FormGroup>
                <Label>이메일<RequiredMark>*</RequiredMark></Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력해주세요"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>연락처<RequiredMark>*</RequiredMark></Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="연락처를 입력해주세요"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow columns="1fr 1fr">
              <FormGroup>
                <Label>지역<RequiredMark>*</RequiredMark></Label>
                <Input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="예: 서울시 강남구"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>아파트명<RequiredMark>*</RequiredMark></Label>
                <Input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="아파트명을 입력해주세요"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>관심 분야<RequiredMark>*</RequiredMark></Label>
                <Input
                  type="text"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  placeholder="예: VR 투어, 360° 촬영"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>문의 내용<RequiredMark>*</RequiredMark></Label>
                <TextArea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="문의하실 내용을 자세히 적어주세요"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                  />
                  뉴스레터 및 마케팅 정보 수신 동의
                </Label>
              </FormGroup>
            </FormRow>

            <SubmitButton type="submit">문의하기</SubmitButton>
          </Form>
        </FormSection>
      </ContactContainer>

      {/* VR 팝업 */}
      <VRPopupOverlay isOpen={isPopupOpen} onClick={closePopup}>
        <VRPopupContent onClick={(e) => e.stopPropagation()}>
          <VRPopupHeader>
            <VRPopupTitle>{selectedTour?.title} VR 투어</VRPopupTitle>
            <CloseButton onClick={closePopup}>×</CloseButton>
          </VRPopupHeader>
          {isMobile && (
            <div style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: '12px', 
              marginBottom: '10px',
              textAlign: 'center',
              padding: '6px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '4px'
            }}>
              <span role="img" aria-label="회전">🔄</span> 최적의 경험을 위해 화면을 가로로 회전해보세요
            </div>
          )}
          <IframeContainer>
            {selectedTour && (
              <StyledIframe
                src={selectedTour.url}
                title={`${selectedTour.title} VR 투어`}
                allowFullScreen
                allow="xr-spatial-tracking; gyroscope; accelerometer"
              />
            )}
          </IframeContainer>
        </VRPopupContent>
      </VRPopupOverlay>
    </ContactSection>
  );
});

export default ContactFormSection; 