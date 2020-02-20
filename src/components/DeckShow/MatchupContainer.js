import React, { useContext, useState, useEffect } from "react"
import { Container, Col, Row } from "react-bootstrap"
import { DecklistContext } from "../../contexts/DecklistContext"
import RadarChartTab from "./DeckContainer/RadarChartTab"
import MatchupTable from "./MatchupContainer/MatchupTable"

const DeckContainer = () => {
  const { deckInfo } = useContext(DecklistContext)
  return (
    <Row>
      <Col md={8}>
        {" "}
        <Container
          style={{
            overflow: "auto",
            fontSize: "0.8rem"
          }}
          fluid
          className="d-flex flex-wrap flex-column"
        >
          <MatchupTable />
          <Row className="mt-2"></Row>
        </Container>
      </Col>
      <Col md={4}>{deckInfo.matchups && <RadarChartTab />}</Col>
    </Row>
  )
}

export default DeckContainer
