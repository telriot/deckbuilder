import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"

import axios from "axios"

const DeckEditButtonGroup = () => {
  let history = useHistory()
  let params = useParams()

  const editHandleClick = e => {
    e.preventDefault()
    history.push(`/decks/${params.id}/edit`)
  }

  const deleteHandleClick = e => {
    e.preventDefault()
    axios
      .delete(`/api/decks/${params.id}`)
      .then(response => {
        if (response.status === 200) {
          history.push("/")
          console.log("deck successfully deleted")
        }
      })
      .catch(error => {
        console.log("Server error", error)
      })
  }

  return (
    <div className="float-md-right">
      <Button className="btn-sm" onClick={e => editHandleClick(e)}>
        Edit
      </Button>
      <Button
        className="btn-sm btn-danger "
        onClick={e => deleteHandleClick(e)}
      >
        Delete
      </Button>
    </div>
  )
}

export default DeckEditButtonGroup
