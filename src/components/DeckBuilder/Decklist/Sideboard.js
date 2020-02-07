import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"

import { Card } from "react-bootstrap"

const Sideboard = () => {
  const {
    createList,
    sideboard,
    setSideboard,
    sideObj,
    onDragOver,
    onDrop
  } = useContext(DecklistContext)

  return (
    <Card className="mb-1">
      <Card.Header
        className="py-1 px-2 p-md-2"
        data-origin="side"
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e)}
      >
        Sideboard
      </Card.Header>
      <Card.Body
        className="p-2"
        data-origin="side"
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e)}
      >
        {createList(sideboard, setSideboard, sideObj)}
      </Card.Body>
    </Card>
  )
}

export default Sideboard
