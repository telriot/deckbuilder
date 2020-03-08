import React, { useState, useContext } from "react"
import { WindowSizeContext } from "../../../../contexts/WindowSizeContext"
import { MatchupContext } from "../../../../contexts/MatchupContext"
import { DecklistContext } from "../../../../contexts/DecklistContext"
import { useParams } from "react-router-dom"
import { Popover, OverlayTrigger } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import Truncate from "react-truncate"
import Moment from "react-moment"
import axios from "axios"

const MatchupRows = props => {
  const { matchupResultStyle, deletionResultObj, createTableBody } = useContext(
    MatchupContext
  )
  const { setDeckInfo } = useContext(DecklistContext)
  const { isXS, isSM, isLG } = useContext(WindowSizeContext)
  const [hover, setHover] = useState(false)
  const { index, match } = props
  const { archetype, matchupDeck, comment, result, date } = match
  const { g1, g2, g3 } = result
  let params = useParams()

  const deleteIcon = id => (
    <div
      onClick={() => handleDelete(id)}
      data-name="delete"
      data-matchid={id}
      onMouseEnter={e => setHover(e.target.dataset.name)}
      onMouseLeave={() => setHover("")}
      style={{ padding: "0px 3px" }}
    >
      <FontAwesomeIcon
        style={
          hover === "delete"
            ? {
                fontSize: "0.9rem",
                backgroundColor: "#bcbfc4",
                color: "#2663CC",
                cursor: "pointer"
              }
            : {
                fontSize: "0.9rem",
                color: "#327BFF",
                transition: "color 0.15s ease-in-out",
                cursor: "pointer"
              }
        }
        className="align-self-center mr-1"
        icon={faTrashAlt}
        data-matchid={id}
      />
    </div>
  )

  const handleDelete = async id => {
    try {
      const response = await axios.get(`/api/decks/${params.id}/matchups/${id}`)
      const { archetype, result } = response.data
      await axios.put(
        `/api/decks/${params.id}/matchups`,
        deletionResultObj(result, archetype, params),
        {
          "Content-Type": "raw"
        }
      )
    } catch (error) {
      console.log("Server error", error)
    }
    try {
      axios.post(`/api/decks/${params.id}/matchups/${id}`, {
        deckId: params.id,
        matchId: id
      })
      console.log("matchup upload complete")
    } catch (error) {
      console.log("Server error", error)
    }
    try {
      const response = await axios.get(`/api/decks/${params.id}`)
      setDeckInfo(response.data)
      createTableBody(params)
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error(error.response)
      }
    }
  }

  const commentPopover = (
    <Popover id="popover-basic">
      <Popover.Content>{comment ? comment : "..."}</Popover.Content>
    </Popover>
  )

  return (
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
      {isXS ? (
        <OverlayTrigger placement="bottom" overlay={commentPopover}>
          <td key={matchupDeck}>{matchupDeck}</td>
        </OverlayTrigger>
      ) : (
        <td key={matchupDeck}>{matchupDeck}</td>
      )}
      <td
        className="text-center"
        style={matchupResultStyle(result)}
        key={result}
      >
        {g1 && g1}
        {g2 && g2}
        {g3 && g3}
      </td>
      <OverlayTrigger placement="bottom" overlay={commentPopover}>
        <td
          className={
            isSM ? "d-flex justify-content-between border-0" : "d-none"
          }
          key={`comment${match._id}`}
        >
          <Truncate width={150} ellipsis={<span>...</span>}>
            {comment}
          </Truncate>
          {index === 1 && deleteIcon(match._id)}
        </td>
      </OverlayTrigger>
    </tr>
  )
}

export default MatchupRows
