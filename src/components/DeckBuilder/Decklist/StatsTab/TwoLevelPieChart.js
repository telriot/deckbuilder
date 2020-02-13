import React, { memo } from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts"

const TwoLevelPieChart = props => {
  const { data, value, data2, legend, name } = props

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label mb-1">{`${payload[0].payload.label} : ${payload[0].value}`}</p>
          <h6>{payload[0].payload.percent}%</h6>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight="300px">
      <PieChart width={350} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={110}
          fill="#8884d8"
          dataKey={value}
        >
          {data.map((entry, index) => (
            <Cell
              name={data[index][name]}
              key={`cell-${index}`}
              fill={data[index].fill}
            />
          ))}
        </Pie>
        {legend && <Legend layout="horizontal" align="bottom"></Legend>}
        {data2 && (
          <Pie
            data={data2}
            dataKey={value}
            cx="50%"
            cy="50%"
            innerRadius={115}
            outerRadius={130}
          >
            {data2.map((entry, index) => (
              <Cell
                name={data2[index][name]}
                key={`cell-${index}`}
                fill={data2[index].fill}
              />
            ))}
          </Pie>
        )}
        <Tooltip
          offset={5}
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
            padding: "5px 5px 0px 5px",
            backgroundColor: "#fff",
            border: "1px solid #E5E5E5"
          }}
          content={<CustomTooltip />}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
export default memo(TwoLevelPieChart)
