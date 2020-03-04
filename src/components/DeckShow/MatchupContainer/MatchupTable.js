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
  const { isXS, isSM } = useContext(WindowSizeContext)
  let params = useParams()

  useEffect(() => {
    createTableBody(params, matchupFilter, deckFilter)
  }, [page, params, matchupFilter, deckFilter, isXS])

  useEffect(() => {
    setPage(1)
  }, [matchupFilter, deckFilter])

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th className="border-0" data-order="date">
            Date
          </th>
          <th className="border-0" data-order="archetype">
            <FilterDropdown
              toggle={CustomToggle}
              menu={CustomMenuArchetype}
              html="Archetype"
            />
          </th>
          <th className="border-0" data-order="matchup">
            {" "}
            <FilterDropdown
              toggle={CustomToggle}
              menu={CustomMenuDeck}
              html="Matchup"
            />
          </th>
          <th className="border-0">Result</th>
          <th className={!isSM ? "border-0 d-none" : "border-0"}>Comments</th>
        </tr>
      </thead>
      <tbody>{rowsArr}</tbody>
    </Table>
  )
}

export default MatchupTable
