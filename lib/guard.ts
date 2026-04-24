import { readSession } from '@/lib/auth';
import { getUserPlan, type ModuleKey } from '@/lib/plans';
import { redirect } from 'next/navigation';

/**
 * Server-side guard for alumna pages that require a specific module.
 *
 * Behavior by role:
 *   · admin → always has access (moderation / visibility)
 *   · coach → can access comunidad (to participate/moderate)
 *   · user  → needs the module in her plan
 */
export async function moduleAccess(module: ModuleKey) {
  const session = await readSession();
  if (!session) redirect('/login');
  const plan = await getUserPlan(session.sub);

  let hasAccess = plan.modules.includes(module);
  if (session.role === 'admin') hasAccess = true;
  if (session.role === 'coach' && module === 'comunidad') hasAccess = true;

  return { session, plan, hasAccess };
}
