import React, { useContext, Fragment } from "react"
import CMCFilter from "./CardSearchForm/CMCFilter"
import RarityFilter from "./CardSearchForm/RarityFilter"
import SearchBar from "./CardSearchForm/SearchBar"
import TypeFilter from "./CardSearchForm/TypeFilter"
import { Form, Col } from "react-bootstrap"
import ColorFilter from "./CardSearchForm/ColorFilter"
import { DecklistContext } from "../../contexts/DecklistContext"

const CardSearchForm = () => {
  const { searchFilters } = useContext(DecklistContext)

  const Filters = () => {
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

  return (
    <Form>
      <Form.Row>
        <Col>
          <SearchBar />
        </Col>
      </Form.Row>
      <Form.Row className="mb-1">
        <Filters />
      </Form.Row>
    </Form>
  )
}

export default CardSearchForm
