-- ═════════════ Expansión 10X · schema inicial ═════════════
-- Ejecuta esto una vez contra la base Neon:
--   npm run db:migrate
-- (requiere DATABASE_URL en el entorno)

create extension if not exists "pgcrypto";

create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  name          text not null,
  password_hash text not null,
  role          text not null default 'user'
                check (role in ('user', 'coach', 'admin')),
  enrolled      boolean not null default false,
  cohort        text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  last_login_at timestamptz
);

create index if not exists users_role_idx on users (role);
create index if not exists users_created_at_idx on users (created_at);
