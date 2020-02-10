import React, { useEffect, useContext, Fragment } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import CardSearchForm from "./DeckBuilder/CardSearchForm"
import ResultsTable from "./DeckBuilder/ResultsTable"
import TableColumnsPopover from "./DeckBuilder/CardSearchForm/TableColumnsPopover"
import SearchFiltersPopover from "./DeckBuilder/CardSearchForm/SearchFiltersPopover"
import { Col, Row } from "react-bootstrap"

const SearchForm = () => {
  const {
    userInput,
    cardSearch,
    rarity,
    color,
    cmc,
    type,
    isLoading,
    mainDeck,
    groupByName,
    setDeckObj,
    sideboard,
    setSideObj,
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
      <Row>
        <Col>
          <h3 className="m-0">{isLoading ? "Loading..." : "Search"}</h3>
        </Col>
        <Col>
          <TableColumnsPopover />
          <SearchFiltersPopover />
        </Col>
      </Row>

      <CardSearchForm />

      <ResultsTable />
    </Fragment>
  )
}

export default SearchForm
