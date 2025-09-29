import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCurrentAdmin, getAdminName, getAdminRole } from '../../utils/adminPermissions';

const AdminAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    try {
      const authenticated = sessionStorage.getItem('adminAuthenticated');
      const loginTime = sessionStorage.getItem('adminLoginTime');
      
      if (authenticated === 'true' && loginTime) {
        // 로그인 시간 확인 (24시간 후 자동 로그아웃)
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setIsAuthenticated(true);
        } else {
          // 24시간 초과 시 자동 로그아웃
          sessionStorage.removeItem('adminAuthenticated');
          sessionStorage.removeItem('adminLoginTime');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('인증 확인 오류:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminLoginTime');
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>인증 확인 중...</LoadingText>
      </LoadingContainer>
    );
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  // 인증된 경우 children을 렌더링하고 관리자 정보 및 로그아웃 버튼 추가
  return (
    <AuthWrapper>
      <AdminInfo>
        <AdminName>{getAdminName()}</AdminName>
        <AdminRole>{getAdminRole()}</AdminRole>
        <LogoutButton onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </AdminInfo>
      {children}
    </AuthWrapper>
  );
};

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const AuthWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const AdminInfo = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.95);
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    padding: 8px 12px;
    gap: 10px;
  }
`;

const AdminName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
`;

const AdminRole = styled.span`
  font-size: 0.8rem;
  color: #666;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
`;

const LogoutButton = styled.button`
  background: #ff4757;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff3742;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.7rem;
  }
`;

export default AdminAuth;
