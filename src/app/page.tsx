import Image from 'next/image'
import Link from 'next/link'
import { menuItems } from '@/config'

export default function Home() {
  return (
    <main className="p-24 text-slate-50">
      <div className='pb-10'>
        <h1>Open data La Rioja</h1>
        <p>Visualización de los datos abiertos del Gobierno de La Rioja</p>
      </div>
      <div className='d-grid gap-1'>
          {menuItems.map((item) => (
            <div key={item.title}>
              <h2 className='font-display font-bold mb-2 mt-4'>{item.title}</h2>
              <div>
                <ul>
                  {item.items.map((child) => (
                    <li key={child.title}>
                      <Link href={child.url}>{child.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}
