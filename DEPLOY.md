# Deploy — Banana Replanteo (Cloudflare Worker + KV)

Página estática + API con KV en un solo Worker.
- **Leer**: cualquiera con el link (en vivo, refresco cada ~4s).
- **Editar**: solo con la contraseña `EDIT_TOKEN`.

## Pasos (una sola vez)

Todo desde la carpeta `replanteo-tareas/`.

```bash
# 1. Loguearte en Cloudflare (abre el navegador)
npx wrangler login

# 2. Crear la base KV. Copiá el id que te imprime.
npx wrangler kv namespace create BOARD_KV

# 3. Pegar ese id en wrangler.toml, en:  id = "REEMPLAZAR_CON_TU_ID"

# 4. Definir la contraseña de edición (te la pide por consola)
npx wrangler secret put EDIT_TOKEN

# 5. Publicar
npx wrangler deploy
```

Al terminar, wrangler imprime la URL:
`https://banana-replanteo.<tu-subdominio>.workers.dev`

## Subir tu lista curada (una vez)

1. Abrí tu archivo local actual (el `index.html` en `file://`) → botón **Exportar** → se baja `banana-replanteo.json`.
2. Abrí la URL publicada → **Editar (soy Lu)** → poné la contraseña (`EDIT_TOKEN`).
3. Botón **Importar** → elegí `banana-replanteo.json`. Sube tu lista a la nube.

Listo: compartís la URL y todos la ven en vivo. Vos editás; el resto solo mira.

## Actualizar la página más adelante

Si cambia el `index.html`, copialo a `public/` y volvé a deployar:

```bash
cp index.html public/index.html
npx wrangler deploy
```
