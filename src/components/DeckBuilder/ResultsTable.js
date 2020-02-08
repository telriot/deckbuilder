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
    activeTab
  } = useContext(DecklistContext)

  //create new tables on cards status change
  useEffect(() => {
    createTable(tableLength, activePage - 1)
  }, [cards, activePage, activeTab])

  //add cards to deck after double click on found cards
  const handleResultsTableDblClick = (e, index, activeTab) => {
    console.log(activeTab)
    if (activeTab === "#main") {
      setMainDeck(previousDeck => [...previousDeck, cards[index]])
    } else setSideboard(previousDeck => [...previousDeck, cards[index]])
  }

  //display found cards in a table, num = items shown
  function createTable(num, page) {
    let tableData = []
    console.log("createTable ran")
    // if we have search results
    if (cards[page * num]) {
      for (let index = page * num; index < page * num + num; index++) {
        if (cards[index]) {
          tableData.push(
            //table setup
            <tbody style={{ fontSize: "0.75rem" }} key={`${index}tbody`}>
              <tr
                onDoubleClick={e =>
                  handleResultsTableDblClick(e, index, activeTab)
                }
                data-origin="search"
                data-name={cards[index].name}
                key={`${index}tr`}
                onDragStart={e => resultsTableDragStart(e)}
                draggable
              >
                <td className="py-0" key={`${index}name`}>
                  {cards[index].name}
                </td>
                <td className="py-0" key={`${index}color`}>
                  {cards[index].type_line}
                </td>
                <td className="py-0" key={`${index}cmc`}>
                  {cards[index].cmc}
                </td>
                <td className="py-0" key={`${index}rarity`}>
                  {cards[index].rarity}
                </td>
              </tr>
            </tbody>
          )
        }
      }
      setDisplayList(tableData)
    }
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
            <th>Name</th>
            <th>Type</th>
            <th>CMC</th>
            <th>Rarity</th>
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
