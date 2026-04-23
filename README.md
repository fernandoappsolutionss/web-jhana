# web-jhana

Plataforma de **Jhana El Aridi** — landing editorial + portal **Expansión 10X** con roles de alumna, coach y admin.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Neon** (Postgres serverless, vía integración Vercel)
- **Auth**: sesiones JWT en cookie HttpOnly (`jose` + `bcryptjs`)
- **Vercel** hosting + edge middleware

## Estructura

```
.
├── app/
│   ├── page.tsx                 # Landing
│   ├── layout.tsx               # Root layout + fonts
│   ├── globals.css              # Sistema de diseño landing
│   ├── login/                   # Login (rol selector)
│   ├── registro/                # Registro abierto
│   ├── dashboard/
│   │   ├── layout.tsx           # Shell del portal (sidebar + main)
│   │   ├── page.tsx             # Redirect según rol
│   │   ├── dashboard.css        # Sistema de diseño del portal
│   │   ├── user/                # Alumna (Expansión 10X)
│   │   ├── coach/               # Coach (asignadas)
│   │   └── admin/               # Admin (métricas, contenido)
│   └── api/auth/                # register, login, logout, session
├── components/
│   ├── landing/                 # Nav, hero scripts, etc.
│   └── dashboard/Sidebar.tsx
├── lib/
│   ├── db.ts                    # Cliente Neon
│   ├── auth.ts                  # JWT + cookies (edge-safe)
│   └── password.ts              # bcryptjs (Node-only)
├── middleware.ts                # Protege /dashboard/*, redirige /login si ya hay sesión
├── migrations/
│   └── 001_init.sql             # Tabla users
├── scripts/migrate.mjs          # Aplica todas las migraciones en orden
└── public/assets/               # Fotos, video del hero
```

## Variables de entorno requeridas

Se configuran en **Vercel Project Settings → Environment Variables** (Production + Preview):

| Variable | Valor | Notas |
|---|---|---|
| `DATABASE_URL` | Connection string de Neon (pooled) | Provisto por la integración Neon de Vercel. Alternativas aceptadas: `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, `DATABASE_URL_UNPOOLED`. |
| `AUTH_SECRET` | 32+ caracteres random | Firma de los JWTs de sesión. Generar con `openssl rand -base64 48`. |

Para desarrollo local, crear `.env.local`:

```bash
DATABASE_URL=postgres://...
AUTH_SECRET=$(openssl rand -base64 48)
```

## Primer setup después del deploy

```bash
# 1. Traer las env vars de Vercel a tu local
npx vercel env pull .env.local

# 2. Aplicar el schema a Neon
npm run db:migrate
```

## Roles

- **user** (alumna) → `/dashboard/user` — curso, comunidad, billetera, planificador financiero
- **coach** → `/dashboard/coach` — avances de alumnas asignadas
- **admin** → `/dashboard/admin` — métricas, usuarios, CMS de contenido

Por defecto, todo registro nuevo crea un usuario con `role = 'user'`. Para promover a coach o admin, actualizar manualmente:

```sql
update users set role = 'admin' where email = 'tu@correo.com';
```

## Desarrollo local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy

Push a `main` → Vercel redeploya automáticamente.
