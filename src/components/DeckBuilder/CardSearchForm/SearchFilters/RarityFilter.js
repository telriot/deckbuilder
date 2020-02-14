import React, { useContext } from "react"
import { DecklistContext } from "../../../../contexts/DecklistContext"
import { Form } from "react-bootstrap"

const RarityFilter = () => {
  const { rarity, setRarity } = useContext(DecklistContext)

  return (
    <Form.Control
      size="sm"
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
