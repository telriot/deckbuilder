import React, { Fragment, useContext, useEffect } from "react"

import { DecklistContext } from "../../contexts/DecklistContext"
import { Table } from "react-bootstrap"
import TablePagination from "./ResultsTable/TablePagination"

const ResultsTable = () => {
  const {
    cards,
    displayList,
    setDisplayList,
    resultsTableDragStart,
    setMainDeck,
    setSideboard,
    activePage,
    tableLength,
    activeTab,
    visibleColumns,
    resultsOrder,
    setResultsOrder,
    resultsDirection,
    setResultsDirection
  } = useContext(DecklistContext)

  //create new tables on cards status change
  useEffect(() => {
    createTable(tableLength, activePage - 1)
  }, [cards, activePage, activeTab, visibleColumns])

  //add cards to deck after double click on found cards
  const handleResultsTableDblClick = (index, tab) => {
    if (tab === "#main") {
      setMainDeck(previousDeck => [...previousDeck, cards[index]])
    } else setSideboard(previousDeck => [...previousDeck, cards[index]])
  }
  // Switch statements for content rendering
  const raritySwitch = rarity => {
    switch (rarity) {
      case "common":
        return "C"
      case "uncommon":
        return "U"
      case "rare":
        return "R"
      case "mythic":
        return "M"
      default:
        return ""
    }
  }
  // Actual contents of the table

  const tableContents = index => {
    const { name, mana_cost, type_line, cmc, rarity } = cards[index]
    return (
      <tbody style={{ fontSize: "0.75rem" }} key={`${index}tbody`}>
        <tr
          onDoubleClick={() => handleResultsTableDblClick(index, activeTab)}
          data-origin="search"
          data-name={name}
          key={`${index}tr`}
          onDragStart={e => resultsTableDragStart(e)}
          draggable
        >
          <td className="py-0" key={`${index}name`}>
            {name}
          </td>
          {visibleColumns.cost && (
            <td className="py-0" key={`${index}mana_cost`}>
              {mana_cost ? mana_cost : ""}
            </td>
          )}
          {visibleColumns.type && (
            <td className="py-0" key={`${index}color`}>
              {type_line}
            </td>
          )}
          {visibleColumns.rarity && (
            <td className="py-0" key={`${index}rarity`}>
              {raritySwitch(rarity)}
            </td>
          )}
          {visibleColumns.cmc && (
            <td className="py-0" key={`${index}cmc`}>
              {cmc}
            </td>
          )}
        </tr>
      </tbody>
    )
  }
  //display found cards in a table, num = items shown
  function createTable(num, page) {
    let tableData = []
    // if we have search results
    if (cards[page * num]) {
      for (let index = page * num; index < page * num + num; index++) {
        if (cards[index]) {
          tableData.push(tableContents(index))
        }
      }
      setDisplayList(tableData)
    }
  }
  const handleTableOrder = e => {
    e.persist()
    const name = e.target.dataset.name
    console.log(e)
    setResultsOrder(prevState => {
      console.log(prevState)
      return {
        orderCriteria: name,
        direction:
          prevState.orderCriteria === name
            ? prevState.direction === "asc"
              ? "desc"
              : "asc"
            : "asc"
      }
    })
  }
  const resultsTable = (
    <div
      style={{
        display: "block",
        maxHeight: "60vh",
        overflowY: "auto",
        marginBottom: "8px"
      }}
    >
      <Table size="sm" hover responsive="sm">
        <thead style={{ backgroundColor: "#F7F7F7", fontSize: "0.9rem" }}>
          <tr>
            <th data-name="name" onClick={e => handleTableOrder(e)}>
              Name
            </th>
            {visibleColumns.cost && <th>Cost</th>}
            {visibleColumns.type && <th>Type</th>}
            {visibleColumns.rarity && (
              <th data-name="rarity" onClick={e => handleTableOrder(e)}>
                Rarity
              </th>
            )}
            {visibleColumns.cmc && (
              <th data-name="cmc" onClick={e => handleTableOrder(e)}>
                CMC
              </th>
            )}
          </tr>
        </thead>
        {displayList}
      </Table>
    </div>
  )

  return (
    <Fragment>
      {resultsTable}
      <TablePagination />
    </Fragment>
  )
}

export default ResultsTable
