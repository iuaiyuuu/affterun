fetch('https://www.strava.com/activities/17937100262', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } })
  .then(r => r.text())
  .then(t => {
    const match = t.match(/<meta property="og:description" content="([^"]+)"/);
    console.log(match ? match[1] : 'Not found');
  })
