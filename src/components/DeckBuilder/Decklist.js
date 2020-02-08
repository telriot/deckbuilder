import React, { Fragment, useContext } from "react"
import Maindeck from "./Decklist/Maindeck"
import Sideboard from "./Decklist/Sideboard"
import { DecklistContext } from "../../contexts/DecklistContext"

const Decklist = () => {
  const { onDragOver, onDrop } = useContext(DecklistContext)

  return (
    <Fragment>
      <Maindeck
        data-origin="main"
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e)}
      />
      <Sideboard
        data-origin="side"
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e)}
      />
    </Fragment>
  )
}

export default Decklist
