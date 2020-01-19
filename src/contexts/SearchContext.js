import React, { createContext, useState } from "react"
import axios from "axios"

export const SearchContext = createContext()

const SearchContextProvider = props => {
  const [userInput, setUserInput] = useState("")
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [displayList, setDisplayList] = useState([])
  const [rarity, setRarity] = useState("")
  const [cmc, setCmc] = useState("")
  const [type, setType] = useState("")
  const [indexList, setIndexList] = useState([])
  const [deckInfo, setDeckInfo] = useState({})

  const URL = "https://api.scryfall.com/cards"

  // card search scryfall api get request
  async function cardSearch(input) {
    let foundCards = []
    try {
      setIsLoading(true)
      const response = await axios.get(
        input && input.length ? `${URL}/search?q=${input}` : URL
      )
      foundCards = response.data.data
    } catch (error) {
      if (axios.isCancel(error)) {
        //request cancelled
      } else {
        setDisplayList([])
        console.error(error.response)
      }
    }
    const foundCardsMap = foundCards.map(card => {
      return {
        name: card.name,
        image_small: card.image_uris ? card.image_uris.small : "",
        mana_cost: card.mana_cost ? card.mana_cost : "",
        cmc: card.cmc ? card.cmc : "",
        type_line: card.type_line ? card.type_line : "",
        oracle_text: card.oracle_text ? card.oracle_text : "",
        power: card.power ? card.power : "",
        toughness: card.toughness ? card.toughness : "",
        colors: card.colors ? card.colors : "",
        rarity: card.rarity ? card.rarity : "",
        flavor_text: card.flavor_text ? card.flavor_text : ""
      }
    })
    setCards(foundCardsMap)
    setIsLoading(false)
  }

  return (
    <SearchContext.Provider
      value={{
        URL,
        userInput,
        setUserInput,
        cards,
        setCards,
        cardSearch,
        displayList,
        setDisplayList,
        rarity,
        setRarity,
        cmc,
        setCmc,
        type,
        setType,
        isLoading,
        setIsLoading,
        indexList,
        setIndexList,
        deckInfo,
        setDeckInfo
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
