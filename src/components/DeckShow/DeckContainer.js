import React, { useContext } from "react"
import { Container, Col, Row } from "react-bootstrap"
import { SearchContext } from "../../contexts/SearchContext"
import { DecklistContext } from "../../contexts/DecklistContext"

const DeckContainer = () => {
  const { deckInfo } = useContext(SearchContext)
  const { groupByName } = useContext(DecklistContext)

  //Create type arrays
  let creaturesShow = []
  let spellsShow = []
  let landsShow = []
  let sideboardShow = []

  //Filter by type
  const filterByType = (array, type) => {
    let filteredArray = []

    if (type) {
      for (let card of array) {
        if (
          card.type_line
            .toString()
            .toLowerCase()
            .includes(type)
        ) {
          filteredArray.push(card)
        }
      }
    } else {
      for (let card of array) {
        if (
          card.type_line
            .toString()
            .toLowerCase()
            .includes("creature") === false &&
          card.type_line
            .toString()
            .toLowerCase()
            .includes("land") === false
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
        type: array[1][0].type_line
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
    let showList = []
    for (let card of sortedList) {
      showList.push(
        <div key={`maindiv${card.cardname}`}>
          <span>{card.copies} </span>
          <a href="#">{card.cardname}</a>
        </div>
      )
    }
    return showList
  }
  //Execute if deck
  if (deckInfo.mainboard) {
    let filteredCreatures = filterByType(deckInfo.mainboard, "creature")
    let creaturesObj = groupByName(filteredCreatures)
    let creaturesArray = objToArray(creaturesObj)
    let creaturesSorted = sort(creaturesArray)
    creaturesShow = createList(creaturesSorted)
    let filteredSpells = filterByType(deckInfo.mainboard, "")
    let spellsObj = groupByName(filteredSpells)
    let spellsArray = objToArray(spellsObj)
    let spellsSorted = sort(spellsArray)
    spellsShow = createList(spellsSorted)
    let filteredLands = filterByType(deckInfo.mainboard, "land")
    let landsObj = groupByName(filteredLands)
    let landsArray = objToArray(landsObj)
    let landsSorted = sort(landsArray)
    landsShow = createList(landsSorted)
    let sideObj = groupByName(deckInfo.sideboard)
    let sideArray = objToArray(sideObj)
    let sideSorted = sort(sideArray)
    sideboardShow = createList(sideSorted)
  }

  return (
    <Container fluid>
      <Row>
        <Col md>
          <h5>Creatures</h5>
          {creaturesShow}
          <h5>Spells</h5>
          {spellsShow}
        </Col>
        <Col md>
          <h5>Lands</h5>
          {landsShow}
          <h5>Sideboard</h5>
          {sideboardShow}
        </Col>
      </Row>
    </Container>
  )
}

export default DeckContainer
