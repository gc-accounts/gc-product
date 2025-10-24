export async function getUserCountry(): Promise<{
  country: string;
  currency: 'INR' | 'USD';
  isIndia: boolean;
}> {
  try {
    const response = await fetch('https://ipinfo.io/json?token=30d6ad207d1162');
    
    if (!response.ok) {
      throw new Error('Failed to fetch country info');
    }
    
    const data = await response.json();
    const country = data.country || 'IN'; // Changed from 'US' to 'IN'
    const isIndia = country === 'IN';
    const currency = isIndia ? 'INR' : 'USD';
    
    return {
      country,
      currency,
      isIndia
    };
  } catch (error) {
    console.error('Error detecting country:', error);
    // Fallback to INR/India if detection fails
    return {
      country: 'IN', // Changed from 'US' to 'IN'
      currency: 'INR', // Changed from 'USD' to 'INR'
      isIndia: true // Changed from false to true
    };
  }
}
// Price configuration
export const PRICE_CONFIG = {
  INR: {
    basePrice: 5000,
    currency: 'INR',
    symbol: '₹'
  },
  USD: {
    basePrice: 100,
    currency: 'USD', 
    symbol: '$'
  }
};