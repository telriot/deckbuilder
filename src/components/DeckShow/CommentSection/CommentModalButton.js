import React, { useState } from "react"
import { ButtonToolbar, Button } from "react-bootstrap"
import CommentModal from "./CommentModal"

const CommentModalButton = props => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <ButtonToolbar>
      <Button
        size="sm"
        variant="outline-secondary"
        className="mx-1"
        onClick={() => setModalShow(true)}
      >
        Edit
      </Button>
      <CommentModal
        text={props.text}
        id={props.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  )
}

export default CommentModalButton
