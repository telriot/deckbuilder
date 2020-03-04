import React, { Fragment, useContext } from "react"
import { DecklistContext } from "../../contexts/DecklistContext"
import { Card } from "react-bootstrap"
import DeckTab from "./Decklist/DeckTab"
import TabSelector from "./Decklist/TabSelector"
import StatsTab from "./Decklist/StatsTab"

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

  const activeTabSwitch = (tab, display) => {
    switch (tab) {
      case "#side":
        return !display ? (
          "side"
        ) : (
          <DeckTab
            data-origin="side"
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
            data-origin="main"
            deck={mainDeck}
            setDeck={setMainDeck}
            obj={deckObj}
          />
        )
    }
  }

  return (
    <Fragment>
      <Card>
        <Card.Header
          data-origin={activeTabSwitch(activeTab)}
          className="pt-2"
          onDragOver={e => onDragOver(e)}
          onDrop={e => onDrop(e)}
        >
          <TabSelector />
        </Card.Header>
        {activeTabSwitch(activeTab, "display")}
      </Card>
    </Fragment>
  )
}

export default Decklist
