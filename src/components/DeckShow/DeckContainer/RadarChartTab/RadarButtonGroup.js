import React, { useContext } from "react"
import { DecklistContext } from "../../../../contexts/DecklistContext"
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap"

const RadarButtonGroup = props => {
  const { radarButtonGroupValue, setRadarButtonGroupValue } = useContext(
    DecklistContext
  )
  const { A, B, C } = props.MWP

  return (
    <ToggleButtonGroup
      size="sm"
      type="radio"
      name="options"
      value={radarButtonGroupValue}
      onChange={value => setRadarButtonGroupValue(value)}
    >
      <ToggleButton value={1}>
        Total <small>({C.toFixed(1)}%)</small>
      </ToggleButton>
      <ToggleButton value={2}>
        Pre-board <small>({A.toFixed(1)}%)</small>
      </ToggleButton>
      <ToggleButton value={3}>
        Post-board <small>({B.toFixed(1)}%)</small>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default RadarButtonGroup
