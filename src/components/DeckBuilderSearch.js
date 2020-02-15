import React, { useEffect, useContext, Fragment } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import CardSearchForm from "./DeckBuilder/CardSearchForm"
import ResultsTable from "./DeckBuilder/ResultsTable"

const SearchForm = () => {
  const {
    userInput,
    cardSearch,
    rarity,
    color,
    cmc,
    type,
    resultsOrder
  } = useContext(DecklistContext)

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
  }, [userInput, rarity, type, color, cmc, resultsOrder])

  return (
    <Fragment>
      <CardSearchForm />

      <ResultsTable />
    </Fragment>
  )
}

export default SearchForm
