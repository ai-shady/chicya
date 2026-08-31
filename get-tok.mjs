import pg from 'pg';
import fs from 'fs';
const env = {};
fs.readFileSync('/var/folders/hn/21583whx6yg4xx84s1j58l4w0000gn/T/opencode/medusa-prod.env', 'utf8').split('\n').forEach(l => {
  const i = l.indexOf('='); if (i > 0) env[l.slice(0,i)] = l.slice(i+1);
});
const pool = new pg.Pool({ connectionString: env.DATABASE_URL_UNPOOLED, ssl: { rejectUnauthorized: false } });
const r = await pool.query("select token from invite where email='shadyduan@gmail.com'");
fs.writeFileSync('/tmp/invite-token.txt', r.rows[0].token);
await pool.end();
console.log('written');
