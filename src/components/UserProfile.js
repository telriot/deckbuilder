import React, { useEffect, useState } from "react"
import { Container, Row, Card, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import DeckCard from "./DeckCard"

import axios from "axios"

const UserProfile = () => {
  const params = useParams()
  const [user, setUser] = useState({})
  const [decks, setDecks] = useState([])
  const [decksDisplay, setDecksDisplay] = useState([])

  let decksArr = []

  useEffect(() => {
    getUser()
    getDecks()
  }, [])

  useEffect(() => {
    renderDecks(decks)
  }, [decks])

  async function getUser() {
    const userInfo = await axios.get(`/api/users/${params.id}`)
    console.log(userInfo)
    setUser(userInfo.data)
  }

  async function getDecks() {
    const deckLists = await axios.get(`/api/users/${params.id}/decks`)
    setDecks(deckLists.data)
  }

  const renderDecks = decks => {
    if (decks) {
      for (let deck of decks) {
        decksArr.unshift(
          <DeckCard
            id={deck._id}
            name={deck.name}
            format={deck.format}
            key={deck._id}
            matches={deck.matches}
            comments={deck.comments}
            colors={deck.colors}
            matchups={deck.matchups}
          />
        )
      }
    }
    setDecksDisplay(decksArr)
  }

  return (
    <Container>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Header as="h5">{user.username}</Card.Header>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">'{user.description}'</li>
              <li class="list-group-item">Arena: {user.arenaUsername}</li>
              <li class="list-group-item">MTGO: {user.mtgoUsername}</li>
              <li class="list-group-item">DCI #: {user.dciNumber}</li>
              <li class="list-group-item">From {user.country}</li>
              <li class="list-group-item">Lives in {user.city}</li>
            </ul>
          </Card>
        </Col>
        <Col lg={9}>
          <Row>{decksDisplay}</Row>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile
