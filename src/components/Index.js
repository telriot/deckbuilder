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
        const {
          _id,
          name,
          format,
          matches,
          comments,
          colors,
          matchups,
          author,
          authorUsername,
          sideGuides
        } = deck
        list.push(
          <DeckCard
            id={_id}
            name={name}
            format={format}
            key={`deckCard${_id}`}
            matches={matches}
            comments={comments}
            colors={colors}
            matchups={matchups}
            author={author}
            authorUsername={authorUsername}
            sideGuides={sideGuides}
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
