import React, { useContext } from "react"
import { Card, Row } from "react-bootstrap"
import { SideGuideContext } from "../../../contexts/SideGuideContext"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"
import SideDataDisplayColumn from "./SideDataDisplayColumn"

const SideDataDisplay = () => {
  const { matchupGuide } = useContext(SideGuideContext)
  const { isLG } = useContext(WindowSizeContext)
  return (
    <Card
      style={{ backgroundColor: "#F8F9FA" }}
      className=" border-0 p-2 pr-md-2 pt-md-0 text-center"
    >
      <Card.Header
        className="d-flex bg-primary text-white justify-content-center border-0 px-2 py-1 align-items-center"
        style={{
          fontSize: "0.875rem",
          height: "1.93rem",
          borderRadius: "0.2rem"
        }}
        as="h6"
      >
        {matchupGuide ? matchupGuide.matchup : "Matchup"}
      </Card.Header>
      <Card.Body
        className="p-2"
        style={!isLG ? { fontSize: "0.7rem" } : { fontSize: "0.8rem" }}
      >
        <Row>
          <SideDataDisplayColumn side="in" />
          <SideDataDisplayColumn side="out" />
        </Row>

        <Card.Text className="py-3" style={{ whiteSpace: "pre-line" }}>
          {matchupGuide && matchupGuide.comments}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SideDataDisplay
