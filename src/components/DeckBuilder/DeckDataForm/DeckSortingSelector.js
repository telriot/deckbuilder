import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Form, Col, Row } from "react-bootstrap"

const DeckSortingSelector = () => {
  const { sortingCriteria, setSortingCriteria } = useContext(DecklistContext)

  return (
    <Form.Group as={Row}>
      <Form.Label column md={6} lg={4}>
        Sort by
      </Form.Label>
      <Col md={6} lg={8}>
        <Form.Control
          size="sm"
          as="select"
          id="sorting-select"
          value={sortingCriteria}
          onChange={e => setSortingCriteria(e.target.value)}
        >
          <option value={"data-name"}>Name</option>
          <option value={"data-type"}>Type</option>
          <option value={"data-cmc"}>CMC</option>
          <option value={"data-rarity"}>Rarity</option>
        </Form.Control>
      </Col>
    </Form.Group>
  )
}

export default DeckSortingSelector
