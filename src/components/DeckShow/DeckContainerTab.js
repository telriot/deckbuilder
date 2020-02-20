import React, { useContext } from "react"
import { DecklistContext } from "../../contexts/DecklistContext"
import { Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faListAlt } from "@fortawesome/free-solid-svg-icons"
import { faPercentage } from "@fortawesome/free-solid-svg-icons"

const listIcon = (
  <FontAwesomeIcon
    icon={faListAlt}
    data-targettype="icon"
    style={{ color: "#327BFF" }}
  />
)

const matchupIcon = (
  <FontAwesomeIcon
    icon={faPercentage}
    data-targettype="icon"
    style={{ color: "#327BFF" }}
  />
)

const DeckContainerTab = () => {
  const { deckContainerTab, setDeckContainerTab } = useContext(DecklistContext)

  return (
    <Nav className="d-flex flex-column" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link
          className="pr-0"
          href="#"
          name="list"
          onClick={() => setDeckContainerTab("list")}
        >
          {listIcon}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className="pr-0"
          eventKey="link-1"
          href="#"
          name="matchups"
          onClick={() => setDeckContainerTab("matchups")}
        >
          {matchupIcon}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default DeckContainerTab
