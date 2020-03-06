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
const sideGuideIcon = (
  <FontAwesomeIcon
    icon={faExchangeAlt}
    data-targettype="icon"
    style={{ color: "#327BFF" }}
  />
)

const DeckContainerTab = props => {
  const { setDeckContainerTab } = useContext(DecklistContext)
  const [hover, setHover] = useState("")

  const navigationItem = (name, icon) => {
    return (
      <Nav.Item>
        <Nav.Link
          className={
            props.direction && props.direction === "row" ? "px-1" : undefined
          }
          href="#"
          name={name}
          onClick={() => setDeckContainerTab(name)}
        >
          <div
            className="px-1"
            data-name={name}
            style={iconHoverStyle(name)}
            onMouseEnter={e => setHover(e.target.dataset.name)}
            onMouseLeave={() => setHover("")}
          >
            {icon}
          </div>
        </Nav.Link>
      </Nav.Item>
    )
  }

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
      {navigationItem("list", listIcon)}
      {navigationItem("matchups", matchupIcon)}
      {navigationItem("sideguide", sideGuideIcon)}
    </Nav>
  )
}

export default DeckContainerTab
