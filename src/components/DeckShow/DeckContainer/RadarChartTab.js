import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Card, Container } from "react-bootstrap"
import RadarButtonGroup from "./RadarChartTab/RadarButtonGroup"
import RadarChart from "./RadarChartTab/RadarChart"
import MatchupModalButton from "./RadarChartTab/MatchupModalButton"

const StatsTab = () => {
  const { radarButtonGroupValue, deckInfo } = useContext(DecklistContext)

  const matchupsDataToGraph = matchups => {
    let matchupData = []

    for (let value of Object.values(matchups)) {
      const { preboard, postboard, total, archetype } = value
      matchupData.push({
        archetype: archetype,
        A: !((preboard.w * 100) / (preboard.w + preboard.l + preboard.u))
          ? 0
          : (preboard.w * 100) / (preboard.w + preboard.l + preboard.u),
        B: !((postboard.w * 100) / (postboard.w + postboard.l + postboard.u))
          ? 0
          : (postboard.w * 100) / (postboard.w + postboard.l + postboard.u),
        C: !((total.w * 100) / (total.w + total.l + total.u))
          ? 0
          : (total.w * 100) / (total.w + total.l + total.u),
        fullMark: 100
      })
    }
    return matchupData
  }
  const data = matchupsDataToGraph(deckInfo.matchups)

  const avgMWP = data => {
    let A = 0
    let B = 0
    let C = 0
    for (let matchup of data) {
      A += matchup.A
      B += matchup.B
      C += matchup.C
    }
    return {
      A: A / data.length,
      B: B / data.length,
      C: C / data.length
    }
  }

  return (
    <Card.Body
      style={{ fontSize: "0.75rem" }}
      className="px-2 pr-md-0 pr-md-2 py-3 py-md-2 text-center"
    >
      <Container className="d-flex flex-column px-0">
        <RadarButtonGroup MWP={avgMWP(data)} />
      </Container>
      <Container>
        {radarButtonGroupValue === 1 && (
          <RadarChart
            archetypes={deckInfo.matchups}
            data={matchupsDataToGraph(deckInfo.matchups)}
            dataKey="C"
            game="Total"
            color="#fc033d"
          />
        )}
        {radarButtonGroupValue === 2 && (
          <RadarChart
            archetypes={deckInfo.matchups}
            data={matchupsDataToGraph(deckInfo.matchups)}
            dataKey="A"
            game="Pre-board"
            color="#82ca9d"
          />
        )}
        {radarButtonGroupValue === 3 && (
          <RadarChart
            archetypes={deckInfo.matchups}
            data={matchupsDataToGraph(deckInfo.matchups)}
            dataKey="B"
            game="Post-board"
            color="#cf34eb"
          />
        )}
      </Container>
      <MatchupModalButton />
    </Card.Body>
  )
}

export default StatsTab
