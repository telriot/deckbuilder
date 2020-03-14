import React, { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

const AngleIcon = props => {
  const { hover, visibility, setHover, toggleVisibility } = useContext(
    UserContext
  )
  const { origin } = props

  return (
    <span className="float-right">
      <FontAwesomeIcon
        style={
          hover === origin
            ? {
                fontSize: "1.2rem",
                color: "#2056B3",
                cursor: "pointer",
                transition: "color 0.15s ease-in-out"
              }
            : { fontSize: "1.2rem", color: "#007bff" }
        }
        icon={
          visibility[origin] === "d-inline-block" ? faAngleRight : faAngleDown
        }
        onMouseEnter={() => setHover(origin)}
        onMouseLeave={() => setHover("")}
        onClick={() => {
          toggleVisibility(origin)
        }}
      />
    </span>
  )
}

export default AngleIcon
