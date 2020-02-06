import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { SearchContext } from "../../contexts/SearchContext"

const DeckHeader = () => {
  const { deckInfo } = useContext(SearchContext)

  return (
    <h3>
      {deckInfo.name} - A {deckInfo.format} deck by{" "}
      <Link to={`/users/${deckInfo.author}`}>{deckInfo.authorUsername}</Link>
    </h3>
  )
}

export default DeckHeader
