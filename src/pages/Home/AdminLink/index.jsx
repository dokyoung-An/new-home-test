import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AdminLink = () => {
  return (
    <AdminLinkContainer>
      <StyledLink to="/admin/inquiry-board">관리자 페이지</StyledLink>
    </AdminLinkContainer>
  );
};

const AdminLinkContainer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff6600;
  }
`;

export default AdminLink; 