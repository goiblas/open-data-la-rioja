'use client';
import Link from 'next/link';
import { menuItems } from '@/config';
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="py-10 px-2 md:px-6">
            <div className='mb-12'>
                <Link href="/" className='logo'>Open Data <span className='logo-text-gradient'>La Rioja</span></Link>
            </div>

            {menuItems.map((item) => (
                <div key={item.title}>
                    <h2 className='text-xs uppercase text-slate-400 tracking-widest mb-2'>{item.title}</h2>
                    <div className='mb-12'>
                        <ul>
                            {item.items.map((child) => (
                                <li key={child.title} className='py-1'>
                                    <Link href={child.url} className={ clsx('text-slate-300', child.url === pathname && "underline" )}>{child.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </nav>
    )
}