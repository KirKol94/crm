import { memo, useCallback, useState } from 'react'

import { SelectOption } from '../model/types/dropdown'

import { DropdownMenuItem } from './DropdownMenuItem'

import classes from './Dropdown.module.scss'

interface DropdownMenuContentProps {
  options: SelectOption[]
  isOpen: boolean
  value: SelectOption | undefined
  onChangeValue: (option: SelectOption) => void
  close: () => void
}

const DropdownMenuContent = memo((props: DropdownMenuContentProps) => {
  const { options, isOpen, value, onChangeValue, close } = props
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const changeHighlightedIndex = useCallback((index: number) => {
    setHighlightedIndex(index)
  }, [])

  return (
    <ul className={`${classes.options} ${isOpen && classes.show}`}>
      {options.map((option, index) => {
        return (
          <DropdownMenuItem
            changeHighlightedIndex={changeHighlightedIndex}
            highlightedIndex={highlightedIndex}
            key={index}
            value={value}
            onChange={onChangeValue}
            isOpen={isOpen}
            option={option}
            index={index}
            close={close}
          />
        )
      })}
    </ul>
  )
})

export default DropdownMenuContent
