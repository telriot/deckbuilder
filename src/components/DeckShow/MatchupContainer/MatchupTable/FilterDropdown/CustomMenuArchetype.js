import React, { useContext } from "react"
import { Dropdown } from "react-bootstrap"
import { MatchupContext } from "../../../../../contexts/MatchupContext"

const CustomMenuArchetype = React.forwardRef(
  ({ className, "aria-labelledby": labeledBy }, ref) => {
    const { setMatchupFilter, setPage } = useContext(MatchupContext)

    const handleClick = e => {
      setMatchupFilter(e.target.value)
      setPage(1)
    }

    return (
      <div
        ref={ref}
        className={className}
        aria-labelledby={labeledBy}
        style={{ fontSize: "0.8rem" }}
      >
        <Dropdown.Item
          value=""
          as="button"
          onClick={e => {
            handleClick(e)
          }}
        >
          All
        </Dropdown.Item>
        <Dropdown.Item
          value="aggro"
          as="button"
          onClick={e => {
            handleClick(e)
          }}
        >
          Aggro
        </Dropdown.Item>
        <Dropdown.Item
          value="disruptive"
          as="button"
          onClick={e => {
            handleClick(e)
          }}
        >
          Disruptive
        </Dropdown.Item>
        <Dropdown.Item
          value="midrange"
          as="button"
          onClick={e => {
            handleClick(e)
          }}
        >
          Midrange
        </Dropdown.Item>
        <Dropdown.Item
          value="combo"
          as="button"
          onClick={e => {
            handleClick(e)
          }}
        >
          Combo
        </Dropdown.Item>
        <Dropdown.Item
          value="combocontrol"
          as="button"
          onClick={e => {
            handleClick(e)
          }}
        >
          Combo-control
        </Dropdown.Item>
        <Dropdown.Item
          value="control"
          as="button"
          onClick={e => {
            handleClick(e)
          }}
        >
          Control
        </Dropdown.Item>
        <Dropdown.Item
          value="ramp"
          as="button"
          onClick={e => {
            handleClick(e)
          }}
        >
          Ramp
        </Dropdown.Item>
        <Dropdown.Item
          value="others"
          as="button"
          onClick={e => {
            handleClick(e)
          }}
        >
          Others
        </Dropdown.Item>
      </div>
    )
  }
)

export default CustomMenuArchetype
