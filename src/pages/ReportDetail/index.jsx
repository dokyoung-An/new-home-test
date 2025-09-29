import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';
import { getReport, verifyReportPassword } from '../../lib/reportApi';
import HeroSection from '../Report/HeroSection';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadReportData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadReportData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const reportData = await getReport(id);
      
      setReport({
        id: reportData.id,
        customerName: reportData.customer_name,
        apartmentName: reportData.apartment_name,
        buildingNumber: reportData.building_number,
        roomNumber: reportData.room_number,
        phoneFirst: reportData.phone_first,
        phoneMiddle: reportData.phone_middle,
        phoneLast: reportData.phone_last,
        pdfFileUrl: reportData.pdf_file_url,
        pdfFileName: reportData.pdf_file_name,
        createdAt: new Date(reportData.created_at).toLocaleDateString('ko-KR')
      });
    } catch (err) {
      setError('보고서를 불러오는데 실패했습니다.');
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
      
      const isValid = await verifyReportPassword(id, password);
      
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
    navigate('/report');
  };

  const handleDownloadPDF = async () => {
    if (!report.pdfFileUrl) return;

    setDownloading(true);
    
    try {
      // 모바일과 PC 모두에서 안정적인 다운로드를 위한 개선된 방법
      const fileName = report.pdfFileName || '점검보고서.pdf';
      
      // 방법 1: fetch를 사용한 다운로드 (모바일 호환성 향상)
      const response = await fetch(report.pdfFileUrl);
      const blob = await response.blob();
      
      // Blob URL 생성
      const blobUrl = window.URL.createObjectURL(blob);
      
      // 다운로드 링크 생성
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';
      
      // 모바일에서도 작동하도록 속성 추가
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      document.body.appendChild(link);
      link.click();
      
      // 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
    } catch (error) {
      console.error('PDF 다운로드 오류:', error);
      
      // 백업 방법: 직접 링크 열기
      try {
        const link = document.createElement('a');
        link.href = report.pdfFileUrl;
        link.download = report.pdfFileName || '점검보고서.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (fallbackError) {
        console.error('백업 다운로드도 실패:', fallbackError);
        alert('다운로드 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setDownloading(false);
    }
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
            <LoadingMessage>보고서를 불러오는 중...</LoadingMessage>
          </Content>
        </Container>
      </>
    );
  }

  if (error || !report) {
    return (
      <>
        <HeroSection />
        <Container>
          <Content>
            <ErrorMessage>
              {error || '보고서를 찾을 수 없습니다.'}
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
                <AuthTitle>보고서 인증</AuthTitle>
                <AuthSubtitle>
                  {report.apartmentName} {report.buildingNumber}동/{report.phoneLast}
                </AuthSubtitle>
              </AuthHeader>
              
              <AuthForm onSubmit={handlePasswordSubmit}>
                <AuthDescription>
                  보고서를 확인하시려면 비밀번호를 입력해주세요.
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

  // 인증 후 보고서 상세 화면
  return (
    <>
      <HeroSection />
      <Container>
        <Content>
          <Header>
            <Wrapper>
            <BackButton onClick={handleBackToList}>← 목록으로</BackButton></Wrapper>
            <ReportTitle>점검 보고서</ReportTitle>
            <ReportSubtitle>
              {report.apartmentName} {report.buildingNumber}동/{report.phoneLast}
            </ReportSubtitle>
          </Header>

          <ReportContent>
            <InfoSection>
              <InfoTitle>고객 정보</InfoTitle>
              <InfoTable>
                <InfoRow>
                  <InfoLabel>고객명</InfoLabel>
                  <InfoValue>{report.customerName}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>아파트명</InfoLabel>
                  <InfoValue>{report.apartmentName}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>동/호수</InfoLabel>
                  <InfoValue>{report.buildingNumber}동 {report.roomNumber}호</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>연락처</InfoLabel>
                  <InfoValue>
                    {report.phoneFirst}-{report.phoneMiddle}-{report.phoneLast}
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>보고서 생성일</InfoLabel>
                  <InfoValue>{report.createdAt}</InfoValue>
                </InfoRow>
              </InfoTable>
            </InfoSection>

            {report.pdfFileUrl && (
              <DownloadSection>
                <DownloadTitle>보고서 다운로드</DownloadTitle>
                <DownloadDescription>
                  아래 버튼을 클릭하여 점검 보고서를 다운로드하실 수 있습니다.
                </DownloadDescription>
                <DownloadButton onClick={handleDownloadPDF} disabled={downloading}>
                  {downloading ? '⏳ 다운로드 중...' : '📄 보고서 다운받기'}
                </DownloadButton>
                {report.pdfFileName && (
                  <FileName>파일명: {report.pdfFileName}</FileName>
                )}
              </DownloadSection>
            )}
          </ReportContent>
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
  max-width: 800px;
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

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;
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

// 보고서 상세 화면 스타일
const Header = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  text-align: center;
`;

const ReportTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ReportSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
`;

const ReportContent = styled.div`
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

const DownloadSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  color: white;
`;

const DownloadTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const DownloadDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  opacity: 0.9;
`;

const DownloadButton = styled.button`
  background: ${({ disabled }) => disabled ? '#ccc' : 'white'};
  color: ${({ disabled }) => disabled ? '#666' : '#667eea'};
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${({ disabled }) => disabled ? '0 5px 15px rgba(0, 0, 0, 0.2)' : '0 8px 25px rgba(0, 0, 0, 0.3)'};
  }
`;

const FileName = styled.div`
  margin-top: 15px;
  font-size: 0.9rem;
  opacity: 0.8;
`;

export default ReportDetail;
