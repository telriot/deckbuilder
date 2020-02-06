import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Form, Col } from "react-bootstrap"

const FormatSelector = () => {
  const { deckFormat, setDeckFormat } = useContext(DecklistContext)

  return (
    <Form.Group as={Form.Row}>
      <Form.Label column md={5} lg={4}>
        Format
      </Form.Label>
      <Col md={7} lg={8}>
        <Form.Control
          size="sm"
          as="select"
          id="format-select"
          value={deckFormat}
          onChange={e => setDeckFormat(e.target.value)}
          required
        >
          <option value="" disabled>
            Pick one
          </option>
          <option value="standard">Standard</option>
          <option value="pioneer">Pioneer</option>
          <option value="modern">Modern</option>
          <option value="legacy">Legacy</option>
          <option value="vintage">Vintage</option>
          <option value="pauper">Pauper</option>
          <option value="edh">EDH</option>
          <option value="brawl">Brawl</option>
          <option value="arena">Arena</option>
        </Form.Control>
      </Col>
    </Form.Group>
  )
}

export default FormatSelector
