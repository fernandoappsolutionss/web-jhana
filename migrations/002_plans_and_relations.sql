-- ═════════════ Plans + user relationships ═════════════
-- Users acceden a módulos según su plan.
-- El admin asigna un coach a cada alumna.

create table if not exists plans (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  description text,
  tier        text not null default 'free'
              check (tier in ('free', 'expansion', 'expansion_plus', 'alumni')),
  modules     jsonb not null default '[]'::jsonb,
  price_usd   numeric(10, 2),
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Planes iniciales: admin puede editarlos / agregar más luego
insert into plans (slug, name, description, tier, modules, price_usd, active) values
  ('free',
   'Acceso libre',
   'Perfil sin cohorte activa. Visualiza lo público y espera la próxima apertura.',
   'free',
   '["dashboard"]'::jsonb,
   0,
   true),
  ('expansion-10x',
   'Expansión 10X',
   'Programa insignia de 12 semanas. Acceso a curso, comunidad, planificador y billetera.',
   'expansion',
   '["dashboard","curso","comunidad","planificador","billetera"]'::jsonb,
   2500,
   true),
  ('alumni',
   'Comunidad Alumni',
   'Para egresadas del programa. Mantiene comunidad y masterclasses bonus.',
   'alumni',
   '["dashboard","comunidad"]'::jsonb,
   null,
   true)
on conflict (slug) do nothing;

-- Extender la tabla users
alter table users add column if not exists plan_id  uuid references plans(id) on delete set null;
alter table users add column if not exists coach_id uuid references users(id) on delete set null;

-- Guardrail: los admins y coaches no tienen "plan" (el plan es para alumnas)
-- y un coach no puede tener coach_id.
-- Lo enforceamos a nivel de aplicación; no lo agregamos como CHECK para
-- no complicar migraciones futuras.

-- Dejar a todo usuario existente en el plan 'free' si no tiene uno
update users
   set plan_id = (select id from plans where slug = 'free')
 where plan_id is null
   and role = 'user';

create index if not exists users_coach_id_idx on users (coach_id);
create index if not exists users_plan_id_idx  on users (plan_id);
