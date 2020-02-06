import React, { useContext, useState } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { AuthContext } from "../../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import axios from "axios"

const SaveButton = () => {
  const { mainDeck, sideboard, deckName, deckFormat } = useContext(
    DecklistContext
  )
  const { auth } = useContext(AuthContext)
  const history = useHistory()
  const [setValidation] = useState({})

  // Validate deck input
  const validateInput = () => {
    setValidation({})
    if (deckName.trim().length < 1) {
      setValidation({ name: "Please enter a name" })
      return
    } else if (deckFormat.length < 1) {
      setValidation({ format: "Please choose a format" })
      return
    } else if (mainDeck.length < 1) {
      setValidation({ deck: "Your deck is still empty" })
      return
    }
  }

  // Save decklist
  const handleSave = () => {
    validateInput()
    axios
      .post(
        "api/decks/",
        {
          name: deckName,
          format: deckFormat,
          mainboard: mainDeck,
          sideboard: sideboard,
          authorUsername: auth.authUser
        },
        {
          "Content-Type": "raw"
        }
      )
      .then(response => {
        if (!response.data.errmsg) {
          history.push(`/decks/${response.data._id}`)
        } else {
          console.log(response.data.errmsg)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Button className="btn-sm" onClick={e => handleSave(e)}>
      Save
    </Button>
  )
}

export default SaveButton
