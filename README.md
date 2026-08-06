# Banana Replanteo — Lista de tareas

App de tareas del replanteo de Banana Airways.

- **Frontend + API en un Cloudflare Worker** (`worker.js` + `public/index.html`).
- **Datos** en Cloudflare **KV** (board compartido). Se edita **online** y se guarda en la nube — no hay que subir nada por cada cambio.
- **Lectura** pública (refresco ~4s). **Escritura** solo con la contraseña `EDIT_TOKEN` (login "Editar").
- **Deploy**: al pushear a `main`, Cloudflare redeploya solo (Workers Builds / Git integration).

## Estructura
- `worker.js` — API `/api/board` (GET público, PUT con token) + sirve la página.
- `public/index.html` — la app.
- `wrangler.toml` — config del Worker (name, assets, binding KV).

## Deploy manual (si hace falta)
Ver `DEPLOY.md`.
