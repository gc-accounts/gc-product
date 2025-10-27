export async function getUserCountry(): Promise<{
  country: string;
  currency: 'INR' | 'USD';
  isIndia: boolean;
}> {
  try {
    // ✅ ipwho.is doesn’t require a token or authentication
    const response = await fetch('https://ipwho.is/');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch country info (HTTP ${response.status})`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('Invalid response from ipwho.is');
    }

    const country = data.country_code || 'IN';
    const isIndia = country === 'IN';
    const currency = isIndia ? 'INR' : 'USD';

    return {
      country,
      currency,
      isIndia
    };

  } catch (error) {
    console.error('Error detecting country:', error);
    // 🛡️ Fallback to India defaults if detection fails
    return {
      country: 'IN',
      currency: 'INR',
      isIndia: true
    };
  }
}

// -------------------- Price Configuration --------------------

export const PRICE_CONFIG = {
  INR: {
    basePrice: 1,
    currency: 'INR',
    symbol: '₹'
  },
  USD: {
    basePrice: 100,
    currency: 'USD',
    symbol: '$'
  }
};
