import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { DecklistContext } from "../../contexts/DecklistContext"

const DeckHeader = () => {
  const { deckInfo } = useContext(DecklistContext)

  return (
    <h3>
      {deckInfo.name} - A {deckInfo.format} deck by{" "}
      <Link to={`/users/${deckInfo.author}`}>{deckInfo.authorUsername}</Link>
    </h3>
  )
}

export default DeckHeader
