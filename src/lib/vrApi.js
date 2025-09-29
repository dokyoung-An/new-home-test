import { supabase } from './supabaseClient';

// VR 콘텐츠 전체 조회 (페이지네이션 포함)
export const getVrContents = async (page = 1, limit = 10, searchTerm = '') => {
  try {
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('vr_contents')
      .select('*', { count: 'exact' });

    // 검색어가 있으면 필터링 추가
    if (searchTerm) {
      query = query.or(`phone_last.ilike.%${searchTerm}%,apartment_name.ilike.%${searchTerm}%,customer_name.ilike.%${searchTerm}%`);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(`데이터 조회 오류: ${error.message}`);
    }

    return {
      data: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    };
  } catch (error) {
    throw error;
  }
};

// 모든 VR 콘텐츠 조회 (관리자용)
export const getAllVrContents = async () => {
  try {
    const { data, error } = await supabase
      .from('vr_contents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`데이터 조회 오류: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    throw error;
  }
};

// VR 콘텐츠 추가
export const addVrContent = async (vrData) => {
  try {
    const insertData = {
      customer_name: vrData.customerName,
      apartment_name: vrData.apartmentName,
      building_number: vrData.buildingNumber,
      room_number: vrData.roomNumber,
      phone_first: vrData.phoneFirst || '010',
      phone_middle: vrData.phoneMiddle,
      phone_last: vrData.phoneLast,
      password: vrData.password,
      vr_url: vrData.vrUrl
    };

    const { data, error } = await supabase
      .from('vr_contents')
      .insert([insertData])
      .select();

    if (error) {
      throw new Error(`데이터베이스 오류: ${error.message}`);
    }

    return data[0];
  } catch (error) {
    throw error;
  }
};

// VR 콘텐츠 수정
export const updateVrContent = async (id, vrData) => {
  try {
    const updateData = {
      customer_name: vrData.customerName,
      apartment_name: vrData.apartmentName,
      building_number: vrData.buildingNumber,
      room_number: vrData.roomNumber,
      phone_first: vrData.phoneFirst || '010',
      phone_middle: vrData.phoneMiddle,
      phone_last: vrData.phoneLast,
      password: vrData.password,
      vr_url: vrData.vrUrl
    };

    const { data, error } = await supabase
      .from('vr_contents')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      throw new Error(`데이터 수정 오류: ${error.message}`);
    }

    return data[0];
  } catch (error) {
    throw error;
  }
};

// VR 콘텐츠 삭제
export const deleteVrContent = async (id) => {
  try {
    const { error } = await supabase
      .from('vr_contents')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`데이터 삭제 오류: ${error.message}`);
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// 특정 VR 콘텐츠 조회
export const getVrContent = async (id) => {
  try {
    const { data, error } = await supabase
      .from('vr_contents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`데이터 조회 오류: ${error.message}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 검증
export const verifyVrPassword = async (id, password) => {
  try {
    const { data, error } = await supabase
      .from('vr_contents')
      .select('password')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`데이터 조회 오류: ${error.message}`);
    }

    return data.password === password;
  } catch (error) {
    throw error;
  }
};

// 제목 생성 함수 (아파트명 동/휴대폰 뒷번호 4자리)
export const generateVrTitle = (apartmentName, buildingNumber, phoneLast) => {
  return `${apartmentName} ${buildingNumber}동/${phoneLast}`;
};

// VR 사용 기간 계산 (등록일로부터 3개월 후)
export const calculateVrExpiryDate = (createdAt) => {
  const createdDate = new Date(createdAt);
  const expiryDate = new Date(createdDate);
  expiryDate.setMonth(expiryDate.getMonth() + 3);
  return expiryDate.toLocaleDateString('ko-KR');
};

// 검색 함수
export const searchVrContents = async (searchTerm, page = 1, limit = 10) => {
  return await getVrContents(page, limit, searchTerm);
};

