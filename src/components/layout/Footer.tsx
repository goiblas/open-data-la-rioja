import Link from 'next/link'

const contributors = [
  {
    name: "Jesús Olazagoitia",
    web: "https://goiblas.com/"
  },
  {
    name: "Gabriel Romero",
    web: "https://gabrielromero.dev"
  }
]

export default function Footer() {
  return (
    <footer className='text-slate-400 text-sm py-8 px-2 text-center'>
      Un proyecto de 
      {
        contributors.map(({ name, web }, index) => {
          return (<>
            < Link key={web} className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent transition-[text-decoration]" href={web}>{name}</Link>
            {index !== contributors.length - 1 ? " y " : ", "}
          </>)
        })
      }
      código disponible en < Link className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent transition-[text-decoration]" href="https://github.com/goiblas/open-data-la-rioja" > GitHub</Link >.
    </footer >
  )
}
