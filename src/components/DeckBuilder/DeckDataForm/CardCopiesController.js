import React, { Fragment, useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons"

const CardCopiesController = props => {
  const { handleArrowCopiesChange } = useContext(DecklistContext)

  const { obj, i, deck, setDeck } = props

  const upIcon = (
    <FontAwesomeIcon icon={faCaretUp} style={{ color: "#327BFF" }} />
  )
  const downIcon = (
    <FontAwesomeIcon
      icon={faCaretDown}
      style={{ color: "#327BFF", marginRight: "0.4rem" }}
    />
  )

  return (
    <Fragment>
      <span
        onClick={e => handleArrowCopiesChange(e, obj, i, deck, setDeck, "up")}
      >
        {upIcon}
      </span>
      <input
        size="sm"
        style={{
          width: "1.2rem",
          border: "none",
          margin: "0rem 0.1rem 0rem 0.1rem",
          padding: "0",
          textAlign: "center"
        }}
        type="text"
        value={obj[i].length}
        key={`count${i}`}
        min="0"
        readOnly
      />
      <span
        onClick={e => handleArrowCopiesChange(e, obj, i, deck, setDeck, "down")}
      >
        {downIcon}
      </span>
    </Fragment>
  )
}

export default CardCopiesController
