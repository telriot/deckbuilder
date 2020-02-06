import React, { useContext, Fragment } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { SearchContext } from "../../../contexts/SearchContext"

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
    <Fragment>
      <h3>Sideboard</h3>
      <div
        data-origin="side"
        style={{
          minHeight: "80px",
          border: "1px grey solid"
        }}
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e)}
      >
        {createList(sideboard, setSideboard, sideObj)}
      </div>
    </Fragment>
  )
}

export default Sideboard
