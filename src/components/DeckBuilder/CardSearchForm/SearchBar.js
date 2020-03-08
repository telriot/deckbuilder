import React, { Fragment, useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { DebounceInput } from "react-debounce-input"
import { Form } from "react-bootstrap"

const SearchBar = () => {
  const { userInput, setUserInput } = useContext(DecklistContext)

  return (
    <Fragment>
      <Form.Control
        className="mb-2"
        as={DebounceInput}
        size="sm"
        type="text"
        debounceTimeout={400}
        placeholder="Type to search..."
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
      />
    </Fragment>
  )
}

export default SearchBar
