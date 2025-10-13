// utils/fetchUserLocation.ts
export async function fetchUserLocation(token: string = '30d6ad207d1162') {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${token}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    // Returns the entire location object (city, region, country, etc.)
    return data;
  } catch (error) {
    console.error('Error fetching user location:', error);
    return null; // return null so caller can handle gracefully
  }
}
