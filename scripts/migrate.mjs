#!/usr/bin/env node
/**
 * Run all .sql files in ./migrations against the Neon database,
 * in filename order. Safe to re-run: each file uses IF NOT EXISTS.
 *
 * Usage:
 *   DATABASE_URL=postgres://... node scripts/migrate.mjs
 */
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = resolve(__dirname, '..', 'migrations');

const url =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.DATABASE_URL_UNPOOLED;

if (!url) {
  console.error('✗ DATABASE_URL not set');
  process.exit(1);
}

const sql = neon(url);
const files = readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.sql')).sort();

if (!files.length) {
  console.log('No migration files found.');
  process.exit(0);
}

for (const file of files) {
  const path = resolve(MIGRATIONS_DIR, file);
  const body = readFileSync(path, 'utf-8');
  process.stdout.write(`▸ ${file} … `);
  try {
    // neon() accepts parameterized queries via tagged templates; for raw
    // migration SQL we use the .query() escape hatch via sql.unsafe or
    // execute each statement. The serverless driver exposes the function
    // itself — pass the raw text.
    await sql.query(body);
    console.log('ok');
  } catch (err) {
    console.log('FAILED');
    console.error(err);
    process.exit(1);
  }
}

console.log('✓ All migrations applied.');
