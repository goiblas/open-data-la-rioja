import Link from "next/link"

export default function Footer() {
    return (
        <footer className='text-slate-400 text-sm py-8 px-2 text-center'>
            Creada por <Link href="https://goiblas.com/">Jesús Olazagoitia</Link>. El código fuente está disponible en <Link href="https://github.com/goiblas/open-data-la-rioja">GitHub</Link>.
        </footer>
    )
}