import React, { useContext } from "react"
import { DecklistContext } from "../../contexts/DecklistContext"
import { Container } from "react-bootstrap"
import { getPrice } from "../../helpers"

const DeckHeader = () => {
  const { deckInfo } = useContext(DecklistContext)

  const pillStyle = {
    backgroundColor: "#327BFF",
    borderColor: "#005cbf",
    padding: ".25rem .5rem",
    display: "inline-block",
    fontSize: ".75rem",
    lineHeight: "1.5",
    borderRadius: "0.2rem",
    color: "white",
    margin: "0.2rem"
  }
  return (
    <Container className="d-flex mt-3 p-0">
      <div style={pillStyle}>
        {deckInfo.mainboard &&
          getPrice(deckInfo.mainboard, deckInfo.sideboard).usd}{" "}
        $
      </div>
      <div style={pillStyle}>
        {deckInfo.mainboard &&
          getPrice(deckInfo.mainboard, deckInfo.sideboard).eur}{" "}
        €
      </div>
      <div style={pillStyle}>
        {deckInfo.mainboard &&
          getPrice(deckInfo.mainboard, deckInfo.sideboard).tix}{" "}
        Tix
      </div>
    </Container>
  )
}

export default DeckHeader
