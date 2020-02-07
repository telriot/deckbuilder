import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Form, Col } from "react-bootstrap"

const DeckNameBar = () => {
  const { deckName, setDeckName } = useContext(DecklistContext)

  return (
    <Form.Group as={Form.Row} className="align-items-center mb-0">
      <Form.Label column md={4} lg={3}>
        Deck Name
      </Form.Label>
      <Col md={8} lg={9}>
        <Form.Control
          size="sm"
          id="deck-name"
          type="text"
          value={deckName}
          onChange={e => setDeckName(e.target.value)}
          required
        />
      </Col>
    </Form.Group>
  )
}

export default DeckNameBar
