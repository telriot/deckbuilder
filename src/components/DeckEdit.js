import React, { useContext } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import DeckBuilderSearch from "./DeckBuilderSearch"
import DeckBuilderForm from "./DeckBuilderForm"
import { Container, Row, Col, Alert } from "react-bootstrap"

const DeckEdit = () => {
  const { validation, setValidation } = useContext(DecklistContext)

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

export default DeckEdit
