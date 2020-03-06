import React, { useContext, useState, useEffect, Fragment } from "react"
import { Container, Row } from "react-bootstrap"
import { DecklistContext } from "../../contexts/DecklistContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import {
  groupByName,
  objToArray,
  filterByType,
  sort,
  createList
} from "../../helpers/"
import DeckRow from "./DeckContainer/DeckRow"
import PriceInfo from "./PriceInfo"

const DeckContainer = () => {
  const { deckInfo } = useContext(DecklistContext)
  const { isXS, isLG } = useContext(WindowSizeContext)
  const [showList, setShowList] = useState([])

  //Execute if deck
  let buildFinalList = () => {
    let creaturesShow = { label: "Creatures", type: "Creature", list: [] }
    let spellsShow = { label: "Spells", type: "Spell", list: [] }
    let artifactsShow = { label: "Artifacts", type: "Artifact", list: [] }
    let enchantmentsShow = {
      label: "Enchantments",
      type: "Enchantment",
      list: []
    }
    let planeswalkersShow = {
      label: "Planeswalkers",
      type: "Planeswalker",
      list: []
    }
    let landsShow = { label: "Lands", type: "Land", list: [] }
    let sideboardShow = { label: "Sideboard", type: "", list: [] }

    let typesArr = [
      creaturesShow,
      spellsShow,
      artifactsShow,
      enchantmentsShow,
      planeswalkersShow,
      landsShow,
      sideboardShow
    ]

    if (deckInfo.mainboard) {
      for (let arr of typesArr) {
        arr.list = createList(
          sort(objToArray(groupByName(filterByType(deckInfo, arr.type))))
        )
      }
    }
    return typesArr
  }

  const finalList = buildFinalList()

  const typeList = () => {
    console.log("list created")
    let display = []
    for (let arr of finalList) {
      if (arr.list && arr.list.length) {
        display.push(
          <Row key={`row${arr.label}`}>
            <h6 className="my-1" key={`h6${arr.label}`}>{`${arr.label}`}</h6>
          </Row>
        )
        for (let obj of arr.list) {
          display.push(
            <DeckRow
              key={`deckrow${obj.cardname}${arr.label}`}
              card={obj}
              arr={arr}
            />
          )
        }
      }
    }
    return display
  }

  useEffect(() => {
    setShowList(typeList())
  }, [deckInfo.mainboard, isLG])

  const containerStyle = () => {
    if (isLG) {
      return {
        maxHeight: `${showList.length * 0.6 + 6}rem`,
        overflow: "auto",
        fontSize: "0.8rem"
      }
    } else if (!isLG) {
      return { overflow: "auto", fontSize: "0.8rem" }
    } else if (isXS) {
      return {}
    }
  }

  return (
    <Fragment>
      <Container
        style={containerStyle()}
        fluid
        className="d-flex flex-wrap flex-column"
      >
        {showList}
        <Row className="mt-2">
          {deckInfo.mainboard &&
            deckInfo.mainboard.length + deckInfo.sideboard.length}{" "}
          cards total
        </Row>
      </Container>
      {isLG && <PriceInfo />}
    </Fragment>
  )
}

export default DeckContainer
