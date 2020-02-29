import React, { Fragment, useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"

import { useHistory, useParams } from "react-router-dom"
import { Button } from "react-bootstrap"
import { setColors } from "../../../helpers"
import axios from "axios"

const SaveEditButtonGroup = () => {
  const {
    mainDeck,
    sideboard,
    deckName,
    deckFormat,
    setValidation
  } = useContext(DecklistContext)
  const { isXS } = useContext(WindowSizeContext)
  const params = useParams()
  const history = useHistory()

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

  // Save changes
  const handleSaveChanges = async e => {
    e.persist()
    const colors = setColors(mainDeck, sideboard)
    validateInput()
    await axios
      .put(
        `/api/decks/${params.id}`,
        {
          name: deckName,
          format: deckFormat,
          mainboard: mainDeck,
          sideboard: sideboard,
          colors: colors
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
  const btnGroupResponsive = () => {
    if (isXS) {
      return "btn-sm btn-block"
    }
    return "btn-sm m-1"
  }
  return (
    <Fragment>
      <Button
        className={btnGroupResponsive()}
        onClick={e => handleSaveChanges(e)}
      >
        Save Changes
      </Button>
      <Button
        className={btnGroupResponsive()}
        onClick={e => handleSaveChanges(e)}
      >
        Save and Continue
      </Button>
    </Fragment>
  )
}

export default SaveEditButtonGroup
