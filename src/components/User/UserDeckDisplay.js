import React, { useState, useEffect } from "react"
import DeckCard from "../DeckCard"
import axios from "axios"
import DeckDisplay from "./DeckDisplay"

const UserDeckDisplay = props => {
  const [decksDisplay, setDecksDisplay] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [deckSearchParams, setDeckSearchParams] = useState({
    sortOrder: "date"
  })

  useEffect(() => {
    getDecks()
  }, [page, deckSearchParams])

  const getDecks = async () => {
    try {
      const response = await axios.get(`/api/users/${props.params.id}/decks`, {
        params: {
          page,
          author: props.params.id,
          sortOrder: deckSearchParams.sortOrder
        }
      })
      let list = []
      console.log(response)
      for (let deck of response.data.docs) {
        const {
          _id,
          name,
          format,
          matches,
          comments,
          colors,
          matchups,
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
            sideGuides={sideGuides}
          />
        )
      }
      setPages(response.data.totalPages)
      setDecksDisplay(list)
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error(error.response)
      }
    }
  }

  return (
    <DeckDisplay
      page={page}
      setPage={setPage}
      pages={pages}
      deckSearchParams={deckSearchParams}
      setDeckSearchParams={setDeckSearchParams}
      decksDisplay={decksDisplay}
    />
  )
}

export default UserDeckDisplay
