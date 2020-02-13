import React, { memo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

const BasicBarChart = props => {
  const { data, xAxis, barA } = props
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight="300px">
      <BarChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 40,
          left: 20,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={barA} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default memo(BasicBarChart)
