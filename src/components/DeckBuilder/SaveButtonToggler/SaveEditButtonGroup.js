import React, { Fragment, useContext, useState } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { useHistory, useParams } from "react-router-dom"
import { Button } from "react-bootstrap"
import axios from "axios"

const SaveEditButtonGroup = () => {
  const { mainDeck, sideboard, deckName, deckFormat } = useContext(
    DecklistContext
  )
  const params = useParams()
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

  // Save changes
  const handleSaveChanges = async e => {
    e.persist()
    validateInput()
    await axios
      .put(
        `/api/decks/${params.id}`,
        {
          name: deckName,
          format: deckFormat,
          mainboard: mainDeck,
          sideboard: sideboard
        },
        {
          "Content-Type": "raw"
        }
      )
      .then(response => {
        if (!response.data.errmsg) {
          e.target.innerText === "Save Changes"
            ? history.push(`/decks/${params.id}`)
            : console.log("Decklist updated")
        } else {
          console.log(response.data.errmsg)
        }
      })
      .catch(error => {
        console.log("decklist update error: ")
        console.log(error)
      })
  }
  return (
    <Fragment>
      <Button className="btn-sm m-1" onClick={e => handleSaveChanges(e)}>
        Save Changes
      </Button>
      <Button className="btn-sm m-1" onClick={e => handleSaveChanges(e)}>
        Save and Continue
      </Button>
    </Fragment>
  )
}

export default SaveEditButtonGroup
