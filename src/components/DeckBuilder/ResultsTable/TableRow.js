import React, { useContext, useState } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons"
import { manaCostFonts } from "../../../helpers/"
import CardImagePopover from "../ResultsTable/CardImagePopover"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"

const TableRow = props => {
  const { isLG } = useContext(WindowSizeContext)
  const {
    cards,
    resultsTableDragStart,
    setMainDeck,
    setSideboard,
    activeTab,
    visibleColumns
  } = useContext(DecklistContext)
  const { index, card } = props
  const { name, mana_cost, type_line, cmc, rarity, image_small } = card
  const [hover, setHover] = useState("")

  const plusIcon = (
    <FontAwesomeIcon
      icon={faPlusSquare}
      className={hover === `hover${index}` ? "visible" : "invisible"}
      data-targettype="icon"
      style={{
        color: "#327BFF",
        cursor: "pointer",
        fontSize: "0.9rem",
        marginRight: "6px"
      }}
      key={`icon${index}`}
    />
  )

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

  return (
    <tbody
      style={
        !isLG
          ? {
              fontSize: "0.75rem",
              backgroundColor: "#F8F9FA"
            }
          : {
              fontSize: "0.8rem",
              backgroundColor: "#F8F9FA"
            }
      }
      key={`${index}tbody`}
    >
      <tr
        data-origin="search"
        data-name={name}
        data-dragimg={image_small}
        key={`${index}tr`}
        onDragStart={e => resultsTableDragStart(e)}
        draggable
        onMouseOver={e => {
          setHover("")
          setHover(`hover${index}`)
        }}
        onMouseOut={() => setHover("")}
      >
        <td
          style={{ padding: "2px 2px 2px 4px", color: "#327BFF" }}
          key={`${index}name`}
        >
          <CardImagePopover
            index={index}
            image={image_small}
            name={name}
            hover={hover}
            setHover={setHover}
          />
        </td>
        {visibleColumns.cost && (
          <td style={{ padding: "2px" }} key={`${index}mana_cost`}>
            {mana_cost ? manaCostFonts(mana_cost) : ""}
          </td>
        )}
        {visibleColumns.type && (
          <td style={{ padding: "2px" }} key={`${index}type_line`}>
            {type_line}
          </td>
        )}
        {visibleColumns.rarity && (
          <td style={{ padding: "2px" }} key={`${index}rarity`}>
            {raritySwitch(rarity)}
          </td>
        )}
        {visibleColumns.cmc && (
          <td style={{ padding: "2px" }} key={`${index}cmc`}>
            {cmc}
          </td>
        )}
        <td
          style={{ padding: "2px" }}
          className="d-flex align-items-center justify-content-center"
          key={`${index}plus`}
          data-targettype="icon"
          onClick={e => handleResultsTableIconClick(index, activeTab, e)}
        >
          <span>{plusIcon}</span>
        </td>
      </tr>
    </tbody>
  )
}

/*const TableRow = props => {
  const { isLG } = useContext(WindowSizeContext)
  const {
    cards,
    resultsTableDragStart,
    setMainDeck,
    setSideboard,
    activeTab,
    visibleColumns
  } = useContext(DecklistContext)
  const { index } = props
  const { name, mana_cost, type_line, cmc, rarity, image_small } = cards[index]
  const [hover, setHover] = useState("")

  const plusIcon = (
    <FontAwesomeIcon
      icon={faPlusSquare}
      className={hover === `hover${index}` ? "visible" : "invisible"}
      data-targettype="icon"
      style={{
        color: "#327BFF",
        cursor: "pointer",
        fontSize: "0.9rem",
        marginRight: "6px"
      }}
      key={`icon${index}`}
    />
  )

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

  return (
    <tbody
      style={
        !isLG
          ? {
              fontSize: "0.75rem",
              backgroundColor: "#F8F9FA"
            }
          : {
              fontSize: "0.8rem",
              backgroundColor: "#F8F9FA"
            }
      }
      key={`${index}tbody`}
    >
      <tr
        data-origin="search"
        data-name={name}
        data-dragimg={image_small}
        key={`${index}tr`}
        onDragStart={e => resultsTableDragStart(e)}
        draggable
        onMouseOver={e => {
          setHover("")
          setHover(`hover${index}`)
        }}
        onMouseOut={() => setHover("")}
      >
        <td
          style={{ padding: "2px 2px 2px 4px", color: "#327BFF" }}
          key={`${index}name`}
        >
          <CardImagePopover
            index={index}
            image={image_small}
            name={name}
            hover={hover}
            setHover={setHover}
          />
        </td>
        {visibleColumns.cost && (
          <td style={{ padding: "2px" }} key={`${index}mana_cost`}>
            {mana_cost ? manaCostFonts(mana_cost) : ""}
          </td>
        )}
        {visibleColumns.type && (
          <td style={{ padding: "2px" }} key={`${index}type_line`}>
            {type_line}
          </td>
        )}
        {visibleColumns.rarity && (
          <td style={{ padding: "2px" }} key={`${index}rarity`}>
            {raritySwitch(rarity)}
          </td>
        )}
        {visibleColumns.cmc && (
          <td style={{ padding: "2px" }} key={`${index}cmc`}>
            {cmc}
          </td>
        )}
        <td
          style={{ padding: "2px" }}
          className="d-flex align-items-center justify-content-center"
          key={`${index}plus`}
          data-targettype="icon"
          onClick={e => handleResultsTableIconClick(index, activeTab, e)}
        >
          <span>{plusIcon}</span>
        </td>
      </tr>
    </tbody>
  )
} */

export default TableRow
