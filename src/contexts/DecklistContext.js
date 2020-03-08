import React, { createContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Form, Col } from "react-bootstrap"
import { groupByName, mapResults } from "../helpers"
import CardCopiesController from "../components/DeckBuilder/DeckDataForm/CardCopiesController"
import CardDataSpan from "../components/DeckBuilder/DeckDataForm/CardDataSpan"
import ControllerButton from "../components/DeckBuilder/DeckDataForm/ControllerButton"
import axios from "axios"
import DecklistRow from "../components/DeckBuilder/Decklist/DecklistRow"

export const DecklistContext = createContext()

const DecklistContextProvider = props => {
  const [resultsInfo, setResultsInfo] = useState({})
  const [deckInfo, setDeckInfo] = useState({})
  const [mainDeck, setMainDeck] = useState([])
  const [sideboard, setSideboard] = useState([])
  const [sideObj, setSideObj] = useState({})
  const [deckObj, setDeckObj] = useState({})
  const [sortingCriteria, setSortingCriteria] = useState("name")
  const [deckName, setDeckName] = useState("")
  const [deckFormat, setDeckFormat] = useState("")
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

  const [activePage, setActivePage] = useState(1)
  const [tableLength] = useState(35)
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
  const [radarButtonGroupValue, setRadarButtonGroupValue] = useState(1)
  const [deckContainerTab, setDeckContainerTab] = useState("list")
  let params = useParams()

  const URL = "https://api.scryfall.com/cards"

  useEffect(() => {
    async function showDeck() {
      try {
        setIsLoading(true)
        const response = await axios.get(`/api/decks/${params.id}`)
        const { mainboard, sideboard, name, format } = response.data
        setDeckInfo(response.data)
        if (mainboard) {
          setDeckName(name)
          setDeckFormat(format)
          setMainDeck(mainboard)
          setSideboard(sideboard)
        }
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          console.error(error.response)
        }
      }
      setIsLoading(false)
    }
    if (params.id !== undefined) {
      showDeck()
    } else if (params.id === undefined) {
      setMainDeck([])
      setSideboard([])
      setDeckName("")
      setDeckFormat("")
    }
    setActiveTab("#main")
    return setDeckInfo({})
  }, [params])

  useEffect(() => {
    createList(mainDeck, setMainDeck, deckObj)
  }, [mainDeck])

  useEffect(() => {
    createList(sideboard, setSideboard, sideObj)
  }, [sideboard])

  // Make a suitable search string for server
  const searchString = `${userInput || "*"}${rarity ? "+r%3A" : ""}${rarity}${
    type ? "+t%3A" : ""
  }${type}${color ? "+c%3A" : ""}${color}${cmc ? "+cmc%3A" : ""}${cmc}${
    resultsOrder.orderCriteria ? "+order%3A" : ""
  }${resultsOrder.orderCriteria}${
    resultsOrder.direction ? "+direction%3A" : ""
  }${resultsOrder.direction}`

  // If searchString, prompt request to server
  useEffect(() => {
    cardSearch(searchString)
    return
  }, [searchString])

  // card search scryfall api get request
  const cardSearch = async (input, url) => {
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
    //set found cards
    setCards(mapResults(foundCards))
    setActivePage(1)
    !url && setCurrentServerPage(1)
    setIsLoading(false)
  }

  //keep the deck objects updated
  useEffect(() => {
    let mainDeckCopy = mainDeck.slice()
    let copyToObj = groupByName(mainDeckCopy)
    setDeckObj(copyToObj)
    return
  }, [mainDeck])

  useEffect(() => {
    let sideboardCopy = sideboard.slice()
    let sideCopyToObj = groupByName(sideboardCopy)
    setSideObj(sideCopyToObj)
    return
  }, [sideboard])

  // drag and drop handlers
  const resultsTableDragStart = e => {
    e.persist()

    let draggedCardName = e.target.dataset.name
    e.dataTransfer.setData("id", [draggedCardName, e.target.dataset.origin])
    const crt = e.target.childNodes[0].cloneNode(true)
    crt.style.backgroundColor = "#bcbfc4"
    crt.style.borderRadius = "4px"
    crt.style.padding = "4px 8px"
    document.body.appendChild(crt)
    /*const image = new Image()
    image.src = e.target.dataset.dragimg
    console.log(e)
    console.log(image)*/
    e.dataTransfer.setDragImage(crt, 0, 0)
  }

  const onDragStart = e => {
    e.persist()
    e.dataTransfer.setData("id", [
      e.target.dataset.name,
      e.target.dataset.origin
    ])
  }

  const onDragOver = e => {
    e.preventDefault()
  }

  const onDrop = async e => {
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

  // handler for copies n. change via arrows
  const handleArrowCopiesChange = (e, obj, i, deck, setDeck, direction) => {
    let updatedDeck = deck.slice()
    if (direction !== "up") {
      let index = updatedDeck.findIndex(el => el === obj[i][0])
      updatedDeck.splice(index, 1)
      setDeck(updatedDeck)
    } else {
      updatedDeck.push(obj[i][0])
      setDeck(updatedDeck)
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
        <DecklistRow deck={deck} setDeck={setDeck} obj={obj} i={i} />
      )
    }
    return sortOrder(actualList)
  }

  //sort decklist display order
  const sortOrder = list => {
    let sortedList = list.sort((a, b) => {
      const DOMTarget = x => {
        const identifier = x.props.i
        return x.props.obj[identifier][0][sortingCriteria]
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
        handleArrowCopiesChange,
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
        setButtonGroupValue,
        radarButtonGroupValue,
        setRadarButtonGroupValue,
        deckContainerTab,
        setDeckContainerTab
      }}
    >
      {props.children}
    </DecklistContext.Provider>
  )
}

export default DecklistContextProvider
