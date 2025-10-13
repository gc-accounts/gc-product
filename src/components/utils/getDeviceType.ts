// @/utils/getDeviceType.ts
export const getDeviceType = (): string => {
  // Check if running on server (no window object)
  if (typeof window === 'undefined') return 'Desktop'; // Default to Desktop for SSR

  const userAgent = navigator.userAgent;
  
  // Tablet detection (needs to come before mobile)
  const isTablet = /(iPad|Android|Tablet|PlayBook|Silk)/i.test(userAgent) && 
                  !/Mobile/i.test(userAgent);
  
  // Mobile detection
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  // Return device type
  if (isTablet) return 'Tablet';
  if (isMobile) return 'Mobile';
  return 'Desktop';
};