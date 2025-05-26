import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: #1a1a1a;
  color: #ccc;
  font-size: 0.75rem;
  padding: 40px 0 20px;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FooterTop = styled.div`
  border-bottom: 1px solid #333;
  padding-bottom: 12px;
`;

export const FooterNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  a {
    color: #aaa;
    text-decoration: none;
    font-size: 0.75rem;

    &:hover {
      color: #fff;
    }

    &:not(:last-child)::after {
      content: '|';
      margin: 0 8px;
      color: #444;
    }
  }
`;

export const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FooterNotice = styled.div`
  max-width: 100%;
  line-height: 1.8;
  font-size: 0.75rem;
  color: #888;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const FooterTel = styled.div`
  text-align: right;

  p {
    margin: 0;
    color: #ccc;
  }

  strong {
    display: block;
    font-size: 0.8rem;
    margin: 4px 0;
    color: #aaa;
  }

  h2 {
    font-size: 1.5rem;
    color: #E65C30;
    margin: 0;
  }

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #222;

  .copyright {
    font-size: 0.7rem;
    color: #555;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const FooterSelectGroup = styled.div`
  display: flex;
  gap: 10px;

  select {
    background-color: #111;
    color: #ccc;
    border: 1px solid #333;
    padding: 4px 10px;
    font-size: 0.75rem;

    &:hover {
      background-color: #222;
    }
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 11px;
  max-width: 70%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const SocialButton = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #222;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$bgColor};
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2a2a2a;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 15px;
  }
`;


