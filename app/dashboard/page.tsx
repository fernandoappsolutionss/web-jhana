import { redirect } from 'next/navigation';
import { readSession } from '@/lib/auth';

export default async function DashboardIndex() {
  const session = await readSession();
  if (!session) redirect('/login');
  redirect(`/dashboard/${session.role}`);
}
