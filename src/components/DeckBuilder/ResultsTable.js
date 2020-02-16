import React, { Fragment, useContext, useEffect } from "react"
import { DecklistContext } from "../../contexts/DecklistContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { Table } from "react-bootstrap"
import TablePagination from "./ResultsTable/TablePagination"
import LoadingOverlay from "./ResultsTable/LoadingOverlay"
import CardImagePopover from "./ResultsTable/CardImagePopover"

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

  const { isMD, isSM, isXS } = useContext(WindowSizeContext)

  const plusIcon = (
    <FontAwesomeIcon
      icon={faPlusCircle}
      data-targettype="icon"
      style={{ color: "#327BFF" }}
    />
  )
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
  // create manafont images
  const manaCostFonts = string => {
    const newString = string
      .replace(/[{]/g, "ms-")
      .replace(/[}]/g, " ")
      .replace(/\/(?=[A-Z])/g, "")
      .toLowerCase()
      .split(" ")
      .map((string, index) => {
        return (
          string &&
          (string === "//" ? (
            " // "
          ) : (
            <i
              key={`manaCost${index}`}
              className={`ms ${string} ms-cost ms-shadow`}
              style={{
                textAlign: "center",
                fontSize: "0.62rem",
                marginBottom: "0.125rem"
              }}
            ></i>
          ))
        )
      })
    return newString
  }

  //create new tables on cards status change
  useEffect(() => {
    createTable(tableLength, activePage - 1)
  }, [cards, activePage, activeTab, visibleColumns, tableLength])

  //add cards to deck after click on add button
  const handleResultsTableIconClick = (index, tab, e) => {
    if (tab === "#side") {
      if (e.shiftKey === true) {
        for (let i = 0; i < 4; i++) {
          setSideboard(previousDeck => [...previousDeck, cards[index]])
        }
      } else {
        setSideboard(previousDeck => [...previousDeck, cards[index]])
      }
    } else if (e.shiftKey === true) {
      for (let i = 0; i < 4; i++) {
        setMainDeck(previousDeck => [...previousDeck, cards[index]])
      }
    } else {
      setMainDeck(previousDeck => [...previousDeck, cards[index]])
    }
  }

  // Actual content lines for the table
  const tableContents = index => {
    const { name, mana_cost, type_line, cmc, rarity, image_small } = cards[
      index
    ]
    return (
      <tbody style={{ fontSize: "0.75rem" }} key={`${index}tbody`}>
        <tr
          data-origin="search"
          data-name={name}
          data-dragimg={image_small}
          key={`${index}tr`}
          onDragStart={e => resultsTableDragStart(e)}
          draggable
        >
          <CardImagePopover index={index} image={image_small} name={name} />

          {visibleColumns.cost && (
            <td className="py-0" key={`${index}mana_cost`}>
              {mana_cost ? manaCostFonts(mana_cost) : ""}
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
          <td
            className="py-0"
            key={`${index}plus`}
            data-targettype="icon"
            onClick={e => handleResultsTableIconClick(index, activeTab, e)}
          >
            {plusIcon}
          </td>
        </tr>
      </tbody>
    )
  }

  //display found cards in table, num = items shown
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

  // handle the table line rendering order
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

  //responsive styling for the table
  const tableResponsive = () => {
    if (isXS) {
      return {
        display: "block",
        maxHeight: "16vh",
        minHeight: "10vh",
        overflowY: "auto",
        marginBottom: "8px"
      }
    } else if (!isXS && !isMD) {
      return {
        display: "block",
        maxHeight: "20vh",
        overflowY: "auto",
        marginBottom: "8px"
      }
    } else if (isMD) {
      return {
        display: "block",
        maxHeight: "60vh",
        overflowY: "auto",
        marginBottom: "8px"
      }
    }
  }
  //create results table structure
  const resultsTable = (
    <div style={tableResponsive()}>
      {isLoading && <LoadingOverlay size={isXS ? "small" : ""} />}

      <Table size="sm" hover responsive="sm">
        {isSM && (
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
              {visibleColumns.cost && (
                <th style={{ minWidth: "80px" }}>Cost</th>
              )}
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
              <th data-name="plus">{""}</th>
            </tr>
          </thead>
        )}
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
