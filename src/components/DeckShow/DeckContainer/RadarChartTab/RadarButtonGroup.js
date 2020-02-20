import React, { useContext } from "react"
import { DecklistContext } from "../../../../contexts/DecklistContext"
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap"

const RadarButtonGroup = () => {
  const { radarButtonGroupValue, setRadarButtonGroupValue } = useContext(
    DecklistContext
  )

  return (
    <ToggleButtonGroup
      size="sm"
      type="radio"
      name="options"
      value={radarButtonGroupValue}
      onChange={value => setRadarButtonGroupValue(value)}
    >
      <ToggleButton value={1}>Total</ToggleButton>
      <ToggleButton value={2}>Pre-board</ToggleButton>
      <ToggleButton value={3}>Post-board</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default RadarButtonGroup
