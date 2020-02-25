import React, { memo } from "react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Label,
  Tooltip
} from "recharts"

const radarChart = props => {
  const { game, dataKey, color } = props
  const matchupsDataToGraph = matchups => {
    let matchupData = []

    for (let [key, value] of Object.entries(matchups)) {
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

  const data = matchupsDataToGraph(props.archetypes)

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight="250px">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius={80}
        width={350}
        height={300}
        data={data}
        style={{ fontSize: "0.6rem" }}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="archetype">
          <Label />
        </PolarAngleAxis>
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name={game}
          dataKey={dataKey}
          stroke={color}
          fill={color}
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default memo(radarChart)
