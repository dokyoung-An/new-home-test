import type { VercelRequest, VercelResponse } from '@vercel/node';

const BOT_UA = /(Yeti|Googlebot|bingbot|Baiduspider|DuckDuckBot|Twitterbot|facebookexternalhit|Slackbot|LinkedInBot|Daum[ _]oa)/i;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const path = req.url?.replace(/^\/api\/prerender/, '') || '/';
    const ua = (req.headers['user-agent'] as string) || '';
    const isBot = BOT_UA.test(ua);

    // 디버깅 로그
    console.log('=== PRERENDER DEBUG ===');
    console.log('Path:', path);
    console.log('User-Agent:', ua);
    console.log('Is Bot:', isBot);
    console.log('PRERENDER_TOKEN exists:', !!process.env.PRERENDER_TOKEN);

    // 원래 풀 URL 구성
    const host = (req.headers['x-forwarded-host'] as string) || (req.headers.host as string);
    const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
    const originalUrl = `${proto}://${host}${path}`;

    console.log('Original URL:', originalUrl);

    if (isBot) {
      const prerenderUrl = `https://service.prerender.io/${originalUrl}`;
      console.log('Prerender URL:', prerenderUrl);
      
      const r = await fetch(prerenderUrl, {
        headers: {
          'User-Agent': ua,
          'X-Prerender-Token': process.env.PRERENDER_TOKEN || ''
        }
      });

      console.log('Prerender Response Status:', r.status);

      // 응답 그대로 전달(상태/헤더/바디)
      r.headers.forEach((v, k) => res.setHeader(k, v));
      res.status(r.status);
      const body = await r.arrayBuffer();
      return res.send(Buffer.from(body));
    }

    // 일반 사용자: index.html로 리다이렉트 (내부)
    console.log('Regular user detected, serving index.html');
    const indexUrl = `${proto}://${host}/index.html`;
    const indexResponse = await fetch(indexUrl);
    const indexHtml = await indexResponse.text();
    
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=0');
    return res.send(indexHtml);
  } catch (e: any) {
    console.error('[prerender proxy error]', e);
    return res.status(500).send('Prerender proxy error');
  }
}
