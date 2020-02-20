import React, { useState } from "react"
import { ButtonToolbar, Button } from "react-bootstrap"
import MatchUpModal from "./MatchupModal"

const MatchupModalButton = () => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <ButtonToolbar className="d-flex justify-content-center my-2">
      <Button size="sm" variant="primary" onClick={() => setModalShow(true)}>
        Add a match record
      </Button>
      <MatchUpModal show={modalShow} onHide={() => setModalShow(false)} />
    </ButtonToolbar>
  )
}

export default MatchupModalButton
