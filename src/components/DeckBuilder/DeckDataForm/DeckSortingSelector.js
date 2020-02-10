import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Form, Col, Row } from "react-bootstrap"

const DeckSortingSelector = () => {
  const { sortingCriteria, setSortingCriteria } = useContext(DecklistContext)

  return (
    <Form.Group as={Row} className="align-items-center mb-1">
      <Form.Label column md={5} lg={4} className="pr-2">
        Sort by
      </Form.Label>
      <Col md={7} lg={8}>
        <Form.Control
          size="sm"
          as="select"
          id="sorting-select"
          value={sortingCriteria}
          onChange={e => setSortingCriteria(e.target.value)}
        >
          <option value={"name"}>Name</option>
          <option value={"type_line"}>Type</option>
          <option value={"cmc"}>CMC</option>
          <option value={"rarity"}>Rarity</option>
        </Form.Control>
      </Col>
    </Form.Group>
  )
}

export default DeckSortingSelector
