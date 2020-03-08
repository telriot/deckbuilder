import React, { Fragment, useContext } from "react"
import { DecklistContext } from "../../contexts/DecklistContext"
import { Card } from "react-bootstrap"
import DeckTab from "./Decklist/DeckTab"
import TabSelector from "./Decklist/TabSelector"
import StatsTab from "./Decklist/StatsTab"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"

const Decklist = () => {
  const {
    onDragOver,
    onDrop,
    activeTab,
    mainDeck,
    setMainDeck,
    deckObj,
    sideboard,
    setSideboard,
    sideObj
  } = useContext(DecklistContext)
  const { isXS } = useContext(WindowSizeContext)

  const activeTabSwitch = (tab, display) => {
    switch (tab) {
      case "#side":
        return !display ? (
          "side"
        ) : (
          <DeckTab
            origin="side"
            deck={sideboard}
            setDeck={setSideboard}
            obj={sideObj}
          />
        )
      case "#stats":
        return !display ? "stats" : <StatsTab origin="deckbuilder" />

      default:
        return !display ? (
          "main"
        ) : (
          <DeckTab
            origin="main"
            deck={mainDeck}
            setDeck={setMainDeck}
            obj={deckObj}
          />
        )
    }
  }

  return (
    <Fragment>
      <Card style={{ minHeight: "120px", marginBottom: "12px" }}>
        <Card.Header
          data-origin={activeTabSwitch(activeTab)}
          className="pt-2"
          onDragOver={e => onDragOver(e)}
          onDrop={e => onDrop(e)}
          style={isXS ? { fontSize: "0.9rem" } : { fontSize: "1rem" }}
        >
          <TabSelector />
        </Card.Header>
        {activeTabSwitch(activeTab, "display")}
      </Card>
    </Fragment>
  )
}

export default Decklist
