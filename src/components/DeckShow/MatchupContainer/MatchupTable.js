import React, { useContext, useState } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Table } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import Moment from "react-moment"

const MatchupTable = () => {
  const { deckInfo } = useContext(DecklistContext)
  const [tableSortOrder, setTableSortOrder] = useState({
    criteria: "date",
    direction: true
  })

  const deleteIcon = (
    <FontAwesomeIcon
      style={{ fontSize: "1rem" }}
      className="align-self-center mr-1"
      icon={faTrashAlt}
    />
  )

  const resultStyle = result => {
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

  const handleOrderClick = e => {
    e.persist()
    console.log(e)
    setTableSortOrder(prevState => {
      return prevState.criteria === e.target.dataset.order
        ? { ...prevState, direction: !prevState.direction }
        : { criteria: e.target.dataset.order, direction: true }
    })
  }

  const tableBody = sortOrder => {
    let tableArr = []
    let index = 0
    for (let match of deckInfo.matches) {
      index++
      const { archetype, matchupDeck, comment, result, date } = match
      const { g1, g2, g3 } = result

      tableArr.push(
        <tr
          key={match._id}
          archetype={archetype}
          matchup={matchupDeck}
          date={date}
          index={index}
        >
          <td>
            <Moment format="YYYY-MM-DD">{date}</Moment>
          </td>
          <td key={archetype}>{archetype}</td>
          <td key={matchupDeck}>{matchupDeck}</td>
          <td style={resultStyle(result)} key={result}>
            {g1 && g1}
            {g2 && g2}
            {g3 && g3}
          </td>
          <td
            className="d-flex justify-content-between"
            key={`comment${match._id}`}
          >
            {comment}

            {index === 1 && deleteIcon}
          </td>
        </tr>
      )
    }
    return tableArr.sort((a, b) => {
      if (a.props[sortOrder.criteria] < b.props[sortOrder.criteria]) {
        if (sortOrder.direction) {
          if (sortOrder.criteria !== "date") {
            return -1
          } else {
            return +1
          }
        } else {
          if (sortOrder.criteria === "date") {
            return -1
          } else {
            return +1
          }
        }
      } else if (a.props[sortOrder.criteria] > b.props[sortOrder.criteria]) {
        if (sortOrder.direction) {
          if (sortOrder.criteria === "date") {
            return +1
          } else {
            return -1
          }
        } else {
          if (sortOrder.criteria !== "date") {
            return +1
          } else {
            return -1
          }
        }
      } else {
        return 0
      }
    })
  }

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th data-order="date" onClick={e => handleOrderClick(e)}>
            Date
          </th>
          <th data-order="archetype" onClick={e => handleOrderClick(e)}>
            Archetype
          </th>
          <th data-order="matchup" onClick={e => handleOrderClick(e)}>
            Matchup
          </th>
          <th>Result</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>{tableBody(tableSortOrder)}</tbody>
    </Table>
  )
}

export default MatchupTable
