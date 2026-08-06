# Banana Replanteo — Lista de tareas

Microsite de tareas del replanteo de Banana Airways. **Los datos viven en este repo de GitHub** y se editan online (estilo Convoy).

- La app es un único `index.html` (sin build).
- Los datos viven en **`board.json`** (este repo).
- **Leer**: cualquiera que abra el sitio ve la lista (se relee al abrir/refrescar y cada ~90s). Los viewers leen por `raw.githubusercontent` (sin límite de rate).
- **Editar**: con un **token de GitHub** (fine-grained, permiso *Contents: Read and write* en este repo). Cada cambio guarda un **commit** a `board.json`. El token queda solo en tu navegador.
- **Imágenes** (a futuro): se suben aparte (Worker de Cloudflare), no van en el repo.

## Links
- GitHub Pages: `https://lucilatr.github.io/banana-replanteo/`
- Sin depender de Pages: `https://raw.githack.com/lucilatr/banana-replanteo/main/index.html`
