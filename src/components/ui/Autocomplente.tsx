'use client'
import { useState, useEffect, useRef, useId } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Listbox, { ListItem } from './ListBox'
import TextInput from './TextInput'

const KEY_CODE = {
  up: 38,
  scape: 27,
  down: 40,
  enter: 13,
  tab: 9
}

const MIN_LETTERS = 2

interface AutocompleteProps<T> {
  options: T[]
  renderOption: (option: T) => React.ReactNode
  onChange: (value: string) => void
  onSelect: (option: T) => void
  notMatchText?: string
  loading?: boolean
  defaultValue?: string
  placeholder?: string
}

export default function Autocomplete<T> (props: AutocompleteProps<T>) {
  const {
    options,
    renderOption,
    onChange,
    onSelect,
    notMatchText,
    loading = false,
    defaultValue = '',
    placeholder = null
  } = props
  const [inputValue, setInputValue] = useState(defaultValue)
  const [itemSelected, setItemSelected] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)

  const id = useId()
  const refContainer = useRef(null)

  useOnClickOutside(refContainer, () => {
    hideOptions()
  })

  useEffect(() => {
    setInputValue(defaultValue)
  }, [defaultValue])

  const hideOptions = () => {
    setIsOpen(false)
    setItemSelected(-1)
  }

  const selectOption = (option: T) => {
    onSelect(option)
    hideOptions()
  }

  const handleInputFocus = () => {
    if (inputValue.length >= MIN_LETTERS) {
      setIsOpen(true)
    }
  }
  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value

    if (onChange) onChange(value)
    setInputValue(value)
    if (value.length >= MIN_LETTERS) {
      setIsOpen(true)
    } else {
      hideOptions()
    }
  }

  const handleInputKey = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = ev

    switch (keyCode) {
      case KEY_CODE.tab:
        hideOptions()
        break
      case KEY_CODE.enter:
        ev.preventDefault()
        if (isOpen) {
          const selected = options[itemSelected]
          if (selected) {
            selectOption(selected)
          }
        }
        break
      case KEY_CODE.scape:
        ev.preventDefault()
        setIsOpen(false)
        break
      case KEY_CODE.down:
        ev.preventDefault()
        setIsOpen(true)
        setItemSelected(
          itemSelected === options.length - 1 ? 0 : itemSelected + 1
        )
        break
      case KEY_CODE.up:
        ev.preventDefault()
        setItemSelected(
          itemSelected - 1 >= 0 ? itemSelected - 1 : options.length - 1
        )
        break
      default:
        break
    }
  }

  const showOptions = isOpen && !loading

  const inputProps = {
    className: 'w-full p-4 border-gray-400',
    id: `input-${id}`,
    role: 'combobox',
    'aria-haspopup': 'listbox',
    'aria-expanded': isOpen,
    'aria-autocomplete': 'list',
    'aria-controls': `listbox-${id}`,
    'aria-activedescendant': isOpen ? `listbox-${id}-${itemSelected}` : null,
    autoComplete: 'off',
    value: inputValue,
    onChange: handleInputChange,
    onKeyDown: handleInputKey,
    onFocus: handleInputFocus,
    placeholder
  } as unknown as React.InputHTMLAttributes<HTMLInputElement>

  return (
    <div className="autocomplete" ref={refContainer}>
      <TextInput {...inputProps} />

      {loading && (
        <div className="listbox">
          <div className='py-4 text-center text-slate-400'>...</div>
        </div>
      )}

      {showOptions && (
        <Listbox id={`listbox-${id}`} aria-labelledby={`input-${id}`}>

          {options.length === 0 && (<li className="autocomplete-notmatch">{notMatchText}</li>)}

          {options.length > 0 &&
            options.map((option, index) => (
              <ListItem
                key={`list-item-${index}`}
                id={`listbox-${id}-${index}`}
                selected={index === itemSelected}
                onClick={() => {
                  selectOption(option)

                  setTimeout(() => {
                    hideOptions()
                  })
                }}
              >
                {renderOption ? renderOption(option) : option as unknown as string}
              </ListItem>
            ))}
        </Listbox>
      )}
    </div>
  )
};
