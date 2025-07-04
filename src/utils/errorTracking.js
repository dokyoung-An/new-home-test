// 에러 로깅 함수
export const logError = (error, errorInfo = null) => {
  // 콘솔에 에러 로깅
  console.error('Error:', error);
  if (errorInfo) {
    console.error('Error Info:', errorInfo);
  }

  // 브라우저의 localStorage에 에러 저장
  try {
    const errors = JSON.parse(localStorage.getItem('error_logs') || '[]');
    errors.push({
      timestamp: new Date().toISOString(),
      error: error.toString(),
      errorInfo: errorInfo,
      url: window.location.href,
      userAgent: navigator.userAgent
    });
    // 최대 100개의 에러만 저장
    if (errors.length > 100) {
      errors.shift();
    }
    localStorage.setItem('error_logs', JSON.stringify(errors));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

// 성능 모니터링 함수
export const measurePerformance = () => {
  try {
    const performance = window.performance;
    if (!performance) {
      return null;
    }

    const timing = performance.timing;
    const navigationStart = timing.navigationStart;

    const metrics = {
      // 전체 페이지 로드 시간
      loadTime: timing.loadEventEnd - navigationStart,
      // DOM 로드 시간
      domLoadTime: timing.domContentLoadedEventEnd - navigationStart,
      // 첫 바이트까지 걸린 시간
      firstByteTime: timing.responseStart - timing.fetchStart,
      // DNS 조회 시간
      dnsLookupTime: timing.domainLookupEnd - timing.domainLookupStart,
      // TCP 연결 시간
      tcpConnectTime: timing.connectEnd - timing.connectStart,
      // 서버 응답 시간
      serverResponseTime: timing.responseEnd - timing.requestStart,
      // 페이지 렌더링 시간
      pageRenderTime: timing.loadEventStart - timing.domLoading,
    };

    // localStorage에 성능 메트릭 저장
    try {
      const performanceLogs = JSON.parse(localStorage.getItem('performance_logs') || '[]');
      performanceLogs.push({
        timestamp: new Date().toISOString(),
        metrics,
        url: window.location.href
      });
      // 최대 100개의 로그만 저장
      if (performanceLogs.length > 100) {
        performanceLogs.shift();
      }
      localStorage.setItem('performance_logs', JSON.stringify(performanceLogs));
    } catch (e) {
      console.error('Error saving performance metrics:', e);
    }

    return metrics;
  } catch (e) {
    console.error('Error measuring performance:', e);
    return null;
  }
}; 