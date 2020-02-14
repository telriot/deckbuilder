import React, { useContext, Fragment } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Col } from "react-bootstrap"
import CMCFilter from "./SearchFilters/CMCFilter"
import RarityFilter from "./SearchFilters/RarityFilter"
import ColorFilter from "./SearchFilters/ColorFilter"
import TypeFilter from "./SearchFilters/TypeFilter"

const SearchFilters = () => {
  const { searchFilters } = useContext(DecklistContext)

  return (
    <Fragment>
      {searchFilters.rarity && (
        <Col xs={3}>
          {" "}
          <RarityFilter />{" "}
        </Col>
      )}
      {searchFilters.type && (
        <Col xs={3}>
          {" "}
          <TypeFilter />{" "}
        </Col>
      )}
      {searchFilters.color && (
        <Col xs={3}>
          {" "}
          <ColorFilter />{" "}
        </Col>
      )}
      {searchFilters.cmc && (
        <Col xs={3}>
          {" "}
          <CMCFilter />{" "}
        </Col>
      )}
    </Fragment>
  )
}

export default SearchFilters
