import React, { Fragment, useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { DebounceInput } from "react-debounce-input"
import { Form } from "react-bootstrap"

const SearchBar = () => {
  const { userInput, setUserInput } = useContext(DecklistContext)

  return (
    <Fragment>
      <Form.Control
        as={DebounceInput}
        size="sm"
        className="mx-0 my-1"
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
