import React, { useContext } from "react"
import { InputGroup, Button } from "react-bootstrap"
import { mapResults } from "../../helpers"
import { DecklistContext } from "../../contexts/DecklistContext"
import axios from "axios"
import rateLimit from "axios-rate-limit"

const FileReaderButton = () => {
  let fileReader
  let { setMainDeck, setSideboard } = useContext(DecklistContext)

  const http = rateLimit(axios.create(), {
    maxRequests: 1,
    perMilliseconds: 100
  })

  const findAndAddCard = async (copies, name, pile) => {
    try {
      const card = await http.get(
        `https://api.scryfall.com/cards/search?q=!"${name}"`
      )
      const cardObj = mapResults(card.data.data)
      console.log(cardObj)
      if (pile === "mainboard") {
        for (let i = 0; i < copies; i++) {
          setMainDeck(previousDeck => [...previousDeck, cardObj[0]])
        }
      } else {
        for (let i = 0; i < copies; i++) {
          setSideboard(previousDeck => [...previousDeck, cardObj[0]])
        }
      }
    } catch (error) {
      console.error(error.response)
    }
  }

  const handleFileRead = async e => {
    const content = fileReader.result.split("\n")
    let pile = "mainboard"
    for (let arr of content) {
      let cardCopies = arr.substring(0, arr.indexOf(" "))
      let cardName = arr
        .substring(arr.indexOf(" ") + 1)
        .trimEnd()
        .replace(/\s/g, "+")
      if (cardName === "") {
        pile = "sideboard"
      }
      setMainDeck([])
      setSideboard([])
      findAndAddCard(cardCopies, cardName, pile)
    }
  }

  const handleFileChosen = file => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <div className="input-group input-group-sm mt-2">
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input form-control-sm"
          id="file"
          accept=".txt"
          onChange={e => handleFileChosen(e.target.files[0])}
        />
        <label
          class="custom-file-label col-form-label-sm"
          for="inputGroupFile01"
        >
          Import from .txt
        </label>
      </div>
    </div>
  )
}

export default FileReaderButton
