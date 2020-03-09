import React, { useState, useContext } from "react"
import { ButtonToolbar, Button } from "react-bootstrap"
import MatchUpModal from "./MatchupModal"
import { AuthContext } from "../../../../contexts/AuthContext"
import { DecklistContext } from "../../../../contexts/DecklistContext"

const MatchupModalButton = () => {
  const [modalShow, setModalShow] = useState(false)
  const { auth } = useContext(AuthContext)
  const { deckInfo } = useContext(DecklistContext)

  return (
    <ButtonToolbar className="d-flex justify-content-center my-2">
      {deckInfo.author === auth.authUserId && (
        <Button size="sm" variant="primary" onClick={() => setModalShow(true)}>
          Add a match record
        </Button>
      )}
      <MatchUpModal show={modalShow} onHide={() => setModalShow(false)} />
    </ButtonToolbar>
  )
}

export default MatchupModalButton
