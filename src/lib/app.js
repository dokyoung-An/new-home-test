/* lib/app.js */
const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

/* 공통 fetch 헬퍼 */
async function request(method, endpoint, data) {
  const options = {
    method,
    credentials: 'omit',                // ← 쿠키·세션 헤더 전송 차단
    headers: { 'Accept': 'application/json' },
  };

  if (data !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${API_URL}${endpoint}`, options);

  if (!res.ok) {
    /* 에러 응답이 JSON이면 파싱, 아니면 상태코드만 */
    let message = `HTTP error! status: ${res.status}`;
    try {
      const errJson = await res.json();
      if (errJson?.message) message = errJson.message;
    } catch (_) {/* ignore */}
    throw new Error(message);
  }
  return res.status === 204 ? null : res.json(); // 204 No-Content 대응
}

export const api = {
  /* ───────── 기본 메서드 ───────── */
  get:  (ep)        => request('GET',   ep),
  post: (ep, data)  => request('POST',  ep, data),
  patch:(ep, data)  => request('PATCH', ep, data),

  /* ───────── 비즈니스 API ───────── */
  getInquiries:            function ()            { return this.get('/inquiries'); },
  getRecentInquiries:      function ()            { return this.get('/inquiries'); },
  updateInquiryStatus:     function (id, status)  { return this.patch(`/inquiries/${id}/status`, { status }); },

  submitAmbassadorApplication: function (data) {
    /* 필수 필드 검증 */
    const { name, phone, region, apartment } = data ?? {};
    if (!name?.trim() || !phone?.trim() || !region?.trim()) {
      throw new Error('필수 입력 항목이 누락되었습니다.');
    }
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(phone.trim())) {
      throw new Error('올바른 전화번호 형식이 아닙니다.');
    }

    /* 데이터 정제 */
    const cleanedData = {
      name:  name.trim().slice(0, 10),
      phone: phone.trim(),
      region: region.trim().slice(0, 20),
    };
    if (apartment?.trim()) cleanedData.apartment = apartment.trim().slice(0, 30);

    return this.post('/ambassador-applications', cleanedData);
  },

  getAmbassadorApplications:  function ()            { return this.get('/ambassador-applications'); },
  updateAmbassadorStatus:     function (id, status)  { return this.patch(`/ambassador-applications/${id}/status`, { status }); },
};
