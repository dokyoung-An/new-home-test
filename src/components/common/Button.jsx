import React from 'react';
import styled, { css } from 'styled-components';

const ButtonWrapper = styled.button`
  display: inline-block;
  padding: 12px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.primary && css`
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.lightColor};

    &:hover {
      background-color: ${({ theme }) => theme.primaryColor};
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  `}

  ${props => props.text && css`
    background: none;
    border: none;
    color: ${({ theme }) => theme.darkGray};
    font-size: 0.9rem;
    border-bottom: 1px solid ${({ theme }) => theme.darkGray};
    padding: 0;
    
    &:hover {
      color: ${({ theme }) => theme.primaryColor};
      border-color: ${({ theme }) => theme.primaryColor};
    }
  `}
`;

const Button = ({ children, primary, text, ...props }) => {
  return (
    <ButtonWrapper primary={primary} text={text} {...props}>
      {children}
    </ButtonWrapper>
  );
};

export default Button; 