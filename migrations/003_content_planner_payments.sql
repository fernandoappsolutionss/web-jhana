-- ═════════════ Contenido del curso, planificador, pagos, comunidad ═════════════

-- ——— Course modules & lessons ———
create table if not exists course_modules (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  phase       int not null check (phase in (1,2,3)),  -- Reset · Reprogramación · Expansión
  week_start  int,
  week_end    int,
  description text,
  plan_slugs  jsonb not null default '["expansion-10x"]'::jsonb,
  position    int not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists lessons (
  id           uuid primary key default gen_random_uuid(),
  module_id    uuid references course_modules(id) on delete cascade not null,
  slug         text not null,
  title        text not null,
  kind         text not null default 'video'
               check (kind in ('video','reading','exercise','download','live')),
  url          text,
  duration_min int,
  position     int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (module_id, slug)
);

create table if not exists lesson_progress (
  user_id      uuid references users(id) on delete cascade,
  lesson_id    uuid references lessons(id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- ——— Financial planner (riqueza de la alumna) ———
create table if not exists planner_snapshots (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references users(id) on delete cascade not null,
  recorded_at  date not null default current_date,
  net_worth    numeric(12, 2) not null default 0,
  income       numeric(12, 2),
  savings      numeric(12, 2),
  investments  numeric(12, 2),
  debts        numeric(12, 2),
  notes        text,
  created_at   timestamptz not null default now(),
  unique (user_id, recorded_at)
);

-- ——— Payments (billetera / historial de inversión) ———
create table if not exists payments (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references users(id) on delete cascade not null,
  plan_id    uuid references plans(id) on delete set null,
  amount     numeric(10, 2) not null,
  currency   text not null default 'USD',
  status     text not null default 'paid'
             check (status in ('paid','pending','refunded','failed')),
  method     text,      -- zelle, transfer, paypal, card
  reference  text,      -- external ref (transaction id, zelle confirm, etc.)
  note       text,
  paid_at    timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ——— Community (feed simple) ———
create table if not exists community_posts (
  id         uuid primary key default gen_random_uuid(),
  author_id  uuid references users(id) on delete cascade not null,
  title      text,
  body       text not null,
  pinned     boolean not null default false,
  created_at timestamptz not null default now()
);

-- Seed de los 12 módulos del programa
insert into course_modules (slug, title, phase, week_start, week_end, description, position) values
  ('identidad-heredada',     'Identidad y etiquetas heredadas',                      1, 1, 1, 'Ver las capas que te construyeron. Etiquetas, rol familiar, roles de infancia.', 1),
  ('arbol-financiero',       'El dinero en tu árbol familiar',                       1, 2, 2, 'Mapear el linaje financiero. Qué heredaste de tus padres y abuelos sobre el dinero.', 2),
  ('peso-invisible',         'El peso invisible — culpa, vergüenza, miedo',          1, 3, 3, 'Liberar emociones densas que bloquean la recepción.', 3),
  ('merecer-sin-sacrificio', 'Merecer sin sacrificio',                               1, 4, 4, 'Reprogramar la ecuación mérito = sufrimiento.', 4),
  ('techo-invisible',        'El techo invisible y cómo moverlo',                    2, 5, 5, 'Detectar tus límites inconscientes de ingreso.', 5),
  ('que-piensas-del-dinero', '¿Qué piensas del dinero? · Masterclass en vivo',       2, 6, 6, 'La conferencia insignia en formato cohorte.', 6),
  ('fondo-libertad',         'Automatización del Fondo de Libertad',                 2, 7, 7, 'Construir el primer fondo de libertad, paso a paso.', 7),
  ('tres-vidas',             'Tu dinero tiene 3 vidas',                              2, 8, 8, 'La arquitectura de las 3 vidas: operativa, colchón, libertad.', 8),
  ('valor-lo-que-das',       'El valor de lo que das · Masterclass en vivo',         3, 9, 9, 'Rediseñar la oferta y los precios desde el nuevo merecimiento.', 9),
  ('caza-100-no',            'La caza de los 100 NO',                                3, 10, 10, 'Ejercicio radical para desensibilizar el rechazo.', 10),
  ('plan-10x',               'El Plan 10X con estructura real',                      3, 11, 11, 'Diseñar un plan de 90 días con métricas.', 11),
  ('vision-board',           'Vision Board y Retiro de Graduación',                  3, 12, 12, 'Materializar la nueva identidad. Ceremonia de cierre.', 12)
on conflict (slug) do nothing;

create index if not exists lesson_progress_user_idx   on lesson_progress (user_id);
create index if not exists lessons_module_idx        on lessons (module_id, position);
create index if not exists payments_user_idx         on payments (user_id, paid_at desc);
create index if not exists planner_user_date_idx     on planner_snapshots (user_id, recorded_at);
create index if not exists community_posts_created_idx on community_posts (created_at desc);
