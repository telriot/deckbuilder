import React, { useContext, useEffect } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Card } from "react-bootstrap"

const DeckTab = props => {
  const { createList, onDragOver, onDrop } = useContext(DecklistContext)
  const { origin, deck, setDeck, obj } = props

  useEffect(() => {
    console.log("effran")
    createList(deck, setDeck, obj)
  }, [deck])

  return (
    <Card.Body
      style={{ fontSize: "0.85rem" }}
      className="p-2"
      data-origin={origin}
      onDragOver={e => onDragOver(e)}
      onDrop={e => onDrop(e)}
    >
      {createList(deck, setDeck, obj)}
    </Card.Body>
  )
}

export default DeckTab
