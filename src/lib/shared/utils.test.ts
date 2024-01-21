import { expect, test, describe } from 'vitest'
import { getMonthFromTimeDto, getYearFromTimeDto } from './utils'

describe('getMonthFromTimeDto', () => {
  test('returns month from time dto', () => {
    const time = '[TIEMPO].[2023].[Octubre (2023)]'
    const month = getMonthFromTimeDto(time)
    expect(month).toBe('Octubre')
  })

  test('throws error if time dto is invalid', () => {
    const time = '[TIEMPO].[2023]'
    expect(() => getMonthFromTimeDto(time)).toThrowError(`Error getting month from ${time}`)
  })
})

describe('getYearFromTimeDto', () => {
  test('returns year from time dto', () => {
    const time = '[TIEMPO].[2023].[Octubre (2023)]'
    const year = getYearFromTimeDto(time)
    expect(year).toBe(2023)
  })

  test('throws error if time dto is invalid', () => {
    const time = '[TIEMPO][.]'
    expect(() => getYearFromTimeDto(time)).toThrowError(`Error getting year from ${time}`)
  })
})
