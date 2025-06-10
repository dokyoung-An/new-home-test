import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Home from './pages/Home';
import InquiryBoard from './pages/InquiryBoard';
import Header from './components/layout/Header';
import styled from 'styled-components';
import AmbassadorBoard from './pages/AmbassadorBoard';
import EventPopup from './components/EventPopup';
import { useState, useEffect } from 'react';
import FloatingButtons from './components/FloatingButtons';

const MainContent = styled.main`
  /* 패딩 제거 */
`;

function App() {

  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    // 세션 스토리지에서 팝업 표시 여부 확인
    const hasSeenPopup = sessionStorage.getItem('hasSeenEventPopup');
    if (!hasSeenPopup) {
      setShowEventPopup(false);
      
    }
  }, []);

  const handleCloseEventPopup = () => {
    setShowEventPopup(false);
    // 팝업을 닫았다는 정보를 세션 스토리지에 저장
    sessionStorage.setItem('hasSeenEventPopup', 'true');
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/inquiry-board" element={<InquiryBoard />} />
            <Route path="/admin/ambassador" element={<AmbassadorBoard />} />
            {/* <Route path="/admin/ambassador" element={<Ambassador />} /> */}
            {/* 향후 확장을 위한 라우트 */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </MainContent>
        <FloatingButtons />
      </Router>
      {showEventPopup && <EventPopup onClose={handleCloseEventPopup} />}
    </ThemeProvider>
  );
}

export default App; 