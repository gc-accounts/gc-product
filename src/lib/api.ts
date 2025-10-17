// lib/api.ts

export const getApiUrl = (path: string): string => {
  // Client-side: use window.location.origin
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }
  
  // Server-side: use environment variable or fallback
  if (process.env.NEXTAUTH_URL) {
    return `${process.env.NEXTAUTH_URL}${path}`;
  }
  
  // Development fallback
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:3000${path}`;
  }
  
  // Production fallback (you should set NEXTAUTH_URL in production)
  return path;
};