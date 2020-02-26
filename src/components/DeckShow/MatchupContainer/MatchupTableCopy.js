import React, { useContext, useEffect } from "react"
import { MatchupContext } from "../../../contexts/MatchupContext"
import { useParams } from "react-router-dom"
import { Table } from "react-bootstrap"

const MatchupTable = () => {
  const { page, rowsArr, createTableBody } = useContext(MatchupContext)
  let params = useParams()

  useEffect(() => {
    createTableBody(params)
  }, [page])

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th data-order="date">Date</th>
          <th data-order="archetype">Archetype</th>
          <th data-order="matchup">Matchup</th>
          <th>Result</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>{rowsArr}</tbody>
    </Table>
  )
}

export default MatchupTable
