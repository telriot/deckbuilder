import React, { useContext, useState, useEffect } from "react"
import { Container, Col, Row } from "react-bootstrap"
import { DecklistContext } from "../../contexts/DecklistContext"
import {
  groupByName,
  objToArray,
  filterByType,
  sort,
  createList
} from "../../helpers/"
import StatsTab from "../DeckBuilder/Decklist/StatsTab"
import DeckRow from "./DeckContainer/DeckRow"
import PriceInfo from "./PriceInfo"
import RadarChartTab from "./DeckContainer/RadarChartTab"

const DeckContainer = () => {
  const { deckInfo } = useContext(DecklistContext)
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
  }, [deckInfo.mainboard])

  return (
    <Row>
      <Col md={8}>
        {" "}
        <Container
          style={{
            maxHeight: `${showList.length * 0.6 + 6}rem`,
            overflow: "auto",
            fontSize: "0.8rem"
          }}
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
        <PriceInfo />
      </Col>
      <Col md={4}>
        <StatsTab />
      </Col>
    </Row>
  )
}

export default DeckContainer
