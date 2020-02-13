import React, { createContext, useState } from "react"
import { Form, Col } from "react-bootstrap"
import CardCopiesController from "../components/DeckBuilder/DeckDataForm/CardCopiesController"
import CardDataSpan from "../components/DeckBuilder/DeckDataForm/CardDataSpan"
import ControllerButton from "../components/DeckBuilder/DeckDataForm/ControllerButton"
import axios from "axios"

export const DecklistContext = createContext()

const DecklistContextProvider = props => {
  const [resultsInfo, setResultsInfo] = useState({})
  const [mainDeck, setMainDeck] = useState([])
  const [sideboard, setSideboard] = useState([])
  const [sideObj, setSideObj] = useState({})
  const [deckObj, setDeckObj] = useState({})
  const [sortingCriteria, setSortingCriteria] = useState("name")
  const [deckName, setDeckName] = useState("")
  const [deckFormat, setDeckFormat] = useState("")
  const [comment, setComment] = useState("")
  const [commentsArr, setCommentsArr] = useState([])
  const [userInput, setUserInput] = useState("")
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [displayList, setDisplayList] = useState([])
  const [rarity, setRarity] = useState("")
  const [cmc, setCmc] = useState("")
  const [type, setType] = useState("")
  const [color, setColor] = useState("")
  const [resultsOrder, setResultsOrder] = useState({
    orderCriteria: "name",
    direction: "asc"
  })
  const [indexList, setIndexList] = useState([])
  const [deckInfo, setDeckInfo] = useState({})
  const [activePage, setActivePage] = useState(1)
  const [tableLength, setTableLength] = useState(35)
  const [currentServerPage, setCurrentServerPage] = useState(1)
  const [adjacentPages, setAdjacentPages] = useState({
    prev_page: "",
    next_page: ""
  })
  const [activeTab, setActiveTab] = useState("#main")
  const [visibleColumns, setVisibleColumns] = useState({
    cost: true,
    type: true,
    cmc: false,
    rarity: false
  })
  const [searchFilters, setSearchFilters] = useState({
    type: true,
    cmc: true,
    color: true,
    rarity: true
  })
  const [validation, setValidation] = useState({})
  const [buttonGroupValue, setButtonGroupValue] = useState(1)

  const URL = "https://api.scryfall.com/cards"

  // card search scryfall api get request
  async function cardSearch(input, url) {
    let foundCards = []

    try {
      setIsLoading(true)
      const response = await axios.get(
        url ? url : input && input.length ? `${URL}/search?q=${input}` : URL
      )
      foundCards = response.data.data
      const { next_page } = response.data

      let prevPageHack = next_page
        .split("&")
        .map(arr => {
          if (arr.includes("page")) {
            return arr.replace(
              parseInt(arr.slice(5)),
              parseInt(arr.slice(5)) - 2
            )
          }
          return arr
        })
        .join("&")
      setResultsInfo(response)
      setDisplayList([])
      setAdjacentPages(prevState => {
        return {
          ...prevState,
          next_page,
          prev_page: prevPageHack
        }
      })
    } catch (error) {
      if (axios.isCancel(error)) {
        setResultsInfo({})
        setDisplayList([])
      } else {
        setResultsInfo({})
        setDisplayList([])
        console.error(error.response)
      }
    }
    //normalize type lines
    const normalizeType = string => {
      let splitWord = string
        .replace(/Legendary |Tribal |Snow /g, "")
        .replace(/Basic Land|Artifact Land|^Land\w*/, "Land")
        .replace(
          /Artifact Creature|Host Creature|Instant Creature|Enchantment Creature|^Creature\w*/,
          "Creature"
        )
        .replace(/Creature\?.*/, "Creature")
        .replace(/Enchantment Artifact|Hero Artifact|^Artifact\w*/, "Artifact")
        .replace(/^Sorcery\w*/, "Sorcery")
        .replace(/Elemental Instant|^Instant\w*/, "Instant")
        .replace(/World Enchantment|^Enchantment\w*/, "Enchantment")
        .split(" ")
      return splitWord[0]
    }
    //set found cards
    setCards(
      foundCards.map(card => {
        return {
          name: card.name,
          image_small: card.image_uris ? card.image_uris.small : "",
          image_border_crop: card.image_uris ? card.image_uris.border_crop : "",
          mana_cost: card.mana_cost ? card.mana_cost : "",
          cmc: card.cmc ? card.cmc : "",
          type_line: card.type_line ? card.type_line : "",
          normalized_type: card.type_line ? normalizeType(card.type_line) : "",
          oracle_text: card.oracle_text ? card.oracle_text : "",
          power: card.power ? card.power : "",
          toughness: card.toughness ? card.toughness : "",
          colors: card.colors ? card.colors : "",
          rarity: card.rarity ? card.rarity : "",
          flavor_text: card.flavor_text ? card.flavor_text : "",
          color_identity: card.color_identity ? card.color_identity : ""
        }
      })
    )
    setActivePage(1)
    !url && setCurrentServerPage(1)
    setIsLoading(false)
  }

  //generic object grouping by key values
  const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key]
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
      return objectsByKeyValue
    }, {})
  //group objects by name, returning a new object
  const groupByName = groupBy("name")

  // drag and drop handlers
  const resultsTableDragStart = e => {
    e.persist()
    let draggedCardName = e.target.dataset.name
    e.dataTransfer.setData("id", [draggedCardName, e.target.dataset.origin])
  }

  const onDragStart = e => {
    e.persist()
    console.log("dragstart", e)
    e.dataTransfer.setData("id", [
      e.target.dataset.name,
      e.target.dataset.origin
    ])
  }

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
        <Form.Row
          data-origin={`${deck === mainDeck ? "main" : "side"}`}
          key={i}
        >
          <Col xs={8} data-origin={`${deck === mainDeck ? "main" : "side"}`}>
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
          <Col
            xs={4}
            className="m-0"
            data-origin={`${deck === mainDeck ? "main" : "side"}`}
          >
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
        userInput,
        setUserInput,
        cards,
        cardSearch,
        isLoading,
        setIsLoading,
        displayList,
        setDisplayList,
        rarity,
        setRarity,
        cmc,
        setCmc,
        type,
        setType,
        color,
        setColor,
        indexList,
        setIndexList,
        deckInfo,
        setDeckInfo,
        handleCopiesChange,
        handleCardDoubleClick,
        onDragStart,
        resultsTableDragStart,
        onDragOver,
        onDrop,
        handleDeleteButton,
        handleSideToMainButton,
        resultsInfo,
        setResultsInfo,
        activePage,
        setActivePage,
        tableLength,
        currentServerPage,
        setCurrentServerPage,
        activeTab,
        setActiveTab,
        visibleColumns,
        setVisibleColumns,
        searchFilters,
        setSearchFilters,
        resultsOrder,
        setResultsOrder,
        adjacentPages,
        setAdjacentPages,
        validation,
        setValidation,
        buttonGroupValue,
        setButtonGroupValue
      }}
    >
      {props.children}
    </DecklistContext.Provider>
  )
}

export default DecklistContextProvider
