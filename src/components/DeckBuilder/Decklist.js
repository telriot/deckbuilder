import React, { Fragment, useContext } from "react"

import { DecklistContext } from "../../contexts/DecklistContext"
import { Card } from "react-bootstrap"
import DeckTab from "./Decklist/DeckTab"
import TabSelector from "./Decklist/TabSelector"

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

  return (
    <Fragment>
      <Card className="mb-1 mb-sm-2">
        <Card.Header
          data-origin={activeTab === "#main" ? "main" : "side"}
          onDragOver={e => onDragOver(e)}
          onDrop={e => onDrop(e)}
        >
          <TabSelector />
        </Card.Header>
        {activeTab === "#main" ? (
          <DeckTab
            data-origin="main"
            deck={mainDeck}
            setDeck={setMainDeck}
            obj={deckObj}
          />
        ) : (
          <DeckTab
            data-origin="side"
            deck={sideboard}
            setDeck={setSideboard}
            obj={sideObj}
          />
        )}
      </Card>
    </Fragment>
  )
}

export default Decklist
