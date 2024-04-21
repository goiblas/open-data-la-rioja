'use client'
import { useMediaQuery as useMediaQueryHook } from 'usehooks-ts'

type Breakpoints = Record<string, string>

const breakpoints: Breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)'
}

export default function useMediaQuery(query: string): boolean {
  const breakpoint = breakpoints[query] ?? query

  return useMediaQueryHook(breakpoint)
}
