import React from "react"

const LoadingOverlay = props => {
  const { size } = props

  const styleXS = () => {
    {
      return {
        display: "block",
        backgroundColor: "rgba(168, 168, 168, 0.8)",
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
        zIndex: 9
      }
    }
  }
  const styleSM = () => {
    {
      return {
        display: "block",
        backgroundColor: "rgba(168, 168, 168, 0.8)",
        position: "absolute",
        textAlign: "center",
        top: "170px",
        left: "30%",
        width: "200px",
        height: "50px",
        marginTop: "-25px",
        marginBottom: "-100px",
        padding: "12px",
        border: "none",
        zIndex: 9
      }
    }
  }
  return (
    <div style={size === "small" ? styleXS() : styleSM()}>
      <p>Loading</p>
    </div>
  )
}

export default LoadingOverlay
