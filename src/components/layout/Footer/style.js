import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: #1a1a1a;
  color: #ccc;
  font-size: 0.75rem;
  padding: 40px 0 20px;

  @media (max-width: 480px) {
    padding: 24px 0 10px;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const FooterLeft = styled.div`
  flex: 1;
  min-width: 200px;

  @media (max-width: 480px) {
    min-width: 0;
    margin-bottom: 8px;
  }
`;

export const FooterCenter = styled.div`
  flex: 2;
  min-width: 200px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 480px) {
    min-width: 0;
    gap: 0.5rem;
  }
`;

export const FooterRight = styled.div`
  flex: 1;
  min-width: 120px;
  text-align: right;

  img {
    width: 40px;
  }

  @media (max-width: 768px) {
    text-align: left;
  }
  @media (max-width: 480px) {
    min-width: 0;
    margin-top: 8px;
    img {
      width: 32px;
    }
  }
`;

export const FooterNotice = styled.div`
  line-height: 1.8;
  font-size: 0.75rem;
  color: #888;
`;

export const FooterTel = styled.div`
  p {
    margin: 0;
    color: #ccc;
  }

  h2 {
    font-size: 1.5rem;
    color: #E65C30;
    margin: 0.5rem 0;
  }
`;

export const FooterNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  a {
    color: #aaa;
    text-decoration: none;
    font-size: 0.7rem;

    &:hover {
      color: #fff;
    }

    &:not(:last-child)::after {
      content: '|';
      margin: 0 4px;
      color: #444;
    }
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #222;

  .copyright {
    font-size: 0.65rem;
    color: #555;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    .copyright {
      font-size: 0.6rem;
    }
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
  gap: 8px;
  margin-top: 8px;
  max-width: 100%;
`;

export const SocialButton = styled.a`
  width: 28px;
  height: 28px;
  font-size: 14px;

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #fff;
  }

  &:not(:last-child)::after {
    content: '|';
    margin: 0 8px;
    color: #444;
  }
`;