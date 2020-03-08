import React, { useState, useEffect, useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Card, Container } from "react-bootstrap"
import RadarButtonGroup from "./RadarChartTab/RadarButtonGroup"
import RadarChart from "./RadarChartTab/RadarChart"
import MatchupModalButton from "./RadarChartTab/MatchupModalButton"

const StatsTab = () => {
  const { radarButtonGroupValue, deckInfo } = useContext(DecklistContext)
  const [data, setData] = useState({})

  useEffect(() => {
    deckInfo.matchups && setData(matchupsDataToGraph(deckInfo.matchups))
  }, [deckInfo])

  const matchupsDataToGraph = matchups => {
    let matchupData = []

    if (matchups) {
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
    }
    return matchupData
  }

  const calculateAvgMWP = data => {
    if (data.length) {
      let A = 0
      let B = 0
      let C = 0
      for (let matchup of data) {
        A += matchup.A
        B += matchup.B
        C += matchup.C
      }
      return {
        A: A / deckInfo.matches.length || 0,
        B: B / deckInfo.matches.length || 0,
        C: C / deckInfo.matches.length || 0
      }
    }
    return { A: 0, B: 0, C: 0 }
  }

  return (
    <Card.Body
      style={{ fontSize: "0.75rem" }}
      className="px-2 pr-md-0 pr-md-2 py-3 pt-md-0 text-center"
    >
      <Container className="d-flex flex-column px-0">
        <RadarButtonGroup
          MWP={data.length ? calculateAvgMWP(data) : { A: 0, B: 0, C: 0 }}
        />
      </Container>
      <Container>
        {radarButtonGroupValue === 1 && (
          <RadarChart
            archetypes={deckInfo.matchups}
            data={data}
            dataKey="C"
            game="Total"
            color="#fc033d"
          />
        )}
        {radarButtonGroupValue === 2 && (
          <RadarChart
            archetypes={deckInfo.matchups}
            data={data}
            dataKey="A"
            game="Pre-board"
            color="#82ca9d"
          />
        )}
        {radarButtonGroupValue === 3 && (
          <RadarChart
            archetypes={deckInfo.matchups}
            data={data}
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
