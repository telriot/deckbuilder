import React, { useContext } from "react"
import { DecklistContext } from "../../../../contexts/DecklistContext"
import { Form } from "react-bootstrap"

const ColorFilter = () => {
  const { color, setColor } = useContext(DecklistContext)

  return (
    <Form.Control
      size="sm"
      as="select"
      value={color}
      onChange={e => setColor(e.target.value)}
    >
      <option value="">Color</option>
      <option value="w">White</option>
      <option value="u">Blue</option>
      <option value="b">Black</option>
      <option value="r">Red</option>
      <option value="g">Green</option>
      <option value="c">Colorless</option>
      <option value="m">Multicolor</option>
    </Form.Control>
  )
}

export default ColorFilter
