import React, { useContext, useState, useEffect } from "react"
import { Container, Col, Row } from "react-bootstrap"
import { DecklistContext } from "../../contexts/DecklistContext"
import { manaCostFonts } from "../../helpers/"
import StatsTab from "../DeckBuilder/Decklist/StatsTab"

const DeckContainer = () => {
  const { deckInfo, groupByName } = useContext(DecklistContext)
  const [showList, setShowList] = useState([])

  //Filter by type
  const filterByType = (array, type) => {
    let filteredArray = []
    if (!type) {
      for (let card of array["sideboard"]) {
        filteredArray.push(card)
      }
    } else if (type !== "Spell") {
      for (let card of array["mainboard"]) {
        if (card.normalized_type === type) {
          filteredArray.push(card)
        }
      }
    } else {
      for (let card of array["mainboard"]) {
        if (
          card.normalized_type === "Instant" ||
          card.normalized_type === "Sorcery"
        ) {
          filteredArray.push(card)
        }
      }
    }
    return filteredArray
  }

  //Translate deck obects to arrays
  const objToArray = obj => {
    return Object.entries(obj).map(array => {
      return {
        copies: array[1].length,
        cardname: array[0],
        img: array[1][0].image_small,
        mana_cost: array[1][0].mana_cost,
        cmc: array[1][0].cmc,
        type: array[1][0].normalized_type
      }
    })
  }

  //Sort cards in deck arrays
  const sort = array => {
    let nameSortedArray = array.sort((a, b) => {
      if (a.cardname < b.cardname) {
        return -1
      }
      if (a.cardname > b.cardname) {
        return 1
      }
      return 0
    })
    let CMCSortedArray = nameSortedArray.sort((a, b) => {
      if (a.cmc < b.cmc) {
        return -1
      }
      if (a.cmc > b.cmc) {
        return 1
      }
      return 0
    })
    return CMCSortedArray
  }

  //Create sorted card lists
  const createList = sortedList => {
    let list = []
    for (let card of sortedList) {
      list.push(card)
    }
    return list
  }

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

  const deckRow = (card, arr) => {
    return (
      <Row
        className="mr-2"
        style={{ minWidth: "49%" }}
        key={`row${arr ? arr.label : "side"}${card.cardname}`}
      >
        <Col
          xs={1}
          className="pr-0"
          key={`copies${arr ? arr.label : "side"}${card.cardname}`}
        >
          {card.copies}
        </Col>

        <Col
          xs={9}
          className="px-0"
          key={`name${arr ? arr.label : "side"}${card.cardname}`}
        >
          <a href={card.img}>{card.cardname}</a>
        </Col>

        <Col
          xs={2}
          className="pl-0"
          key={`cost${arr ? arr.label : "side"}${card.cardname}`}
        >
          {card.mana_cost ? manaCostFonts(card.mana_cost) : ""}
        </Col>
      </Row>
    )
  }

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
          display.push(deckRow(obj, arr))
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
            maxHeight: `${showList.length * 0.57 + 6}rem`,
            overflow: "auto",
            fontSize: "0.8rem"
          }}
          fluid
          className="d-flex flex-wrap flex-column"
        >
          {showList}
        </Container>
      </Col>
      <Col md={4}>
        <StatsTab />
      </Col>
    </Row>
  )
}

export default DeckContainer
