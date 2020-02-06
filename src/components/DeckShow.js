import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { SearchContext } from "../contexts/SearchContext"
import { AuthContext } from "../contexts/AuthContext"
import { Container, Row, Col, Card } from "react-bootstrap"
import DeckContainer from "./DeckShow/DeckContainer"
import CommentSection from "./DeckShow/CommentSection"
import DeckHeader from "./DeckShow/DeckHeader"
import DeckEditButtonGroup from "./DeckShow/DeckEditButtonGroup"
import axios from "axios"

const DeckShow = () => {
  const { setIsLoading, deckInfo, setDeckInfo } = useContext(SearchContext)
  const { auth } = useContext(AuthContext)
  let params = useParams()

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
    <Container>
      <Card className="m-2">
        <Card.Header>
          <Row>
            <Col md={9}>
              <DeckHeader />
            </Col>
            <Col md={3}>
              {deckInfo.author === auth.authUserId && <DeckEditButtonGroup />}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <DeckContainer />
        </Card.Body>
      </Card>

      <CommentSection />
    </Container>
  )
}

export default DeckShow
