import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { DebounceInput } from "react-debounce-input"
import { Form } from "react-bootstrap"

const CMCFilter = () => {
  const { cmc, setCmc } = useContext(DecklistContext)

  return (
    <Form.Group>
      <Form.Label>CMC</Form.Label>
      <Form.Control
        size="sm"
        as={DebounceInput}
        className="form-control m-1"
        style={{ width: "50px" }}
        name="cmc"
        debounceTimeout={200}
        type="number"
        min="0"
        value={cmc}
        onChange={e => setCmc(e.target.value)}
      />
    </Form.Group>
  )
}

export default CMCFilter
