import React, { useContext } from "react"
import { DecklistContext } from "../../../../contexts/DecklistContext"
import { Form } from "react-bootstrap"

const TypeFilter = () => {
  const { type, setType } = useContext(DecklistContext)

  return (
    <Form.Control
      size="sm"
      as="select"
      value={type}
      onChange={e => setType(e.target.value)}
    >
      <option value="">Type</option>
      <option value="land">Land</option>
      <option value="creature">Creature</option>
      <option value="artifact">Artifact</option>
      <option value="enchantment">Enchantment</option>
      <option value="planeswalker">Planeswalker</option>
      <option value="instant">Instant</option>
      <option value="sorcery">Sorcery</option>
    </Form.Control>
  )
}

export default TypeFilter
