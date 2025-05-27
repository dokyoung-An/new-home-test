require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// 환경변수 확인
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error('Required environment variables are missing');
  process.exit(1);
}

const app = express();

// CORS 설정 - 프로덕션에서는 실제 도메인으로 제한해야 함
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com' 
    : 'http://localhost:3000'
}));
app.use(express.json());

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// 에러 핸들링 미들웨어
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? '서버 오류가 발생했습니다.' 
      : err.message 
  });
};

// 문의사항 관련 API
app.get('/api/inquiries', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.patch('/api/inquiries/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const { data, error } = await supabase
      .from('inquiries')
      .update({ inquiry_status: status })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// 엠버서더 관련 API
app.post('/api/ambassador-applications', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('ambassador_applications')
      .insert([req.body])
      .select();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/api/ambassador-applications', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('ambassador_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.patch('/api/ambassador-applications/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const { data, error } = await supabase
      .from('ambassador_applications')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// 에러 핸들링 미들웨어 적용
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});