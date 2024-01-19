import Link from 'next/link';
import clsx from 'clsx'

export default function Header() {
    return (
        <header className="px-4 py-3">
            <Link href="/" className='logo'>Open Data <span className='logo-text-gradient'>La Rioja</span></Link>
        </header>
    )
}