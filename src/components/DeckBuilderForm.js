import React, { Fragment, useContext, useEffect, useState } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import { Form, Col, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import axios from "axios"
import SaveButtonToggler from "./DeckBuilder/SaveButtonToggler"
import DeckDataForm from "./DeckBuilder/DeckDataForm"
import Decklist from "./DeckBuilder/Decklist"

const DeckForm = () => {
  const {
    deckInfo,
    setDeckInfo,
    deckObj,
    setDeckObj,
    createList,
    mainDeck,
    setMainDeck,
    sideboard,
    setSideboard,
    sideObj,
    setSideObj,
    setDeckName,
    setDeckFormat
  } = useContext(DecklistContext)
  const params = useParams()
  const [validation] = useState({})

  //keep decklists updated
  useEffect(() => {
    createList(mainDeck, setMainDeck, deckObj)
  }, [setDeckObj])

  useEffect(() => {
    createList(sideboard, setSideboard, sideObj)
  }, [setSideObj])

  // if params.id find deck to edit
  async function showDeck() {
    try {
      const response = await axios.get(`/api/decks/${params.id}`)
      await setDeckInfo(response.data)
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error(error.response)
      }
    }
  }
  // if params.id update editable decklist
  useEffect(() => {
    if (params.id !== undefined) {
      showDeck()
    } else if (params.id === undefined) {
      setMainDeck([])
      setSideboard([])
      setDeckName("")
      setDeckFormat("")
    }
    return setDeckInfo({})
  }, [])

  useEffect(() => {
    if (params.id !== undefined && deckInfo.mainboard) {
      setDeckName(deckInfo.name)
      setDeckFormat(deckInfo.format)
      setMainDeck(deckInfo.mainboard)
      setSideboard(deckInfo.sideboard)
    }
  }, [deckInfo.mainboard && deckInfo.mainboard.length])

  return (
    <Fragment>
      <DeckDataForm />
      <Decklist />
      <Container fluid className="px-0 my-2 justify-content-right">
        <SaveButtonToggler />
      </Container>
    </Fragment>
  )
}

export default DeckForm
