import React, { useState, useEffect } from 'react';
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
import FloatingButtons from './components/FloatingButtons';
import MainPopup from './components/MainPopup';
import ContactPage from './pages/ContactPage';
import Buttons from './components/common/Buttons';
import About from './pages/About';
import Footer from './components/layout/Footer';
import ApartInspection from './pages/ApartInspection';
import AfterInspect from './pages/AfterInspect';
import Report from './pages/Report';
import Vr from './pages/Vr';
import Info from './pages/Info';
import B2BLanding from './pages/B2BLanding';
import { logError, measurePerformance } from './utils/errorTracking';
import CheckInspection from './pages/CheckInspection';

// 에러 바운더리 컴포넌트 추가
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>페이지 로딩 중 문제가 발생했습니다.</h1>
          <button onClick={() => window.location.reload()}>
            새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const MainContent = styled.main`
  min-height: 100vh;
`;

// 앱의 주요 컨텐츠를 담당하는 컴포넌트
const AppContent = () => {
  const location = useLocation();
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [showMainPopup, setShowMainPopup] = useState(false);

  useEffect(() => {
    // 페이지 이동 시 스크롤을 상단으로 이동
    window.scrollTo(0, 0);
    
    // 메인 팝업 표시 여부 확인 (홈페이지에서만)
    if (location.pathname === '/') {
      const today = new Date().toDateString();
      const hasSeenPopupToday = localStorage.getItem('hasSeenMainPopupToday');
      const popupDate = localStorage.getItem('mainPopupDate');
      
      console.log('팝업 디버깅:', {
        currentPath: location.pathname,
        today,
        hasSeenPopupToday,
        popupDate,
        shouldShow: hasSeenPopupToday !== 'true' || popupDate !== today
      });
      
      // 항상 팝업을 표시하도록 임시 변경 (테스트용)
      // 오늘 날짜가 다르거나 오늘 팝업을 보지 않았다면 표시
      const shouldShowPopup = hasSeenPopupToday !== 'true' || popupDate !== today;
      
      if (shouldShowPopup) {
        console.log('팝업을 표시합니다.');
        // 즉시 팝업 표시
        setShowMainPopup(true);
      } else {
        console.log('팝업을 표시하지 않습니다. localStorage 데이터:', {
          hasSeenPopupToday,
          popupDate,
          today
        });
        
        // 강제로 팝업 표시 (임시 테스트)
        console.log('강제로 팝업을 표시합니다 (테스트용)');
        setShowMainPopup(true);
      }
    }
    
    // 세션 스토리지에서 팝업 표시 여부 확인
    const hasSeenPopup = sessionStorage.getItem('hasSeenEventPopup');
    if (!hasSeenPopup) {
      setShowEventPopup(false);
    }

    // 페이지 로드 시 성능 측정
    window.addEventListener('load', () => {
      measurePerformance();
    });

    // 전역 에러 핸들링
    window.onerror = (message, source, lineno, colno, error) => {
      logError(error, { message, source, lineno, colno });
    };

    // Promise 에러 핸들링
    window.onunhandledrejection = (event) => {
      logError(event.reason, { type: 'unhandledRejection' });
    };
  }, [location.pathname]);

  const handleCloseEventPopup = () => {
    setShowEventPopup(false);
    sessionStorage.setItem('hasSeenEventPopup', 'true');
  };

  // 메인 팝업 닫기 (일반 닫기)
  const handleCloseMainPopup = () => {
    setShowMainPopup(false);
  };

  // 메인 팝업 오늘만 보기
  const handleCloseMainPopupToday = () => {
    setShowMainPopup(false);
    const today = new Date().toDateString();
    localStorage.setItem('hasSeenMainPopupToday', 'true');
    localStorage.setItem('mainPopupDate', today);
    console.log('오늘만 보기 클릭됨. localStorage 저장:', { hasSeenMainPopupToday: 'true', mainPopupDate: today });
  };

  // 개발용: localStorage 초기화 함수 (콘솔에서 사용 가능)
  window.clearPopupStorage = () => {
    localStorage.removeItem('hasSeenMainPopupToday');
    localStorage.removeItem('mainPopupDate');
    console.log('팝업 localStorage가 초기화되었습니다.');
    window.location.reload();
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
          <Route path="/checkInspection" element={<CheckInspection />} />
          <Route path="/report" element={<Report />} />
          <Route path="/vr" element={<Vr />} />
          <Route path="/info" element={<Info />} />
          <Route path="/b2b" element={<B2BLanding />} />
        </Routes>
      </MainContent>
      <FloatingButtons />
      {shouldShowButtons && <Buttons />}
      {showEventPopup && <EventPopup onClose={handleCloseEventPopup} />}
      {showMainPopup && (
        <MainPopup
          isOpen={showMainPopup}
          onClose={handleCloseMainPopup}
          onCloseToday={handleCloseMainPopupToday}
        />
      )}
      <Footer />
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <React.Suspense fallback={<div>로딩중...</div>}>
            <AppContent />
          </React.Suspense>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 