import { neon } from '@neondatabase/serverless';

function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(databaseUrl);
}

// GET /api/portfolio — fetch current portfolio data
async function handleGet(req, res) {
  try {
    const sql = getDb();
    const rows = await sql`SELECT data FROM portfolio_data WHERE id = 1`;

    if (rows.length === 0) {
      // No saved data yet — frontend will use defaults
      return res.status(200).json({ data: null });
    }

    return res.status(200).json({ data: rows[0].data });
  } catch (error) {
    console.error('GET /api/portfolio error:', error);
    return res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
}

// PUT /api/portfolio — save updated portfolio data (password-protected)
async function handlePut(req, res) {
  try {
    const { password, data } = req.body;

    // Verify edit password
    const editPassword = process.env.EDIT_PASSWORD;
    if (!editPassword) {
      return res.status(500).json({ error: 'Server misconfiguration: EDIT_PASSWORD not set' });
    }

    if (password !== editPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid portfolio data' });
    }

    const sql = getDb();

    // Upsert: insert if not exists, update if exists
    await sql`
      INSERT INTO portfolio_data (id, data, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE
      SET data = ${JSON.stringify(data)}::jsonb,
          updated_at = NOW()
    `;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('PUT /api/portfolio error:', error);
    return res.status(500).json({ error: 'Failed to save portfolio data' });
  }
}

// POST /api/portfolio — verify password
async function handlePost(req, res) {
  try {
    const { password } = req.body;
    const editPassword = process.env.EDIT_PASSWORD;
    if (!editPassword) {
      return res.status(500).json({ error: 'Server misconfiguration: EDIT_PASSWORD not set' });
    }

    if (password === editPassword) {
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ error: 'Invalid password' });
  } catch (error) {
    console.error('POST /api/portfolio error:', error);
    return res.status(500).json({ error: 'Failed to verify password' });
  }
}

// Main handler — route by HTTP method
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  if (req.method === 'POST') {
    return handlePost(req, res);
  }

  if (req.method === 'PUT') {
    return handlePut(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
