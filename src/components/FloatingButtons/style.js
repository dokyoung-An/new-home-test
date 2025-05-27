import styled from 'styled-components';

export const FloatingContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
`;

export const FloatingButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primaryColor};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;

  svg {
    color: white;
    font-size: 20px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    color: white;
    text-decoration: none;
  }

  &.phone-button {
    display: none;
    @media (max-width: 480px) {
      display: flex;
    }
  }
`; 