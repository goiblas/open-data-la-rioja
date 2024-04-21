'use client'
import Link from 'next/link'
import { menuItems } from '@/config'
import { useSelectedLayoutSegment } from 'next/navigation'
import MenuItem from '@/components/ui/MenuItem'

export default function Navbar() {
  const segment = useSelectedLayoutSegment()

  const menuItemsWithActive = menuItems.map(item => {
    const items = item.items.map(child => {
      const segments = child.url.split('/')
      const currentSegment = segments.at(-1)

      return {
        ...child,
        actived: currentSegment === segment
      }
    })

    return {
      ...item,
      items
    }
  })

  return (
    <nav className="py-10 px-2 md:px-6">
      <div className="mb-12">
        <Link href="/" className="logo">
          Open Data <span className="logo-text-gradient">La Rioja</span>
        </Link>
      </div>

      {menuItemsWithActive.map(item => (
        <div key={item.title}>
          <h2 className="text-xs uppercase text-slate-400 tracking-widest mb-2">
            {item.title}
          </h2>
          <div className="mb-12">
            <ul>
              {item.items.map(child => (
                <li key={child.title}>
                  <MenuItem actived={child.actived} href={child.url}>
                    {child.title}
                  </MenuItem>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </nav>
  )
}
