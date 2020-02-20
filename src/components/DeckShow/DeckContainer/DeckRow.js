import React from "react"
import { Row, Col } from "react-bootstrap"
import { manaCostFonts } from "../../../helpers/"

const DeckRow = props => {
  const { card, arr } = props

  return (
    <Row
      className="mr-2"
      style={{ minWidth: "49%" }}
      key={`row${arr ? arr.label : "side"}${card.cardname}`}
    >
      <Col
        xs={1}
        className="p-0"
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

export default DeckRow
