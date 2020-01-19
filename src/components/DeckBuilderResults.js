import React, { useEffect, useContext } from "react"
import { SearchContext } from "../contexts/SearchContext"
import { DecklistContext } from "../contexts/DecklistContext"
import { Table } from "react-bootstrap"

const SearchResults = () => {
  const { cards, displayList, setDisplayList, isLoading } = useContext(
    SearchContext
  )
  const {
    mainDeck,
    setMainDeck,
    groupByName,
    setDeckObj,
    sideboard,
    setSideboard,
    setSideObj
  } = useContext(DecklistContext)

  // handler for dragstart
  const onDragStart = e => {
    e.persist()
    let draggedCardName = e.target.dataset.name
    e.dataTransfer.setData("id", [draggedCardName, e.target.dataset.origin])
  }

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

  //handle double click on found cards
  const dblClickHandler = (e, index) => {
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
                onDoubleClick={e => dblClickHandler(e, index)}
                data-origin="search"
                data-name={cards[index].name}
                key={`${index}tr`}
                onDragStart={e => onDragStart(e)}
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

  //create new tables on cards status change
  useEffect(() => {
    createTable(8)
  }, [cards])

  return (
    <div>
      <h3>{isLoading ? "Loading..." : "Search results"}</h3>
      <Table>
        <thead>
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
}

export default SearchResults
