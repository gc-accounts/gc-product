// utils/utmUtils.js

export function getOriginalTrafficSource(utm) {
  if (!utm || typeof utm !== 'object') return '';

  const source = utm['Original Traffic Source']?.toLowerCase() ?? '';

  // Replace "ppc" with "adwords"
  if (source === 'ppc') return 'adwords';

  return utm['Original Traffic Source'] ?? '';
}
