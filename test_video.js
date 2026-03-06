
const axios = require('axios');

async function testOldAnime() {
    try {
        console.log("Searching for 'Naruto'...");
        const searchRes = await axios.get('http://localhost:3000/anime/animekai/naruto');

        if (!searchRes.data.results || searchRes.data.results.length === 0) {
            console.error("No results found for Naruto");
            return;
        }

        const firstResult = searchRes.data.results[0];
        console.log("Found Anime:", firstResult.title, "ID:", firstResult.id);

        console.log("Fetching Info...");
        const infoRes = await axios.get(`http://localhost:3000/anime/animekai/info?id=${firstResult.id}`);

        const episodes = infoRes.data.episodes;
        if (!episodes || episodes.length === 0) {
            console.error("No episodes found!");
            return;
        }

        const firstEp = episodes[0]; // Episode 1 usually
        console.log("First Episode ID:", firstEp.id);

        console.log("Fetching Watch URL for:", firstEp.id);
        const watchRes = await axios.get(`http://localhost:3000/anime/animekai/watch/${encodeURIComponent(firstEp.id)}`);

        const source = watchRes.data.sources.find(s => s.quality === 'default') || watchRes.data.sources[0];
        console.log("Stream URL:", source.url);

        // Log Headers required?
        if (watchRes.data.headers) {
            console.log("Headers:", watchRes.data.headers);
        }

    } catch (err) {
        console.error("Error:", err.message);
        if (err.response) {
            console.error("Response Data:", err.response.data);
        }
    }
}

testOldAnime();
