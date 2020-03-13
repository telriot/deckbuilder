import React, { useContext } from "react"
import { normalizeType } from "../../helpers"
import { DecklistContext } from "../../contexts/DecklistContext"
import axios from "axios"
import rateLimit from "axios-rate-limit"

const FileReaderButton = () => {
  let fileReader
  let { setMainDeck, setSideboard, setFileReaderIsLoading } = useContext(
    DecklistContext
  )

  const http = rateLimit(axios.create(), {
    maxRequests: 1,
    perMilliseconds: 100
  })

  const findAndAddCard = async (copies, name, pile) => {
    try {
      const card = await http.get(`/api/cards/singlecard?name=${name}`)
      const buildObj = card => {
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
          prices: card.prices ? card.prices : "",
          legalities: card.legalities ? card.legalities : ""
        }
      }
      const cardObj = buildObj(card.data)

      if (pile === "mainboard") {
        for (let i = 0; i < copies; i++) {
          setMainDeck(previousDeck => [...previousDeck, cardObj])
        }
      } else {
        for (let i = 0; i < copies; i++) {
          setSideboard(previousDeck => [...previousDeck, cardObj])
        }
      }
    } catch (error) {
      console.error(error.response)
    }
  }

  const handleFileRead = async () => {
    setFileReaderIsLoading(true)
    setMainDeck([])
    setSideboard([])
    const content = fileReader.result.split("\n")

    try {
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
        await findAndAddCard(cardCopies, cardName, pile)
      }
    } catch (error) {
      console.log(error)
    }
    setFileReaderIsLoading(false)
  }

  const handleFileChosen = file => {
    if (file) {
      fileReader = new FileReader()
      fileReader.onloadend = handleFileRead
      fileReader.readAsText(file)
    }
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
          className="custom-file-label col-form-label-sm"
          htmlFor="inputGroupFile01"
        >
          Import from .txt
        </label>
      </div>
    </div>
  )
}

export default FileReaderButton
