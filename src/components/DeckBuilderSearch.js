import React, { Fragment } from "react"
import CardSearchForm from "./DeckBuilder/CardSearchForm"
import ResultsTable from "./DeckBuilder/ResultsTable"

const SearchForm = () => {
  return (
    <Fragment>
      <CardSearchForm />
      <ResultsTable />
    </Fragment>
  )
}

export default SearchForm
