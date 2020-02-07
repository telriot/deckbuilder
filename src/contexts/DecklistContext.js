import React, { createContext, useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import CardCopiesController from "../components/DeckBuilder/DeckDataForm/CardCopiesController"
import CardDataSpan from "../components/DeckBuilder/DeckDataForm/CardDataSpan"
import MainSideController from "../components/DeckBuilder/DeckDataForm/ControllerButton"
import ControllerButton from "../components/DeckBuilder/DeckDataForm/ControllerButton"

export const DecklistContext = createContext()

const DecklistContextProvider = props => {
  const [mainDeck, setMainDeck] = useState([])
  const [sideboard, setSideboard] = useState([])
  const [sideObj, setSideObj] = useState({})
  const [deckObj, setDeckObj] = useState({})
  const [sortingCriteria, setSortingCriteria] = useState("name")
  const [deckName, setDeckName] = useState("")
  const [deckFormat, setDeckFormat] = useState("")
  const [comment, setComment] = useState("")
  const [commentsArr, setCommentsArr] = useState([])

  //generic object grouping by key values
  const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key]
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
      return objectsByKeyValue
    }, {})
  //group objects by name, returning a new object
  const groupByName = groupBy("name")

  // handler for decklist dragstart
  const onDragStart = e => {
    e.persist()
    console.log("dragstart", e)
    e.dataTransfer.setData("id", [
      e.target.dataset.name,
      e.target.dataset.origin
    ])
  }

  // handler for copies n. change
  const handleCopiesChange = (e, obj, i, deck, setDeck) => {
    let updatedDeck = deck.slice()
    let diff = Math.abs(parseInt(e.target.value) - obj[i].length)
    if (e.target.value < obj[i].length) {
      for (let j = 0; j < diff; j++) {
        let index = updatedDeck.findIndex(el => el === obj[i][0])
        updatedDeck.splice(index, 1)
        setDeck(updatedDeck)
      }
    } else {
      for (let j = 0; j < diff; j++) {
        updatedDeck.push(obj[i][0])
        setDeck(updatedDeck)
      }
    }
  }

  //handler for doubleclick on card elements

  const handleCardDoubleClick = (deck, obj, i, setDeck) => {
    let updatedDeck = deck.slice()
    let index = updatedDeck.findIndex(el => el === obj[i][0])
    updatedDeck.splice(index, 1)
    setDeck(updatedDeck)
  }

  //handler for delete button
  const handleDeleteButton = (deck, obj, i, setDeck) => {
    let updatedDeck = deck.slice()
    let index = updatedDeck.findIndex(el => el === obj[i][0])
    for (let j = 0; j < obj[i].length; j++) {
      updatedDeck.splice(index, 1)
      setDeck(updatedDeck)
    }
  }
  // handler for side<>main button
  const handleSideToMainButton = (deck, obj, i, setDeck) => {
    let updatedDeck = deck.slice()
    let index = updatedDeck.findIndex(el => el === obj[i][0])
    updatedDeck.splice(index, 1)
    if (deck === mainDeck) {
      let sideCopy = sideboard.slice()
      sideCopy.push(obj[i][0])
      setSideboard(sideCopy)
    } else {
      let mainCopy = mainDeck.slice()
      mainCopy.push(obj[i][0])
      setMainDeck(mainCopy)
    }
    setDeck(updatedDeck)
  }
  // create decklist(mainDeck/sideboard, setMainDeck/setSideboard, deckObj/sideObj)
  const createList = (deck, setDeck, obj) => {
    let keys = Object.keys(obj)
    let actualList = []

    for (let i of keys) {
      actualList.push(
        <Form.Row className="mb-1" key={i}>
          <Col xs={8}>
            {/* n. of copies controller */}
            <CardCopiesController
              i={i}
              obj={obj}
              deck={deck}
              setDeck={setDeck}
            />
            {/* card data */}
            <CardDataSpan i={i} obj={obj} deck={deck} setDeck={setDeck} />
          </Col>
          <Col xs={4} className="m-0">
            {/* delete button */}
            <ControllerButton
              i={i}
              obj={obj}
              deck={deck}
              setDeck={setDeck}
              handleFunction={handleDeleteButton}
              type="deleteCard"
            />
            {/* main<>side button */}
            <ControllerButton
              i={i}
              obj={obj}
              deck={deck}
              setDeck={setDeck}
              handleFunction={handleSideToMainButton}
              type="mainSideController"
            />
          </Col>
        </Form.Row>
      )
    }
    return sortOrder(actualList)
  }

  //sort decklist display order
  const sortOrder = list => {
    let sortedList = list.sort((a, b) => {
      const DOMTarget = x => {
        const identifier = x.key
        return x.props.children[0].props.children[1].props.obj[identifier][0][
          sortingCriteria
        ]
      }

      let nameA =
        parseInt(DOMTarget(a)) === DOMTarget(a)
          ? DOMTarget(a)
          : DOMTarget(a).toUpperCase()
      let nameB =
        parseInt(DOMTarget(b)) === DOMTarget(b)
          ? DOMTarget(b)
          : DOMTarget(b).toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
    return sortedList
  }

  return (
    <DecklistContext.Provider
      value={{
        mainDeck,
        setMainDeck,
        sortingCriteria,
        setSortingCriteria,
        groupByName,
        deckObj,
        setDeckObj,
        sortOrder,
        createList,
        sideboard,
        setSideboard,
        sideObj,
        setSideObj,
        deckName,
        setDeckName,
        deckFormat,
        setDeckFormat,
        comment,
        setComment,
        commentsArr,
        setCommentsArr,
        handleCopiesChange,
        handleCardDoubleClick,
        onDragStart,
        handleDeleteButton,
        handleSideToMainButton
      }}
    >
      {props.children}
    </DecklistContext.Provider>
  )
}

export default DecklistContextProvider
