import React, { Fragment, useContext, useEffect, useState } from "react"
import { DecklistContext } from "../../contexts/DecklistContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import { Table } from "react-bootstrap"
import TablePagination from "./ResultsTable/TablePagination"
import LoadingOverlay from "./ResultsTable/LoadingOverlay"
import TableRow from "./ResultsTable/TableRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSortAmountUp,
  faSortAmountDown
} from "@fortawesome/free-solid-svg-icons"
import { Scrollbars } from "react-custom-scrollbars"
import { palette } from "../../helpers"

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
  const [hover, setHover] = useState("")
  const { isMD, isSM, isXS } = useContext(WindowSizeContext)
  const { darkBlue, stdBlue, stdGray } = palette

  const tableHeightResponsive = () => {
    if (isMD) {
      return ((window.innerHeight - 200) * 95) / 100
    } else if (isSM && !isMD) {
      return ((window.innerHeight - 140) * 30) / 100
    } else {
      return ((window.innerHeight - 140) * 18) / 100
    }
  }

  const headerSpanStyle = name => {
    return hover === name
      ? { color: darkBlue, cursor: "pointer" }
      : { color: stdBlue, cursor: "pointer" }
  }

  const headerSpanWithSorting = (name, html) => {
    return (
      <Fragment>
        <span
          style={headerSpanStyle(name)}
          data-name={name}
          onClick={() => handleTableOrder(name)}
          onMouseEnter={() => setHover(name)}
          onMouseLeave={() => setHover("")}
        >
          {html}{" "}
        </span>
        <span>
          {!isLoading && resultsOrder.orderCriteria === name ? (
            resultsOrder.direction === "desc" ? (
              <FontAwesomeIcon icon={faSortAmountUp} />
            ) : (
              <FontAwesomeIcon icon={faSortAmountDown} />
            )
          ) : (
            ""
          )}
        </span>
      </Fragment>
    )
  }

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
  const handleTableOrder = name => {
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
        autoHeightMin={tableHeightResponsive()}
        autoHeightMax={!isMD ? 130 : undefined}
        hideTracksWhenNotNeeded={true}
      >
        {isLoading && <LoadingOverlay size={isXS ? "small" : ""} />}

        <Table borderless size="sm" hover responsive="sm">
          {isSM && (
            <thead
              className="border-0"
              style={{
                backgroundColor: stdGray,
                fontSize: "0.85rem"
              }}
            >
              <tr>
                <th className="border-0" data-name="name">
                  {headerSpanWithSorting("name", "Name")}
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
                  >
                    {headerSpanWithSorting("rarity", "Rarity")}
                  </th>
                )}
                {visibleColumns.cmc && (
                  <th
                    className="border-0"
                    data-name="cmc"
                    style={{ width: "55px", minWidth: "50px" }}
                  >
                    {headerSpanWithSorting("cmc", "CMC")}
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
