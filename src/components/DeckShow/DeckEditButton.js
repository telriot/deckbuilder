import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"

const DeckEditButtonGroup = props => {
  let history = useHistory()
  let params = useParams()

  const editHandleClick = e => {
    e.preventDefault()
    history.push(`/decks/${params.id}/edit`)
  }

  const classNameDisplay = () => {
    if (props.display && props.display === "block") {
      return "btn-sm btn-block"
    } else {
      return "btn-sm mx-1"
    }
  }
  return (
    <Button
      variant="secondary"
      className={classNameDisplay()}
      onClick={e => editHandleClick(e)}
    >
      Edit
    </Button>
  )
}

export default DeckEditButtonGroup
