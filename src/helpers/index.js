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
