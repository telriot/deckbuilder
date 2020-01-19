import React, { useEffect, useContext } from "react"
import { Container } from "react-bootstrap"
import axios from "axios"
import { SearchContext } from "../contexts/SearchContext"

const Index = () => {
  const { isLoading, setIsLoading, indexList, setIndexList } = useContext(
    SearchContext
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
          <li key={`li${deck._id}`}>
            <a key={`key${deck._id}`} href={`/decks/${deck._id}`}>
              {deck.name}
            </a>
          </li>
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
      <h1>This is the index</h1>
      {isLoading ? <h3>Loading...</h3> : <ul>{indexList}</ul>}
    </Container>
  )
}

export default Index
