import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Card, Container } from "react-bootstrap"
import RadarButtonGroup from "./RadarChartTab/RadarButtonGroup"
import RadarChart from "./RadarChartTab/RadarChart"
import MatchupModalButton from "./RadarChartTab/MatchupModalButton"

const StatsTab = () => {
  const { radarButtonGroupValue, deckInfo } = useContext(DecklistContext)

  return (
    <Card.Body style={{ fontSize: "0.75rem" }} className="p-2">
      <Container className="d-flex flex-column">
        <RadarButtonGroup />
      </Container>
      {radarButtonGroupValue === 1 && (
        <RadarChart
          archetypes={deckInfo.matchups}
          dataKey="C"
          game="Total"
          color="#fc033d"
        />
      )}

      {radarButtonGroupValue === 2 && (
        <RadarChart
          archetypes={deckInfo.matchups}
          dataKey="A"
          game="Pre-board"
          color="#82ca9d"
        />
      )}
      {radarButtonGroupValue === 3 && (
        <RadarChart
          archetypes={deckInfo.matchups}
          dataKey="B"
          game="Post-board"
          color="#cf34eb"
        />
      )}
      <MatchupModalButton />
    </Card.Body>
  )
}

export default StatsTab