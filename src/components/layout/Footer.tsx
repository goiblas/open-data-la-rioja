import Link from 'next/link'

export default function Footer () {
  return (
    <footer className='text-slate-400 text-sm py-8 px-2 text-center'>
      Colabora.
      Un proyecto de <Link className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent transition-[text-decoration]" href="https://goiblas.com/">Jesús Olazagoitia</Link>,
      código disponible en <Link className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent transition-[text-decoration]" href="https://github.com/goiblas/open-data-la-rioja" > GitHub</Link >.
    </footer >
  )
}
