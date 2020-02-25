import React, { useContext, useState } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"
import { useParams } from "react-router-dom"
import { Table } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import Moment from "react-moment"
import axios from "axios"

const MatchupTable = () => {
  const { deckInfo, setDeckInfo } = useContext(DecklistContext)
  const [tableSortOrder, setTableSortOrder] = useState({
    criteria: "date",
    direction: true
  })
  const { isLG } = useContext(WindowSizeContext)

  let params = useParams()

  const deleteIcon = id => (
    <div onClick={() => handleDelete(id)} data-matchid={id}>
      <FontAwesomeIcon
        style={{ fontSize: "1rem" }}
        className="align-self-center mr-1"
        icon={faTrashAlt}
        data-matchid={id}
      />
    </div>
  )

  let deletionResultObj = (result, archetype) => {
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

  const handleDelete = async id => {
    console.log(id)
    await axios
      .get(`/api/decks/${params.id}/matchups/${id}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.archetype, response.data.result)
          const { archetype, result } = response.data
          axios
            .put(
              `/api/decks/${params.id}/matchups`,
              deletionResultObj(result, archetype),
              {
                "Content-Type": "raw"
              }
            )
            .then(response => {
              if (response.data.errmsg) {
                console.log(response.data.errmsg)
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
      .catch(error => {
        console.log(error)
      })
    axios
      .post(`/api/decks/${params.id}/matchups/${id}`, {
        deckId: params.id,
        matchId: id
      })
      .then(response => {
        if (response.status === 200) {
          axios
            .get(`/api/decks/${params.id}`)
            .then(response => {
              if (response.status === 200) {
                setDeckInfo(prevState => {
                  return {
                    ...prevState,
                    matchups: response.data.matchups,
                    matches: response.data.matches
                  }
                })
              }
            })
            .catch(error => {
              console.log("Server error", error)
            })
        }
      })
      .catch(error => {
        console.log("Server error", error)
      })
  }

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
    if (deckInfo.matches)
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
              {!isLG ? (
                <Moment format="MM.DD">{date}</Moment>
              ) : (
                <Moment format="YYYY.MM.DD">{date}</Moment>
              )}
            </td>
            <td className="text-capitalize" key={archetype}>
              {archetype}
            </td>
            <td key={matchupDeck}>{matchupDeck}</td>
            <td
              className="text-center"
              style={resultStyle(result)}
              key={result}
            >
              {g1 && g1}
              {g2 && g2}
              {g3 && g3}
            </td>
            <td
              className="d-flex justify-content-between border-0"
              key={`comment${match._id}`}
            >
              {comment}

              {index === 1 && deleteIcon(match._id)}
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
