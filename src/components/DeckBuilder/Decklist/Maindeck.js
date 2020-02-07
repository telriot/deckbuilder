import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"

import { Card } from "react-bootstrap"

const Maindeck = () => {
  const {
    deckObj,
    createList,
    mainDeck,
    setMainDeck,
    onDragOver,
    onDrop
  } = useContext(DecklistContext)

  return (
    <Card className="mb-1 mb-sm-2">
      <Card.Header
        data-origin="main"
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e)}
        className="py-1 px-2 p-md-2"
      >
        Main
      </Card.Header>
      <Card.Body
        style={{ fontSize: "0.85rem" }}
        className="p-2"
        data-origin="main"
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e)}
      >
        {createList(mainDeck, setMainDeck, deckObj)}
      </Card.Body>
    </Card>
  )
}

export default Maindeck
