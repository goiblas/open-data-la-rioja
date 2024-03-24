// 2000 => 2K
export const formatLargeNumber = (value: number): string => {
  return Intl.NumberFormat('es-ES', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)
}

export function formatCurrency (amount: number) {
  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  })

  return formatter.format(amount)
}
