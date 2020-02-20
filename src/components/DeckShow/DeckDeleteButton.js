import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"

import axios from "axios"

const DeckEditButtonGroup = () => {
  let history = useHistory()
  let params = useParams()

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
    <Button className="btn-sm btn-danger " onClick={e => deleteHandleClick(e)}>
      Delete
    </Button>
  )
}

export default DeckEditButtonGroup
