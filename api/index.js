import { ANIME } from '@consumet/extensions';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Anime ID is required (e.g., /?id=overlord-mkqg)' });
  }

  try {
    const animekai = new ANIME.AnimeKai();
    
    // Attempt to bypass by overriding the default axios instance headers if possible
    // Note: Consumet extensions use an internal axios instance. 
    // We'll try to pass a more convincing ID or use the search method first which is sometimes less protected.
    
    console.log(`Fetching info for ID: ${id}`);
    const data = await animekai.fetchAnimeInfo(id);
    
    return res.status(200).json(data);
  } catch (err) {
    console.error('Scraper Error:', err.message);
    return res.status(500).json({ 
      error: 'Failed to fetch anime info', 
      details: err.message 
    });
  }
}
