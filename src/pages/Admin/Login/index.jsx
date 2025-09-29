import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../../../styles/animations';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 관리자 계정 목록 (실제 운영 시에는 데이터베이스나 환경변수 사용)
  const ADMIN_ACCOUNTS = [
    {
      id: 1,
      username: 'admin',
      password: 'habang2024',
      name: '시스템 관리자',
      role: 'super_admin',
      permissions: ['read', 'write', 'delete', 'all'],
      isActive: true
    },
    {
      id: 2,
      username: 'manager',
      password: 'manager2024',
      name: '운영 관리자',
      role: 'admin',
      permissions: ['read', 'write', 'delete'],
      isActive: true
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // 입력 시 에러 메시지 초기화
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 여러 계정 중에서 일치하는 계정 찾기
      const validAccount = ADMIN_ACCOUNTS.find(account => 
        account.username === credentials.username && 
        account.password === credentials.password &&
        account.isActive
      );
      
      if (validAccount) {
        // 로그인 성공 시 세션에 저장
        sessionStorage.setItem('adminAuthenticated', 'true');
        sessionStorage.setItem('adminLoginTime', new Date().toISOString());
        sessionStorage.setItem('adminUser', JSON.stringify(validAccount));
        
        // 대시보드로 이동
        navigate('/admin');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Header>
          <Logo>하방 관리자</Logo>
          <Subtitle>Admin Login</Subtitle>
        </Header>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">아이디</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={credentials.username}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="관리자 아이디를 입력하세요"
              required
              autoComplete="username"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="비밀번호를 입력하세요"
              required
              autoComplete="current-password"
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginButton type="submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </LoginButton>
        </LoginForm>

        <Footer>
          <InfoText>
            관리자 계정으로 로그인하여 시스템을 관리할 수 있습니다.
          </InfoText>
          <BackLink onClick={() => navigate('/')}>
            홈페이지로 돌아가기
          </BackLink>
        </Footer>
      </LoginCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0 0 10px 0;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #fcc;
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const Footer = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const InfoText = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 15px 0;
  line-height: 1.4;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
  }
`;

export default AdminLogin;
