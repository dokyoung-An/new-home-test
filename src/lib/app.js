const API_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:4000/api';

export const api = {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Get Error:', error);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Post Error:', error);
      throw error;
    }
  },

  async patch(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Patch Error:', error);
      throw error;
    }
  },

  // 기존 메서드들을 새로운 메서드들을 사용하도록 수정
  getInquiries() {
    return this.get('/inquiries');
  },

  updateInquiryStatus(id, status) {
    return this.patch(`/inquiries/${id}/status`, { status });
  },

  submitAmbassadorApplication(data) {
    return this.post('/ambassador-applications', data);
  },

  getAmbassadorApplications() {
    return this.get('/ambassador-applications');
  },

  updateAmbassadorStatus(id, status) {
    return this.patch(`/ambassador-applications/${id}/status`, { status });
  }
};