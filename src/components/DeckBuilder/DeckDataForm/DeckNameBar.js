import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Form } from "react-bootstrap"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"

const DeckNameBar = () => {
  const { deckName, setDeckName } = useContext(DecklistContext)
  const { isXS } = useContext(WindowSizeContext)

  return (
    <Form.Group className="d-flex align-items-center my-0 mt-0 p-0 mb-2">
      <Form.Label
        className="py-0 my-0 mr-2"
        style={
          isXS
            ? { fontSize: "0.9rem", whiteSpace: "nowrap" }
            : { fontSize: "1rem", whiteSpace: "nowrap" }
        }
      >
        Deck Name
      </Form.Label>

      <Form.Control
        size="sm"
        id="deck-name"
        type="text"
        value={deckName}
        onChange={e => setDeckName(e.target.value)}
        required
      />
    </Form.Group>
  )
}

export default DeckNameBar
