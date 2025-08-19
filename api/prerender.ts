import type { VercelRequest, VercelResponse } from '@vercel/node';

const BOT_UA = /(Yeti|Googlebot|bingbot|Baiduspider|DuckDuckBot|Twitterbot|facebookexternalhit|Slackbot|LinkedInBot|Daum[ _]oa)/i;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const ua = (req.headers['user-agent'] as string) || '';
    const isBot = BOT_UA.test(ua);

    // 원래 풀 URL 구성
    const host = (req.headers['x-forwarded-host'] as string) || (req.headers.host as string);
    const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
    const path = req.url?.replace(/^\/api\/prerender/, '') || '/';
    const originalUrl = `${proto}://${host}${path}`;

    if (isBot) {
      const prerenderUrl = `https://service.prerender.io/${originalUrl}`;
      const r = await fetch(prerenderUrl, {
        headers: {
          'User-Agent': ua,
          'X-Prerender-Token': process.env.PRERENDER_TOKEN || ''
        }
      });

      // 응답 그대로 전달(상태/헤더/바디)
      r.headers.forEach((v, k) => res.setHeader(k, v));
      res.status(r.status);
      const body = await r.arrayBuffer();
      return res.send(Buffer.from(body));
    }

    // 일반 사용자: SPA로
    res.setHeader('Cache-Control', 'public, max-age=0');
    return res.redirect(307, '/');
  } catch (e: any) {
    console.error('[prerender proxy error]', e);
    return res.status(500).send('Prerender proxy error');
  }
}
