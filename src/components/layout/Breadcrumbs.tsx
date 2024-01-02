'use client';
import Link from 'next/link';
import { menuItems } from '@/config';
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { GoTriangleDown, GoChevronRight } from "react-icons/go";

export default function Breadcrumbs() {
    const pathname = usePathname()
    const router = useRouter()
    const current = menuItems.find((item) => item.items.find((child) => child.url === pathname))
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const url = event.target.value

        if (url) {
           router.push(url)
        }
    }

    if(!current) {
        return null;
    }

    const family = current.title
    const pageName = current.items.find((child) => child.url === pathname)?.title

    return (
        <div className="py-4 px-4 md:px-6 text-slate-50">
            <div className='flex gap-1 items-center text-sm'>
                <div>{family}</div>

                <div className='text-slate-500'>
                    <GoChevronRight size={16} />
                </div>

                <div className='relative'>
                    <div className='flex gap-1 items-center'>
                        {pageName}
                        <GoTriangleDown size={14} className="text-slate-500" />
                    </div>
                    
                    <select className="absolute inset-0 opacity-0" value={pathname} onChange={handleChange}>
                        {menuItems.map((item) => (
                            <optgroup key={item.title} label={item.title}>
                                {item.items.map((child) => (
                                    <option key={child.title} value={child.url}>{child.title}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}