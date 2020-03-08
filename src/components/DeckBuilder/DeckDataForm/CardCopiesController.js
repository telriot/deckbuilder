import React, { Fragment, useContext, useState } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons"

const CardCopiesController = props => {
  const { handleArrowCopiesChange } = useContext(DecklistContext)
  const [hover, setHover] = useState("")

  const { obj, i, deck, setDeck } = props

  const iconStyles = icon => {
    return icon === "upIcon"
      ? { color: hover === icon ? "#327BFF" : "#bcbfc4", cursor: "pointer" }
      : {
          color: hover === icon ? "#327BFF" : "#bcbfc4",
          cursor: "pointer",
          marginRight: "0.4rem"
        }
  }

  const arrowIcon = icon => (
    <FontAwesomeIcon
      icon={icon === "upIcon" ? faCaretUp : faCaretDown}
      style={iconStyles(icon)}
      onMouseEnter={() => setHover(icon)}
      onMouseLeave={() => setHover("")}
    />
  )

  return (
    <Fragment>
      <span
        onClick={e => handleArrowCopiesChange(e, obj, i, deck, setDeck, "up")}
      >
        {arrowIcon("upIcon")}
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
        {arrowIcon("downIcon")}
      </span>
    </Fragment>
  )
}

export default CardCopiesController
