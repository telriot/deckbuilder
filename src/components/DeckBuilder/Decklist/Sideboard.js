import React, { useContext, Fragment } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { SearchContext } from "../../../contexts/SearchContext"
import { Card } from "react-bootstrap"

const Sideboard = () => {
  const {
    createList,
    mainDeck,
    setMainDeck,
    sideboard,
    setSideboard,
    sideObj
  } = useContext(DecklistContext)
  const { cards } = useContext(SearchContext)

  // drag and drop handlers
  const onDragOver = e => {
    e.preventDefault()
  }

  const onDrop = e => {
    e.persist()
    let dropTarget = e.target.dataset.origin
    let droppedCardObject = []
    let droppedCardData = e.dataTransfer.getData("id").split(",")
    let droppedCardName = droppedCardData[0]
    let droppedCardOrigin = droppedCardData[1]
    //card gets dragged from the search results
    if (droppedCardOrigin === "search") {
      droppedCardObject = cards.find(card => card.name === droppedCardName)
      //to the maindeck
      if (dropTarget === "main") {
        setMainDeck(prevDeck => [...prevDeck, droppedCardObject])
        //to the sideboard
      } else if (dropTarget === "side") {
        setSideboard(prevDeck => [...prevDeck, droppedCardObject])
      }
      //card gets dragged from the main to the side
    } else if (droppedCardOrigin === "main" && dropTarget === "side") {
      droppedCardObject = mainDeck.find(card => card.name === droppedCardName)
      let updatedDeck = mainDeck.slice()
      let index = updatedDeck.findIndex(el => el === droppedCardObject)
      updatedDeck.splice(index, 1)
      setMainDeck(updatedDeck)
      setSideboard(prevDeck => [...prevDeck, droppedCardObject])
      //card gets dragged from the side to the main
    } else if (droppedCardOrigin === "side" && dropTarget === "main") {
      droppedCardObject = sideboard.find(card => card.name === droppedCardName)
      let updatedDeck = sideboard.slice()
      let index = updatedDeck.findIndex(el => el === droppedCardObject)
      updatedDeck.splice(index, 1)
      setSideboard(updatedDeck)
      setMainDeck(prevDeck => [...prevDeck, droppedCardObject])
    }
  }

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
