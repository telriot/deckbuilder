import React from "react"
import { Container } from "react-bootstrap"
import MatchupTable from "./MatchupContainer/MatchupTable"

const DeckContainer = () => {
  return (
    <Container
      style={{
        overflow: "auto",
        fontSize: "0.8rem"
      }}
      fluid
      className="d-flex flex-wrap flex-column px-0 pr-md-3"
    >
      <MatchupTable />
    </Container>
  )
}

export default DeckContainer
