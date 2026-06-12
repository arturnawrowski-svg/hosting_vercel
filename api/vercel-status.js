export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.body?.token;
  if (!token) return res.status(400).json({ error: 'Token required' });

  const h = { Authorization: `Bearer ${token}` };

  try {
    const userRes = await fetch('https://api.vercel.com/v2/user', { headers: h });
    if (!userRes.ok) return res.status(401).json({ error: 'Invalid token' });

    const [projectsJson, deploymentsJson] = await Promise.all([
      fetch('https://api.vercel.com/v9/projects?limit=10', { headers: h }).then(r => r.json()),
      fetch('https://api.vercel.com/v6/deployments?limit=3', { headers: h }).then(r => r.json()),
    ]);

    res.status(200).json({
      projects: projectsJson.projects || [],
      latestDeployment: (deploymentsJson.deployments || [])[0] || null,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
