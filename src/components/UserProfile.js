import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
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
    setUser(userInfo.data)
  }

  async function getDecks() {
    const deckLists = await axios.get(`/api/users/${params.id}/decks`)
    setDecks(deckLists.data)
  }

  const renderDecks = decks => {
    if (decks) {
      for (let deck of decks) {
        decksArr.push(
          <div key={`div${deck._id}`}>
            <p>
              <Link to={`/decks/${deck._id}`}>{deck.name}</Link> - {deck.format}
            </p>
          </div>
        )
      }
    }
    setDecksDisplay(decksArr)
  }

  return (
    <Container>
      <div>
        <h1>{user.username}</h1>
        <h3>User Info</h3>
        <p>{user.description}</p>
        <h3>User Decks</h3>
        {decksDisplay}
      </div>
    </Container>
  )
}

export default UserProfile
