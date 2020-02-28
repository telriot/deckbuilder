import React, { useContext } from "react"
import { WindowSizeContext } from "../../../../contexts/WindowSizeContext"
import { MatchupContext } from "../../../../contexts/MatchupContext"
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
  const { isSM, isLG } = useContext(WindowSizeContext)
  const { archetype, matchupDeck, comment, result, date, index, match } = props
  const { g1, g2, g3 } = result
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

  const handleDelete = async id => {
    await axios
      .get(`/api/decks/${params.id}/matchups/${id}`)
      .then(response => {
        if (response.status === 200) {
          const { archetype, result } = response.data
          axios
            .put(
              `/api/decks/${params.id}/matchups`,
              deletionResultObj(result, archetype, params),
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
          console.log("matchup upload complete")
          createTableBody(params)
        }
      })
      .catch(error => {
        console.log("Server error", error)
      })
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
      <OverlayTrigger placement="bottom" overlay={commentPopover}>
        <td key={matchupDeck}>{matchupDeck}</td>
      </OverlayTrigger>
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
