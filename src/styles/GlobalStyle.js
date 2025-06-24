import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.6;
    color: ${({ theme }) => theme.secondaryColor};
   
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 15px;
    line-height: 1.3;
  }

  p {
    margin-bottom: 15px;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  section {
    padding: 60px 0;
  }
`;

export default GlobalStyle; 