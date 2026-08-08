# Contrato provisional de API

Cuando `VITE_API_BASE_URL` exista, la interfaz deja de usar los mocks y consume:

- `GET /editions/n-012-la-libertad/home` → `{ edition, notes }`
- `GET /notes/:noteId/comments` → `Comment[]`
- `POST /notes/:noteId/comments` → `{ author, body }` → `Comment`
- `POST /notes/:noteId/comments/:commentId/upvote` → `Comment`

`Note`: `id`, `fragment`, `x`, `y`, `w`, `h`, `tone`, `title`, `subtitle`, `paragraphs`, `editionLink?`.

`Comment`: `id`, `author`, `body`, `votes`.
