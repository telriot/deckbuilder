import React, { useContext } from "react"
import { SearchContext } from "../../../contexts/SearchContext"
import { Form } from "react-bootstrap"

const TypeFilter = () => {
  const { type, setType } = useContext(SearchContext)

  return (
    <Form.Control
      size="sm"
      className="m-1"
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
