import React, { useContext, useEffect } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import DeckBuilderSearch from "./DeckBuilderSearch"
import DeckBuilderForm from "./DeckBuilderForm"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Alert } from "react-bootstrap"
import axios from "axios"

const DeckEdit = () => {
  let params = useParams()
  const { setIsLoading, setDeckInfo, validation, setValidation } = useContext(
    DecklistContext
  )

  useEffect(() => {
    showDeck()
  }, [])
  async function showDeck() {
    try {
      setIsLoading(true)
      const response = await axios.get(`/api/decks/${params.id}`)
      setDeckInfo(response.data)
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error(error.response)
      }
    }
    setIsLoading(false)
  }

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
