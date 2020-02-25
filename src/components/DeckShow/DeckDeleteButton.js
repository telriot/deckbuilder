import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"

import axios from "axios"

const DeckEditButtonGroup = props => {
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

  const classNameDisplay = () => {
    if (props.display && props.display === "block") {
      return "btn-sm btn-danger btn-block"
    } else {
      return "btn-sm btn-danger"
    }
  }

  return (
    <Button className={classNameDisplay()} onClick={e => deleteHandleClick(e)}>
      Delete
    </Button>
  )
}

export default DeckEditButtonGroup
