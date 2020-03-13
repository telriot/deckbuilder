import React from "react"
import { palette } from "../../../helpers"

const LoadingOverlay = props => {
  const { size } = props
  const { loadingOverlayColor } = palette

  const styleXS = () => {
    return {
      display: "block",
      backgroundColor: loadingOverlayColor,
      position: "absolute",
      textAlign: "center",
      top: "75px",
      left: "30%",
      width: "150px",
      height: "30px",
      marginTop: "-25px",
      marginBottom: "-100px",
      padding: "4px",
      border: "none",
      borderRadius: "0.25rem",
      zIndex: 9
    }
  }
  const styleSM = () => {
    return {
      display: "block",
      backgroundColor: loadingOverlayColor,
      position: "absolute",
      textAlign: "center",
      top: "150px",
      left: "30%",
      width: "200px",
      height: "50px",
      marginTop: "-25px",
      marginBottom: "-100px",
      padding: "12px",
      border: "none",
      borderRadius: "0.25rem",
      zIndex: 9
    }
  }

  return (
    <div style={size === "small" ? styleXS() : styleSM()}>
      <p>Loading</p>
    </div>
  )
}

export default LoadingOverlay
