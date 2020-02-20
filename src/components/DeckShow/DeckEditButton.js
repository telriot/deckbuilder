import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"

const DeckEditButtonGroup = () => {
  let history = useHistory()
  let params = useParams()

  const editHandleClick = e => {
    e.preventDefault()
    history.push(`/decks/${params.id}/edit`)
  }

  return (
    <Button className="btn-sm mx-1" onClick={e => editHandleClick(e)}>
      Edit
    </Button>
  )
}

export default DeckEditButtonGroup
