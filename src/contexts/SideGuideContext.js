import React, { createContext, useState } from "react"

export const SideGuideContext = createContext()

const SideGuideContextProvider = props => {
  const [matchupGuide, setMatchupGuide] = useState({})
  const [sideGuides, setSideGuides] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)

  return (
    <SideGuideContext.Provider
      value={{
        matchupGuide,
        setMatchupGuide,
        sideGuides,
        setSideGuides,
        page,
        pages,
        setPage,
        setPages
      }}
    >
      {props.children}
    </SideGuideContext.Provider>
  )
}

export default SideGuideContextProvider
