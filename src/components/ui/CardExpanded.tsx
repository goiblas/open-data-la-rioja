import { Card } from '@tremor/react'
import { Fragment } from 'react'

interface CardExpandedProps {
  children: React.ReactNode
  originUrl?: string
  originUrls?: string[]
}

export default function CardExpanded (props: CardExpandedProps) {
  const { children, originUrl, originUrls } = props

  return (
        <div className='mt-10 mb-16 container-expanded'>
            <Card className='px-1 md:px-6'>
                {children}
            </Card>

            { originUrl && (
                <div className='py-4'>
                    <p className="text-center text-xs text-gray-400">Fuente: {''}
                        <a href={originUrl} className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent transition-[text-decoration]">
                            {originUrl}
                        </a>
                    </p>
                </div>
            )}

            { Array.isArray(originUrls) && (
                <div className='py-4'>
                    <p className="text-center text-xs text-gray-400">Fuentes: {''}
                        {originUrls.map((url, index) => (
                            <Fragment key={url}>
                                <a href={url} className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent transition-[text-decoration]">
                                    {url}
                                </a>
                                {index < originUrls.length - 2 && ', '}
                                {index === originUrls.length - 2 && ' y '}
                            </Fragment>
                        ))}
                    </p>
                </div>
            )}
        </div>
  )
}
