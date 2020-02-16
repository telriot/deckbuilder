import React, { Fragment, useContext, useEffect } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import { WindowSizeContext } from "../contexts/WindowSizeContext"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import SaveButtonToggler from "./DeckBuilder/SaveButtonToggler"
import DeckDataForm from "./DeckBuilder/DeckDataForm"
import Decklist from "./DeckBuilder/Decklist"
import axios from "axios"

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
    setDeckFormat,
    setActiveTab
  } = useContext(DecklistContext)
  const { isMD, isXS } = useContext(WindowSizeContext)
  const params = useParams()

  //keep decklists updated
  useEffect(() => {
    createList(mainDeck, setMainDeck, deckObj)
  }, [setDeckObj])

  useEffect(() => {
    createList(sideboard, setSideboard, sideObj)
  }, [setSideObj])

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

  // fetch a deck to edit ad update DeckInfo state
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

  useEffect(() => {
    if (params.id !== undefined && deckInfo.mainboard) {
      setDeckName(deckInfo.name)
      setDeckFormat(deckInfo.format)
      setMainDeck(deckInfo.mainboard)
      setSideboard(deckInfo.sideboard)
    }
    setActiveTab("#main")
  }, [params])

  return (
    <Fragment>
      {isMD && <DeckDataForm />}
      <Decklist />
      {((!isXS && !isMD) || isXS) && <DeckDataForm />}
      <Container fluid className="px-0 my-2 justify-content-right">
        <SaveButtonToggler />
      </Container>
    </Fragment>
  )
}

export default DeckForm
