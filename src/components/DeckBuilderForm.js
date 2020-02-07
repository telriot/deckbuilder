import React, { Fragment, useContext, useEffect, useState } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import { SearchContext } from "../contexts/SearchContext"
import { Form, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import axios from "axios"
import SaveButtonToggler from "./DeckBuilder/SaveButtonToggler"
import DeckDataForm from "./DeckBuilder/DeckDataForm"
import Decklist from "./DeckBuilder/Decklist"

const DeckForm = () => {
  const {
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
  const { deckInfo, setDeckInfo } = useContext(SearchContext)
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
      <Form.Row className="align-items-center mb-1">
        <Col xs={4} lg>
          <h2 className="m-0">Decklist</h2>
        </Col>
        <Col xs={8} lg>
          <SaveButtonToggler />
        </Col>
        {validation.name && <h5>{validation.name}</h5>}
        {validation.format && <h5>{validation.format}</h5>}
        {validation.deck && <h5>{validation.deck}</h5>}
      </Form.Row>
      <DeckDataForm />
      <Decklist />
    </Fragment>
  )
}

export default DeckForm
