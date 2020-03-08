import React, { useContext } from "react"
import { Row, Col, OverlayTrigger, Popover, Image } from "react-bootstrap"
import { manaCostFonts } from "../../../helpers/"
import { WindowSizeContext } from "../../../contexts/WindowSizeContext"

const DeckRow = props => {
  const { card, arr } = props
  const { isLG } = useContext(WindowSizeContext)

  return (
    <OverlayTrigger
      placement="auto"
      delay={150}
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
        style={isLG ? { minWidth: "50%" } : { minWidth: "100%" }}
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
          lg={7}
          className="px-0"
          key={`name${arr ? arr.label : "side"}${card.cardname}`}
        >
          <a href={card.img}>{card.cardname}</a>
        </Col>

        <Col
          xs={3}
          lg={4}
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
