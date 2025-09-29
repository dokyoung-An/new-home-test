import { supabase } from './supabaseClient';

// 단일 이미지 업로드 함수
export const uploadImage = async (file, bucket = 'event-images') => {
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
export const uploadMultipleImages = async (files, bucket = 'event-images') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, bucket));
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    throw error;
  }
};

// 이미지 삭제 함수
export const deleteImage = async (imageUrl, bucket = 'event-images') => {
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

// 이벤트 게시글 전체 조회
export const getEventPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('event_posts')
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

// 이벤트 게시글 추가
export const addEventPost = async (postData) => {
  try {
    const insertData = {
      title: postData.title,
      content: '', // NOT NULL 제약조건 때문에 빈 문자열 추가
      content_urls: postData.contentUrls ? JSON.stringify(postData.contentUrls) : null,
      thumbnail_url: postData.thumbnailUrl || null,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('event_posts')
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

// 이벤트 게시글 수정
export const updateEventPost = async (id, postData) => {
  try {
    const updateData = {
      title: postData.title,
      content: '', // NOT NULL 제약조건 때문에 빈 문자열 추가
      content_urls: postData.contentUrls ? JSON.stringify(postData.contentUrls) : null,
      thumbnail_url: postData.thumbnailUrl || null,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('event_posts')
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

// 이벤트 게시글 삭제
export const deleteEventPost = async (id) => {
  try {
    const { error } = await supabase
      .from('event_posts')
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

// 특정 이벤트 게시글 조회
export const getEventPost = async (id) => {
  try {
    const { data, error } = await supabase
      .from('event_posts')
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

// 이전/다음 게시글 조회
export const getAdjacentPosts = async (currentId) => {
  try {
    // 현재 게시글의 created_at 조회
    const { data: currentPost, error: currentError } = await supabase
      .from('event_posts')
      .select('created_at')
      .eq('id', currentId)
      .single();

    if (currentError) {
      throw new Error(`현재 게시글 조회 오류: ${currentError.message}`);
    }

    // 이전 게시글 (더 최근)
    const { data: prevPost } = await supabase
      .from('event_posts')
      .select('id, title')
      .gt('created_at', currentPost.created_at)
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    // 다음 게시글 (더 이전)
    const { data: nextPost } = await supabase
      .from('event_posts')
      .select('id, title')
      .lt('created_at', currentPost.created_at)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    return {
      prevPost: prevPost || null,
      nextPost: nextPost || null
    };
  } catch (error) {
    return {
      prevPost: null,
      nextPost: null
    };
  }
};
