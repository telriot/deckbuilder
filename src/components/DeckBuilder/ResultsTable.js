import React, { Fragment, useContext, useEffect } from "react"

import { DecklistContext } from "../../contexts/DecklistContext"
import { Table, Popover, OverlayTrigger, Image } from "react-bootstrap"
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
    isLoading
  } = useContext(DecklistContext)

  //create new tables on cards status change
  useEffect(() => {
    createTable(tableLength, activePage - 1)
  }, [cards, activePage, activeTab, visibleColumns])

  //add cards to deck after double click on found cards
  const handleResultsTableDblClick = (index, tab) => {
    if (tab === "#side") {
      setSideboard(previousDeck => [...previousDeck, cards[index]])
    } else setMainDeck(previousDeck => [...previousDeck, cards[index]])
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
    const { name, mana_cost, type_line, cmc, rarity, image_small } = cards[
      index
    ]
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
          <OverlayTrigger
            placement="right"
            overlay={
              <Popover id="card-popover">
                <Popover.Content>
                  <Image src={image_small}></Image>
                </Popover.Content>
              </Popover>
            }
          >
            <td className="py-0" key={`${index}name`}>
              {name}
            </td>
          </OverlayTrigger>
          {visibleColumns.cost && (
            <td className="py-0" key={`${index}mana_cost`}>
              {mana_cost ? mana_cost : ""}
            </td>
          )}
          {visibleColumns.type && (
            <td className="py-0" key={`${index}type_line`}>
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
      {isLoading && (
        <div
          style={{
            display: "block",
            backgroundColor: "rgba(168, 168, 168, 0.5)",
            position: "absolute",
            textAlign: "center",
            top: "200px",
            left: "30%",
            width: "200px",
            height: "50px",
            marginTop: "-25px",
            marginBottom: "-100px",
            padding: "12px",
            border: "none"
          }}
        >
          <p>Loading</p>
        </div>
      )}

      <Table size="sm" hover responsive="sm">
        <thead style={{ backgroundColor: "#F7F7F7", fontSize: "0.85rem" }}>
          <tr>
            <th data-name="name" onClick={e => handleTableOrder(e)}>
              Name
              {!isLoading && resultsOrder.orderCriteria === "name"
                ? resultsOrder.direction === "desc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            {visibleColumns.cost && <th style={{ minWidth: "80px" }}>Cost</th>}
            {visibleColumns.type && <th style={{ width: "150px" }}>Type</th>}
            {visibleColumns.rarity && (
              <th
                data-name="rarity"
                style={{ width: "60px", minWidth: "55px" }}
                onClick={e => handleTableOrder(e)}
              >
                Rarity
                {!isLoading && resultsOrder.orderCriteria === "rarity"
                  ? resultsOrder.direction === "desc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
            )}
            {visibleColumns.cmc && (
              <th
                data-name="cmc"
                style={{ width: "55px", minWidth: "50px" }}
                onClick={e => handleTableOrder(e)}
              >
                CMC
                {!isLoading && resultsOrder.orderCriteria === "cmc"
                  ? resultsOrder.direction === "desc"
                    ? "↑"
                    : "↓"
                  : ""}
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
