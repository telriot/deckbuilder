import React, { useContext, useEffect } from "react"

import { DecklistContext } from "../../contexts/DecklistContext"
import { Table } from "react-bootstrap"

const ResultsTable = () => {
  const {
    cards,
    displayList,
    setDisplayList,
    resultsTableDragStart,
    setMainDeck,
    setSideboard
  } = useContext(DecklistContext)

  //create new tables on cards status change
  useEffect(() => {
    createTable(8)
  }, [cards])

  //add cards to deck after double click on found cards
  const handleResultsTableDblClick = (e, index) => {
    if (e.shiftKey) {
      setSideboard(previousDeck => [...previousDeck, cards[index]])
    } else setMainDeck(previousDeck => [...previousDeck, cards[index]])
  }

  //display found cards in a table, num = items shown
  function createTable(num) {
    let tableData = []
    // if we have search results
    if (cards[0]) {
      for (let index = 0; index < num; index++) {
        if (cards[index]) {
          tableData.push(
            //table setup
            <tbody key={`${index}tbody`}>
              <tr
                onDoubleClick={e => handleResultsTableDblClick(e, index)}
                data-origin="search"
                data-name={cards[index].name}
                key={`${index}tr`}
                onDragStart={e => resultsTableDragStart(e)}
                draggable
              >
                <td key={`${index}name`}>{cards[index].name}</td>
                <td key={`${index}color`}>{cards[index].type_line}</td>
                <td key={`${index}cmc`}>{cards[index].cmc}</td>
                <td key={`${index}rarity`}>{cards[index].rarity}</td>
              </tr>
            </tbody>
          )
        }
      }
      setDisplayList(tableData)
    }
  }

  return (
    <Table size="sm" bordered hover responsive="sm">
      <thead style={{ backgroundColor: "#F7F7F7" }}>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>CMC</th>
          <th>Rarity</th>
        </tr>
      </thead>
      {displayList}
    </Table>
  )
}

export default ResultsTable
