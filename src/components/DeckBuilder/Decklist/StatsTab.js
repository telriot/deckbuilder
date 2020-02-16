import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Card, Container } from "react-bootstrap"
import BasicBarChart from "./StatsTab/BasicBarChart"
import TwoLevelPieChart from "./StatsTab/TwoLevelPieChart"
import ButtonGroup from "./StatsTab/ButtonGroup"

const StatsTab = () => {
  const { mainDeck, buttonGroupValue } = useContext(DecklistContext)

  //Filter cards in deck by normalized type
  const filterByType = (deck, type) => {
    return deck.filter(obj => {
      return obj.normalized_type === type
    })
  }

  const noLandsDeck = deck => deck.filter(obj => obj.normalized_type !== "Land")

  const calculateTotal = arr => {
    let result = 0
    for (let obj of arr) {
      result += obj.count
    }
    return result
  }

  const createTypeObj = (obj, total) => {
    return {
      ...obj,
      percent: Math.floor((obj.count * 100) / total)
    }
  }
  const createDataArray = (arr, total) => {
    let dataArray = []
    for (let obj of arr) {
      obj.count !== 0 && dataArray.push(createTypeObj(obj, total))
    }
    return dataArray
  }

  //Create deck data array for card types
  const typesData = deck => {
    let landsData = { label: "Lands", count: 0, fill: "#FFE2AB" }
    let creaturesData = {
      label: "Creatures",
      count: 0,
      fill: "#2CFF67"
    }
    let instantsData = { label: "Instants", count: 0, fill: "#FB7474" }
    let sorceriesData = {
      label: "Sorceries",
      count: 0,
      fill: "#FA55C1"
    }
    let enchantmentsData = {
      label: "Enchantments",
      count: 0,
      fill: "#77ECFE"
    }
    let artifactsData = {
      label: "Artifacts",
      count: 0,
      fill: "#D9D8D8"
    }
    let planeswalkersData = {
      label: "Planeswalkers",
      count: 0,
      fill: "#B144F6"
    }
    let othersData = { label: "Others", count: 0, fill: "#BAA8F0" }

    let typesDataArray = [
      landsData,
      creaturesData,
      instantsData,
      sorceriesData,
      enchantmentsData,
      artifactsData,
      planeswalkersData,
      othersData
    ]

    for (let card of deck) {
      if (card.normalized_type === "Land") {
        landsData.count++
      } else if (card.normalized_type === "Creature") {
        creaturesData.count++
      } else if (card.normalized_type === "Instant") {
        instantsData.count++
      } else if (card.normalized_type === "Sorcery") {
        sorceriesData.count++
      } else if (card.normalized_type === "Enchantment") {
        enchantmentsData.count++
      } else if (card.normalized_type === "Artifact") {
        artifactsData.count++
      } else if (card.normalized_type === "Planeswalker") {
        planeswalkersData.count++
      } else {
        othersData.count++
      }
    }

    let total = calculateTotal(typesDataArray)
    console.log(total)

    return createDataArray(typesDataArray, total)
  }

  //Create deck data array for mana sources
  const manaSources = deck => {
    let whiteData = {
      label: "White sources",
      color: "W",
      count: 0,
      fill: "#FBF7D4"
    }
    let blueData = {
      label: "Blue sources",
      color: "U",
      count: 0,
      fill: "#96C4D4"
    }
    let blackData = {
      label: "Black sources",
      color: "B",
      count: 0,
      fill: "#626869"
    }
    let redData = {
      label: "Red sources",
      color: "R",
      count: 0,
      fill: "#D98F74"
    }
    let greenData = {
      label: "Green sources",
      color: "G",
      count: 0,
      fill: "#83B592"
    }
    let colorlessData = {
      label: "Colorless sources",
      color: "C",
      count: 0,
      fill: "#CBCECE"
    }

    let sourcesDataArray = [
      whiteData,
      blueData,
      blackData,
      redData,
      greenData,
      colorlessData
    ]

    const lands = filterByType(deck, "Land")
    for (let land of lands) {
      if (land.oracle_text.includes("any color")) {
        for (let obj of sourcesDataArray) {
          obj !== colorlessData && obj.count++
        }
        continue
      }
      if (land.oracle_text.includes("a basic land card")) {
        for (let obj of sourcesDataArray) {
          obj.count++
        }
        continue
      }
      if (
        land.oracle_text.includes("{W}") ||
        land.oracle_text.includes("Plains")
      ) {
        whiteData.count++
      }
      if (
        land.oracle_text.includes("{U}") ||
        land.oracle_text.includes("Island")
      ) {
        blueData.count++
      }

      if (
        land.oracle_text.includes("{B}") ||
        land.oracle_text.includes("Swamp")
      ) {
        blackData.count++
      }

      if (
        land.oracle_text.includes("{R}") ||
        land.oracle_text.includes("Mountain")
      ) {
        redData.count++
      }

      if (
        land.oracle_text.includes("{G}") ||
        land.oracle_text.includes("Forest")
      ) {
        greenData.count++
      }

      if (land.oracle_text.includes("{C}")) {
        colorlessData.count++
      }
    }

    let total = calculateTotal(sourcesDataArray)

    return createDataArray(sourcesDataArray, total)
  }

  //Create deck data array for mana symbols
  const manaSymbols = deck => {
    let whiteData = {
      label: "White symbols",
      color: "W",
      count: 0,
      fill: "#FBF7D4"
    }
    let blueData = {
      label: "Blue symbols",
      color: "U",
      count: 0,
      fill: "#96C4D4"
    }
    let blackData = {
      label: "Black symbols",
      color: "B",
      count: 0,
      fill: "#626869"
    }
    let redData = {
      label: "Red symbols",
      color: "R",
      count: 0,
      fill: "#D98F74"
    }

    let greenData = {
      label: "Green symbols",
      color: "G",
      count: 0,
      fill: "#83B592"
    }
    let colorlessData = {
      label: "Colorless symbols",
      color: "C",
      count: 0,
      fill: "#CBCECE"
    }

    let symbolsDataArray = [
      whiteData,
      blueData,
      blackData,
      redData,
      greenData,
      colorlessData
    ]

    for (let card of deck) {
      whiteData.count += Array.from(card.mana_cost.matchAll("W}")).length
      blueData.count += Array.from(card.mana_cost.matchAll("U}")).length
      blackData.count += Array.from(card.mana_cost.matchAll("B}")).length
      redData.count += Array.from(card.mana_cost.matchAll("R}")).length
      greenData.count += Array.from(card.mana_cost.matchAll("G}")).length
      colorlessData.count += Array.from(card.mana_cost.matchAll("C}")).length
    }

    let total = calculateTotal(symbolsDataArray)

    return createDataArray(symbolsDataArray, total)
  }

  // create deck global cmc data object, sorted
  const globalCMCData = deck => {
    let cmcValues = []
    let allCMC = []
    let CMCData = []
    for (let card of noLandsDeck(deck)) {
      !cmcValues.includes(card.cmc ? card.cmc : 0) &&
        cmcValues.push(card.cmc ? card.cmc : 0)
      allCMC.push(card.cmc ? card.cmc : 0)
    }
    for (let value of cmcValues) {
      CMCData.push({
        cmc: `CMC${value.toString()}`,
        cards: allCMC.filter(cmc => cmc === value).length
      })
    }
    const sortedCMCData = CMCData.sort((a, b) => {
      let cmcA = parseInt(a.cmc.slice(3))
      let cmcB = parseInt(b.cmc.slice(3))
      return cmcA - cmcB
    })
    return sortedCMCData
  }
  // create avgCMC string
  const avgCMC = deck => {
    let totalCMC = arr => {
      let total = 0
      for (let card of arr) {
        total += parseInt(card.cmc) ? parseInt(card.cmc) : 0
      }
      return total
    }
    return noLandsDeck(deck).length
      ? (totalCMC(noLandsDeck(deck)) / noLandsDeck(deck).length).toFixed(2)
      : 0
  }

  return (
    <Card.Body style={{ fontSize: "0.75rem" }} className="p-2">
      <Container className="d-flex flex-column">
        <ButtonGroup avgCMC={avgCMC(mainDeck)} />
      </Container>
      {buttonGroupValue === 1 && (
        <BasicBarChart
          data={globalCMCData(mainDeck)}
          xAxis="cmc"
          barA="cards"
        />
      )}

      {buttonGroupValue === 2 && (
        <TwoLevelPieChart
          data={manaSymbols(mainDeck)}
          data2={manaSources(mainDeck)}
          name="color"
          value="count"
        />
      )}
      {buttonGroupValue === 3 && (
        <TwoLevelPieChart
          data={typesData(mainDeck)}
          name="label"
          value="count"
          legend={true}
        />
      )}
    </Card.Body>
  )
}

export default StatsTab
