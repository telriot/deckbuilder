import React, { createContext, useState } from "react"
import axios from "axios"
import MatchupRows from "../components/DeckShow/MatchupContainer/MatchupTable/MatchupRows"

export const MatchupContext = createContext()

const MatchupContextProvider = props => {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [rowsArr, setRowsArr] = useState([])
  const [MWP, setMWP] = useState({ preboard: 0, postboard: 0, total: 0 })
  const [matchupFilter, setMatchupFilter] = useState("")
  const [deckFilter, setDeckFilter] = useState("")

  const matchupResultStyle = result => {
    const { g1, g2, g3 } = result
    if (
      (g1 === "W" && g2 === "W") ||
      g3 === "W" ||
      (g1 === "W" && g2 === "D") ||
      (g1 === "D" && g2 === "W")
    ) {
      return { backgroundColor: "rgba(56, 252, 131, 0.6)" }
    }

    if (
      (g1 === "L" && g2 === "L") ||
      g3 === "L" ||
      (g1 === "L" && g2 === "D") ||
      (g1 === "D" && g2 === "L")
    ) {
      return { backgroundColor: "rgba(252, 66, 56, 0.6)" }
    }

    if (g3 === "D") {
      return { backgroundColor: "rgba(252, 252, 56, 0.6)" }
    }
  }

  let deletionResultObj = (result, archetype, params) => {
    const { g1, g2, g3 } = result
    return {
      matchup: {
        archetype: archetype,
        preboard: {
          w: g1 === "W" ? -1 : 0,
          l: g1 === "L" ? -1 : 0,
          u: g1 === "D" ? -1 : 0
        },
        postboard: {
          w: (g2 === "W" ? -1 : 0) + (g3 === "W" ? -1 : 0),
          l: (g2 === "L" ? -1 : 0) + (g3 === "L" ? -1 : 0),
          u: (g2 === "D" ? -1 : 0) + (g3 === "D" ? -1 : 0)
        },

        total: {
          w:
            (g1 === "W" && g2 === "W") ||
            g3 === "W" ||
            (g1 === "W" && g2 === "D") ||
            (g1 === "D" && g2 === "W")
              ? -1
              : 0,
          l:
            (g1 === "L" && g2 === "L") ||
            g3 === "L" ||
            (g1 === "L" && g2 === "D") ||
            (g1 === "D" && g2 === "L")
              ? -1
              : 0,
          u: g3 === "D" ? -1 : 0
        }
      },
      deckId: params.id
    }
  }

  const createTableBody = async (params, archetypeFilter, deckFilter) => {
    let index = 0
    let response = []
    let rows = []
    try {
      response = await axios.get(`/api/decks/${params.id}/matchups`, {
        params: {
          page: page,
          deckId: params.id,
          archetype: archetypeFilter,
          matchupDeck: deckFilter
        }
      })
    } catch (error) {
      console.log(error)
    }
    setPages(response.data.totalPages)
    const matches = response.data.docs

    for (let match of matches) {
      index++
      rows.push(
        <MatchupRows key={`matchuprow${index}`} index={index} match={match} />
      )
    }
    setRowsArr(rows)
  }

  return (
    <MatchupContext.Provider
      value={{
        page,
        pages,
        setPage,
        setPages,
        matchupResultStyle,
        deletionResultObj,
        createTableBody,
        rowsArr,
        setRowsArr,
        MWP,
        setMWP,
        matchupFilter,
        setMatchupFilter,
        deckFilter,
        setDeckFilter
      }}
    >
      {props.children}
    </MatchupContext.Provider>
  )
}

export default MatchupContextProvider
