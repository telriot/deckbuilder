import React from "react"
import DeckBuilderSearch from "./DeckBuilderSearch"
import DeckBuilderResults from "./DeckBuilderResults"
import DeckBuilderForm from "./DeckBuilderForm"
import { Container, Row, Col } from "react-bootstrap"

function DeckBuilder() {
  return (
    <Container>
      <DeckBuilderSearch />
      <Row>
        <Col>
          <DeckBuilderResults />
        </Col>
        <Col>
          <DeckBuilderForm />
        </Col>
      </Row>
    </Container>
  )
}

export default DeckBuilder
