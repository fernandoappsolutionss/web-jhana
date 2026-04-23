#!/usr/bin/env node
/**
 * Run every .sql file in ./migrations against Neon, in filename order.
 * Each file can contain multiple statements.
 *
 * Usage:
 *   DATABASE_URL=postgres://... node scripts/migrate.mjs
 */
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// In Node we must provide a WebSocket implementation for the Pool
neonConfig.webSocketConstructor = ws;

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = resolve(__dirname, '..', 'migrations');

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.error('✗ DATABASE_URL not set');
  process.exit(1);
}

const pool = new Pool({ connectionString });

const files = readdirSync(MIGRATIONS_DIR)
  .filter((f) => f.endsWith('.sql'))
  .sort();

if (!files.length) {
  console.log('No migration files found.');
  await pool.end();
  process.exit(0);
}

let failed = false;
for (const file of files) {
  const path = resolve(MIGRATIONS_DIR, file);
  const body = readFileSync(path, 'utf-8');
  process.stdout.write(`▸ ${file} … `);
  try {
    await pool.query(body);
    console.log('ok');
  } catch (err) {
    console.log('FAILED');
    console.error(err);
    failed = true;
    break;
  }
}

await pool.end();
process.exit(failed ? 1 : 0);
