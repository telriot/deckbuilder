import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"

import { SideGuideContext } from "../../../contexts/SideGuideContext"

const SideDataDisplayColumn = props => {
  const { matchupGuide } = useContext(SideGuideContext)
  const { side } = props
  return (
    <Col className="px-2">
      <div className="d-flex justify-content-center">
        <h6>{side === "in" ? "In" : "Out"}</h6>
      </div>
      <Card>
        <Card.Body className="p-2">
          <Card.Text style={{ whiteSpace: "pre-line" }}>
            {matchupGuide && matchupGuide[side === "in" ? "sideIn" : "sideOut"]}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default SideDataDisplayColumn
