import React, { Fragment, useContext, useEffect } from "react"
import { DecklistContext } from "../../contexts/DecklistContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import { Table } from "react-bootstrap"
import TablePagination from "./ResultsTable/TablePagination"
import LoadingOverlay from "./ResultsTable/LoadingOverlay"
import TableRow from "./ResultsTable/TableRow"
import { Scrollbars } from "react-custom-scrollbars"

const ResultsTable = () => {
  const {
    cards,
    displayList,
    setDisplayList,
    activePage,
    tableLength,
    activeTab,
    visibleColumns,
    resultsOrder,
    setResultsOrder,
    isLoading
  } = useContext(DecklistContext)

  const { isMD, isSM, isXS, isLG } = useContext(WindowSizeContext)

  //create new tables on cards status change
  useEffect(() => {
    createTable(tableLength, activePage - 1)
  }, [cards, activePage, activeTab, visibleColumns, tableLength])

  //display found cards in table, num = items shown
  function createTable(num, page) {
    let tableData = []
    // if we have search results
    if (cards[page * num]) {
      for (let index = page * num; index < page * num + num; index++) {
        if (cards[index]) {
          tableData.push(<TableRow key={`tableRow${index}`} index={index} />)
        }
      }
      setDisplayList(tableData)
    }
  }

  // handle the table line rendering order
  const handleTableOrder = e => {
    e.persist()
    const name = e.target.dataset.name
    setResultsOrder(prevState => {
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

  return (
    <Fragment>
      <Scrollbars
        autoHeight
        autoHeightMin={isMD ? 450 : 120}
        autoHeightMax={!isMD ? 130 : undefined}
        hideTracksWhenNotNeeded={true}
      >
        {isLoading && <LoadingOverlay size={isXS ? "small" : ""} />}

        <Table borderless size="sm" hover responsive="sm">
          {isSM && (
            <thead
              className="border-0"
              style={{
                backgroundColor: "#F0F1F2",
                fontSize: "0.85rem"
              }}
            >
              <tr>
                <th
                  className="border-0"
                  data-name="name"
                  onClick={e => handleTableOrder(e)}
                >
                  Name
                  {!isLoading && resultsOrder.orderCriteria === "name"
                    ? resultsOrder.direction === "desc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                {visibleColumns.cost && (
                  <th className="border-0" style={{ minWidth: "80px" }}>
                    Cost
                  </th>
                )}
                {visibleColumns.type && (
                  <th className="border-0" style={{ width: "150px" }}>
                    Type
                  </th>
                )}
                {visibleColumns.rarity && (
                  <th
                    className="border-0"
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
                    className="border-0"
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
                <th className="border-0" data-name="plus">
                  {""}
                </th>
              </tr>
            </thead>
          )}
          {displayList}
        </Table>
      </Scrollbars>
      <TablePagination />
    </Fragment>
  )
}

export default ResultsTable
