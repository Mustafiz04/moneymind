export function formatCurrency(amount: number, currencySymbol: string = '₹') {
  return `${currencySymbol}${amount.toFixed(2)}`
} 