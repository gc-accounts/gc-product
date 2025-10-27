// utils/fetchUserLocation.ts

export async function fetchUserLocation() {
  try {
    // ✅ ipwho.is does not need any token or authentication
    const response = await fetch("https://ipwho.is/");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error("Invalid response from ipwho.is");
    }


    return data

    // Returns the entire location object (city, region, country, etc.)
    // return {
    //   ip: data.ip || "Unknown",
    //   city: data.city || "Unknown",
    //   region: data.region || "Unknown",
    //   country: data.country || "Unknown",
    //   country_code: data.country_code || "Unknown",
    //   latitude: data.latitude || null,
    //   longitude: data.longitude || null,
    //   isp: data.connection?.isp || "Unknown",
    //   timezone: data.timezone?.id || "Unknown",
    // };
  } catch (error) {
    console.error("Error fetching user location:", error);
    return null; // Return null so caller can handle gracefully
  }
}
