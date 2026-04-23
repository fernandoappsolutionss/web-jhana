import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

/**
 * Neon serverless HTTP client.
 *
 * Accepts any of the connection string env vars that Vercel's Neon
 * integration exposes. Falls back through them in this order:
 *   1. DATABASE_URL
 *   2. POSTGRES_URL            (Vercel Neon/Postgres default)
 *   3. POSTGRES_PRISMA_URL     (pooled, with pgbouncer)
 *   4. DATABASE_URL_UNPOOLED   (direct connection)
 */
function getConnectionString(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL_UNPOOLED;

  if (!url) {
    throw new Error(
      'Neon connection string missing. Set DATABASE_URL (or POSTGRES_URL) in your environment.'
    );
  }
  return url;
}

// Lazy singleton so the module can be imported even if envs load later
let client: NeonQueryFunction<false, false> | null = null;

export function sql() {
  if (!client) client = neon(getConnectionString());
  return client;
}
