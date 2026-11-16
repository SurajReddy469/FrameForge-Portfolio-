export const CURRENCY_RATES = {
  CHF: { symbol: 'CHF', rate: 1.0, prefix: 'CHF ', suffix: '' },
  USD: { symbol: '$', rate: 1.12, prefix: '$', suffix: ' USD' },
  EUR: { symbol: '€', rate: 1.04, prefix: '€', suffix: ' EUR' },
  GBP: { symbol: '£', rate: 0.88, prefix: '£', suffix: ' GBP' },
  JPY: { symbol: '¥', rate: 172.0, prefix: '¥', suffix: ' JPY' }
};

export function convertPrice(amountInChf, currency = 'CHF') {
  const config = CURRENCY_RATES[currency] || CURRENCY_RATES.CHF;
  return Math.round(amountInChf * config.rate);
}

export function formatPrice(amountInChf, currency = 'CHF') {
  const config = CURRENCY_RATES[currency] || CURRENCY_RATES.CHF;
  const converted = Math.round(amountInChf * config.rate);
  return `${config.prefix}${converted.toLocaleString()}${config.suffix}`;
}
