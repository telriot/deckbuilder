import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Pagination } from "react-bootstrap"

const TablePagination = () => {
  const {
    activePage,
    setActivePage,
    cards,
    resultsInfo,
    tableLength,
    cardSearch,
    currentServerPage,
    setCurrentServerPage,
    adjacentPages
  } = useContext(DecklistContext)

  let active = activePage
  let items = []
  let paginationLength = Math.ceil(cards.length / tableLength)

  //create pagination items
  const createPagination = () => {
    if (resultsInfo)
      for (let number = 1; number <= paginationLength; number++) {
        items.push(
          <Pagination.Item
            data-index={number}
            key={number}
            active={number === active}
            onClick={e => handlePaginationClick(e)}
          >
            {(currentServerPage - 1) * 5 + number}
          </Pagination.Item>
        )
      }
  }

  createPagination()

  //click handlers
  const handlePaginationClick = e => {
    e.persist()
    setActivePage(parseInt(e.target.dataset.index))
  }
  const handlePaginationDirectionClick = (e, direction) => {
    e.persist()
    setActivePage(prevState =>
      direction === "next" ? prevState + 1 : prevState - 1
    )
  }
  const handleServerPaginationClick = async (e, direction) => {
    e.persist()
    await cardSearch(
      "",
      direction === "next" ? adjacentPages.next_page : adjacentPages.prev_page
    )
    setCurrentServerPage(prevState =>
      direction === "next" ? prevState + 1 : prevState - 1
    )
    setActivePage(1)
  }

  return (
    <Pagination size="sm">
      {currentServerPage > 1 && (
        <Pagination.First
          onClick={e => handleServerPaginationClick(e, "prev")}
        />
      )}
      {active > 1 && (
        <Pagination.Prev
          onClick={e => handlePaginationDirectionClick(e, "prev")}
        />
      )}

      {cards.length / tableLength > 1 && items}
      {active < paginationLength && (
        <Pagination.Next
          onClick={e => handlePaginationDirectionClick(e, "next")}
        />
      )}

      {resultsInfo.data && resultsInfo.data.has_more && (
        <Pagination.Last
          onClick={e => handleServerPaginationClick(e, "next")}
        />
      )}
    </Pagination>
  )
}

export default TablePagination
