export const STRAVA_AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${import.meta.env.VITE_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${window.location.origin}/&approval_prompt=force&scope=activity:read_all`;

export async function exchangeToken(code) {
  try {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
        client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code'
      })
    });
    
    if (!response.ok) throw new Error("Failed to exchange token");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getLatestActivity(accessToken) {
  try {
    const response = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=1', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    if (!response.ok) throw new Error("Failed to fetch activities");
    const data = await response.json();
    
    if (data && data.length > 0) {
      return await getActivityById(accessToken, data[0].id);
    } else {
      throw new Error("No activities found");
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}

export async function getActivityById(accessToken, activityId) {
  try {
    const response = await fetch(`https://www.strava.com/api/v3/activities/${activityId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    if (!response.ok) throw new Error("Failed to fetch activity details");
    const activity = await response.json();
    
    // Fetch athlete info for name
    const athleteResponse = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const athleteData = await athleteResponse.json();
    
    const distanceKm = (activity.distance / 1000).toFixed(2);
    
    const totalSeconds = activity.moving_time;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    let durationStr = "";
    if (hours > 0) durationStr += `${hours}h `;
    if (minutes > 0 || hours > 0) durationStr += `${minutes}m `;
    durationStr += `${seconds}s`;
    
    // Remove 'Z' to parse as local time instead of UTC
    const localDateString = activity.start_date_local.replace('Z', '');
    const startDate = new Date(localDateString);
    const timeStr = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = startDate.toLocaleDateString('en-ZA').replace(/\//g, '/');
    
    return {
      success: true,
      data: {
        athleteName: `${athleteData.firstname} ${athleteData.lastname}`.trim(),
        distance: `${distanceKm} km`,
        duration: durationStr.trim(),
        date: dateStr,
        time: timeStr
      }
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
