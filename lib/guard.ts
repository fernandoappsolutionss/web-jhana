import { readSession } from '@/lib/auth';
import { getUserPlan, type ModuleKey } from '@/lib/plans';
import { redirect } from 'next/navigation';

/**
 * Server-side guard for alumna pages that require a specific module.
 * Returns { session, plan, hasAccess } — the caller decides how to render
 * the "upgrade plan" state.
 */
export async function moduleAccess(module: ModuleKey) {
  const session = await readSession();
  if (!session) redirect('/login');
  const plan = await getUserPlan(session.sub);
  const hasAccess = plan.modules.includes(module);
  return { session, plan, hasAccess };
}
