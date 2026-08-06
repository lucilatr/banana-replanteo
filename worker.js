// Cloudflare Worker — API del board (KV) + sirve la página estática (public/)
// Lectura (GET) abierta a todos · Escritura (PUT) solo con la contraseña EDIT_TOKEN.

const KEY = 'replanteo';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Edit-Token',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    if (url.pathname === '/api/board') {
      // --- Leer el board (público) ---
      if (request.method === 'GET') {
        const data = await env.BOARD_KV.get(KEY);
        return new Response(data || 'null', {
          headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        });
      }

      // --- Escribir el board (requiere contraseña) ---
      if (request.method === 'PUT') {
        const token = request.headers.get('X-Edit-Token') || '';
        if (!env.EDIT_TOKEN || token !== env.EDIT_TOKEN) {
          return json({ error: 'unauthorized' }, 401);
        }
        const body = await request.text();
        try {
          const parsed = JSON.parse(body);
          if (!parsed || !Array.isArray(parsed.tasks)) throw new Error('bad shape');
        } catch {
          return json({ error: 'invalid board' }, 400);
        }
        await env.BOARD_KV.put(KEY, body);
        return json({ ok: true });
      }

      return json({ error: 'method not allowed' }, 405);
    }

    // Cualquier otra ruta => archivos estáticos (public/index.html, etc.)
    return env.ASSETS.fetch(request);
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}
