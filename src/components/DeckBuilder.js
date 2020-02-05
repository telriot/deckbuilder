import React from "react"
import DeckBuilderSearch from "./DeckBuilderSearch"
import DeckBuilderResults from "./DeckBuilderResults"
import DeckBuilderForm from "./DeckBuilderForm"
import { Container, Row, Col } from "react-bootstrap"

function DeckBuilder() {
  return (
    <Container className="my-3">
      <Row>
        <Col sm>
          <DeckBuilderSearch />
          <DeckBuilderResults />
        </Col>
        <Col sm>
          <DeckBuilderForm />
        </Col>
      </Row>
    </Container>
  )
}

export default DeckBuilder
