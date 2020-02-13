import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import BasicBarChart from "./StatsTab/BasicBarChart"
import TwoLevelPieChart from "./StatsTab/TwoLevelPieChart"
import ButtonGroup from "./StatsTab/ButtonGroup"
import { Card, Container } from "react-bootstrap"

const StatsTab = () => {
  const { mainDeck, buttonGroupValue } = useContext(DecklistContext)

  const filterByType = (deck, type) => {
    return deck.filter(obj => {
      return obj.normalized_type === type
    })
  }

  const typesData = deck => {
    let lands = 0
    let creatures = 0
    let instants = 0
    let sorceries = 0
    let enchantments = 0
    let artifacts = 0
    let planeswalkers = 0
    let others = 0
    let dataArray = []
    let total = 0
    console.log(total)
    for (let card of deck) {
      if (card.normalized_type === "Land") {
        lands++
      } else if (card.normalized_type === "Creature") {
        creatures++
      } else if (card.normalized_type === "Instant") {
        instants++
      } else if (card.normalized_type === "Sorcery") {
        console.log("sorcery!")
        sorceries++
      } else if (card.normalized_type === "Enchantment") {
        enchantments++
      } else if (card.normalized_type === "Artifact") {
        artifacts++
      } else if (card.normalized_type === "Planeswalker") {
        planeswalkers++
      } else {
        others++
      }
    }
    total =
      lands +
      creatures +
      instants +
      sorceries +
      enchantments +
      artifacts +
      planeswalkers +
      others

    lands !== 0 &&
      dataArray.push({
        label: "Lands",
        type: "Land",
        copies: lands,
        fill: "#FFE2AB",
        percent: Math.floor((lands * 100) / total)
      })
    creatures !== 0 &&
      dataArray.push({
        label: "Creatures",
        type: "Creature",
        copies: creatures,
        fill: "#2CFF67",
        percent: Math.floor((creatures * 100) / total)
      })
    instants !== 0 &&
      dataArray.push({
        label: "Instants",
        type: "Instant",
        copies: instants,
        fill: "#FB7474",
        percent: Math.floor((instants * 100) / total)
      })
    sorceries !== 0 &&
      dataArray.push({
        label: "Sorceries",
        type: "Sorcery",
        copies: sorceries,
        fill: "#FA55C1",
        percent: Math.floor((sorceries * 100) / total)
      })
    enchantments !== 0 &&
      dataArray.push({
        label: "Enchantments",
        type: "Enchantment",
        copies: enchantments,
        fill: "#77ECFE",
        percent: Math.floor((enchantments * 100) / total)
      })
    artifacts !== 0 &&
      dataArray.push({
        label: "Artifacts",
        type: "Artifact",
        copies: artifacts,
        fill: "#D9D8D8",
        percent: Math.floor((artifacts * 100) / total)
      })
    planeswalkers !== 0 &&
      dataArray.push({
        label: "Planeswalkers",
        type: "Planeswalkers",
        copies: planeswalkers,
        fill: "#B144F6",
        percent: Math.floor((planeswalkers * 100) / total)
      })
    others !== 0 &&
      dataArray.push({
        label: "Others",
        type: "Other",
        copies: others,
        fill: "#BAA8F0",
        percent: Math.floor((others * 100) / total)
      })
    return dataArray
  }

  const globalCMCData = deck => {
    let noLandsDeck = deck.filter(obj => obj.normalized_type !== "Land")
    let cmcValues = []
    let allCMC = []
    let CMCData = []
    for (let card of noLandsDeck) {
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

  const avgCMC = deck => {
    let noLandsDeck = deck.filter(obj => obj.normalized_type !== "Land")
    let totalCMC = noLandsDeck.reduce((acc, obj) => {
      return acc + obj.cmc
    }, 0)
    return noLandsDeck.length ? (totalCMC / noLandsDeck.length).toFixed(2) : 0
  }

  const nPerType = (deck, type) => {
    let typeFilteredDeck = filterByType(deck, type)
    return typeFilteredDeck ? typeFilteredDeck.length : 0
  }

  const manaSources = deck => {
    let white = 0
    let blue = 0
    let black = 0
    let red = 0
    let green = 0
    let colorless = 0
    let total = 0
    let dataArray = []
    const lands = filterByType(deck, "Land")
    for (let land of lands) {
      if (land.oracle_text.includes("any color")) {
        white++
        blue++
        black++
        red++
        green++
        continue
      }
      if (land.oracle_text.includes("a basic land card")) {
        white++
        blue++
        black++
        red++
        green++
        colorless++
        continue
      }
      if (
        land.oracle_text.includes("{W}") ||
        land.oracle_text.includes("Plains")
      ) {
        white++
      }
      if (
        land.oracle_text.includes("{U}") ||
        land.oracle_text.includes("Island")
      ) {
        blue++
      }

      if (
        land.oracle_text.includes("{B}") ||
        land.oracle_text.includes("Swamp")
      ) {
        black++
      }

      if (
        land.oracle_text.includes("{R}") ||
        land.oracle_text.includes("Mountain")
      ) {
        red++
      }

      if (
        land.oracle_text.includes("{G}") ||
        land.oracle_text.includes("Forest")
      ) {
        green++
      }

      if (land.oracle_text.includes("{C}")) {
        colorless++
      }
    }

    total = white + blue + black + red + green + colorless

    colorless !== 0 &&
      dataArray.push({
        label: "Colorless sources",
        color: "C",
        symbols: colorless,
        fill: "#CBCECE",
        percent: Math.floor((colorless * 100) / total)
      })
    green !== 0 &&
      dataArray.push({
        label: "Green sources",
        color: "G",
        symbols: green,
        fill: "#83B592",
        percent: Math.floor((green * 100) / total)
      })
    red !== 0 &&
      dataArray.push({
        label: "Red sources",
        color: "R",
        symbols: red,
        fill: "#D98F74",
        percent: Math.floor((red * 100) / total)
      })
    black !== 0 &&
      dataArray.push({
        label: "Black sources",
        color: "B",
        symbols: black,
        fill: "#626869",
        percent: Math.floor((black * 100) / total)
      })
    blue !== 0 &&
      dataArray.push({
        label: "Blue sources",
        color: "U",
        symbols: blue,
        fill: "#96C4D4",
        percent: Math.floor((blue * 100) / total)
      })

    white !== 0 &&
      dataArray.push({
        label: "White sources",
        color: "W",
        symbols: white,
        fill: "#FBF7D4",
        percent: Math.floor((white * 100) / total)
      })

    return dataArray
  }

  const manaSymbols = deck => {
    let white = 0
    let blue = 0
    let black = 0
    let red = 0
    let green = 0
    let colorless = 0
    let total = 0

    let dataArray = []

    for (let card of deck) {
      white = white + Array.from(card.mana_cost.matchAll("{W}")).length
      blue = blue + Array.from(card.mana_cost.matchAll("{U}")).length
      black = black + Array.from(card.mana_cost.matchAll("{B}")).length
      red = red + Array.from(card.mana_cost.matchAll("{R}")).length
      green = green + Array.from(card.mana_cost.matchAll("{G}")).length
      colorless = colorless + Array.from(card.mana_cost.matchAll("{C}")).length
    }

    total = white + blue + black + red + green + colorless

    colorless !== 0 &&
      dataArray.push({
        label: "Colorless symbols",
        color: "C",
        symbols: colorless,
        fill: "#CBCECE",
        percent: Math.floor((colorless * 100) / total)
      })
    green !== 0 &&
      dataArray.push({
        label: "Green symbols",
        color: "G",
        symbols: green,
        fill: "#83B592",
        percent: Math.floor((green * 100) / total)
      })
    red !== 0 &&
      dataArray.push({
        label: "Red symbols",
        color: "R",
        symbols: red,
        fill: "#D98F74",
        percent: Math.floor((red * 100) / total)
      })
    black !== 0 &&
      dataArray.push({
        label: "Black symbols",
        color: "B",
        symbols: black,
        fill: "#626869",
        percent: Math.floor((black * 100) / total)
      })
    blue !== 0 &&
      dataArray.push({
        label: "Blue symbols",
        color: "U",
        symbols: blue,
        fill: "#96C4D4",
        percent: Math.floor((blue * 100) / total)
      })
    white !== 0 &&
      dataArray.push({
        label: "White symbols",
        color: "W",
        symbols: white,
        fill: "#FBF7D4",
        percent: Math.floor((white * 100) / total)
      })

    return dataArray
  }

  const manaList = data => {
    let symbolsList = []
    for (let obj of data) {
      symbolsList.push(
        <p>
          {obj["color"]}: {obj["symbols"]}
        </p>
      )
    }
    return symbolsList
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
          value="symbols"
        />
      )}
      {buttonGroupValue === 3 && (
        <TwoLevelPieChart
          data={typesData(mainDeck)}
          name="type"
          value="copies"
          legend={true}
        />
      )}
    </Card.Body>
  )
}

export default StatsTab
