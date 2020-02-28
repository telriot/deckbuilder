import React, { useContext, useEffect } from "react"
import { MatchupContext } from "../../../contexts/MatchupContext"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"
import { useParams } from "react-router-dom"
import { Table } from "react-bootstrap"
import FilterDropdown from "./MatchupTable/FilterDropdown"
import CustomToggle from "./MatchupTable/FilterDropdown/CustomToggle"
import CustomMenuArchetype from "./MatchupTable/FilterDropdown/CustomMenuArchetype"
import CustomMenuDeck from "./MatchupTable/FilterDropdown/CustomMenuDeck"

const MatchupTable = () => {
  const {
    page,
    setPage,
    rowsArr,
    createTableBody,
    matchupFilter,
    deckFilter
  } = useContext(MatchupContext)
  const { isSM } = useContext(WindowSizeContext)
  let params = useParams()

  useEffect(() => {
    createTableBody(params, matchupFilter, deckFilter)
  }, [page, params, matchupFilter, deckFilter])

  useEffect(() => {
    setPage(1)
  }, [matchupFilter, deckFilter])

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th data-order="date">Date</th>
          <th data-order="archetype">
            <FilterDropdown
              toggle={CustomToggle}
              menu={CustomMenuArchetype}
              html="Archetype"
            />
          </th>
          <th data-order="matchup">
            {" "}
            <FilterDropdown
              toggle={CustomToggle}
              menu={CustomMenuDeck}
              html="Matchup"
            />
          </th>
          <th>Result</th>
          <th className={!isSM ? "d-none" : undefined}>Comments</th>
        </tr>
      </thead>
      <tbody>{rowsArr}</tbody>
    </Table>
  )
}

export default MatchupTable
