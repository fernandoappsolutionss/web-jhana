import { redirect } from 'next/navigation';
import { readSession } from '@/lib/auth';
import { getUserPlan } from '@/lib/plans';
import Sidebar from '@/components/dashboard/Sidebar';
import './dashboard.css';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readSession();
  if (!session) redirect('/login');

  const plan = await getUserPlan(session.sub);

  return (
    <div className="dash-shell">
      <Sidebar
        role={session.role}
        name={session.name}
        email={session.email}
        modules={plan.modules}
        planName={plan.name}
      />
      <main className="main">{children}</main>
    </div>
  );
}
