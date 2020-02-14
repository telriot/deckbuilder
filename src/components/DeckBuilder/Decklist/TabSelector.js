import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Nav } from "react-bootstrap"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"

const TabSelector = () => {
  const { activeTab, setActiveTab, mainDeck, sideboard } = useContext(
    DecklistContext
  )
  const { isXL, isLG, isMD, isSM, isXS } = useContext(WindowSizeContext)

  const handleTabClick = e => {
    e.persist()
    setActiveTab(e.target.hash)
  }

  return (
    <Nav variant="tabs" defaultActiveKey={activeTab}>
      <Nav.Item>
        <Nav.Link
          data-origin="main"
          href="#main"
          onClick={e => handleTabClick(e)}
        >
          {isXS || (isMD && !isLG && !isXL) ? "Main " : "Mainboard "}
          <span style={{ fontSize: "0.6rem" }}>
            ({mainDeck && mainDeck.length})
          </span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          data-origin="side"
          href="#side"
          onClick={e => handleTabClick(e)}
        >
          {isXS ? "Side " : "Sideboard "}
          <span style={{ fontSize: "0.6rem" }}>
            ({sideboard && sideboard.length})
          </span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#stats" onClick={e => handleTabClick(e)}>
          Stats
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default TabSelector
