import React from 'react'

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function TextInput (props: TextInputProps) {
  const { className, type = 'text', ...rest } = props

  return (
        <input
            className="
            outline-none
            transition duration-150 ease-in-out
            border border-slate-300 text-md rounded-lg block w-full p-3 bg-slate-700 dark:border-slate-600 placeholder-slate-400
            text-slate-50 focus:ring-blue-500 focus:border-blue-500"
            type={type}
            {...rest}
        />
  )
}
