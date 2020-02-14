import React from "react"
import SearchBar from "./CardSearchForm/SearchBar"
import { Form, Col } from "react-bootstrap"
import TableColumnsPopover from "../DeckBuilder/CardSearchForm/TableColumnsPopover"
import SearchFiltersPopover from "../DeckBuilder/CardSearchForm/SearchFiltersPopover"
import SearchFilters from "./CardSearchForm/SearchFilters"

const CardSearchForm = () => {
  return (
    <Form>
      <Form.Row>
        <Col xl={8} lg={7} md={6} sm={8}>
          <SearchBar />
        </Col>
        <Col xl={4} lg={5} md={6} sm={4}>
          <TableColumnsPopover />
          <SearchFiltersPopover />
        </Col>
      </Form.Row>
      <Form.Row className="mb-1">
        <SearchFilters />
      </Form.Row>
    </Form>
  )
}

export default CardSearchForm
