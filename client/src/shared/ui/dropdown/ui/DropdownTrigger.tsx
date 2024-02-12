import DropdownSeparator from './DropdownSeparator'

import classes from './Dropdown.module.scss'

interface DropdownTriggerProps {
  label?: string
  value?: string
}

const DropdownTrigger = (props: DropdownTriggerProps) => {
  const { value, label } = props
  return (
    <span className={classes.value}>
      {value ? value : label}
      {!value && !label && <DropdownSeparator />}
    </span>
  )
}

export default DropdownTrigger
