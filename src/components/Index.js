import React, { useEffect, useContext } from "react"
import { Container, Card, Row, Col } from "react-bootstrap"
import axios from "axios"
import { LinkContainer } from "react-router-bootstrap"
import { DecklistContext } from "../contexts/DecklistContext"

const Index = () => {
  const { isLoading, setIsLoading, indexList, setIndexList } = useContext(
    DecklistContext
  )

  useEffect(() => {
    deckSearch()
  }, [])
  async function deckSearch() {
    try {
      setIsLoading(true)
      const response = await axios.get("/api/")
      let list = []
      for (let deck of response.data) {
        list.push(
          <Col md={3} key={`key${deck._id}`}>
            <Card
              className="m-1"
              key={`card${deck._id}`}
              style={{ width: "15rem" }}
            >
              <Card.Body>
                <LinkContainer to={`/decks/${deck._id}`}>
                  <Card.Title>
                    <a href="#">{deck.name}</a>
                  </Card.Title>
                </LinkContainer>

                <Card.Text>
                  A {deck.format} deck by {deck.authorUsername}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          /*<li key={`li${deck._id}`}>
            <LinkContainer to={`/decks/${deck._id}`}>
              <a key={`key${deck._id}`}>{deck.name}</a>
            </LinkContainer>
          </li>*/
        )
      }
      setIndexList(list)
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
      <h1 className="text-center">Latest Decks</h1>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Container>
          <Row>{indexList}</Row>
        </Container>
      )}
    </Container>
  )
}

export default Index
