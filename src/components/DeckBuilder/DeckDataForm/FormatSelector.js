import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Form, Col } from "react-bootstrap"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"

const FormatSelector = () => {
  const { deckFormat, setDeckFormat } = useContext(DecklistContext)
  const { isXS } = useContext(WindowSizeContext)

  return (
    <Form.Group className="d-flex align-items-center p-0 mx-0 mt-0 mb-2">
      <Form.Label
        style={
          isXS
            ? { fontSize: "0.9rem", whiteSpace: "nowrap" }
            : { fontSize: "1rem", whiteSpace: "nowrap" }
        }
        className="py-0 my-0 mr-2"
      >
        Format
      </Form.Label>

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
    </Form.Group>
  )
}

export default FormatSelector
