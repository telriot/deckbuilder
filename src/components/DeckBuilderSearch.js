import React, { useEffect, useContext, Fragment } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import CardSearchForm from "./DeckBuilder/CardSearchForm"
import ResultsTable from "./DeckBuilder/ResultsTable"

const SearchForm = () => {
  const {
    userInput,
    cardSearch,
    rarity,
    cmc,
    type,
    isLoading,
    mainDeck,
    groupByName,
    setDeckObj,
    sideboard,
    setSideObj
  } = useContext(DecklistContext)

  // Make a suitable search string for server
  const searchString = `${userInput.length > 2 ? userInput : ""}${
    rarity ? "+r%3A" : ""
  }${rarity}${type ? "+t%3A" : ""}${type}${cmc ? "+cmc%3A" : ""}${cmc}`

  // If searchString, prompt request to server
  useEffect(() => {
    searchString && cardSearch(searchString)
    return
  }, [userInput, rarity, type, cmc])

  //keep the deck objects updated
  useEffect(() => {
    let mainDeckCopy = mainDeck.slice()
    let copyToObj = groupByName(mainDeckCopy)
    setDeckObj(copyToObj)
    return
  }, [mainDeck.length])

  useEffect(() => {
    let sideboardCopy = sideboard.slice()
    let sideCopyToObj = groupByName(sideboardCopy)
    setSideObj(sideCopyToObj)
    return
  }, [sideboard.length])

  return (
    <Fragment>
      <h3 className="m-0">{isLoading ? "Loading..." : "Search"}</h3>
      <CardSearchForm />

      <ResultsTable />
    </Fragment>
  )
}

export default SearchForm
