import React, { useContext } from "react"
import { DecklistContext } from "../../../../contexts/DecklistContext"
import { DebounceInput } from "react-debounce-input"
import { Form, Row } from "react-bootstrap"

const CMCFilter = () => {
  const { cmc, setCmc } = useContext(DecklistContext)

  return (
    <Form.Group as={Row} className="mb-0 pr-2">
      <Form.Label
        column={true}
        xs={4}
        lg={3}
        className="px-1 ml-2"
        style={{ fontSize: "0.7rem" }}
      >
        CMC
      </Form.Label>
      <Form.Control
        column="true"
        xs={8}
        lg={9}
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
