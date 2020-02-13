import React, { useContext } from "react"
import { DecklistContext } from "../../../../contexts/DecklistContext"
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap"

const ButtonGroup = props => {
  const { buttonGroupValue, setButtonGroupValue } = useContext(DecklistContext)
  const { avgCMC } = props
  const handleChange = value => {
    setButtonGroupValue(value)
  }
  return (
    <ToggleButtonGroup
      size="sm"
      type="radio"
      name="options"
      value={buttonGroupValue}
      onChange={handleChange}
    >
      <ToggleButton value={1}>CMC (avg: {avgCMC})</ToggleButton>
      <ToggleButton value={2}>Mana</ToggleButton>
      <ToggleButton value={3}>Types</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ButtonGroup
