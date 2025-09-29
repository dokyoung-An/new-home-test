import { supabase } from './supabaseClient';

// 단일 이미지 업로드 함수
export const uploadImage = async (file, bucket = 'active-event-images') => {
  try {
    // 파일명에 타임스탬프 추가하여 중복 방지
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      throw new Error(`이미지 업로드 오류: ${error.message}`);
    }

    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    throw error;
  }
};

// 여러 이미지 업로드 함수
export const uploadMultipleImages = async (files, bucket = 'active-event-images') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, bucket));
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    throw error;
  }
};

// 이미지 삭제 함수
export const deleteImage = async (imageUrl, bucket = 'active-event-images') => {
  try {
    if (!imageUrl) return;
    
    // URL에서 파일명 추출
    const fileName = imageUrl.split('/').pop();
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      console.error('이미지 삭제 오류:', error);
    }
  } catch (error) {
    console.error('이미지 삭제 중 오류:', error);
  }
};

// 진행 중인 이벤트 전체 조회 (페이지네이션 포함)
export const getActiveEvents = async (page = 1, limit = 6) => {
  try {
    const offset = (page - 1) * limit;
    
    const { data, error, count } = await supabase
      .from('active_events')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
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

// 모든 진행 중인 이벤트 조회 (페이지네이션 없음)
export const getAllActiveEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('active_events')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`데이터 조회 오류: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    throw error;
  }
};

// 진행 중인 이벤트 추가
export const addActiveEvent = async (eventData) => {
  try {
    const insertData = {
      title: eventData.title,
      description: eventData.description || '',
      content_urls: eventData.contentUrls ? JSON.stringify(eventData.contentUrls) : null,
      thumbnail_url: eventData.thumbnailUrl || null,
      start_date: eventData.startDate,
      end_date: eventData.endDate,
      event_type: eventData.eventType || 'general',
      max_participants: eventData.maxParticipants || null,
      current_participants: eventData.currentParticipants || 0
    };

    const { data, error } = await supabase
      .from('active_events')
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

// 진행 중인 이벤트 수정
export const updateActiveEvent = async (id, eventData) => {
  try {
    const updateData = {
      title: eventData.title,
      description: eventData.description || '',
      content_urls: eventData.contentUrls ? JSON.stringify(eventData.contentUrls) : null,
      thumbnail_url: eventData.thumbnailUrl || null,
      start_date: eventData.startDate,
      end_date: eventData.endDate,
      event_type: eventData.eventType || 'general',
      max_participants: eventData.maxParticipants || null,
      current_participants: eventData.currentParticipants || 0,
      is_active: eventData.isActive !== undefined ? eventData.isActive : true
    };

    const { data, error } = await supabase
      .from('active_events')
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

// 진행 중인 이벤트 삭제
export const deleteActiveEvent = async (id) => {
  try {
    const { error } = await supabase
      .from('active_events')
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

// 특정 진행 중인 이벤트 조회
export const getActiveEvent = async (id) => {
  try {
    const { data, error } = await supabase
      .from('active_events')
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

// 이벤트 참가자 수 증가
export const incrementParticipants = async (id) => {
  try {
    // 현재 참가자 수 조회
    const { data: currentEvent, error: fetchError } = await supabase
      .from('active_events')
      .select('current_participants, max_participants')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw new Error(`현재 데이터 조회 오류: ${fetchError.message}`);
    }

    // 최대 참가자 수 체크
    if (currentEvent.max_participants && 
        currentEvent.current_participants >= currentEvent.max_participants) {
      throw new Error('최대 참가자 수에 도달했습니다.');
    }

    // 참가자 수 증가
    const { data, error } = await supabase
      .from('active_events')
      .update({ 
        current_participants: currentEvent.current_participants + 1 
      })
      .eq('id', id)
      .select();

    if (error) {
      throw new Error(`참가자 수 업데이트 오류: ${error.message}`);
    }

    return data[0];
  } catch (error) {
    throw error;
  }
};

// 이벤트 참가자 수 감소
export const decrementParticipants = async (id) => {
  try {
    // 현재 참가자 수 조회
    const { data: currentEvent, error: fetchError } = await supabase
      .from('active_events')
      .select('current_participants')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw new Error(`현재 데이터 조회 오류: ${fetchError.message}`);
    }

    // 참가자 수가 0보다 클 때만 감소
    if (currentEvent.current_participants > 0) {
      const { data, error } = await supabase
        .from('active_events')
        .update({ 
          current_participants: currentEvent.current_participants - 1 
        })
        .eq('id', id)
        .select();

      if (error) {
        throw new Error(`참가자 수 업데이트 오류: ${error.message}`);
      }

      return data[0];
    }

    return currentEvent;
  } catch (error) {
    throw error;
  }
};

// 이벤트 타입별 조회
export const getActiveEventsByType = async (eventType) => {
  try {
    const { data, error } = await supabase
      .from('active_events')
      .select('*')
      .eq('is_active', true)
      .eq('event_type', eventType)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`데이터 조회 오류: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    throw error;
  }
};

// 곧 시작할 이벤트 조회
export const getUpcomingEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('active_events')
      .select('*')
      .gt('start_date', new Date().toISOString())
      .order('start_date', { ascending: true });

    if (error) {
      throw new Error(`데이터 조회 오류: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    throw error;
  }
};

// 만료된 이벤트들을 비활성화
export const deactivateExpiredEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('active_events')
      .update({ is_active: false })
      .lt('end_date', new Date().toISOString())
      .eq('is_active', true)
      .select();

    if (error) {
      throw new Error(`만료된 이벤트 비활성화 오류: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    throw error;
  }
};


