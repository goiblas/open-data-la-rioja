'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import clsx from 'clsx'

interface MenuItemProps {
  className?: string
  children?: React.ReactNode
  href?: string
  actived?: boolean
}

export default function MenuItem(props: MenuItemProps) {
  const { className, children, href, actived } = props

  return (
    <Link
      href={href}
      className={clsx(
        'relative px-3 py-2 -ml-3 inline-block text-slate-300',
        actived && 'text-slate-50'
      )}
    >
      {actived && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute inset-0 shadow-sm bg-slate-800 rounded-md border border-slate-700"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        />
      )}
      <div className={clsx('relative', className)}>{children}</div>
    </Link>
  )
}
