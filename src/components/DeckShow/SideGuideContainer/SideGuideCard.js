import React, { useState, useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { SideGuideContext } from "../../../contexts/SideGuideContext"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"
import { palette } from "../../../helpers"

const SideGuideCard = props => {
  const [hover, setHover] = useState("")
  const { guide } = props
  const { matchup, _id } = guide
  const { setMatchupGuide } = useContext(SideGuideContext)
  const { isMD, isLG } = useContext(WindowSizeContext)
  const { darkGray, stdGray } = palette

  return (
    <Col xs={6} sm={4} md={6} lg={4} className="p-0" key={`col-card${_id}`}>
      <Card
        style={
          hover === _id
            ? {
                backgroundColor: darkGray,
                cursor: "pointer",
                transition: "background-color 0.15s ease-in-out"
              }
            : { backgroundColor: stdGray }
        }
        className={isLG ? "border-0 mb-3 mr-2 ml-2" : "border-0 mb-2 mr-2 ml-2"}
        key={_id}
        onClick={() => setMatchupGuide(guide)}
        onMouseEnter={() => setHover(_id)}
        onMouseLeave={() => setHover("")}
      >
        <Card.Body
          className={
            isMD
              ? "p-2 d-flex justify-content-center"
              : "px-2 py-1 d-flex justify-content-center"
          }
        >
          <Card.Text
            style={!isLG ? { fontSize: "0.875rem" } : { fontSize: "1rem" }}
          >
            {matchup}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default SideGuideCard
