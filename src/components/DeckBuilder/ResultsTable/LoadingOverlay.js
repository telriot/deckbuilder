import React from "react"

const LoadingOverlay = () => {
  return (
    <div
      style={{
        display: "block",
        backgroundColor: "rgba(168, 168, 168, 0.5)",
        position: "absolute",
        textAlign: "center",
        top: "200px",
        left: "30%",
        width: "200px",
        height: "50px",
        marginTop: "-25px",
        marginBottom: "-100px",
        padding: "12px",
        border: "none"
      }}
    >
      <p>Loading</p>
    </div>
  )
}

export default LoadingOverlay
