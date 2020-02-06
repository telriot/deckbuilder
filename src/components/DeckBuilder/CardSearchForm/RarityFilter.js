import React, { useContext } from "react"
import { SearchContext } from "../../../contexts/SearchContext"
import { Form } from "react-bootstrap"

const RarityFilter = () => {
  const { rarity, setRarity } = useContext(SearchContext)

  return (
    <Form.Control
      size="sm"
      className="m-1"
      as="select"
      value={rarity}
      onChange={e => setRarity(e.target.value)}
    >
      <option value="">Rarity</option>
      <option value="mythic">Mythic</option>
      <option value="rare">Rare</option>
      <option value="uncommon">Uncommon</option>
      <option value="common">Common</option>
    </Form.Control>
  )
}

export default RarityFilter
