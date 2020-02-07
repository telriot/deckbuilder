import React, { Fragment, useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"

const CardDataSpan = props => {
  const { handleCardDoubleClick, mainDeck, onDragStart } = useContext(
    DecklistContext
  )
  const { i, obj, deck, setDeck } = props

  return (
    <span
      onDragStart={e => onDragStart(e)}
      draggable
      data-origin={deck === mainDeck ? "main" : "side"}
      key={i}
      data-name={obj[i][0]["name"]}
      data-cmc={obj[i][0]["cmc"]}
      data-type={obj[i][0]["type_line"]}
      data-rarity={obj[i][0]["rarity"]}
      onDoubleClick={() => handleCardDoubleClick(deck, obj, i, setDeck)}
    >
      {i}
    </span>
  )
}

export default CardDataSpan
