import React from "react"
import { Container } from "react-bootstrap"
import MatchupTable from "./MatchupContainer/MatchupTable"
import MatchupPagination from "./MatchupContainer/MatchupPagination"

const MatchupContainer = () => {
  return (
    <Container
      style={{
        overflowY: "visible",
        fontSize: "0.8rem"
      }}
      fluid
      className="d-flex flex-wrap flex-column px-0 pr-md-3"
    >
      <MatchupTable />
      <MatchupPagination />
    </Container>
  )
}

export default MatchupContainer
