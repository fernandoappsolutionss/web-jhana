import { redirect } from 'next/navigation';
import { readSession } from '@/lib/auth';
import Sidebar from '@/components/dashboard/Sidebar';
import './dashboard.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readSession();
  if (!session) redirect('/login');

  return (
    <div className="dash-shell">
      <Sidebar role={session.role} name={session.name} email={session.email} />
      <main className="main">{children}</main>
    </div>
  );
}
