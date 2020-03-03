import React, { useEffect, useContext, useState } from "react"
import { Container, Card, Row, Col, Button } from "react-bootstrap"
import axios from "axios"
import { LinkContainer } from "react-router-bootstrap"
import { DecklistContext } from "../contexts/DecklistContext"
import DeckCard from "./DeckCard"

const Index = () => {
  const [indexList, setIndexList] = useState([])
  const { isLoading, setIsLoading } = useContext(DecklistContext)

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
          <DeckCard
            id={deck._id}
            name={deck.name}
            format={deck.format}
            key={`deckCard${deck._id}`}
            matches={deck.matches}
            comments={deck.comments}
            colors={deck.colors}
            matchups={deck.matchups}
            author={deck.author}
            authorUsername={deck.authorUsername}
          />
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
      {isLoading ? <h3>Loading...</h3> : <Row>{indexList}</Row>}
    </Container>
  )
}

export default Index
