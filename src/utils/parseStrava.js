export async function parseStrava(url) {
  try {
    if (!url.includes("strava.com/activities/")) {
      throw new Error("Invalid Strava URL. Please paste a link like https://www.strava.com/activities/123456789");
    }

    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error("Failed to fetch Strava activity");
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    const titleTag = doc.querySelector('meta[property="og:title"]');
    const descriptionTag = doc.querySelector('meta[property="og:description"]');
    
    let name = "Runner";
    let distance = "0.00 km";
    let duration = "0m 0s";
    let date = new Date().toLocaleDateString();
    
    if (titleTag && titleTag.content) {
      const parts = titleTag.content.split(' - ');
      if (parts.length > 1) {
        name = parts[0].trim();
      }
    }

    if (descriptionTag && descriptionTag.content) {
      const desc = descriptionTag.content;
      
      const distMatch = desc.match(/Distance:\s*([\d.]+)\s*(km|mi)/i);
      if (distMatch) {
        distance = `${distMatch[1]} ${distMatch[2]}`;
      }
      
      const timeMatch = desc.match(/Time:\s*([\dhm\s]+)/i);
      if (timeMatch) {
        duration = timeMatch[1].trim();
      }
    }

    return {
      success: true,
      data: {
        athleteName: name,
        distance,
        duration,
        date
      }
    };
  } catch (error) {
    console.error("Strava parsing error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}
