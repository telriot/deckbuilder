import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { DebounceInput } from "react-debounce-input"
import { Form, Row } from "react-bootstrap"

const CMCFilter = () => {
  const { cmc, setCmc } = useContext(DecklistContext)

  return (
    <Form.Group as={Row} className="align-items-center mb-0">
      <Form.Label column md={6} lg={4}>
        CMC
      </Form.Label>
      <Form.Control
        column
        md={6}
        lg={8}
        size="sm"
        as={DebounceInput}
        className="form-control"
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
