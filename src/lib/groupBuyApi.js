import { supabase } from './supabaseClient';


// 공동구매 게시글 전체 조회
export const getGroupBuyPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('group_buy_posts')
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

// 공동구매 게시글 추가
export const addGroupBuyPost = async (postData) => {
  try {
    const insertData = {
      complex_name: postData.complexName,
      review_url: postData.reviewUrl || null,
      status: postData.status,
      created_at: postData.date ? new Date(postData.date).toISOString() : new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('group_buy_posts')
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

// 공동구매 게시글 수정
export const updateGroupBuyPost = async (id, postData) => {
  try {
    const updateData = {
      complex_name: postData.complexName,
      review_url: postData.reviewUrl || null,
      status: postData.status,
      updated_at: new Date().toISOString()
    };

    // 날짜가 제공된 경우에만 created_at 업데이트
    if (postData.date) {
      updateData.created_at = new Date(postData.date).toISOString();
    }

    const { data, error } = await supabase
      .from('group_buy_posts')
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

// 공동구매 게시글 삭제
export const deleteGroupBuyPost = async (id) => {
  try {
    const { error } = await supabase
      .from('group_buy_posts')
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

// 페이지네이션을 위한 게시글 조회 (검색 기능 포함)
export const getGroupBuyPostsPaginated = async (page = 1, limit = 10, searchKeyword = '') => {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('group_buy_posts')
      .select('*', { count: 'exact' });

    // 검색 키워드가 있으면 단지명에서 검색
    if (searchKeyword && searchKeyword.trim()) {
      query = query.ilike('complex_name', `%${searchKeyword.trim()}%`);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      throw new Error(`페이지네이션 조회 오류: ${error.message}`);
    }

    return {
      data,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      searchKeyword
    };
  } catch (error) {
    throw error;
  }
};
