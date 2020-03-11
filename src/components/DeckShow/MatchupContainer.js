import React, { useContext } from "react"
import { Container } from "react-bootstrap"
import MatchupTable from "./MatchupContainer/MatchupTable"
import { MatchupContext } from "../../contexts/MatchupContext"
import BasicPagination from "../BasicPagination"

const MatchupContainer = () => {
  const { page, setPage, pages } = useContext(MatchupContext)
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
      <BasicPagination page={page} setPage={setPage} pages={pages} />
    </Container>
  )
}

export default MatchupContainer
