import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { palette } from "../../helpers"

const ColorCheckbox = props => {
  const { state, setState, color } = props
  const [hover, setHover] = useState("")
  const {
    manaWhite,
    manaRed,
    manaGreen,
    manaBlack,
    manaBlue,
    manaColorless,
    manaWhiteDark,
    manaRedDark,
    manaGreenDark,
    manaBlackDark,
    manaBlueDark,
    manaColorlessDark
  } = palette

  const checkboxColor = color => {
    switch (color) {
      case "W":
        return manaWhite
      case "U":
        return manaBlue
      case "B":
        return manaBlack
      case "G":
        return manaGreen
      case "R":
        return manaRed
      case "C":
        return manaColorless
      default:
        return "black"
    }
  }
  const checkboxColorDark = color => {
    switch (color) {
      case "W":
        return manaWhiteDark
      case "U":
        return manaBlueDark
      case "B":
        return manaBlackDark
      case "G":
        return manaGreenDark
      case "R":
        return manaRedDark
      case "C":
        return manaColorlessDark
      default:
        return "black"
    }
  }

  const checkIcon = col => {
    return (
      <FontAwesomeIcon
        style={{
          color: color !== "W" ? "white" : "black",
          visibility: state.colors[col] ? "visible" : "hidden"
        }}
        name={col}
        onClick={() => {
          handleClick(col)
        }}
        onMouseEnter={() => {
          setHover(col)
        }}
        onMouseLeave={() => setHover("")}
        icon={faCheck}
      />
    )
  }

  const handleClick = color => {
    setState(prevState => {
      return {
        ...prevState,
        colors: { ...prevState.colors, [color]: !prevState.colors[color] }
      }
    })
  }

  return (
    <div
      style={{
        padding: "3px",
        display: "inline",
        backgroundColor:
          hover === color ? checkboxColorDark(color) : checkboxColor(color),
        borderRadius: "6px",
        border:
          hover === color
            ? `3px ${checkboxColor(color)} solid`
            : `3px solid transparent`,
        transition: "background-color 0.15s ease-in-out "
      }}
      data-name={color}
      id={`custom-checkbox-${color}`}
      onClick={e => {
        handleClick(e.target.dataset.name)
      }}
      onMouseEnter={e => {
        setHover(e.target.dataset.name)
      }}
      onMouseLeave={() => setHover("")}
      value={state["colors"].color}
    >
      {checkIcon(color)}
    </div>
  )
}

export default ColorCheckbox
