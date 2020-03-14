import React from "react"
import { Form } from "react-bootstrap"
import { capitalize } from "../../helpers"

const AndOrCheckBox = props => {
  const { label, data, setData } = props
  const handleChange = () =>
    setData(prevState => {
      return {
        ...prevState,
        colors: { ...prevState.colors, and: label === "and" }
      }
    })
  return (
    <Form.Check
      custom
      inline
      label={capitalize(label)}
      type="checkbox"
      id={`custom-inline-checkbox-${label}`}
      checked={label === "and" ? data["colors"]["and"] : !data["colors"]["and"]}
      onChange={handleChange}
    />
  )
}

export default AndOrCheckBox
