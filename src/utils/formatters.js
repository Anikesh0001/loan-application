const inrFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

export function formatINR(value) {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return '';
  return inrFormatter.format(numericValue);
}

export function parseINR(value) {
  if (typeof value !== 'string') return value;
  const digitsOnly = value.replace(/[^0-9.-]/g, '');
  if (digitsOnly === '') return null;
  const parsed = Number(digitsOnly);
  return Number.isNaN(parsed) ? null : parsed;
}

export function maskValue(value, visibleChars = 4) {
  if (typeof value !== 'string' || value.length === 0) return '';
  if (value.length <= visibleChars) return value;
  const visible = value.slice(-visibleChars);
  const masked = 'X'.repeat(value.length - visibleChars);
  return `${masked}${visible}`;
}

export function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
