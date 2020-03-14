import React, { useContext } from "react"
import { Container } from "react-bootstrap"
import SideDataModalButton from "./SideDataModal/SideDataModalButton"
import SideDataDisplay from "./SideDataDisplay"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { AuthContext } from "../../../contexts/AuthContext"

const SideDataTab = () => {
  const { deckInfo } = useContext(DecklistContext)
  const { auth } = useContext(AuthContext)

  return (
    <Container className="d-flex flex-column px-0">
      <SideDataDisplay />
      {deckInfo.author === auth.authUserId && (
        <div className="d-flex justify-content-center">
          <SideDataModalButton />
        </div>
      )}
    </Container>
  )
}

export default SideDataTab
