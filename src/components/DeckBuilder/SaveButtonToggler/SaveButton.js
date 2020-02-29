import React, { useContext } from "react"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { AuthContext } from "../../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import { setColors } from "../../../helpers"
import axios from "axios"

const SaveButton = () => {
  const {
    setValidation,
    mainDeck,
    sideboard,
    deckName,
    deckFormat
  } = useContext(DecklistContext)
  const { auth } = useContext(AuthContext)
  const history = useHistory()
  const { isXS } = useContext(WindowSizeContext)

  // Validate deck input
  const validateInput = () => {
    setValidation({})
    if (deckName.trim().length < 1) {
      setValidation({ error: "Please enter a name" })
      return
    } else if (deckFormat.length < 1) {
      setValidation({ error: "Please choose a format" })
      return
    } else if (mainDeck.length < 1) {
      setValidation({ error: "Your deck is still empty" })
      return
    }
  }

  // Save decklist
  const handleSave = () => {
    const colors = setColors(mainDeck, sideboard)
    validateInput()
    axios
      .post(
        "api/decks/",
        {
          name: deckName,
          format: deckFormat,
          mainboard: mainDeck,
          sideboard: sideboard,
          authorUsername: auth.authUser,
          colors: colors
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
  const btnResponsive = () => {
    if (isXS) {
      return "btn-sm btn-block"
    }
    return "btn-sm"
  }
  return (
    <Button className={btnResponsive()} onClick={e => handleSave(e)}>
      Save
    </Button>
  )
}

export default SaveButton
