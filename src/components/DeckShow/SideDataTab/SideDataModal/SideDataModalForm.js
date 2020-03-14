import React, { useContext } from "react"
import { Form } from "react-bootstrap"
import { WindowSizeContext } from "../../../../contexts/WindowSizeContext"
const SideDataModalForm = props => {
  const { label, placeholder, type, name, as, rows, data, func } = props
  const { isLG } = useContext(WindowSizeContext)
  const handleChange = (e, func) => {
    e.persist()
    const { name, value } = e.target
    func(prevState => {
      return { ...prevState, [name]: value }
    })
  }

  return (
    <Form.Group>
      <Form.Label style={isLG ? { fontSize: "1rem" } : { fontSize: "0.9rem" }}>
        {label}
      </Form.Label>
      <Form.Control
        style={isLG ? { fontSize: "1rem" } : { fontSize: "0.8rem" }}
        as={as ? as : "input"}
        placeholder={placeholder}
        type={type}
        name={name}
        value={data[name]}
        rows={rows ? rows : ""}
        onChange={e => handleChange(e, func)}
      ></Form.Control>
    </Form.Group>
  )
}

export default SideDataModalForm
