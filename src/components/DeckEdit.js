import React, { useContext, useEffect } from "react"
import { SearchContext } from "../contexts/SearchContext"
import DeckBuilderSearch from "./DeckBuilderSearch"
import DeckBuilderForm from "./DeckBuilderForm"
import { useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import axios from "axios"

const DeckEdit = () => {
  let params = useParams()
  const { setIsLoading, setDeckInfo } = useContext(SearchContext)

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
      <Row>
        <Col>
          <DeckBuilderSearch />
        </Col>
        <Col>
          <DeckBuilderForm />
        </Col>
      </Row>
    </Container>
  )
}

export default DeckEdit
