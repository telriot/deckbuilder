import React, { Fragment, useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"

const CardCopiesController = props => {
  const { handleCopiesChange } = useContext(DecklistContext)
  const { obj, i, deck, setDeck } = props

  return (
    <Fragment>
      <input
        size="sm"
        style={{
          width: "30px",
          border: "none",
          marginLeft: "0.1rem",
          padding: "0"
        }}
        type="number"
        value={obj[i].length}
        onChange={e => handleCopiesChange(e, obj, i, deck, setDeck)}
        key={`count${i}`}
        min="0"
      />
    </Fragment>
  )
}

export default CardCopiesController
