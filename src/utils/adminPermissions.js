// 관리자 권한 확인 유틸리티

// 현재 로그인한 관리자 정보 가져오기
export const getCurrentAdmin = () => {
  try {
    const adminUser = sessionStorage.getItem('adminUser');
    return adminUser ? JSON.parse(adminUser) : null;
  } catch (error) {
    console.error('관리자 정보 파싱 오류:', error);
    return null;
  }
};

// 특정 권한이 있는지 확인
export const hasPermission = (permission) => {
  const admin = getCurrentAdmin();
  if (!admin) return false;
  
  // super_admin은 모든 권한을 가짐
  if (admin.role === 'super_admin' || admin.permissions.includes('all')) {
    return true;
  }
  
  return admin.permissions.includes(permission);
};

// 읽기 권한 확인
export const canRead = () => {
  return hasPermission('read');
};

// 쓰기 권한 확인
export const canWrite = () => {
  return hasPermission('write');
};

// 삭제 권한 확인
export const canDelete = () => {
  return hasPermission('delete');
};

// 관리자 역할 확인
export const isSuperAdmin = () => {
  const admin = getCurrentAdmin();
  return admin && admin.role === 'super_admin';
};

// 관리자 이름 가져오기
export const getAdminName = () => {
  const admin = getCurrentAdmin();
  return admin ? admin.name : '관리자';
};

// 관리자 역할 가져오기
export const getAdminRole = () => {
  const admin = getCurrentAdmin();
  return admin ? admin.role : 'guest';
};

