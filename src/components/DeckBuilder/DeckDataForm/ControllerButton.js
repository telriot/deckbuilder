import React, { useContext } from "react"
import { Button } from "react-bootstrap"
import { DecklistContext } from "../../../contexts/DecklistContext"

const ControllerButton = props => {
  const { mainDeck } = useContext(DecklistContext)
  const { obj, i, deck, setDeck, handleFunction, type, hover } = props

  const renderSwitch = type => {
    switch (type) {
      case "mainSideController":
        return deck === mainDeck ? "Side" : "Main"
      default:
        return "x"
    }
  }

  return (
    <Button
      size="sm"
      className="py-0 mx-1 float-right "
      onClick={() => handleFunction(deck, obj, i, setDeck)}
      style={{
        fontSize: "0.6rem",
        visibility: hover === i ? "visible" : "hidden"
      }}
    >
      {renderSwitch(type)}
    </Button>
  )
}

export default ControllerButton
