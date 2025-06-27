const API_URL = process.env.REACT_APP_API_URL || 'https://api.habang.kr/api';

export const api = {
  // 문의사항 관련
  async getInquiries() {
    const response = await fetch(`${API_URL}/inquiries`);
    if (!response.ok) throw new Error('Failed to fetch inquiries');
    return response.json();
  },

  async updateInquiryStatus(id, status) {
    const response = await fetch(`${API_URL}/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update inquiry status');
    return response.json();
  },

  // 엠버서더 관련
  async submitAmbassadorApplication(data) {
    const response = await fetch(`${API_URL}/ambassador-applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit application');
    return response.json();
  },

  async getAmbassadorApplications() {
    const response = await fetch(`${API_URL}/ambassador-applications`);
    if (!response.ok) throw new Error('Failed to fetch applications');
    return response.json();
  },

  async updateAmbassadorStatus(id, status) {
    const response = await fetch(`${API_URL}/ambassador-applications/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update status');
    return response.json();
  },
};