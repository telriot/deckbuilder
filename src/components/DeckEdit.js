import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { SearchContext } from "../contexts/SearchContext"
import axios from "axios"
import DeckBuilderSearch from "./DeckBuilderSearch"
import DeckBuilderResults from "./DeckBuilderResults"
import DeckBuilderForm from "./DeckBuilderForm"
import { Container, Row, Col } from "react-bootstrap"

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
    <div>
      <h1>DeckEdit view</h1>
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
    </div>
  )
}

export default DeckEdit
