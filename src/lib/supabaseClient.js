import { createClient } from '@supabase/supabase-js';



const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;



if (!supabaseUrl || !supabaseKey) {
  throw new Error(`
    환경 변수가 설정되지 않았습니다.
    REACT_APP_SUPABASE_URL: ${supabaseUrl ? '설정됨' : '설정되지 않음'}
    REACT_APP_SUPABASE_KEY: ${supabaseKey ? '설정됨' : '설정되지 않음'}
    .env 파일을 확인해주세요.
  `);
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});