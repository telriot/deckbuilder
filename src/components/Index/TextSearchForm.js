import React, { useContext } from "react"
import { Form } from "react-bootstrap"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"

const TextSearchForm = props => {
  const { name, text, placeholder, data, setData } = props
  const { isXS } = useContext(WindowSizeContext)

  const handleChange = (value, name) => {
    setData(prevState => {
      return { ...prevState, [name]: value }
    })
  }
  return (
    <Form.Group controlId={`form${name}`} className={isXS ? "mb-2" : ""}>
      <Form.Label>{text}</Form.Label>
      <Form.Control
        size="sm"
        type="text"
        placeholder={placeholder}
        name={name}
        value={data[name]}
        onChange={e => handleChange(e.target.value, name)}
      />
    </Form.Group>
  )
}

export default TextSearchForm
