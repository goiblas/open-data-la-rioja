import type { MDXComponents } from 'mdx/types'

export function useMDXComponents (components: MDXComponents): MDXComponents {
  return {
    ...components,
    p: (props) => <p className="text-slate-400 mb-4" {...props} />,
    h1: (props) => <h1 className="text-3xl text-slate-100 font-bold font-display mb-3 mt-3 md:mt-8" {...props} />,
    h2: (props) => <h2 className="text-xl text-slate-100 font-bold font-display mb-3 mt-3 md:mt-8" {...props} />,
    h3: (props) => <h3 className="text-lg text-slate-100 font-bold font-display mb-3 mt-3 md:mt-8" {...props} />,
    h4: (props) => <h4 className="text-lg text-slate-100 font-bold font-display mb-3 mt-3 md:mt-8" {...props} />,
    a: (props) => <a className="text-blue-500 hover:underline" {...props} />
  }
}
