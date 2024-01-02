'use client';
import Link from 'next/link'
import useMediaQuery from '@/hooks/useMediaQuery'

type Item = {
    title: string
    url: string
}

const extras = 4;

function getRest({ cells, columns } : { cells: number, columns: number }): number {
  return columns - (cells % columns)
}

export default function GridMenu({ items }: { items: Item[] }) {
  const isTablet = useMediaQuery('md')
  const isDesktop = useMediaQuery('lg')

  const columns = isDesktop ? 4 : isTablet ? 3 : 2
  const rest = getRest({ cells: items.length + extras, columns })

  return (
        <div className='mb-16 grid gap-[1px] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-[1200px] bg-slate-700 mx-auto shadow-slate-950 shadow-[inset_0_0_250px]'>
            {items.map((item) => (
              <div key={item.title} className="bg-slate-950 p-4">
                <h2 className='text-sm uppercase text-slate-600 tracking-widest mb-4'>{item.title}</h2>
                <div>
                  <ul>
                    {item.items.map((child) => (
                      <li key={child.title} className='py-1'>
                        <Link href={child.url}>{child.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {Array.from(Array.from({ length: extras + rest })).map((_, index) => (
              <div key={index} className="bg-slate-950 min-h-72" />
            ))}
        </div>
  )
}
