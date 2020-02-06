import React, { createContext, useState } from "react"

export const DecklistContext = createContext()

const DecklistContextProvider = props => {
  const [mainDeck, setMainDeck] = useState([])
  const [sideboard, setSideboard] = useState([])
  const [sideObj, setSideObj] = useState({})
  const [deckObj, setDeckObj] = useState({})
  const [sortingCriteria, setSortingCriteria] = useState("data-name")
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

  // create decklist(mainDeck/sideboard, setMainDeck/setSideboard, deckObj/sideObj)
  const createList = (deck, setDeck, obj) => {
    let keys = Object.keys(obj)
    let actualList = []

    //create list
    for (let i of keys) {
      actualList.push(
        <div className="mb-1" key={`div${i}`}>
          {/* delete button */}
          <button
            onClick={e => {
              let updatedDeck = deck.slice()
              let index = updatedDeck.findIndex(el => el === obj[i][0])
              for (let j = 0; j < obj[i].length; j++) {
                updatedDeck.splice(index, 1)
                setDeck(updatedDeck)
              }
            }}
          >
            X
          </button>
          {/* n. of copies controller */}
          <input
            style={{ width: "30px" }}
            type="number"
            value={obj[i].length}
            onChange={e => {
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
            }}
            key={`count${i}`}
            min="0"
          />
          {/* card data */}
          <span
            onDragStart={e => onDragStart(e)}
            draggable
            data-origin={deck === mainDeck ? "main" : "side"}
            key={i}
            data-name={obj[i][0]["name"]}
            data-cmc={obj[i][0]["cmc"]}
            data-type={obj[i][0]["type_line"]}
            data-rarity={obj[i][0]["rarity"]}
            onDoubleClick={e => {
              let updatedDeck = deck.slice()
              let index = updatedDeck.findIndex(el => el === obj[i][0])
              updatedDeck.splice(index, 1)
              setDeck(updatedDeck)
            }}
          >
            {i}
          </span>
          {/* main<>side switch */}
          <button
            onClick={e => {
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
            }}
          >
            {deck === mainDeck ? "To Side" : "To Main"}
          </button>
        </div>
      )
    }
    return sortOrder(actualList)
  }

  //sort decklist display order
  const sortOrder = list => {
    let sortedList = list.sort((a, b) => {
      let nameA =
        parseInt(a.props.children[2].props[sortingCriteria]) ===
        a.props.children[2].props[sortingCriteria]
          ? a.props.children[2].props[sortingCriteria]
          : a.props.children[2].props[sortingCriteria].toUpperCase()
      let nameB =
        parseInt(b.props.children[2].props[sortingCriteria]) ===
        b.props.children[2].props[sortingCriteria]
          ? b.props.children[2].props[sortingCriteria]
          : b.props.children[2].props[sortingCriteria].toUpperCase()
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
        setCommentsArr
      }}
    >
      {props.children}
    </DecklistContext.Provider>
  )
}

export default DecklistContextProvider
