import React, { useContext, useEffect, useState } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import { SearchContext } from "../contexts/SearchContext"
import { AuthContext } from "../contexts/AuthContext"
import { FormGroup, Button, Form, Row, Col } from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"

const DeckForm = () => {
  const {
    deckObj,
    setDeckObj,
    sortingCriteria,
    setSortingCriteria,
    createList,
    mainDeck,
    setMainDeck,
    sideboard,
    setSideboard,
    sideObj,
    setSideObj,
    deckName,
    setDeckName,
    deckFormat,
    setDeckFormat
  } = useContext(DecklistContext)
  const { auth } = useContext(AuthContext)
  const { cards, deckInfo, setDeckInfo } = useContext(SearchContext)
  const params = useParams()
  const history = useHistory()
  const [validation, setValidation] = useState({})

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

  // drag and drop handlers
  const onDragOver = e => {
    e.preventDefault()
  }

  const onDrop = e => {
    e.persist()
    let dropTarget = e.target.dataset.origin
    let droppedCardObject = []
    let droppedCardData = e.dataTransfer.getData("id").split(",")
    let droppedCardName = droppedCardData[0]
    let droppedCardOrigin = droppedCardData[1]
    //card gets dragged from the search results
    if (droppedCardOrigin === "search") {
      droppedCardObject = cards.find(card => card.name === droppedCardName)
      //to the maindeck
      if (dropTarget === "main") {
        setMainDeck(prevDeck => [...prevDeck, droppedCardObject])
        //to the sideboard
      } else if (dropTarget === "side") {
        setSideboard(prevDeck => [...prevDeck, droppedCardObject])
      }
      //card gets dragged from the main to the side
    } else if (droppedCardOrigin === "main" && dropTarget === "side") {
      droppedCardObject = mainDeck.find(card => card.name === droppedCardName)
      let updatedDeck = mainDeck.slice()
      let index = updatedDeck.findIndex(el => el === droppedCardObject)
      updatedDeck.splice(index, 1)
      setMainDeck(updatedDeck)
      setSideboard(prevDeck => [...prevDeck, droppedCardObject])
      //card gets dragged from the side to the main
    } else if (droppedCardOrigin === "side" && dropTarget === "main") {
      droppedCardObject = sideboard.find(card => card.name === droppedCardName)
      let updatedDeck = sideboard.slice()
      let index = updatedDeck.findIndex(el => el === droppedCardObject)
      updatedDeck.splice(index, 1)
      setSideboard(updatedDeck)
      setMainDeck(prevDeck => [...prevDeck, droppedCardObject])
    }
  }

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
    <div>
      <Form.Row>
        <Col xs={4} lg>
          <h2>Decklist</h2>
        </Col>
        <Col xs={8} lg>
          {params.id === undefined ? (
            <div className="float-right">
              <Button className="btn-sm" onClick={e => handleSave(e)}>
                Save
              </Button>
            </div>
          ) : (
            <div className="d-flex float-right">
              <Button
                className="btn-sm m-1"
                onClick={e => handleSaveChanges(e)}
              >
                Save Changes
              </Button>
              <Button
                className="btn-sm m-1"
                onClick={e => handleSaveChanges(e)}
              >
                Save and continue
              </Button>
            </div>
          )}
        </Col>
        {validation.name && <h5>{validation.name}</h5>}
        {validation.format && <h5>{validation.format}</h5>}
        {validation.deck && <h5>{validation.deck}</h5>}
      </Form.Row>

      <Form>
        <Form.Group as={Form.Row}>
          <Form.Label column md={4} lg={3}>
            Deck Name
          </Form.Label>
          <Col md={8} lg={9}>
            <Form.Control
              size="sm"
              id="deck-name"
              type="text"
              value={deckName}
              onChange={e => setDeckName(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Row>
          <Col>
            <Form.Group as={Form.Row}>
              <Form.Label column md={5} lg={4}>
                Format
              </Form.Label>
              <Col md={7} lg={8}>
                <Form.Control
                  size="sm"
                  as="select"
                  id="format-select"
                  value={deckFormat}
                  onChange={e => setDeckFormat(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pick one
                  </option>
                  <option value="standard">Standard</option>
                  <option value="pioneer">Pioneer</option>
                  <option value="modern">Modern</option>
                  <option value="legacy">Legacy</option>
                  <option value="vintage">Vintage</option>
                  <option value="pauper">Pauper</option>
                  <option value="edh">EDH</option>
                  <option value="brawl">Brawl</option>
                  <option value="arena">Arena</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Row}>
              <Form.Label column md={6} lg={4}>
                Sort by
              </Form.Label>
              <Col md={6} lg={8}>
                <Form.Control
                  size="sm"
                  as="select"
                  id="sorting-select"
                  value={sortingCriteria}
                  onChange={e => setSortingCriteria(e.target.value)}
                >
                  <option value={"data-name"}>Name</option>
                  <option value={"data-type"}>Type</option>
                  <option value={"data-cmc"}>CMC</option>
                  <option value={"data-rarity"}>Rarity</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      <h3>Main</h3>
      <div
        data-origin="main"
        style={{
          minHeight: "80px",
          border: "1px grey solid"
        }}
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e)}
      >
        {createList(mainDeck, setMainDeck, deckObj)}
      </div>

      <h3>Sideboard</h3>
      <div
        data-origin="side"
        style={{
          minHeight: "80px",
          border: "1px grey solid"
        }}
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e)}
      >
        {createList(sideboard, setSideboard, sideObj)}
      </div>
    </div>
  )
}

export default DeckForm
