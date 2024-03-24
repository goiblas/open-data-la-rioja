interface ListBoxProps {
  children: React.ReactNode
  id: string
}

const Listbox = ({ children, ...props }: ListBoxProps) => (
    <div role="listbox" className="listbox" {...props}>
      <ul className="listbox-list">{children}</ul>
    </div>
)

interface ListItemProps {
  children: React.ReactNode
  onClick: () => void
  selected: boolean
  id: string
}

export const ListItem = ({ children, onClick, selected, id }: ListItemProps) => (
    <li className="listbox-item" role="option" aria-selected={selected} onClick={onClick} id={id}>
        {children}
    </li>
)

export default Listbox
