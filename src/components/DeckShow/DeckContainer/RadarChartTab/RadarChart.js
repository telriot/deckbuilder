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
  const { game, dataKey, color, data } = props

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
