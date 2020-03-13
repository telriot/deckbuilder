import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Form } from "react-bootstrap"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"
import { capitalize } from "../../../helpers"

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
        {[
          "standard",
          "pioneer",
          "modern",
          "legacy",
          "vintage",
          "pauper",
          "edh",
          "brawl",
          "arena"
        ].map(value => {
          return (
            <option key={`option${value}`} value={value}>
              {capitalize(value)}
            </option>
          )
        })}
      </Form.Control>
    </Form.Group>
  )
}

export default FormatSelector
