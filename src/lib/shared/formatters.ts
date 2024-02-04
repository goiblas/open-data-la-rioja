// 2000 => 2K
export const formatLargeNumber = (value: number): string => {
  return Intl.NumberFormat('es-ES', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)
}
