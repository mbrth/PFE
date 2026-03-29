import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER || 'postgres',
  password: String(process.env.PGPASSWORD || ''),
  database: process.env.PGDATABASE || 'ecoorient',
  port: parseInt(process.env.PGPORT || '5432'),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = (text, params) => pool.query(text, params);
