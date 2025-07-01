import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import ContactPage from './pages/ContactPage';
import Buttons from './components/common/Buttons';
import About from './pages/About';
import Footer from './components/layout/Footer';
import ApartInspection from './pages/ApartInspection';
import AfterInspect from './pages/AfterInspect';
import Report from './pages/Report';
import Vr from './pages/Vr';
import Info from './pages/Info';

const MainContent = styled.main`
  /* 패딩 제거 */
`;

// 앱의 주요 컨텐츠를 담당하는 컴포넌트
const AppContent = () => {
  const location = useLocation();
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

  // /contact 페이지에서는 Buttons를 렌더링하지 않음
  const shouldShowButtons = location.pathname !== '/contact';

  return (
    <>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/inquiry-board" element={<InquiryBoard />} />
          <Route path="/admin/ambassador" element={<AmbassadorBoard />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/inspection" element={<ApartInspection />} />
          <Route path="/afterInspection" element={<AfterInspect />} />
          <Route path="/report" element={<Report />} />
          <Route path="/vr" element={<Vr />} />
          <Route path="/info" element={<Info />} />
          {/* <Route path="/admin/ambassador" element={<Ambassador />} /> */}
          {/* 향후 확장을 위한 라우트 */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </MainContent>
      <FloatingButtons />
      {shouldShowButtons && <Buttons />}
      {showEventPopup && <EventPopup onClose={handleCloseEventPopup} />}
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App; 