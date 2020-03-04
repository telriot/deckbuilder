import React, { useContext, useState } from "react"
import { DecklistContext } from "../../contexts/DecklistContext"
import { Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faListAlt } from "@fortawesome/free-solid-svg-icons"
import { faPercentage } from "@fortawesome/free-solid-svg-icons"
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons"

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
    style={{ color: "#327BFF", marginLeft: "2px" }}
  />
)
const exchangeIcon = (
  <FontAwesomeIcon
    icon={faExchangeAlt}
    data-targettype="icon"
    style={{ color: "#327BFF" }}
  />
)

const DeckContainerTab = props => {
  const { setDeckContainerTab } = useContext(DecklistContext)
  const [hover, setHover] = useState("")

  const iconHoverStyle = name => {
    return hover === name
      ? {
          backgroundColor: "#bcbfc4",
          cursor: "pointer",
          transition: "background-color 0.15s ease-in-out",
          borderRadius: "0.2rem"
        }
      : undefined
  }

  return (
    <Nav
      style={{ width: "100%" }}
      className={
        props.direction && props.direction === "row"
          ? "d-flex flex-row justify-content-around"
          : "d-flex flex-column align-items-center"
      }
      defaultActiveKey="/home"
    >
      <Nav.Item>
        <Nav.Link
          className={
            props.direction && props.direction === "row" ? "px-1" : undefined
          }
          href="#"
          name="list"
          onClick={() => setDeckContainerTab("list")}
        >
          <div
            className="px-1"
            data-name="list"
            style={iconHoverStyle("list")}
            onMouseEnter={e => setHover(e.target.dataset.name)}
            onMouseLeave={() => setHover("")}
          >
            {listIcon}
          </div>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={
            props.direction && props.direction === "row" ? "px-1" : undefined
          }
          eventKey="link-1"
          href="#"
          name="matchups"
          onClick={() => setDeckContainerTab("matchups")}
        >
          <div
            className="px-1"
            data-name="matchups"
            style={iconHoverStyle("matchups")}
            onMouseEnter={e => setHover(e.target.dataset.name)}
            onMouseLeave={() => setHover("")}
          >
            {matchupIcon}
          </div>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={
            props.direction && props.direction === "row" ? "px-1" : undefined
          }
          href="#"
          name="sideguide"
          onClick={() => setDeckContainerTab("sideguide")}
        >
          <div
            className="px-1"
            data-name="sideguide"
            style={iconHoverStyle("sideguide")}
            onMouseEnter={e => setHover(e.target.dataset.name)}
            onMouseLeave={() => setHover("")}
          >
            {exchangeIcon}
          </div>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default DeckContainerTab
