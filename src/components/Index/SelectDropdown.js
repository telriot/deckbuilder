import React from "react"
import { Form } from "react-bootstrap"

const SelectDropdown = props => {
  const { label, data, setData, arr, placeholder } = props

  const handleDropdownChange = (data, target) => {
    setData(prevState => {
      return { ...prevState, [target]: data }
    })
  }

  return (
    <Form.Control
      size="sm"
      as="select"
      id={`${label}select`}
      value={data[label]}
      onChange={e => handleDropdownChange(e.target.value, [label])}
    >
      <option
        className={placeholder ? "" : "text-muted"}
        value={placeholder && placeholder[0]}
      >
        {placeholder && placeholder[1]}
      </option>
      {arr.map(value => {
        return (
          <option key={`option${value[0]}`} value={value[0]}>
            {value[1]}
          </option>
        )
      })}
    </Form.Control>
  )
}

export default SelectDropdown
