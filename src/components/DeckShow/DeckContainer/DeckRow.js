import React from "react"
import { Row, Col, OverlayTrigger, Popover, Image } from "react-bootstrap"
import { manaCostFonts } from "../../../helpers/"

const DeckRow = props => {
  const { card, arr } = props

  return (
    <OverlayTrigger
      placement="auto"
      overlay={
        <Popover id="card-popover">
          <Popover.Content>
            <Image src={card.img}></Image>
          </Popover.Content>
        </Popover>
      }
    >
      <Row
        className="mr-lg-2"
        style={{ minWidth: "50%", maxHeight: "1.19rem" }}
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
          xs={8}
          md={7}
          className="px-0"
          key={`name${arr ? arr.label : "side"}${card.cardname}`}
        >
          <a href={card.img}>{card.cardname}</a>
        </Col>

        <Col
          xs={3}
          md={4}
          className="px-0 pr-md-2"
          key={`cost${arr ? arr.label : "side"}${card.cardname}`}
        >
          {card.mana_cost ? manaCostFonts(card.mana_cost) : ""}
        </Col>
      </Row>
    </OverlayTrigger>
  )
}

export default DeckRow
