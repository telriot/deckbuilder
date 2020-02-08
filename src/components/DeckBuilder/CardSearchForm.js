import React from "react"
import CMCFilter from "./CardSearchForm/CMCFilter"
import RarityFilter from "./CardSearchForm/RarityFilter"
import SearchBar from "./CardSearchForm/SearchBar"
import TypeFilter from "./CardSearchForm/TypeFilter"
import { Form, Col } from "react-bootstrap"

const CardSearchForm = () => {
  return (
    <Form>
      <Form.Row>
        <Col>
          <SearchBar />
        </Col>
      </Form.Row>
      <Form.Row className="align-items-center mb-1">
        <Col sm={4}>
          <RarityFilter />
        </Col>
        <Col sm={4}>
          <TypeFilter />
        </Col>
        <Col sm={4}>
          <CMCFilter />
        </Col>
      </Form.Row>
    </Form>
  )
}

export default CardSearchForm
