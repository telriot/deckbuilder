import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Form } from "react-bootstrap"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"

const DeckSortingSelector = () => {
  const { sortingCriteria, setSortingCriteria } = useContext(DecklistContext)
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
        Sort by
      </Form.Label>

      <Form.Control
        size="sm"
        as="select"
        id="sorting-select"
        value={sortingCriteria}
        onChange={e => setSortingCriteria(e.target.value)}
      >
        <option value={"name"}>Name</option>
        <option value={"normalized_type"}>Type</option>
        <option value={"cmc"}>CMC</option>
        <option value={"rarity"}>Rarity</option>
      </Form.Control>
    </Form.Group>
  )
}

export default DeckSortingSelector
