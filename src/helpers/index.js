import React from "react"

//create mana costs
export const manaCostFonts = string => {
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

//generic object grouping by key values
export const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})
//group objects by name, returning a new object
export const groupByName = groupBy("name")

//Translate deck objects to arrays
export const objToArray = obj => {
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
//Filter by type

export const filterByType = (array, type) => {
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

//Sort cards in deck arrays
export const sort = array => {
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
export const createList = sortedList => {
  let list = []
  for (let card of sortedList) {
    list.push(card)
  }
  return list
}

//create data source for deck download
export const dataSrc = (...args) => {
  let downloadData = []
  for (let arg of args) {
    objToArray(arg)
      .sort((a, b) => {
        return a.cardname === b.cardname ? 0 : a.cardname < b.cardname ? -1 : +1
      })
      .forEach(obj => {
        downloadData.push([
          `${obj.copies} ${obj.cardname}
`
        ])
      })
    downloadData.push([
      `
`
    ])
  }

  return downloadData
}

export const getPrice = (...args) => {
  let usdPrice = 0
  let eurPrice = 0
  let tixPrice = 0

  for (let arg of args) {
    for (let card of arg) {
      card.prices &&
        card.prices.usd &&
        (usdPrice += parseFloat(card.prices.usd))
      card.prices &&
        card.prices.eur &&
        (eurPrice += parseFloat(card.prices.eur))
      card.prices &&
        card.prices.tix &&
        (tixPrice += parseFloat(card.prices.tix))
    }
  }

  return {
    usd: usdPrice.toFixed(2),
    eur: eurPrice.toFixed(2),
    tix: tixPrice.toFixed(2)
  }
}

export const normalizeType = string => {
  let splitWord = string
    .replace(/Legendary |Tribal |Snow /g, "")
    .replace(/Basic Land|Artifact Land|^Land\w*/, "Land")
    .replace(
      /Artifact Creature|Host Creature|Instant Creature|Enchantment Creature|^Creature\w*/,
      "Creature"
    )
    .replace(/Creature\?.*/, "Creature")
    .replace(/Enchantment Artifact|Hero Artifact|^Artifact\w*/, "Artifact")
    .replace(/^Sorcery\w*/, "Sorcery")
    .replace(/Elemental Instant|^Instant\w*/, "Instant")
    .replace(/World Enchantment|^Enchantment\w*/, "Enchantment")
    .split(" ")
  return splitWord[0]
}

export const mapResults = cards => {
  return cards.map(card => {
    return {
      name: card.name,
      image_small: card.image_uris ? card.image_uris.small : "",
      image_border_crop: card.image_uris ? card.image_uris.border_crop : "",
      mana_cost: card.mana_cost ? card.mana_cost : "",
      cmc: card.cmc ? card.cmc : "0",
      type_line: card.type_line ? card.type_line : "",
      normalized_type: card.type_line ? normalizeType(card.type_line) : "",
      oracle_text: card.oracle_text ? card.oracle_text : "",
      power: card.power ? card.power : "",
      toughness: card.toughness ? card.toughness : "",
      colors: card.colors ? card.colors : "",
      rarity: card.rarity ? card.rarity : "",
      flavor_text: card.flavor_text ? card.flavor_text : "",
      color_identity: card.color_identity ? card.color_identity : "",
      prices: card.prices ? card.prices : ""
    }
  })
}

//Determine colors
export const setColors = (mainDeck, sideboard) => {
  let white = false
  let blue = false
  let black = false
  let red = false
  let green = false
  let colorless = false

  const cardColors = card => {
    if (card.mana_cost.match("W")) {
      white = true
    }
    if (card.mana_cost.match("U")) {
      blue = true
    }
    if (card.mana_cost.match("B")) {
      black = true
    }
    if (card.mana_cost.match("R")) {
      red = true
    }
    if (card.mana_cost.match("G")) {
      green = true
    }
    if (card.mana_cost.match("C")) {
      colorless = true
    }
  }

  for (let card of mainDeck) {
    cardColors(card)
  }
  for (let card of sideboard) {
    cardColors(card)
  }

  return [
    { W: white },
    { U: blue },
    { B: black },
    { R: red },
    { G: green },
    { C: colorless }
  ]
}
