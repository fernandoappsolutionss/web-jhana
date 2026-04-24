import { sql } from '@/lib/db';

export type ModuleKey =
  | 'dashboard'
  | 'curso'
  | 'comunidad'
  | 'planificador'
  | 'billetera';

export type UserPlan = {
  slug: string | null;
  name: string | null;
  tier: string | null;
  modules: ModuleKey[];
  price_usd: number | null;
};

type PlanRow = {
  slug: string | null;
  name: string | null;
  tier: string | null;
  modules: ModuleKey[] | null;
  price_usd: string | null;
};

/**
 * Load the plan currently assigned to a user.
 * Admins/coaches have no plan — return a plan that unlocks 'dashboard' only
 * (the sidebar still uses role-specific nav for those).
 */
export async function getUserPlan(userId: string): Promise<UserPlan> {
  const rows = (await sql()`
    select p.slug, p.name, p.tier, p.modules, p.price_usd
      from users u
      left join plans p on p.id = u.plan_id
     where u.id = ${userId}
     limit 1
  `) as unknown as PlanRow[];

  const p = rows[0];
  if (!p || !p.slug) {
    return { slug: null, name: null, tier: null, modules: ['dashboard'], price_usd: null };
  }

  return {
    slug: p.slug,
    name: p.name,
    tier: p.tier,
    modules: p.modules ?? ['dashboard'],
    price_usd: p.price_usd ? Number(p.price_usd) : null,
  };
}

/**
 * Does this plan include this module?
 */
export function hasModule(plan: UserPlan, key: ModuleKey): boolean {
  return plan.modules.includes(key);
}
