import React, { useContext } from "react"
import DeckBuilderSearch from "./DeckBuilderSearch"
import DeckBuilderForm from "./DeckBuilderForm"
import { DecklistContext } from "../contexts/DecklistContext"
import { StyleContext } from "../contexts/StyleContext"
import { Container, Row, Col, Alert } from "react-bootstrap"

function DeckBuilder() {
  const { validation, setValidation } = useContext(DecklistContext)
  const { isXL, isLG, isMD, isSM, isXS } = useContext(StyleContext)
  return (
    <Container className="my-3">
      {validation.error && (
        <Alert variant="danger" onClose={() => setValidation("")} dismissible>
          {validation.error}
        </Alert>
      )}
      <Row>
        <Col md>
          <DeckBuilderSearch />
        </Col>
        <Col md>
          <DeckBuilderForm />
        </Col>
      </Row>
    </Container>
  )
}

export default DeckBuilder
