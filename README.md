# go-books

README ini menjelaskan cara menjalankan backend dan frontend secara lokal untuk pengembangan.

## Prasyarat


## Teknologi yang digunakan

- Backend
	- Go (Golang)
	- chi (github.com/go-chi/chi)

- Frontend
	- React + TypeScript
	- Shadcn (komponen UI / design system ringan)
	- TanStack Query (react-query) — untuk server-state, caching, dan background refetch
	- Zustand — store global ringan untuk UI state (form, dialog, loading global)

	Alasan: `Shadcn` dipilih untuk menyediakan komponen UI yang konsisten dan mudah dikustomisasi dengan Tailwind. `TanStack Query` mengelola data yang berasal dari API secara efisien (cache, revalidation, retry) sehingga mengurangi kebutuhan boilerplate untuk fetching. `Zustand` digunakan untuk state lokal/global kecil yang tidak perlu kompleksitas Redux—sangat ringan dan mudah dipakai untuk form/dialog/loading states.

Struktur proyek:

- `cmd/` — entrypoint Go (server)
- `internal/` — kode aplikasi Go (domain, application, infrastructure)
- `view/` — frontend (React + TypeScript, Vite)

## Langkah cepat (development)

Menjalankan backend (API):

```bash
# dari root repo
go run ./cmd
```

Catatan:
- Server dijalankan pada alamat default port 8182.

Menjalankan frontend (dev server):

```bash
cd view
npm install    # atau `yarn` / `pnpm install`
npm run dev    # menjalankan Vite dev server
```

Catatan:
- Frontend berjalan default pada port 5173

Buat `view/.env.local` dengan isi:

```env
VITE_API_URL=http://localhost:8182
```

Lalu jalankan ulang dev server frontend.

Buka alamat frontend yang ditampilkan oleh Vite di browser.

## Menjalankan keduanya bersamaan

1. Di terminal A jalankan backend:

```bash
go run ./cmd
```

2. Di terminal B jalankan frontend:

```bash
cd view
npm run dev
```

Frontend menggunakan store (Zustand) dan React Query untuk state global sehingga mengurangi kebutuhan prop drilling — lihat `view/src/hooks`.

## Build untuk produksi

Backend (membuat executable):

```bash
go build -o bin/server ./cmd
# lalu jalankan
./bin/server
```

Frontend (build produksi):

```bash
cd view
npm run build
# hasil build ada di `view/dist` — sajikan dengan static server atau integrasikan ke reverse-proxy
```

## Troubleshooting

- Konflik port: Ubah port backend atau frontend jika port default sudah digunakan.
- Jika mengubah `VITE_API_URL` atau env lain, restart dev server frontend.

## Perintah berguna

Dari root project:

```bash
# jalankan backend
go run ./cmd

# build backend
go build -o bin/server ./cmd

# jalankan semua test backend
go test ./...

# frontend
cd view
npm install
npm run dev
npm run build
```
