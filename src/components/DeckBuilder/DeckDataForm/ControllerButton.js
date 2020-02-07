import React, { useContext } from "react"
import { Button } from "react-bootstrap"
import { DecklistContext } from "../../../contexts/DecklistContext"

const ControllerButton = props => {
  const { mainDeck } = useContext(DecklistContext)
  const { obj, i, deck, setDeck, handleFunction, type } = props

  const renderSwitch = type => {
    switch (type) {
      case "mainSideController":
        return deck === mainDeck ? "Side" : "Main"
      case "deleteCard":
        return "x"
    }
  }

  return (
    <Button
      size="sm"
      className="py-0 px-1 float-right mx-1"
      onClick={() => handleFunction(deck, obj, i, setDeck)}
    >
      {renderSwitch(type)}
    </Button>
  )
}

export default ControllerButton