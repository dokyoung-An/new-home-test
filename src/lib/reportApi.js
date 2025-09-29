import { supabase } from './supabaseClient';

// PDF 파일 업로드 함수
export const uploadPDFFile = async (file) => {
  try {
    // 파일명에 타임스탬프 추가하여 중복 방지
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('report-files')
      .upload(fileName, file);

    if (error) {
      throw new Error(`PDF 파일 업로드 오류: ${error.message}`);
    }

    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from('report-files')
      .getPublicUrl(fileName);

    return { url: publicUrl, fileName: file.name };
  } catch (error) {
    throw error;
  }
};

// PDF 파일 삭제 함수
export const deletePDFFile = async (fileUrl) => {
  try {
    if (!fileUrl) return;
    
    // URL에서 파일명 추출
    const fileName = fileUrl.split('/').pop();
    
    const { error } = await supabase.storage
      .from('report-files')
      .remove([fileName]);

    if (error) {
      console.error('PDF 파일 삭제 오류:', error);
    }
  } catch (error) {
    console.error('PDF 파일 삭제 중 오류:', error);
  }
};

// 보고서 전체 조회 (페이지네이션 포함)
export const getReports = async (page = 1, limit = 10, searchTerm = '') => {
  try {
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('reports')
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

// 모든 보고서 조회 (관리자용)
export const getAllReports = async () => {
  try {
    const { data, error } = await supabase
      .from('reports')
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

// 보고서 추가
export const addReport = async (reportData) => {
  try {
    const insertData = {
      customer_name: reportData.customerName,
      apartment_name: reportData.apartmentName,
      building_number: reportData.buildingNumber,
      room_number: reportData.roomNumber,
      phone_first: reportData.phoneFirst || '010',
      phone_middle: reportData.phoneMiddle,
      phone_last: reportData.phoneLast,
      password: reportData.password,
      pdf_file_url: reportData.pdfFileUrl || null,
      pdf_file_name: reportData.pdfFileName || null
    };

    const { data, error } = await supabase
      .from('reports')
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

// 보고서 수정
export const updateReport = async (id, reportData) => {
  try {
    const updateData = {
      customer_name: reportData.customerName,
      apartment_name: reportData.apartmentName,
      building_number: reportData.buildingNumber,
      room_number: reportData.roomNumber,
      phone_first: reportData.phoneFirst || '010',
      phone_middle: reportData.phoneMiddle,
      phone_last: reportData.phoneLast,
      password: reportData.password,
      pdf_file_url: reportData.pdfFileUrl || null,
      pdf_file_name: reportData.pdfFileName || null
    };

    const { data, error } = await supabase
      .from('reports')
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

// 보고서 삭제
export const deleteReport = async (id) => {
  try {
    const { error } = await supabase
      .from('reports')
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

// 특정 보고서 조회
export const getReport = async (id) => {
  try {
    const { data, error } = await supabase
      .from('reports')
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
export const verifyReportPassword = async (id, password) => {
  try {
    const { data, error } = await supabase
      .from('reports')
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
export const generateReportTitle = (apartmentName, buildingNumber, phoneLast) => {
  return `${apartmentName} ${buildingNumber}동/${phoneLast}`;
};

// 검색 함수
export const searchReports = async (searchTerm, page = 1, limit = 10) => {
  return await getReports(page, limit, searchTerm);
};

