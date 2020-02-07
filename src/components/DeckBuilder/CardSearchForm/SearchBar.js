import React, { Fragment, useContext } from "react"
import { SearchContext } from "../../../contexts/SearchContext"
import { DebounceInput } from "react-debounce-input"
import { Form } from "react-bootstrap"

const SearchBar = () => {
  const { userInput, setUserInput } = useContext(SearchContext)

  return (
    <Fragment>
      <Form.Control
        as={DebounceInput}
        size="sm"
        className="m-1"
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
