import React, { createContext, useState } from "react"
import { useMediaQuery } from "react-responsive"

export const StyleContext = createContext()

const StyleContextProvider = props => {
  //media queries
  const isXL = useMediaQuery({ query: "(min-device-width: 1200)" })
  const isLG = useMediaQuery({ query: "(min-device-width: 992)" })
  const isMD = useMediaQuery({ query: "(min-device-width: 768)" })
  const isSM = useMediaQuery({ query: "(min-device-width: 576)" })
  const isXS = useMediaQuery({ query: "(max-device-width: 575)" })

  return (
    <StyleContext.Provider
      value={{
        isXL,
        isLG,
        isMD,
        isSM,
        isXS
      }}
    >
      {props.children}
    </StyleContext.Provider>
  )
}

export default StyleContextProvider
