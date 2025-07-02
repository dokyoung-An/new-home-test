import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background: linear-gradient(to left, rgba(0, 0, 0,1), rgba(1, 4, 9, 0.8));
  color: #fff;
  padding: 60px 0;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 80px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
  }
`;

export const FooterLeft = styled.div`
  flex: 2;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  img {
    height: 40px;
    width: auto;
    margin-left : -20px;

  }

  div {
    p {
      font-size: 14px;
      line-height: 1.4;
      color: #fff;
      margin: 0;
    }
  }
`;

export const CompanyInfo = styled.div`
  margin-bottom: 24px;

  p {
    font-size: 13px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
`;

export const CopyrightText = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
`;

export const FooterRight = styled.div`
  flex: 1;
`;

export const ContactInfo = styled.div`
  margin-bottom: 32px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin: 0 0 16px 0;
  }

  p {
    font-size: 13px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
`;

export const SocialLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;

  svg {
    font-size: 16px;
  }

  &:hover {
    color: #fff;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 40px 0;
`;