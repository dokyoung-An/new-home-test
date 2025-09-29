import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';
import { getVrContent, verifyVrPassword, calculateVrExpiryDate } from '../../lib/vrApi';
import HeroSection from '../Vr/HeroSection';

const VrDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vrContent, setVrContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    loadVrContentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadVrContentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const contentData = await getVrContent(id);
      
      setVrContent({
        id: contentData.id,
        customerName: contentData.customer_name,
        apartmentName: contentData.apartment_name,
        buildingNumber: contentData.building_number,
        roomNumber: contentData.room_number,
        phoneFirst: contentData.phone_first,
        phoneMiddle: contentData.phone_middle,
        phoneLast: contentData.phone_last,
        vrUrl: contentData.vr_url,
        createdAt: new Date(contentData.created_at).toLocaleDateString('ko-KR'),
        expiryDate: calculateVrExpiryDate(contentData.created_at)
      });
    } catch (err) {
      setError('VR 콘텐츠를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setAuthError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      setVerifying(true);
      setAuthError('');
      
      const isValid = await verifyVrPassword(id, password);
      
      if (isValid) {
        setIsAuthenticated(true);
      } else {
        setAuthError('비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setAuthError('인증 중 오류가 발생했습니다.');
    } finally {
      setVerifying(false);
    }
  };

  const handleBackToList = () => {
    navigate('/vr');
  };

  const handlePasswordKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit(e);
    }
  };

  if (loading) {
    return (
      <>
        <HeroSection />
        <Container>
          <Content>
            <LoadingMessage>VR 콘텐츠를 불러오는 중...</LoadingMessage>
          </Content>
        </Container>
      </>
    );
  }

  if (error || !vrContent) {
    return (
      <>
        <HeroSection />
        <Container>
          <Content>
            <ErrorMessage>
              {error || 'VR 콘텐츠를 찾을 수 없습니다.'}
              <BackButton onClick={handleBackToList}>목록으로 돌아가기</BackButton>
            </ErrorMessage>
          </Content>
        </Container>
      </>
    );
  }

  // 비밀번호 인증 화면
  if (!isAuthenticated) {
    return (
      <>
        <HeroSection />
        <Container>
          <Content>
            <AuthContainer>
              <AuthHeader>
                <BackButton onClick={handleBackToList}>← 목록으로</BackButton>
                <AuthTitle>VR 콘텐츠 인증</AuthTitle>
                <AuthSubtitle>
                  {vrContent.apartmentName} {vrContent.buildingNumber}동/{vrContent.phoneLast}
                </AuthSubtitle>
              </AuthHeader>
              
              <AuthForm onSubmit={handlePasswordSubmit}>
                <AuthDescription>
                  VR 콘텐츠를 확인하시려면 비밀번호를 입력해주세요.
                  <br />
                  <small>※ 비밀번호는 고객님의 휴대폰 번호입니다.</small>
                </AuthDescription>
                
                <PasswordInputGroup>
                  <PasswordInput
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handlePasswordKeyPress}
                  />
                  <AuthButton type="submit" disabled={verifying}>
                    {verifying ? '확인 중...' : '확인'}
                  </AuthButton>
                </PasswordInputGroup>
                
                {authError && <AuthError>{authError}</AuthError>}
              </AuthForm>
            </AuthContainer>
          </Content>
        </Container>
      </>
    );
  }

  // 인증 후 VR 콘텐츠 상세 화면
  return (
    <>
      <HeroSection />
      <Container>
        <Content>
          <Header>
            <Wrapper>
              <BackButton onClick={handleBackToList}>← 목록으로</BackButton>
            </Wrapper>
            <VrTitle>VR 콘텐츠</VrTitle>
            <VrSubtitle>
              {vrContent.apartmentName} {vrContent.buildingNumber}동/{vrContent.phoneLast}
            </VrSubtitle>
          </Header>

          <VrContent>
            <InfoSection>
              <InfoTitle>고객 정보</InfoTitle>
              <InfoTable>
                <InfoRow>
                  <InfoLabel>고객명</InfoLabel>
                  <InfoValue>{vrContent.customerName}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>아파트명</InfoLabel>
                  <InfoValue>{vrContent.apartmentName}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>동/호수</InfoLabel>
                  <InfoValue>{vrContent.buildingNumber}동 {vrContent.roomNumber}호</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>연락처</InfoLabel>
                  <InfoValue>
                    {vrContent.phoneFirst}-{vrContent.phoneMiddle}-{vrContent.phoneLast}
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>VR 사용 기간</InfoLabel>
                  <InfoValue>{vrContent.expiryDate}까지</InfoValue>
                </InfoRow>
              </InfoTable>
            </InfoSection>

            {vrContent.vrUrl && (
              <VrSection>
                <VrTitle>VR 체험</VrTitle>
                <VrDescription>
                  아래 VR 콘텐츠를 체험해보세요.
                </VrDescription>
                <VrIframe
                  src={vrContent.vrUrl}
                  title="VR Content"
                  frameBorder="0"
                  scrolling="no"
                />
              </VrSection>
            )}
          </VrContent>
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px 0;
  animation: ${fadeIn} 1s ease-out;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-size: 1.2rem;
  color: #c62828;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  background: ${({ theme }) => theme.primaryMiddle};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
    transform: translateY(-1px);
  }
`;

// 인증 화면 스타일
const AuthContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const AuthHeader = styled.div`
  margin-bottom: 40px;
`;

const AuthTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 10px;
`;

const AuthSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textLight};
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const AuthDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
  text-align: center;

  small {
    font-size: 0.9rem;
    color: #666;
  }
`;

const PasswordInputGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PasswordInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryMiddle};
  }
`;

const AuthButton = styled.button`
  background: ${({ theme, disabled }) => disabled ? '#ccc' : theme.primaryMiddle};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme, disabled }) => disabled ? '#ccc' : theme.primaryDark};
  }
`;

const AuthError = styled.div`
  color: #c62828;
  font-size: 0.9rem;
  text-align: center;
`;

// VR 콘텐츠 상세 화면 스타일
const Header = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;
`;

const VrTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const VrSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
`;

const VrContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfoSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
`;

const InfoTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 25px;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

const InfoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 20px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    text-align: center;
  }
`;

const InfoLabel = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.textDark};
  font-size: 1rem;
`;

const InfoValue = styled.div`
  color: ${({ theme }) => theme.textLight};
  font-size: 1rem;
`;

const VrSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
`;

const VrDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.textLight};
`;

const VrIframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 400px;
  }
`;

export default VrDetail;

