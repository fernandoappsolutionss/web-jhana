import { sql } from '@/lib/db';
import { moduleAccess } from '@/lib/guard';
import LockedModule from '@/components/dashboard/LockedModule';
import CommunityClient, { type CommunityPost } from './CommunityClient';
import './comunidad.css';

export const dynamic = 'force-dynamic';

type PostRow = {
  id: string;
  title: string | null;
  body: string;
  pinned: boolean;
  created_at: string;
  author_id: string;
  author_name: string;
  author_role: 'user' | 'coach' | 'admin';
};

export default async function ComunidadPage() {
  const { session, plan, hasAccess } = await moduleAccess('comunidad');
  if (!hasAccess) return <LockedModule module="Comunidad" planName={plan.name} />;

  const rows = (await sql()`
    select
      p.id, p.title, p.body, p.pinned, p.created_at,
      p.author_id,
      u.name as author_name,
      u.role as author_role
    from community_posts p
    join users u on u.id = p.author_id
    order by p.pinned desc, p.created_at desc
    limit 50
  `) as unknown as PostRow[];

  const posts: CommunityPost[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    body: r.body,
    pinned: r.pinned,
    created_at: r.created_at,
    authorId: r.author_id,
    authorName: r.author_name,
    authorRole: r.author_role,
  }));

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Comunidad privada · Expansión 10X</span>
        </div>
        <h1 className="page-h1">
          El espacio de <em>tu cohorte</em>.
        </h1>
        <p className="page-sub">
          Comparte avances, pregunta, celebra. Aquí estamos las alumnas, los
          coaches y Jhana. Todo lo que publicas queda entre nosotras.
        </p>
      </div>

      <CommunityClient
        initialPosts={posts}
        currentUserId={session.sub}
        currentUserName={session.name}
        currentUserRole={session.role}
      />
    </>
  );
}
